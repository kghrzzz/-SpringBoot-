import {createSlice} from "@reduxjs/toolkit";
import myAxios from "../../utils/axios";

const classStore = createSlice({
    name:"class",
    initialState:{},

});

const {} =classStore.actions
const classReducer = classStore.reducer
//获取用于Select的班级列表
const fetchclassInfo = ()=>{
    return myAxios({
        url:"/getclass",
        method:'get',
    })
}
//获取class页面使用的班级列表
const fetchclassList = ()=>{
    return myAxios({
        url:"/getclasslist",
        method:'get',
    })
}
//删除班级信息
const fetchDelClass = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/delclass",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
//添加班级
const fetchInsertClass = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'get',
            url:"/inclass",
            params:value
        }))
        //若添加成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
export {fetchclassInfo,fetchclassList,fetchDelClass,fetchInsertClass}
export default classReducer