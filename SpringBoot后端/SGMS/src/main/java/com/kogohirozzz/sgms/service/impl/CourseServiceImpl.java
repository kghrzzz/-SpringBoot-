package com.kogohirozzz.sgms.service.impl;

import com.kogohirozzz.sgms.dao.CourseDao;
import com.kogohirozzz.sgms.domain.Course;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseDao courseDao;
    @Override
    public ResultInfo getCourse() {
        List<Course> courseList = courseDao.selectList(null);
        return new ResultInfo(courseList,"ok",100);
    }
    public ResultInfo delCourse(Course cname) {
        courseDao.delByCname(cname.getCname());
        return new ResultInfo("ok",100);
    }
    public ResultInfo insertCourse(String cname) {
        courseDao.insert(new Course(null,cname));
        return new ResultInfo("ok",100);
    }
}
