import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Sidebar.css";

function AdminLayout() {
  return (
    <>
      <Sidebar />

      <div className="admin-content">
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;