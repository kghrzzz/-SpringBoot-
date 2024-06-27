package com.kogohirozzz.sgms.domain;

import java.io.Serializable;

public class ScoreStudent implements Serializable {
    private static final Long seralVersionUD=-22178712788L;
    private Integer sid;//学号
    private String name;//学生姓名
    private Integer classname;//班级名
    private String cname;//课程名
    private float score;//分数
    private String type;//考试名称

    public ScoreStudent(){}

    public ScoreStudent(Integer sid, String name, Integer classname, String cname, float score, String type) {
        this.sid = sid;
        this.name = name;
        this.classname = classname;
        this.cname = cname;
        this.score = score;
        this.type = type;
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

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "ScoreStudent{" +
                "sid=" + sid +
                ", name='" + name + '\'' +
                ", classname=" + classname +
                ", cname='" + cname + '\'' +
                ", score=" + score +
                ", type='" + type + '\'' +
                '}';
    }
}
