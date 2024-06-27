package com.kogohirozzz.sgms.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;

@TableName("administrator")
public class Administrator implements Serializable {

    private static final Long seralVersionUD=-22178712782L;
    @TableId(value = "aid")
    private Integer aid;//管理员账号编号
    private String name;//管理员账号
    private String atitle;//身份
    private String password;//密码

    public Administrator(){

    }

    public Administrator(Integer aid, String name, String atitle, String password) {
    this.aid = aid;
    this.name = name;
    this.atitle = atitle;
    this.password = password;
}
    public Integer getAid() {
        return aid;
    }

    public void setAid(Integer aid) {
        this.aid = aid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAtitle() {
        return atitle;
    }

    public void setAtitle(String atitle) {
        this.atitle = atitle;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "Administrator{" +
                "aid=" + aid +
                ", name='" + name + '\'' +
                ", atitle='" + atitle + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}
