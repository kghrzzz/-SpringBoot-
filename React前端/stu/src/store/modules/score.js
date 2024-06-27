import {createSlice} from "@reduxjs/toolkit";
import myAxios from "../../utils/axios";

const scoreStore = createSlice({
    name:"score",
    //数据状态
    initialState:{
        // MyscoreInfo:{
        //     cname:null,
        //     scroe:null,
        //     type:null,
        // },
        // ScoreInfo:{
        //     sid:null,
        //     cname:null,
        //     classname:null,
        //     scroe:null,
        //     name:null,
        //     type:null,
        // },
    },
    // reducers:{
    //      setMyscoreInfo(state,action){
    //         state.MyscoreInfo = action.payload
    //      },
    //     setScoreInfo(state,action){
    //         state.ScoreInfo = action.payload
    //     },
    // }
})

// const {setScoreInfo,} =scoreStore.actions
const scoreReducer = scoreStore.reducer

//异步获取个人分数
const fetchMyScoreInfo = () => {
    return myAxios({
        url:"/myscore",
        method:'get',
    })
}
//获取分数列表
const fetchScoreInfo = () => {
    return myAxios({
        url:"/getscore",
        method:'get',
    })
}
//修改分数
const fetchUpdateScore = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/upscore",
            data:value
        }))
        //若修改成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}
const fetchDelScore = (value) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/delscore",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}

const fetchinstScore = (value) => {
    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/instscore",
            data:value
        }))
        //若删除成功刷新页面
        if (res.data.code ===100){
            window.location.reload()
        }
    }
}

export {fetchMyScoreInfo,fetchScoreInfo,fetchUpdateScore,fetchDelScore,fetchinstScore}
export default scoreReducer