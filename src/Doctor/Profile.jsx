
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import {Button, Col, Form, Input, Row, TimePicker} from "antd"
import { hideLoading, showLoading } from "../redux/alertsSlice"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import DoctorForm from "../components/DoctorForm"
import { useEffect, useState } from "react"
import moment from "moment"

const Profile = () => {
  const params = useParams()
  const [doctor, setDoctor] = useState(null)
  const dispatch = useDispatch()
  const {user} = useSelector(state =>state.user)
  const navigate = useNavigate()

  const onFinish = async(values) =>{
    try {
      dispatch(showLoading())
      const res = await axios.post('http://localhost:8000/api/doctor/update-doctor-profile', {...values, userId: user._id, timings:[moment(values.timings[0]).format("HH:mm"), moment(values.timings[1]).format("HH:mm")]}, {
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

  const getDoctorData = async() =>{
    try{
        dispatch(showLoading())
        const res = await axios.post('http://localhost:8000/api/doctor/get-info-by-user-id', {userId: params.userId}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        dispatch(hideLoading())
        if(res.data.success){
            setDoctor(res.data.data)
        }
    }catch(err){
        console.log(err)
        dispatch(hideLoading())
    }
}
useEffect(() =>{
        getDoctorData()
}, [])
  return (
    <Layout>
        <h1 className="page-title">Doctor Profile</h1>
        {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Layout>
  )
}

export default Profile