import {Breadcrumb, Button, Card, Form, Input, Modal, Space, Table} from "antd";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {getClassName} from "../../utils/token";
import {SearchOutlined} from "@ant-design/icons";
import {fetchstudentByclassname} from "../../store/modules/student";

const StudentByclass = () => {
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
    const [list,setlist] = useState([]);
    const navigate = useNavigate()
    const ClassName = getClassName()
    useEffect(() => {
        async function getList() {
            if (ClassName === null){
                navigate('/class')
            }
            const res = await fetchstudentByclassname({classname:ClassName})
            setlist(res.data.data)
        }
        getList().then()
    }, []);
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
    ]

    return(
        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: <Link to={"/class"}>班级管理</Link>},
                    { title: ClassName}
                ]}/>
            }
        >
            <Table
                columns={columns}
                dataSource={list}
                bordered
            >
            </Table>


        </Card>
    )

}
export default StudentByclass