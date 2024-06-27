package com.kogohirozzz.sgms.domain;

public class ResultInfo {
    private Object data;//后端返回结果数据对象
    private String msg;//消息
    /**响应编码
     * 100-请求成功
     * 101-请求异常
     * 103-未登录
     * 104-请求失败
     * 401-无权限
    */
    private Integer code;//响应码
    //无参构造方法
    public ResultInfo() {
    }

    /**
     * 有参构造方法
     *
     * @param msg
     */
    public ResultInfo(String msg) {this.msg = msg;
    }

    /**
     * 有参构造方法
     *
     * @param code
     * @param msg
     */
    public ResultInfo(String msg,Integer code) {
        this.msg = msg;
        this.code = code;
    }
    /**
     * 有参构造方法
     *
     * @param data
     * @param msg
     * @param code
     */
    public ResultInfo(Object data, String msg,Integer code) {
        this.data = data;
        this.msg = msg;
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
