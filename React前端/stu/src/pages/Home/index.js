import {Button, Card, Form, Input, message, Modal} from "antd";
import './index.scss'
import {ATS} from "../../components/ATS";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchUpdatePassword} from "../../store/modules/user";
import {getToken} from "../../utils/token";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const [form] =Form.useForm();
    const handleCancel = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(fetchUpdatePassword(values));
        }catch (e){
            message.error("不能为空")
        }
        setOpen(false);
        if (getToken()==null){
            navigate('/login')
        }
    };
    const end = () =>{
        setOpen(false);
    }

    return (
        <Card
            extra={
            <>
                <Button onClick={showModal}>修改密码</Button>
                <Modal
                    title={"修改密码"}
                    open={open}
                    onOk={handleCancel}
                    onCancel={end}
                    footer={[
                        <Button key="back" onClick={ end }>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  onClick={ handleCancel }>
                            提交
                        </Button>,
                    ]}
                >
                    <Form form={form} validateTrigger='onBlur'>
                        <Form.Item
                            label="新密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' },{pattern:/^\w{3,20}$/, message:'请输入正确的密码格式'}]}>
                            <Input.Password size={"large"} placeholder={"请输入修改后的密码"} />
                        </Form.Item>
                    </Form>
                </Modal>
            </>}
        >
            <ATS />
        </Card>
    )
}

export default Home