
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import {Button, Col, Form, Input, Row, TimePicker} from "antd"
import { hideLoading, showLoading } from "../redux/alertsSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import DoctorForm from "../components/DoctorForm"
import moment from "moment"


const ApplyDoctor = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state =>state.user)
    const navigate = useNavigate()

    const onFinish = async(values) =>{
        try {
          dispatch(showLoading())
          const res = await axios.post('http://localhost:8000/api/user/apply-doctor-account', {...values, userId: user._id, timings:[moment(values.timings[0]).format("HH:mm"), moment(values.timings[1]).format("HH:mm")]}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          dispatch(hideLoading())
          if(res.data.success){
            toast.success(res.data.message)
            navigate("/")
          }else{
            toast.error(res.data.message)
          }
        } catch (err) {
          dispatch(hideLoading())
          toast.error("Something went wrong!")
        }
      }

  return (
    <Layout>
        <h1 className='page-title'>ApplyDoctor</h1>
        <hr />
        <DoctorForm onFinish={onFinish} />
    </Layout>
  )
}

export default ApplyDoctor