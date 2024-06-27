package com.kogohirozzz.sgms.service.impl;

import com.kogohirozzz.sgms.dao.TeacherDao;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.Teacher;
import com.kogohirozzz.sgms.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    private TeacherDao teacherDao;
    @Override
    public ResultInfo insertTeacher(Teacher teacher) {
        Teacher teacher1 = new Teacher(teacher.getTid(),teacher.getName(),teacher.getTitle(),teacher.getGender(),"123456");
        teacherDao.insert(teacher1);
        return new ResultInfo("ok",100);
    }

    @Override
    public ResultInfo getTeacher() {
        List<Teacher> teacherList = teacherDao.selectList(null);
        return new ResultInfo(teacherList,"ok",100);
    }

    @Override
    public ResultInfo updateTeacher(Teacher teacher) {
        teacherDao.updateTeacherNotPWDByTid(teacher.getTid(),teacher.getName(),teacher.getTitle(),teacher.getGender());
        return new ResultInfo("ok",100);
    }

    @Override
    public ResultInfo delTeacher(Teacher teacher) {
        teacherDao.delByTid(teacher.getTid());
        return new ResultInfo("ok",100);
    }
}
