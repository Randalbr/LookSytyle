import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/SidebarAdmin";
import { GiHamburgerMenu } from "react-icons/gi";
import '../styles/AdminLayout.css'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <div className="admin-content">
        <button className="menu-btn" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </button>

        <Outlet />
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
}