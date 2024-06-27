import React, {useState} from "react";
import './index.scss'
import {useDispatch} from "react-redux";
import {fetchLogin} from "../../store/modules/user";
import {Button, Card, Form, Input, message, Radio} from "antd";
import {useNavigate} from "react-router-dom";
import {getToken} from "../../utils/token";

const Login = () => {
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //表单状态设置
    const handleSubmit = async (values) => {
        setIsLoading(true)
        console.log(values)
        await dispatch(fetchLogin(values))
        if (getToken()){
            navigate('/')
            message.success('登录成功')
            setIsLoading(false)
            console.log('success')
        }else{
            navigate('/login')
            setIsLoading(false)
            message.error('登录失败')
        }
    }

     return (
         <div className='login'>
            <Card className='login-container'>
                <h2 className="text-center">学生成绩管理系统</h2>
                <Form validateTrigger='onBlur' onFinish={handleSubmit} initialValues={{type:2}}>
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '请输入账号' },{pattern:/^\w{3,20}$/, message:'请输入正确的账号格式'}]}>
                        <Input size={"large"} placeholder={"请输入账号"} />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' },{pattern:/^\w{3,20}$/, message:'请输入正确的密码格式'}]}>
                        <Input.Password size={"large"} placeholder={"请输入密码"} />
                    </Form.Item>
                    <Form.Item
                        name="type"
                    >
                        <Radio.Group>
                            <Radio value={2}>学生</Radio>
                            <Radio value={1}>教师</Radio>
                            <Radio value={0}>管理员</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' size="large" disabled={isLoading} block>
                            {isLoading ? '登录中...':'登录'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
         </div>
    );
}

export default Login