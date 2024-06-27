package com.kogohirozzz.sgms.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.User;
import com.kogohirozzz.sgms.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResultInfo login(@RequestBody User user){
        return userService.login(user);
    }
    @GetMapping("/user")
    public ResultInfo showUser(HttpServletRequest request){
        return userService.showUser(request);
    }
    @GetMapping("/exit")
    public void exit(HttpServletRequest request){
        userService.exit(request);
    }
    @PostMapping("/uppwd")
    public ResultInfo updatePassword(@RequestBody User user,HttpServletRequest request) throws IOException {return userService.updatePassword(user,request);}
}
