package com.kogohirozzz.sgms.domain;

import com.baomidou.mybatisplus.annotation.TableName;

@TableName("class")
public class Class {
    private Integer sclass;//班级号
    private Integer classname;//班级名

    public Class(){

    }
    public Class(Integer sclass, Integer classname) {
        this.sclass = sclass;
        this.classname = classname;
    }

    public Integer getSclass() {
        return sclass;
    }

    public void setSclass(Integer sclass) {
        this.sclass = sclass;
    }

    public Integer getClassname() {
        return classname;
    }

    public void setClassname(Integer classname) {
        this.classname = classname;
    }

    @Override
    public String toString() {
        return "Class{" +
                "sclass=" + sclass +
                ", classname=" + classname +
                '}';
    }
}
