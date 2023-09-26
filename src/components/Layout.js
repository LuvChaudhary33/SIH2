import React, { useState } from 'react'
import "../layout.css"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import { Badge } from 'antd'

const Layout = ({children}) => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const {user} = useSelector((state) =>state.user);
    const location = useLocation()
    const userMenu = [
        {
            name: "Home",
            link: "/",
            icon: 'ri-home-line'
        },{
            name: "Appointments",
            path: "/appointments",
            icon: 'ri-file-list-line'
        },{
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: 'ri-hospital-line'
        },{
            name: "Profile",
            path: "/profile",
            icon: 'ri-user-line'
        }
    ];
    const doctorMenu = [
        {
            name: "Home",
            link: "/",
            icon: 'ri-home-line'
        },{
            name: "Appointments",
            path: "/appointments",
            icon: 'ri-file-list-line'
        },{
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: 'ri-user-line'
        }
    ];
    const adminMenu = [
        {
            name: "Home",
            link: "/",
            icon: 'ri-home-line'
        },{
            name: "Users",
            path: "/admin/userslist",
            icon: 'ri-user-line'
        },{
            name: "Doctors",
            path: "/admin/doctors",
            icon: 'ri-user-star-line'
        },{
            name: "Profile",
            path: "/profile",
            icon: 'ri-user-line'
        }
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu: user?.isDoctor
    ? doctorMenu :userMenu
    const role = user?.isAdmin ? "Admin": user?.isDoctor
    ? "Doctor" : "User"

  return (
    <div className='main p-2'>
        <div className='d-flex menu-item'>
            <div className="sidebar">
                <div className='sidebar-header'>
                    <h1 className='logo'>SH</h1>
                    <h1 className="role">{role}</h1>
                </div>

                <div className='menu'>
                    {menuToBeRendered.map((menu) =>{
                        const isActive = location.pathname === menu.path
                        return <div className= {`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                            <i className={menu.icon}></i>
                            {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                        </div>
                    })}
                    <div className= "d-flex menu-item" onClick={() =>{
                        localStorage.clear()
                        navigate("/login")
                    }}>
                        <i className="ri-logout-circle-line"></i>
                        {!collapsed && <Link to='/login'>Logout</Link>}
                    </div>
                </div>
            </div>

            <div className='content'>
                <div className='header'>
                    {collapsed ? <i className='ri-menu-2-fill header-action-icon' onClick={() =>setCollapsed(false)}></i>:<i className='ri-close-fill header-action-icon' onClick={() =>setCollapsed(true)}></i>}
                    <div className='d-flex align-items-center px-4'>
                        <Badge count={user?.unseenNotifications.length} onClick={() => navigate("/notifications")}>
                            <i className='ri-notification-line header-action-icon px-3'></i>
                            {/* <i className="ri-notification-line"></i> */}
                        </Badge>
                        <Link className='anchor mx-3' to="/profile">{user?.name}</Link>
                    </div>
                </div>
                <div className='body'>{children}</div>
            </div>
        </div>
    </div>
  )
}

export default Layout