import {createSlice} from "@reduxjs/toolkit";
import myAxios from "../../utils/axios";

const studentStore = createSlice({
    name:"student",
    initialState:{},

});

// const {} =studentStore.actions
const studentReducer = studentStore.reducer


//获取学生列表
const fetchstudentInfo = ()=>{
    return myAxios({
        url:"/getstudent",
        method:'get',
    })
}
//更新学生信息
const fetchUpdateStudent = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/upstu",
            data:value
        }))
        //若修改成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
//删除学生信息
const fetchDelStudent = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/delstu",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
//添加学生
const fetchInsertStudent = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/instu",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
//根据班级名获取学生列表
const fetchstudentByclassname = (value)=>{
    return myAxios({
        url:"/getstudentByclassname",
        method:'post',
        data:value
    })
}

export {fetchstudentInfo,fetchUpdateStudent,fetchDelStudent,fetchInsertStudent,fetchstudentByclassname}
export default studentReducer