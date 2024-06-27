package com.kogohirozzz.sgms.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
@Slf4j
@Order(1)
@Component
public class LoginFilter implements Filter {
    @Resource
    private RedisTemplate<String,Object> redisTemplate;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        //Filter跨域处理
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        if (!request.getRequestURI().equals("/login")){
            if ("OPTIONS".equals(request.getMethod())){
                filterChain.doFilter(request,response);
            } else {
                response.setContentType("application/json;charset=utf-8");
                //获取Headers中参数
                String token = request.getHeader("Authorization");
                token = token == null ? "" : token;
                //查询token在Redis中的剩余时间
                Long expire = redisTemplate.getExpire(token);
                if (expire > 0){//为登录状态
                        redisTemplate.expire(token,30L, TimeUnit.MINUTES);
                        filterChain.doFilter(request,response);
                } else {
                    response.setStatus(401);
                    String json = "{\"message\":\"无权限\",\"code\":401}";
                    PrintWriter out = response.getWriter();
                    out.write(json);
                    out.flush();
                    out.close();
                }
            }
        } else {
            filterChain.doFilter(request,response);
        }
    }

}
