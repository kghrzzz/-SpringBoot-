import {Breadcrumb, Button, Card, Form, Input, Modal, Space, Table} from "antd";
import {Link} from "react-router-dom";
import './index.scss'
import {SearchOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {fetchDelScore, fetchScoreInfo, fetchUpdateScore} from "../../store/modules/score";
import {useDispatch} from "react-redux";

const Score = () => {
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
        if (data === 'type'){
            return '考试名称'
        }
        if (data === 'cname'){
            return '科目'
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
    const [openupd, setOpenupd] = useState(false);
    const [opendel,setOpendel] =useState(false);
    const [form] =Form.useForm();
    const dispatch = useDispatch()
    const showModal = (record) => {
        form.resetFields();
        form.setFieldsValue({sid:record.sid,cname:record.cname,score:record.score,type:record.type});
        setOpenupd(true);
    };
    const end = () =>{
        setOpenupd(false);
    }
    const handleCancel = async () => {
        const values = await form.validateFields();
        await dispatch(fetchUpdateScore(values));
        setOpenupd(false);
    }
    const showdelModal = (record) =>{
        form.resetFields();
        form.setFieldsValue({sid:record.sid,cname:record.cname,type:record.type});
        setOpendel(true);
    }
    const delend = () => {
        setOpendel(false);
    }
    const delcheck = async () => {
        const values = await form.validateFields();
        await dispatch(fetchDelScore(values))
        setOpendel(false);
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
            title: '科目',
            dataIndex: 'cname',
            key:'cname',
            ...getColumnSearchProps('cname')
        },
        {
            title: '分数',
            dataIndex: 'score',
            key:'score',
            sorter: (a, b) => a.score - b.score,
            render: (text, record) => {
                // 如果分数小于60，返回带有红色样式的文本
                if (Number(text) < 60) {
                    return <span style={{ color: 'red' }}>{text}</span>;
                }
                // 否则返回正常文本
                return text;
            },
        },
        {
            title: '考试名称',
            dataIndex: 'type',
            key:'type',
            ...getColumnSearchProps('type')
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

    const [list,setlist] = useState([])
    useEffect(() => {
        async function getList() {
            const res = await fetchScoreInfo()
            setlist(res.data.data)
        }
        getList().then()
    },[]);

    return (
        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '成绩管理'}
                ]}/>
            }

        >

        <Table
            showSorterTooltip={{
                target: 'sorter-icon',
            }}
            columns={columns} dataSource={list}
            bordered
        >
        </Table>
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
                        label="学号"
                        name="sid"
                    >
                        <Input className="custom-disabled-input"  size={"large"} variant="borderless" disabled={true}></Input>
                    </Form.Item>
                    <Form.Item
                        label="科目"
                        name="cname"
                    >
                        <Input className="custom-disabled-input"  size={"large"} variant="borderless" disabled={true}></Input>
                    </Form.Item>
                    <Form.Item
                        label="分数"
                        name="score"
                        rules={[{pattern:/^(0|[1-9]\d?|1[0-4]\d)(\.\d{1,2})?$|^150$/, message:'请输入正确的分数'}]}>
                        <Input size={"large"} placeholder={"请输入分数"} />
                    </Form.Item>
                    <Form.Item
                        label="考试名称"
                        name="type"
                    >
                        <Input className="custom-disabled-input"  size={"large"} variant="borderless" disabled={true}></Input>
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
                    <Form.Item
                        name="cname"
                        noStyle
                    ></Form.Item>
                    <Form.Item
                        name="type"
                        noStyle
                    ></Form.Item>
                </Form>
                <p className="stup text-center fs-4">确定删除这条成绩信息吗？</p>
            </Modal>

        </Card>
    )
}

export default Score