package com.kogohirozzz.sgms.service;

import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.Teacher;

public interface TeacherService {
    ResultInfo insertTeacher(Teacher teacher);
    ResultInfo getTeacher();
    ResultInfo updateTeacher(Teacher teacher);
    ResultInfo delTeacher(Teacher teacher);
}
