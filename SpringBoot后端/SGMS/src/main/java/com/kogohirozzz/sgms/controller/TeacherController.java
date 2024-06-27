package com.kogohirozzz.sgms.controller;

import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.Teacher;
import com.kogohirozzz.sgms.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeacherController {
    @Autowired
    TeacherService teacherService;
    @PostMapping("inteacher")
    ResultInfo insertTeacher(@RequestBody Teacher teacher) {return teacherService.insertTeacher(teacher);}
    @GetMapping("/getteacher")
    ResultInfo getTeacher() {return teacherService.getTeacher();}
    @PostMapping("/upteacher")
    public ResultInfo updateStudent(@RequestBody Teacher teacher) {return teacherService.updateTeacher(teacher);}
    @PostMapping("/delteacher")
    public ResultInfo delStudent(@RequestBody Teacher teacher) {return teacherService.delTeacher(teacher);}
}
