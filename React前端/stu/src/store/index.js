//组合redux子模块并导出store实例



import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./modules/user";

export default configureStore({
    reducer:{
        user:userReducer
    }
})