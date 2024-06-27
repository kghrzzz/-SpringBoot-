package com.kogohirozzz.sgms.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;

@TableName("student")
public class Student implements Serializable {
    private static final Long seralVersionUD=-22178712783L;
    @TableId(value = "sid")
    private Integer sid;//学号
    private String name;//学生姓名
    private Integer sclass;//班级号
    private String sgender;//性别
    private String password;//密码

    public Student(){

    }

    public Student(Integer sid, String name, Integer sclass, String sgender, String password) {
        this.sid = sid;
        this.name = name;
        this.sclass = sclass;
        this.sgender = sgender;
        this.password = password;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSclass() {
        return sclass;
    }

    public void setSclass(Integer sclass) {
        this.sclass = sclass;
    }

    public String getSgender() {
        return sgender;
    }

    public void setSgender(String sgender) {
        this.sgender = sgender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Student{" +
                "sid=" + sid +
                ", name='" + name + '\'' +
                ", sclass=" + sclass +
                ", sgender='" + sgender + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
