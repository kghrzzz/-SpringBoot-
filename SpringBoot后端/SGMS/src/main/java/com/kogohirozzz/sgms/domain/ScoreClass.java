package com.kogohirozzz.sgms.domain;

import java.io.Serializable;

public class ScoreClass implements Serializable {
    private static final Long seralVersionUD=-22178712799L;
    private Integer sid;//学号
    private String cname;//课程名
    private float score;//分数
    private String type;//考试名称

    public ScoreClass(){

    }
    public ScoreClass(Integer sid, String cname, float score, String type) {
        this.sid = sid;
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
        return "ScoreClass{" +
                "sid=" + sid +
                ", cname='" + cname + '\'' +
                ", score=" + score +
                ", type='" + type + '\'' +
                '}';
    }
}
