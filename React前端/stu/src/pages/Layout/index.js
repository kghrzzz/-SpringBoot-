import {Layout, Menu, Popconfirm} from 'antd'
import {EditOutlined, HomeOutlined, TeamOutlined,} from '@ant-design/icons'
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchExit, fetchUserInfo} from "../../store/modules/user";

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
        type: 0
    },
    {
        label: '学生管理',
        key: '/student',
        icon: <i className="bi bi-mortarboard"></i>,
        type: 2
    },
    {
        label: '教师管理',
        key: '/teacher',
        icon: <i className="bi bi-file-person"></i>,
        type: 3
    },
    {
        label: '成绩管理',
        key: '/score',
        icon: <EditOutlined />,
        type: 2
    },
    {
        label: '我的成绩',
        key: '/myscore',
        icon: <EditOutlined />,
        type: 5
    },
    {
        label: '班级管理',
        key: '/class',
        icon: <TeamOutlined />,
        type: 2,
    },
    {
        key:'/class/studentByclass',
        className: 'hidden-submenu'
    }
]
const GeekLayout = () => {
    const navigate = useNavigate()
    const onMenuClick = (route) => {
        const path = route.key
        navigate(path)
    }
    //获取当前路径
    const location = useLocation()
    const selectedkey = location.pathname

    //触发个人用户信息action
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    //退出登录确认回调
    const onConfirm = () => {
        dispatch(fetchExit())
        navigate('/login')
    }

    const {name,atitle, sid,tid} = useSelector(state => state.user.userInfo)

//根据权限过滤
    const item = items.filter((el) => {
        if (atitle !=null){
            return el.type<4
        }else if (tid !=null){
            return el.type<3
        }else if (sid !=null){
            return el.type<2 || el.type===5
        }else{
            return el.type<4
        }
    })

    return (
        <Layout>
            <Header className="header"
                    style={{backgroundColor: "white"}}
            >
                <div className="logo bi bi-book text-info-emphasis text-center fs-1" />
                <div className="user-info">
                    <span className="user-name">{name}</span>
                    <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                 <button className="Btn">退出
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="svg bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                 </button>
            </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="light"
                        selectedKeys={selectedkey}
                        onClick={onMenuClick}
                        items={item}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* 二级路由的出口 */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default GeekLayout