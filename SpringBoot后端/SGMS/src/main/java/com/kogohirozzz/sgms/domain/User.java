package com.kogohirozzz.sgms.domain;

import java.io.Serializable;

public class User implements Serializable {
    private static final Long seralVersionUD=-22178712789L;
    private String username;
    private String password;
    private Integer type;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    private User(){

    }

    public User(String username, String password, Integer type) {
        this.username = username;
        this.password = password;
        this.type = type;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", type=" + type +
                '}';
    }
}
