package com.kogohirozzz.sgms.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kogohirozzz.sgms.dao.ClassDao;
import org.json.JSONObject;
import com.kogohirozzz.sgms.dao.AdministratorDao;
import com.kogohirozzz.sgms.dao.StudentDao;
import com.kogohirozzz.sgms.dao.TeacherDao;
import com.kogohirozzz.sgms.domain.*;
import com.kogohirozzz.sgms.service.UserService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Duration;
import java.util.UUID;
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AdministratorDao administratorDao;
    @Autowired
    private TeacherDao teacherDao;
    @Autowired
    private StudentDao studentDao;
    @Autowired
    private ClassDao classDao;
    @Resource
    private RedisTemplate<String,Object> redisTemplate;
    @Override
    public ResultInfo login(User user) {
        if (user.getType() == 0){
            Administrator administrator;
            administrator = administratorDao.findAdministratorByAname(user.getUsername(), user.getPassword());
            if (administrator == null){
                return new ResultInfo("用户名或密码错误",104);
            }
            String token = UUID.randomUUID()+"";
            redisTemplate.opsForValue().set(token,administrator, Duration.ofMinutes(30L));
            return new ResultInfo(token,"登录成功",100);
        }
        if (user.getType() == 1){
            Teacher teacher;
            String regex =".*[a-zA-z].*";
            if (!user.getUsername().matches(regex)){
                teacher = teacherDao.findTeacherByTid(Integer.parseInt(user.getUsername()), user.getPassword());
                if (teacher == null){
                    return new ResultInfo("用户名或密码错误",104);
                }
            }else{
                return new ResultInfo("用户名或密码错误",104);
            }
            String token = UUID.randomUUID()+"";
            redisTemplate.opsForValue().set(token,teacher, Duration.ofMinutes(30L));
            return new ResultInfo(token,"登录成功",100);
        }
        if (user.getType() == 2){
            Student student;
            StudentFor studentFor;
            String regex =".*[a-zA-z].*";
            if (!user.getUsername().matches(regex)){
                student = studentDao.findStudentBySid(Integer.parseInt(user.getUsername()), user.getPassword());
                if (student == null){
                    return new ResultInfo("用户名或密码错误",104);
                }
                studentFor = new StudentFor(student.getSid(),student.getName(),classDao.findClassnameBySclass(student.getSclass()),student.getSgender());

            }else{
                return new ResultInfo("用户名或密码错误",104);
            }
            String token = UUID.randomUUID()+"";
            redisTemplate.opsForValue().set(token,studentFor, Duration.ofMinutes(30L));
            return new ResultInfo(token,"登录成功",100);
        }
        return new ResultInfo("error",104);
    }
//显示个人信息
    @Override
    public ResultInfo showUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token !=null){
            Object user = redisTemplate.opsForValue().get(token);
            return new ResultInfo(user,"success",100);
        }
        return new ResultInfo("error",104);
    }
//退出登录
    @Override
    public void exit(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token !=null){
            redisTemplate.delete(token);
        }
    }
//更新密码
    @Override
    public ResultInfo updatePassword(User user,HttpServletRequest request) throws IOException {
            String token = request.getHeader("Authorization");
            Object users = redisTemplate.opsForValue().get(token);
            ObjectMapper objectMapper = new ObjectMapper();
            String userJson = objectMapper.writeValueAsString(users);
            JSONObject jsonObject = new JSONObject(userJson);
            if (jsonObject.optInt("aid",-1) != -1){
                administratorDao.updatePasswordByAid(jsonObject.optInt("aid",-1),user.getPassword());
                return new ResultInfo("ok",100);
            } else if (jsonObject.optInt("tid",-1) != -1) {
                teacherDao.updatePasswordByTid(jsonObject.optInt("tid",-1 ),user.getPassword());
                return new ResultInfo("ok",100);
            }else if (jsonObject.optInt("sid",-1) != -1){
                studentDao.updatePasswordBySid(jsonObject.optInt("sid",-1),user.getPassword());
                return new ResultInfo("ok",100);
            }
        return new ResultInfo("error",104);
    }
}
