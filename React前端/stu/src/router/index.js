import {createBrowserRouter, Navigate} from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Error404 from "../pages/Error/404";
import React from "react";
import {AuthRoute} from "../components/AuthRoute";
import Home from "../pages/Home";
import Student from "../pages/Student";
import Score from "../pages/Score";
import Teacher from "../pages/Teacher";
import MyScore from "../pages/MyScore";
import Class from "../pages/Class";
import StudentByclass from "../pages/Class/studentByclass";



const router = createBrowserRouter([
    {
    path:"/",
    element: <AuthRoute><Layout /></AuthRoute>,
        children:[
            {
                path: '',
                element : <Home/>
            },
            {
                path: 'student',
                element : <Student/>
            },
            {
                path: 'teacher',
                element : <Teacher/>
            },
            {
                path: 'score',
                element : <Score/>
            },
            {
                path:'myscore',
                element:<MyScore/>
            },
            {
                path: 'class',
                element : <Class/>,

            },
            {
                path:'class/studentByclass',
                element:<StudentByclass/>
            }
        ]
    },
    {
    path:"/login",
        element:<Login />
    },
    {
        path: "*",
        element: <Navigate to="/404" />,
    },
    {
        path: "/404",
        element: <Error404 />,
    },

])


export default router