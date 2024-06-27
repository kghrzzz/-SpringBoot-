import {Breadcrumb, Button, Card, Form, Input, Modal, Select, Space, Table} from "antd";
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchDelTeacher, fetchInsertTeacher, fetchteacherInfo, fetchUpdateTeacher} from "../../store/modules/teacher";
import {SearchOutlined} from "@ant-design/icons";

const Teacher = () => {
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
    const searchName = (data) => {
        if (data === 'tid'){
            return '工号'
        }
        if (data === 'name'){
            return '姓名'
        }
        if (data === 'title'){
            return '职务'
        }
        if (data === 'gender'){
            return '性别'
        }
    };
    const [form] =Form.useForm();
    const dispatch = useDispatch()
    const [openinst,setOpeninst] = useState(false);
    const [openupd, setOpenupd] = useState(false);
    const [opendel,setOpendel] =useState(false);
    const instend = () =>{
        setOpeninst(false);
    }
    const showinstModal = (record) => {
        form.resetFields();
        setOpeninst(true);
    };
    const instcheck = async () => {
        const values = await form.validateFields();
        await dispatch(fetchInsertTeacher(values));
        setOpeninst(false);
    }
    const showModal = (record) => {
        form.resetFields();
        form.setFieldsValue({tid:record.tid,name:record.name,title:record.title,gender:record.gender});
        setOpenupd(true);
    };
    const end = () =>{
        setOpenupd(false);
    }
    const handleCancel = async () => {
        const values = await form.validateFields();
        await dispatch(fetchUpdateTeacher(values));
        setOpenupd(false);
    }
    const showdelModal = (record) =>{
        form.resetFields();
        form.setFieldsValue({tid:record.tid});
        setOpendel(true);
    }
    const delend = () => {
        setOpendel(false);
    }
    const delcheck = async () => {
        const values = await form.validateFields();
        await dispatch(fetchDelTeacher(values))
        setOpendel(false);
    }
    const columns = [
        {
            title: '工号',
            dataIndex: 'tid',
            key:'tid',
            ...getColumnSearchProps('tid')
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key:'name',
            ...getColumnSearchProps('name')
        },
        {
            title: '职务',
            dataIndex: 'title',
            key:'title',
            ...getColumnSearchProps('title')
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key:'gender',
            ...getColumnSearchProps('gender')
        },
        {
            title: '操作',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)} type={"primary"}>修改</Button>
                    <Button onClick={() => showdelModal(record)} type={"primary"} danger>删除</Button>
                </Space>
            ),
        }
    ]
    const [list,setlist] = useState([]);
    useEffect(() => {
        async function getList() {
            const res = await fetchteacherInfo()
            setlist(res.data.data)
        }
        getList().then()
    }, []);
    return (
        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '教师管理'}
                ]}/>
            }
            extra={
                <>
                    <Button
                        onClick={showinstModal}
                    >添加教师
                    </Button>
                    <Modal
                        title={"添加学生"}
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
                                label="工号"
                                name="tid"
                            >
                                <Input size={"large"} placeholder={"请输入工号"}/>
                            </Form.Item>
                            <Form.Item
                                label="姓名"
                                name="name"
                                rules={[{ message: '请输入姓名' },{pattern:/^[a-zA-Z\u4e00-\u9fa5]{1,20}$/, message:'请输入正确的姓名'}]}>
                                <Input size={"large"} placeholder={"请输入姓名"} />
                            </Form.Item>
                            <Form.Item
                                label="职务"
                                name="title">
                                <Input size={"large"} placeholder={"请输入职务"}/>
                            </Form.Item>
                            <Form.Item
                                label="性别"
                                name="gender">
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
                </>
            }
        >
            <Table
                columns={columns} dataSource={list}
                bordered
            ></Table>
            <Modal
                title={"修改成绩信息"}
                open={openupd}
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
                        label="工号"
                        name="tid"
                    >
                        <Input className="custom-disabled-input"  size={"large"} variant="borderless" disabled={true}></Input>
                    </Form.Item>
                    <Form.Item
                        label="姓名"
                        name="name"
                    >
                        <Input size={"large"} ></Input>
                    </Form.Item>
                    <Form.Item
                        label="职务"
                        name="title"
                        rules={[{ message: '请输入职务' },{pattern:/^[a-zA-Z\u4e00-\u9fa5]{1,20}$/, message:'请输入正确的职务'}]}>
                        <Input size={"large"} />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="gender"
                    >
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
                        name="tid"
                    >
                    </Form.Item>
                </Form>
                <p className="stup text-center fs-4">确定删除这条信息吗？</p>
            </Modal>
        </Card>
    )
}

export default Teacher