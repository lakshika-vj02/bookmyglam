
import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";

function AdminDashboard() {

  // 🔥 States
  const [users, setUsers] = useState(0);
  const [artists, setArtists] = useState(0);
  const [appointments, setAppointments] = useState({});
  const [revenue, setRevenue] = useState(0);
  const [services, setServices] = useState(0);

  // 🔥 API CALLS
  useEffect(() => {

    fetch("http://localhost:5000/api/users/count")
      .then(res => res.json())
      .then(data => setUsers(data.count));

    fetch("http://localhost:5000/api/artists/count")
      .then(res => res.json())
      .then(data => setArtists(data.count));

    fetch("http://localhost:5000/api/services/count")
      .then(res => res.json())
      .then(data => setServices(data.count));

    fetch("http://localhost:5000/api/appointments/status")
      .then(res => res.json())
      .then(data => setAppointments(data));

    fetch("http://localhost:5000/api/payments/total")
      .then(res => res.json())
      .then(data => setRevenue(data.total));

  }, []);

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">

          <h2 className="mb-4">Admin Dashboard</h2>

          {/* 🔥 TOP CARDS */}
          <div className="row">

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h6>Total Users</h6>
                  <h3>{users}</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h6>Total Artists</h6>
                  <h3>{artists}</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h6>Total Services</h6>
                  <h3>{services}</h3>–
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card text-center shadow">
                <div className="card-body">
                  <h6>Total Revenue</h6>
                  <h3>₹{revenue}</h3>
                </div>
              </div>
            </div>

          </div>

          {/* 🔥 APPOINTMENT STATUS */}
          <h4 className="mt-4">Appointments Status</h4>

          <div className="row mt-3">

            <div className="col-md-3">
              <div className="card text-center bg-warning text-white">
                <div className="card-body">
                  <h6>Pending</h6>
                  <h3>{appointments.pending || 0}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center bg-success text-white">
                <div className="card-body">
                  <h6>Accepted</h6>
                  <h3>{appointments.accepted || 0}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center bg-danger text-white">
                <div className="card-body">
                  <h6>Rejected</h6>
                  <h3>{appointments.rejected || 0}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center bg-primary text-white">
                <div className="card-body">
                  <h6>Completed</h6>
                  <h3>{appointments.completed || 0}</h3>
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
