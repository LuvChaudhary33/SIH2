import { useEffect, useState } from "react"
import {useDispatch} from 'react-redux'
import {showLoading, hideLoading} from "../redux/alertsSlice"
import axios from "axios"
import Layout from "../components/Layout"
import { Table } from "antd"
const Userslist = () => {

    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const getUsersData = async() =>{
        try {
            dispatch(showLoading())
            const res = await axios.get("http://localhost:8000/api/admin/get-all-users", {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                setUsers(res.data.data)
            }
        } catch (err) {
            dispatch(hideLoading())
            console.log(err)
        }
    }

    useEffect(() =>{
        getUsersData()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },{
            title: 'Email',
            dataIndex: 'email',
        },{
            title: 'Created At',
            dataIndex: 'createdAt',
        },{
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) =>(
                <div className="d-flex">
                    <h1 className="anchor">Block</h1>
                </div>
            )
        }
    ]

  return (
    <Layout>
        <h1 className="page-header">Users List</h1>
        <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Userslist