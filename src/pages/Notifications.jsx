import { Tabs } from "antd"
import Layout from "../components/Layout"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/alertsSlice"
import toast from "react-hot-toast"
import axios from "axios"
import { setUser } from "../redux/userSlice"

const Notifications = () => {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const markAllAsSeen = async() =>{
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8000/api/user/mark-all-notifications-as-seen', {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
              toast.success(res.data.message)
              dispatch(setUser(res.data.data))
            }else{
              toast.error(res.data.message)
            }
          } catch (err) {
            dispatch(hideLoading())
            toast.error("Something went wrong!")
          }
    }

    const deleteAll = async() =>{
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8000/api/user/delete-all-notifications', {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
              toast.success(res.data.message)
              dispatch(setUser(res.data.data))
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
        <h1 className="page-title">Notifications</h1>
        <Tabs>
            <Tabs.TabPane tab="Unseen" key={0}>
                <div className="d-flex justify-content-end">
                    <h1 className="anchor" onClick={markAllAsSeen}>Mark all as seen</h1>
                </div>
                {user?.unseenNotifications.map((not) =>(
                    <div className="card p-2" onClick={() =>navigate("/notification")}>
                        <div className="card-text">{not.message}</div>
                    </div>
                ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="seen" key={1}>
                <div className="d-flex justify-content-end">
                    <h1 className="anchor" onClick={deleteAll}>Delete all</h1>
                    {user?.seenNotifications.map((not) =>(
                    <div className="card p-2" onClick={() =>navigate("/notification")}>
                        <div className="card-text">{not.message}</div>
                    </div>
                ))}
                </div>
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default Notifications