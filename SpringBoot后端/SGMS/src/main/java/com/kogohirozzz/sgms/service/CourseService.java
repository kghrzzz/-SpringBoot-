package com.kogohirozzz.sgms.service;

import com.kogohirozzz.sgms.domain.Course;
import com.kogohirozzz.sgms.domain.ResultInfo;

public interface CourseService {
    ResultInfo getCourse();
    ResultInfo delCourse(Course cname);
    ResultInfo insertCourse(String cname);
}
