import {Breadcrumb, Button, Card, Input, Space, Table} from "antd";
import {Link} from "react-router-dom";
import './index.scss'
import {useEffect, useRef, useState} from "react";
import {fetchMyScoreInfo} from "../../store/modules/score";
import {SearchOutlined} from "@ant-design/icons";

const MyScore = () => {
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
    const columns = [
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
        },
        {
            title: '考试名称',
            dataIndex: 'type',
            key:'type',
            ...getColumnSearchProps('type')
        }
    ]

    //获取个人成绩列表
    const [list,setlist] = useState([])
    useEffect(() => {
        async function getList() {
           const res = await fetchMyScoreInfo()
            setlist(res.data.data)
        }
        getList().then()
    }, []);
    return (

        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '我的成绩'}
                ]}/>
            }
        >
            <Table
                columns={columns} dataSource={list}
                bordered
            >
            </Table>


        </Card>
    )
}

export default MyScore