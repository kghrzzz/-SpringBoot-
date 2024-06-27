import axios from "axios";
import {getToken} from "../token";
import router from "../../router";
import {clearUserInfo} from "../../store/modules/user";

const myAxios = axios.create({
    baseURL:"http://127.0.0.1:8080",
    timeout:5000,
    headers:{},
})

//请求拦截
myAxios.interceptors.request.use(function (config){
    //操作config 注入token
    const token = getToken()
    if (token){
        config.headers.Authorization = `${token}`
    }
    return config
},function (error){
    return Promise.reject(error)
})

//响应拦截
myAxios.interceptors.response.use(function (response){

    return response
},function (error){
    //监控401 token失效
    if (error.response.status === 401){
        clearUserInfo()
        router.navigate('/login').then()
        window.location.reload()
    }
    return Promise.reject(error)
})

export default myAxios