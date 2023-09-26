import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const ProtectedRoutes = (props) => {
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getUser = async() =>{
        try{
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8000/api/user/get-user-info-by-id', {token: localStorage.getItem('token')}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            dispatch(hideLoading())
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }else{
                localStorage.clear()
                navigate("/login")
            }
        }catch(err){
            console.log(err)
            localStorage.clear()
            dispatch(hideLoading())
            navigate("/login")
        }
    }
    useEffect(() =>{
        if(!user){
            getUser()
        }
    }, [user])

    if(localStorage.getItem('token')){
        return props.children;
    }else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes