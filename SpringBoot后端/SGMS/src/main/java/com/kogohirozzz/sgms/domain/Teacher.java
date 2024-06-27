package com.kogohirozzz.sgms.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;

@TableName("teacher")
public class Teacher implements Serializable {
    private static final Long seralVersionUD=-22178712784L;
    @TableId(value = "tid")
    private Integer tid;//教师号
    private String name;//教师姓名
    private String title;//职务
    private String gender;//性别
    private String password;//密码

    public Teacher(){

    }
    public Teacher(Integer tid, String name, String title, String gender, String password) {
        this.tid = tid;
        this.name = name;
        this.title = title;
        this.gender = gender;
        this.password = password;
    }

    public Integer getTid() {
        return tid;
    }

    public void setTid(Integer tid) {
        this.tid = tid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "tid=" + tid +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", gender='" + gender + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
