package com.kogohirozzz.sgms.domain;

import com.baomidou.mybatisplus.annotation.TableName;

@TableName("score")
public class Score {
    private Integer sid;//学号
    private Integer cid;//课程号
    private float score;//分数
    private String type;//考试名称

    public Score(){}

    public Score(Integer sid, Integer cid, float score ,String type) {
        this.sid = sid;
        this.cid = cid;
        this.score = score;
        this.type = type;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
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
        return "Score{" +
                "sid=" + sid +
                ", cid=" + cid +
                ", score=" + score +
                ", type='" + type + '\'' +
                '}';
    }

}
