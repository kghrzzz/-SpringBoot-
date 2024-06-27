import {Breadcrumb, Button, Card, Form, Input, message, Modal, Space, Table} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {fetchclassList, fetchDelClass, fetchInsertClass} from "../../store/modules/class";
import {setClassName} from "../../utils/token";

const Class = () => {
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
        if (data === 'classname'){
            return '班级'
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
    const {atitle} = useSelector(state => state.user.userInfo)
    const [form] =Form.useForm();
    const dispatch = useDispatch()
    const [openinclass, setOpeninclass] = useState(false);
    const [opendel,setOpendel] =useState(false);
    const navigate = useNavigate()
    const showinclassModal = () => {
        form.resetFields();
        setOpeninclass(true);
    };
    const inclassend = () =>{
        setOpeninclass(false);
    }
    const inclasscheck = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(fetchInsertClass(values));
        }catch (e) {
            message.error("不能为空")
        }
        setOpeninclass(false);
    }
    const showdelModal = (record) =>{
        form.resetFields();
        form.setFieldsValue({classname:record.classname});
        setOpendel(true);
    }
    const delend = () => {
        setOpendel(false);
    }
    const delcheck = async () => {
        const values = await form.validateFields();
        await dispatch(fetchDelClass(values));
        setOpendel(false);
    }
    const showClassStudent = async (record) => {
        await setClassName(record.classname);
        navigate('/class/studentByclass')
    }
    const columns = [
        {
            title: '班级',
            dataIndex: 'classname',
            key:'classname',
            ...getColumnSearchProps('classname'),
            sorter: (a, b) => a.classname - b.classname,
        },
        {
            title: '人数',
            dataIndex: 'sum',
            key:'sum',
            sorter: (a, b) => a.sum - b.sum,
        },
        {
            title: '操作',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showClassStudent(record)} >查看</Button>
                    { atitle != null && <>
                        <Button onClick={() => showdelModal(record)} type={"primary"} danger>删除</Button>
                    </>}
                </Space>
            ),
        }
    ]
    const [classList, setClassList] = useState([]);
    useEffect(() => {
        async function getList() {
            const res = await fetchclassList()
            setClassList(res.data.data)
        }
        getList().then()
    }, []);
    return(
    <Card
        title={
            <Breadcrumb items={[
                { title: <Link to={'/'}>首页</Link> },
                { title: '班级管理'}
            ]}/>
        }
        extra={
        <>
            { atitle != null &&
            <>
                <Button onClick={showinclassModal}>添加班级</Button>
                <Modal
                    title={"添加班级"}
                    open={openinclass}
                    onOk={inclasscheck}
                    onCancel={inclassend}
                    footer={[
                        <Button key="back" onClick={ inclassend }>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  onClick={ inclasscheck }>
                            提交
                        </Button>,
                    ]}
                >
                    <Form form={form} validateTrigger='onBlur'>
                        <Form.Item
                            label="班级"
                            name="classname"
                            rules={[{pattern:/^\d{1,10}$/, message:'请输入正确的班级名'}]}
                        >
                            <Input
                                size={"large"}
                                placeholder={"输入班级"}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
            }
        </>
        }
    >
        <Table
            columns={columns} dataSource={classList}
            bordered
        >
        </Table>
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
                    name="classname"
                >
                </Form.Item>
            </Form>
            <p className="text-center fs-4">确定要删除这条数据吗？</p>
            <p className="stup text-center fs-4">若删除，这条数据关联的学生的班级信息也会一并删除</p>
        </Modal>

    </Card>
    )
}
export default Class