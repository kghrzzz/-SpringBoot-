package com.kogohirozzz.sgms.service;

import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.Student;
import com.kogohirozzz.sgms.domain.StudentFor;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;


public interface StudentService {
    ResultInfo getStudentFor();
    ResultInfo updateStudent(StudentFor studentFor);
    ResultInfo delStudent(Student student);
    ResultInfo insertStudent(StudentFor studentFor);
    ResultInfo getStudentByClassName(StudentFor studentFor);
}
