//有token正常跳转，无token返回登录


import {getToken} from "../utils/token";
import {Navigate} from "react-router-dom";

export function AuthRoute ({children}){
    const token = getToken()
    if (token){
        return<>{children}</>
    } else {
      return <Navigate to={'/login'} replace />
    }
}