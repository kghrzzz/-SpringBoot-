package com.kogohirozzz.sgms.controller;

import com.kogohirozzz.sgms.domain.Course;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CourseController {
    @Autowired
    private CourseService courseService;
    @PostMapping("/delcourse")
    public ResultInfo delCourse(@RequestBody Course cname){return courseService.delCourse(cname);}
    @GetMapping("/incourse")
    public ResultInfo insertCourse(@RequestParam String cname){return courseService.insertCourse(cname);}

}
