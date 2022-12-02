import React from 'react'
import Header from '../components/Header'
import Sidebar from './SideBar/Sidebar'
import "./AdminScreen.scss"
import { FaBars } from 'react-icons/fa';
import { useState } from "react";

const AdminScreen = () => {
  // return (
  //   <div className="admin-container">
  //     <div className="admin-sidebar">
  //       <Sidebar/>
  //     </div>
  //     <div className="admin-content">
  //         test
  //     </div>
  //   </div>
  // )
  
  const [collapsed, setCollapsed] = useState(false);
  
  return (
      <div className="admin-container">
        <Header />
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <FaBars onClick={() => setCollapsed(!collapsed)} />
                content goes here
            </div>
        </div>
    )
}

export default AdminScreen