package com.kogohirozzz.sgms.controller;

import com.kogohirozzz.sgms.domain.Class;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.StudentFor;
import com.kogohirozzz.sgms.service.ClassService;
import com.kogohirozzz.sgms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ClassController {
    @Autowired
    ClassService classService;
    @Autowired
    StudentService studentService;
    @GetMapping("/getclasslist")
    public ResultInfo getClassList() {return classService.getClassList();}
    @PostMapping("/delclass")
    public ResultInfo delClass(@RequestBody Class classname) {return classService.delClass(classname);}
    @GetMapping("/inclass")
    public ResultInfo insertClass(@RequestParam Integer classname) {return classService.insertClass(classname);}
    @PostMapping("/getstudentByclassname")
    public ResultInfo getStudentByClassName(@RequestBody StudentFor studentFor) {
        return studentService.getStudentByClassName(studentFor);
    }
}
