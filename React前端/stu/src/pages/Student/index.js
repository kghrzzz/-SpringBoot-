import {Breadcrumb, Button, Card, Form, Input, message, Modal, Select, Space, Table} from "antd";
import {Link} from "react-router-dom";
import './index.scss'
import React, {useEffect, useRef, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {
    fetchDelStudent,
    fetchInsertStudent,
    fetchstudentInfo,
    fetchUpdateStudent
} from "../../store/modules/student";
import {useDispatch, useSelector} from "react-redux";
import {fetchclassInfo} from "../../store/modules/class";
import {fetchcourseInfo} from "../../store/modules/course";
import {fetchinstScore} from "../../store/modules/score";

const Student = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const searchName = (data) => {
        if (data === 'sid'){
            return '学号'
        }
        if (data === 'name'){
            return '姓名'
        }
        if (data === 'classname'){
            return '班级'
        }
        if (data === 'sgender'){
            return '性别'
        }
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`搜索 ${searchName(dataIndex)}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        搜索
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        重置
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });
    const [open, setOpen] = useState(false);
    const [opendel,setOpendel] =useState(false);
    const [form] =Form.useForm();
    const dispatch = useDispatch()

    const showModal = (record) => {
        form.resetFields();
        form.setFieldsValue({sid:record.sid,name:record.name,classname:record.classname,sgender:record.sgender});
        setOpen(true);
    };
    const end = () =>{
        setOpen(false);
    }
    const handleCancel = async () => {
        const values = await form.validateFields();
        await dispatch(fetchUpdateStudent(values));
        setOpen(false);
    }
    const showdelModal = (record) =>{
        form.resetFields();
        form.setFieldsValue({sid:record.sid});
        setOpendel(true);
    }
    const delend = () => {
        setOpendel(false);
    }
    const delcheck = async () => {
        const values = await form.validateFields();
        await dispatch(fetchDelStudent(values));
        setOpendel(false);
    }

    const [openinst,setOpeninst] = useState(false);
    const instend = () =>{
        setOpeninst(false);
    }
    const showinstModal = (record) => {
        form.resetFields();
        form.setFieldsValue({sid:record.sid});
        setOpeninst(true);
    };
    const instcheck = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(fetchinstScore(values));
        }catch (e){
            message.error("不能为空")
        }
        setOpeninst(false);
    }

    const columns = [
        {
            title: '学号',
            dataIndex: 'sid',
            key:'sid',
            ...getColumnSearchProps('sid')
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key:'name',
            ...getColumnSearchProps('name')
        },
        {
            title: '班级',
            dataIndex: 'classname',
            key:'classname',
            ...getColumnSearchProps('classname')
        },
        {
            title: '性别',
            dataIndex: 'sgender',
            key:'sgender',
            ...getColumnSearchProps('sgender')
        },
        {
            title: '操作',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)} type={"primary"}>修改</Button>
                    {atitle != null &&
                        <>
                            <Button onClick={() => showdelModal(record)} type={"primary"} danger>删除</Button>
                        </>}
                    <Button onClick={() => showinstModal(record)}>添加成绩</Button>
                </Space>
            ),
        }
    ]

    const [list,setlist] = useState([]);
    const [classList, setClassList] = useState([]);
    const [courseList,setCourseList] = useState([]);
    useEffect(() => {
        async function getList() {
            const res = await fetchstudentInfo()
            setlist(res.data.data)
            const resq = await fetchclassInfo()
            const uniqueClassnames = [...new Set(resq.data.data.map(item => item.classname))];
            const formattedClassList = uniqueClassnames.map(classname => ({
                value: classname,
                label: classname
            }));
            setClassList(formattedClassList);
            const resqu = await fetchcourseInfo()
            const uniqueCnames = [...new Set(resqu.data.data.map(item => item.cname))];
            const formattedCourseList = uniqueCnames.map(cname => ({
                value: cname,
                label: cname
            }));
            setCourseList(formattedCourseList);
        }
        getList().then()
    }, []);
    const {atitle} = useSelector(state => state.user.userInfo)
    const [openinstu,setOpeninstu] = useState(false);
    const showinstuModal = () =>{
        form.resetFields();
        setOpeninstu(true);
    }
    const instuend = () => {
        setOpeninstu(false);
    }
    const instucheck = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(fetchInsertStudent(values));
        }catch (e){
            message.error("不能为空")
        }
        setOpeninstu(false);
    }
    return (
        <Card
            title={
            <Breadcrumb items={[
                { title: <Link to={'/'}>首页</Link> },
                { title: '学生管理'}
            ]}/>
            }
            extra={
            <>
                { atitle != null &&
                    <>
                        <Button
                            onClick={showinstuModal}
                        >添加学生
                        </Button>
                        <Modal
                            title={"添加学生"}
                            open={openinstu}
                            onOk={instucheck}
                            onCancel={instuend}
                            footer={[
                                <Button key="back" onClick={ instuend }>
                                    取消
                                </Button>,
                                <Button key="submit" type="primary"  onClick={ instucheck }>
                                    提交
                                </Button>,
                            ]}
                        >
                            <Form form={form} validateTrigger='onBlur'>
                                <Form.Item
                                    label="学号"
                                    name="sid"
                                >
                                    <Input size={"large"} placeholder={"请输入学号"}></Input>
                                </Form.Item>
                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    rules={[{ message: '请输入姓名' },{pattern:/^[a-zA-Z\u4e00-\u9fa5]{1,20}$/, message:'请输入正确的姓名'}]}>
                                    <Input size={"large"} placeholder={"请输入姓名"} />
                                </Form.Item>
                                <Form.Item
                                    label="班级"
                                    name="classname">
                                    <Select
                                        showSearch
                                        size={"large"}
                                        options={classList}
                                        placeholder={"请选择班级"}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="性别"
                                    name="sgender">
                                    <Select
                                        size={"large"}
                                        options={[
                                            {
                                                value: '男',
                                                label: '男',
                                            },
                                            {
                                                value: '女',
                                                label: '女',
                                            },
                                        ]}
                                        placeholder={"请选择性别"}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>}
            </>
            }
        >
            <Table
                columns={columns} dataSource={list}
                bordered
            >
            </Table>
            <Modal
                title={"修改学生信息"}
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
                        label="学号"
                        name="sid"
                    >
                        <Input className="custom-disabled-input"  size={"large"} variant="borderless" disabled={true}></Input>
                    </Form.Item>
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{ message: '请输入姓名' },{pattern:/^[a-zA-Z\u4e00-\u9fa5]{1,20}$/, message:'请输入正确的姓名'}]}>
                        <Input size={"large"} placeholder={"请输入修改后的姓名"} />
                    </Form.Item>
                    <Form.Item
                        label="班级"
                        name="classname">
                        <Select
                            showSearch
                            size={"large"}
                            options={classList}
                        />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sgender">
                        <Select
                            size={"large"}
                            options={[
                                {
                                    value: '男',
                                    label: '男',
                                },
                                {
                                    value: '女',
                                    label: '女',
                                },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                open={opendel}
                onOk={delcheck}
                onCancel={delend}
                footer={[
                    <Button key="back" type="primary" onClick={ delend }>
                        取消
                    </Button>,
                    <Button key="submit" type="primary"  onClick={ delcheck } danger>
                        确定
                    </Button>,
                ]}
            >
                <Form form={form}>
                    <Form.Item
                        name="sid"
                    >
                    </Form.Item>
                </Form>
                <p className="text-center fs-4">确定要删除这条数据吗？</p>
                <p className="stup text-center fs-4">若删除，这条数据的成绩信息也会一并删除</p>
            </Modal>
            <Modal
                title={"添加成绩"}
                open={openinst}
                onOk={instcheck}
                onCancel={instend}
                footer={[
                    <Button key="back" onClick={ instend }>
                        取消
                    </Button>,
                    <Button key="submit" type="primary"  onClick={ instcheck }>
                        提交
                    </Button>,
                ]}
            >
                <Form form={form} validateTrigger='onBlur'>
                    <Form.Item
                        label="学号"
                        name="sid"
                    >
                        <Input className="custom-disabled-input"  size={"large"} variant="borderless" disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        label="科目"
                        name="cname"
                    >
                        <Select
                            showSearch
                            size={"large"}
                            options={courseList}
                            placeholder={"请选择科目"}
                        />
                    </Form.Item>
                    <Form.Item
                        label="分数"
                        name="score"
                        rules={[{ message: '请输入分数' },{pattern:/^(0|[1-9]\d?|1[0-4]\d)(\.\d{1,2})?$|^150$/, message:'请输入正确的分数'}]}>
                        <Input size={"large"} placeholder={"请输入分数"} />
                    </Form.Item>
                    <Form.Item
                        label="考试名称"
                        name="type"
                        rules={[{ message: '请输入考试名称' },{pattern:/^.{0,30}$/, message:'请输入正确的考试名称'}]}
                    >
                        <Input size={"large"} placeholder={"请输入考试名称"}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}

export default Student