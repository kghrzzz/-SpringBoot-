package com.kogohirozzz.sgms.controller;

import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.ScoreClass;
import com.kogohirozzz.sgms.domain.Student;
import com.kogohirozzz.sgms.domain.StudentFor;
import com.kogohirozzz.sgms.service.ClassService;
import com.kogohirozzz.sgms.service.CourseService;
import com.kogohirozzz.sgms.service.ScoreService;
import com.kogohirozzz.sgms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private ClassService classService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private ScoreService scoreService;
    @GetMapping("/getstudent")
    public ResultInfo getStudentFor() {
        return studentService.getStudentFor();
    }
    @GetMapping("/getclass")
    public ResultInfo getClassFor() {return classService.getClassFor();}
    @PostMapping("/upstu")
    public ResultInfo updateStudent(@RequestBody StudentFor studentFor) {return studentService.updateStudent(studentFor);}
    @PostMapping("/delstu")
    public ResultInfo delStudent(@RequestBody Student student) {return studentService.delStudent(student);}
    @GetMapping("/getcourse")
    public ResultInfo getCourse() {return courseService.getCourse();}
    @PostMapping("/instscore")
    public ResultInfo insertScore(@RequestBody ScoreClass scoreClass) {return scoreService.insertScore(scoreClass);}
    @PostMapping("/instu")
    public ResultInfo insertStudent(@RequestBody StudentFor studentFor) {return studentService.insertStudent(studentFor);}
}
