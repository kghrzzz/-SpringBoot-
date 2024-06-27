package com.kogohirozzz.sgms.domain;

import java.io.Serializable;

public class StudentFor implements Serializable {
    private static final Long seralVersionUD=-22178712766L;
    private Integer sid;//学号
    private String name;//学生姓名
    private Integer classname;//班级名
    private String sgender;//性别

    public StudentFor(){

    }

    public StudentFor(Integer sid, String name, Integer classname, String sgender) {
        this.sid = sid;
        this.name = name;
        this.classname = classname;
        this.sgender = sgender;
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

    public Integer getClassname() {
        return classname;
    }

    public void setClassname(Integer classname) {
        this.classname = classname;
    }

    public String getSgender() {
        return sgender;
    }

    public void setSgender(String sgender) {
        this.sgender = sgender;
    }

    @Override
    public String toString() {
        return "StudentFor{" +
                "sid=" + sid +
                ", name='" + name + '\'' +
                ", classname=" + classname +
                ", sgender='" + sgender + '\'' +
                '}';
    }
}
