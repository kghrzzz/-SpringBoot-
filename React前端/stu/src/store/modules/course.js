import {createSlice} from "@reduxjs/toolkit";
import myAxios from "../../utils/axios";

const courseStore = createSlice({
    name:"course",
    initialState:{},

});

const {} =courseStore.actions
const courseReducer = courseStore.reducer
const fetchcourseInfo = ()=>{
    return myAxios({
        url:"/getcourse",
        method:'get',
    })
}
//删除班级信息
const fetchDelCourse = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/delcourse",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
//添加班级
const fetchInsertCourse = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'get',
            url:"/incourse",
            params:value
        }))
        //若添加成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
export {fetchcourseInfo,fetchDelCourse,fetchInsertCourse}
export default courseReducer