import {useDispatch, useSelector} from "react-redux";
import "./ats.scss"
import {Button, Form, Input, message, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {fetchInsertClass} from "../store/modules/class";
import {fetchcourseInfo, fetchDelCourse, fetchInsertCourse} from "../store/modules/course";
import {fetchScoreInfo} from "../store/modules/score";

export function ATS () {
    const { name,atitle, sid, classname, sgender, tid, title, gender } = useSelector(state => state.user.userInfo)
    const [form] =Form.useForm();
    const dispatch = useDispatch()
    const [openincourse, setOpenincourse] = useState(false);
    const [opendel,setOpendel] =useState(false);
    const showincourseModal = () => {
        form.resetFields();
        setOpenincourse(true);
    };
    const incourseend = () =>{
        setOpenincourse(false);
    }
    const incoursecheck = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(fetchInsertCourse(values));
        }catch (e){
            message.error("不能为空")
        }
        setOpenincourse(false);
    }
    const showdelModal = () => {
        form.resetFields();
        setOpendel(true);
    };
    const delend = () =>{
        setOpendel(false);
    }
    const delcheck = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(fetchDelCourse(values));
        }catch (e){
            message.error("不能为空")
        }
        setOpendel(false);
    }
    const [courseList,setcourseList] = useState([])
    useEffect(() => {
        async function getList() {
            const res = await fetchcourseInfo()
            const uniqueCnames = [...new Set(res.data.data.map(item => item.cname))];
            const formattedCourseList = uniqueCnames.map(cname => ({
                value: cname,
                label: cname
            }));
            setcourseList(formattedCourseList);
        }
        getList().then()
    },[]);
    if (atitle != null){
        return (
            <div>
                <div className="container">
                    <p>身份：{atitle}</p>
                </div>
                <Button className={'pr-btn1'} onClick={showincourseModal}>添加课程</Button>
                <Modal
                    title={"添加课程"}
                    open={openincourse}
                    onOk={incoursecheck}
                    onCancel={incourseend}
                    footer={[
                        <Button key="back" onClick={ incourseend }>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  onClick={ incoursecheck }>
                            提交
                        </Button>,
                    ]}
                >
                    <Form form={form} validateTrigger='onBlur'>
                        <Form.Item
                            label="课程"
                            name="cname"
                            rules={[{pattern:/^[a-zA-Z\u4e00-\u9fa5]{1,20}$/, message:'请输入正确的课程名'}]}
                        >
                            <Input
                                size={"large"}
                                placeholder={"输入课程"}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Button className={'pr-btn2'} onClick={showdelModal} type='primary' danger>删除课程</Button>
                <Modal
                    title={"删除课程"}
                    open={opendel}
                    onOk={delcheck}
                    onCancel={delend}
                    footer={[
                        <Button key="back" onClick={ delend }>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  onClick={ delcheck }>
                            提交
                        </Button>,
                    ]}
                >
                    <Form form={form} validateTrigger='onBlur'>
                        <Form.Item
                            label="课程"
                            name="cname"
                            rules={[{required: true,message: '请选择要删除的课程'}]}
                            help={form.getFieldError('cname') ? form.getFieldError('cname').join(',') : ''}
                        >
                            <Select
                                showSearch
                                size={"large"}
                                options={courseList}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }else if (sid != null){
        return (
            <div className="container">
                <p>学号：{sid}</p>
                <p>姓名：{name}</p>
                <p>班级：{classname}</p>
                <p>性别：{sgender}</p>
            </div>
            )
    }else if (tid !=null){
        return (
            <div className="container">
                <p>工号：{tid}</p>
                <p>姓名：{name}</p>
                <p>职务：{title}</p>
                <p>性别：{gender}</p>
            </div>
        )
    }else{
        return (
            <div></div>
        )
    }
}
