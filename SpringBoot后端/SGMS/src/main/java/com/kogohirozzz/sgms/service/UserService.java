package com.kogohirozzz.sgms.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kogohirozzz.sgms.domain.ResultInfo;
import com.kogohirozzz.sgms.domain.User;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public interface UserService {
    ResultInfo login(User user);
    ResultInfo showUser(HttpServletRequest request);
    void exit(HttpServletRequest request);
    ResultInfo updatePassword(User user,HttpServletRequest request) throws IOException;

}
