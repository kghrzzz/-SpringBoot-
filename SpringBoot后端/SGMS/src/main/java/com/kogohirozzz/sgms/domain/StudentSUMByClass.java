package com.kogohirozzz.sgms.domain;

import java.io.Serializable;

public class StudentSUMByClass implements Serializable {
    private static final Long seralVersionUD=-22178712798L;
    private Integer classname;//班级名
    private Integer sum;//班级人数

    public StudentSUMByClass(){

    }

    public StudentSUMByClass(Integer classname, Integer sum) {
        this.classname = classname;
        this.sum = sum;
    }

    public Integer getClassname() {
        return classname;
    }

    public void setClassname(Integer classname) {
        this.classname = classname;
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    @Override
    public String toString() {
        return "StudentSUMByClass{" +
                "classname=" + classname +
                ", sum=" + sum +
                '}';
    }
}

