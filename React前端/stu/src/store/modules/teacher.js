import {createSlice} from "@reduxjs/toolkit";
import myAxios from "../../utils/axios";

const teacherStore = createSlice({
    name:"teacher",
    initialState:{},

});

const {} =teacherStore.actions
const teacherReducer = teacherStore.reducer
//获取教师列表
const fetchteacherInfo = ()=>{
    return myAxios({
        url:"/getteacher",
        method:'get',
    })
}
//添加教师
const fetchInsertTeacher = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/inteacher",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
//更新教师信息
const fetchUpdateTeacher = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/upteacher",
            data:value
        }))
        //若修改成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
//删除教师信息
const fetchDelTeacher= (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/delteacher",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
export {fetchInsertTeacher,fetchteacherInfo,fetchDelTeacher,fetchUpdateTeacher}
export default teacherReducer