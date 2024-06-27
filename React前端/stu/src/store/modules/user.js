//和用户相关的状态管理

import {createSlice} from "@reduxjs/toolkit";
import myAxios from "../../utils/axios";
import {getToken, removeClassName, removeToken, setToken} from "../../utils/token";


const userStore = createSlice({
    name:"user",
    //数据状态
    initialState:{
        token:getToken('token_key') || '',
        userInfo: {
            aid:null,
            name:"undefined",
            atitle:null,
            sid:null,
            classname:null,
            sgender:null,
            tid:null,
            title:null,
            gender:null,
        },
    },
    //同步修改方法
    reducers:{
        setToken_(state,action){
            state.token = action.payload
            //localstorage存
            setToken(action.payload)
        },
        setUserInfo(state,action){
            state.userInfo = action.payload
        },
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()
            removeClassName()
        }
    }
})


//解构actionCreater

const {setToken_ , setUserInfo,clearUserInfo} =userStore.actions

//获取reducer函数

const userReducer = userStore.reducer

//异步获取token

const fetchLogin = (values)=>{
    return async (dispatch)=>{
        //发送异步请求
        const res = (await myAxios({
            method:'post',
            url:"/login",
            data:values
        }))
        //提交同步action进行token存入
        dispatch(setToken_(res.data.data))

    }
}

//异步获取个人信息
const fetchUserInfo = ()=>{
    return async (dispatch)=>{
        //发送异步请求
        const res = (await myAxios({
            method:'get',
            url:"/user"
        }))
        //提交同步action进行数据存入
        dispatch(setUserInfo(res.data.data))
    }
}
//修改密码
const fetchUpdatePassword = (password) =>{

    return async (dispatch) => {
        const res = (await myAxios({
            method:'post',
            url:"/uppwd",
            data:password
        }))
        //若修改成功退出页面重新登录
        if (res.data.code ===100){
            await dispatch(fetchExit());
        }
    }
}
//清除token
const fetchExit = () =>{
    return async  (dispatch) => {
        await myAxios({
            method:'get',
            url:"/exit"
        })
        //清除用户数据
        dispatch(clearUserInfo());
    }
}

export { fetchLogin , fetchUserInfo ,fetchExit ,fetchUpdatePassword,clearUserInfo}
export default userReducer