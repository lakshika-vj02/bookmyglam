import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");   // ❌ agar admin nahi → login page
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-md-10 p-4">

          <h2>Admin Dashboard</h2>

          <div className="row">

            <div className="col-md-3">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h5>Total Users</h5>
                  <h3>120</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h5>Total Artists</h5>
                  <h3>25</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h5>Total Appointments</h5>
                  <h3>80</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h5>Total Revenue</h5>
                  <h3>₹12000</h3>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;