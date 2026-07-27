import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  // 🔥 States
  const [users, setUsers] = useState(0);
  const [artists, setArtists] = useState(0);
  const [appointments, setAppointments] = useState({});
  const [revenue, setRevenue] = useState(0);
  const [services, setServices] = useState(0);
  const navigate = useNavigate();

  // 🔥 API CALLS
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users/count")
      .then(res => res.json())
      .then(data => setUsers(data.count))
      .catch(err => console.error("Error fetching users:", err));

    fetch("http://localhost:5000/api/admin/artists/count")
      .then(res => res.json())
      .then(data => setArtists(data.count))
      .catch(err => console.error("Error fetching artists:", err));

    fetch("http://localhost:5000/api/admin/services/count")
      .then(res => res.json())
      .then(data => setServices(data.count))
      .catch(err => console.error("Error fetching services:", err));

    fetch("http://localhost:5000/api/admin/appointments/status")
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Error fetching appointments:", err));

    fetch("http://localhost:5000/api/admin/payments/total")
      .then(res => res.json())
      .then(data => setRevenue(data.total))
      .catch(err => console.error("Error fetching revenue:", err));
  }, []);

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* 🔥 TOP CARDS */}
      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="card text-center shadow h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/users")}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <h6>Total Users</h6>
              <h3 className="mb-0">{users}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="card text-center shadow h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/artists")}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <h6>Total Artists</h6>
              <h3 className="mb-0">{artists}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="card text-center shadow h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/services")}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <h6>Total Services</h6>
              <h3 className="mb-0">{services}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-center shadow h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h6>Total Revenue</h6>
              <h3 className="mb-0">₹{revenue}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* 🔥 APPOINTMENT STATUS */}
      <h4 className="mt-4 mb-3">Appointments Status (KPI Cards)</h4>

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">
          <div 
            className="card text-center bg-warning text-dark shadow h-100 border-0" 
            style={{ cursor: "pointer", borderRadius: "12px" }}
            onClick={() => navigate("/admin/bookings")}
          >
            <div className="card-body d-flex flex-column justify-content-center py-4">
              <h6 className="fw-bold mb-2"><i className="bi bi-clock-history me-2"></i>Pending</h6>
              <h2 className="mb-0 fw-bold">{(appointments.pending || 0) + (appointments.Pending || 0)}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div 
            className="card text-center bg-success text-white shadow h-100 border-0" 
            style={{ cursor: "pointer", borderRadius: "12px" }}
            onClick={() => navigate("/admin/bookings")}
          >
            <div className="card-body d-flex flex-column justify-content-center py-4">
              <h6 className="fw-bold mb-2"><i className="bi bi-check-circle-fill me-2"></i>Accepted / Confirmed</h6>
              <h2 className="mb-0 fw-bold">
                {(appointments.accepted || 0) + (appointments.confirmed || 0) + (appointments.Accepted || 0) + (appointments.Confirmed || 0)}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div 
            className="card text-center bg-danger text-white shadow h-100 border-0" 
            style={{ cursor: "pointer", borderRadius: "12px" }}
            onClick={() => navigate("/admin/bookings")}
          >
            <div className="card-body d-flex flex-column justify-content-center py-4">
              <h6 className="fw-bold mb-2"><i className="bi bi-x-circle-fill me-2"></i>Rejected / Cancelled</h6>
              <h2 className="mb-0 fw-bold">
                {(appointments.rejected || 0) + (appointments.cancelled || 0) + (appointments.Rejected || 0) + (appointments.Cancelled || 0)}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div 
            className="card text-center bg-primary text-white shadow h-100 border-0" 
            style={{ cursor: "pointer", borderRadius: "12px" }}
            onClick={() => navigate("/admin/bookings")}
          >
            <div className="card-body d-flex flex-column justify-content-center py-4">
              <h6 className="fw-bold mb-2"><i className="bi bi-check-all me-2"></i>Completed</h6>
              <h2 className="mb-0 fw-bold">{(appointments.completed || 0) + (appointments.Completed || 0)}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

}

export default AdminDashboard;