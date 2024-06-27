package com.kogohirozzz.sgms.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kogohirozzz.sgms.dao.ClassDao;
import com.kogohirozzz.sgms.dao.CourseDao;
import com.kogohirozzz.sgms.dao.ScoreDao;
import com.kogohirozzz.sgms.dao.StudentDao;
import com.kogohirozzz.sgms.domain.*;
import com.kogohirozzz.sgms.service.ScoreService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
public class ScoreServiceImpl implements ScoreService {
    @Autowired
    private ScoreDao scoreDao;
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private StudentDao studentDao;
    @Autowired
    private ClassDao classDao;
    @Resource
    private RedisTemplate<String,Object> redisTemplate;
    // 获取个人成绩信息
    @Override
    public ResultInfo getMyScore(HttpServletRequest request) throws IOException {
        String token = request.getHeader("Authorization");
        Object users = redisTemplate.opsForValue().get(token);
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(users);
        JSONObject jsonObject = new JSONObject(userJson);
        int sid = jsonObject.optInt("sid",-1);
        List<Score> myScore = scoreDao.findMyScoreBySid(sid);
        List<ScoreClass> list = new ArrayList<>();
        for (Score score:myScore){
            list.add(new ScoreClass(score.getSid(), courseDao.findCnameBycid(score.getCid()),score.getScore(),score.getType()));
        }
        return new ResultInfo(list,"ok",100);
    }
    //获取成绩信息
    @Override
    public ResultInfo getScore() {
        List<Score> scoreList = scoreDao.selectList(null);
        List<ScoreStudent> scoreStudentList = new ArrayList<>();
        for (Score score:scoreList){
            int sid = score.getSid();
            scoreStudentList.add(new ScoreStudent(sid,studentDao.findNameBySid(sid),classDao.findClassnameBySclass(studentDao.findSclassBySid(sid)),courseDao.findCnameBycid(score.getCid()),score.getScore(),score.getType()));
        }
        return new ResultInfo(scoreStudentList,"ok",100);
    }
    //修改一个成绩
    @Override
    public ResultInfo updateScore(ScoreClass scoreClass) {
        Score score = new Score(scoreClass.getSid(),courseDao.findCidByCname(scoreClass.getCname()),scoreClass.getScore(),scoreClass.getType());
        scoreDao.updateScoreBySid(score.getSid(),score.getCid(),score.getScore(),score.getType());
        return new ResultInfo("ok",100);
    }
    //删除一个成绩
    @Override
    public ResultInfo delScore(ScoreClass scoreClass) {
        scoreDao.delBySidAndCidAndType(scoreClass.getSid(),courseDao.findCidByCname(scoreClass.getCname()),scoreClass.getType());
        return new ResultInfo("ok",100);
    }
    //添加一个成绩
    @Override
    public ResultInfo insertScore(ScoreClass scoreClass) {
        Score score = new Score(scoreClass.getSid(),courseDao.findCidByCname(scoreClass.getCname()),scoreClass.getScore(),scoreClass.getType());
        scoreDao.insert(score);
        return new ResultInfo("ok",100);
    }
}
