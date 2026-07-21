import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaPalette, 
  FaClipboardList, 
  FaCalendarCheck, 
  FaSignOutAlt 
} from 'react-icons/fa';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="bg-dark text-white vh-100 p-3 shadow d-flex flex-column" style={{ position: 'fixed', top: 0, left: 0, width: 'inherit', height: '100vh', overflowY: 'auto' }}>
      <h3 className="text-center mb-4 mt-3" style={{ color: '#f472b6', fontWeight: 'bold' }}>
        <span className="me-2">💄</span> 
        Admin
      </h3>
      <hr className="bg-secondary mb-4" />

      <ul className="nav nav-pills flex-column mb-auto mt-2 gap-2">
        <li className="nav-item">
          <Link to="/admin" className="nav-link text-white d-flex align-items-center" style={{ background: '#f472b6' }}>
            <FaTachometerAlt className="me-3" size={20} />
            <span className="fs-5">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link text-white d-flex align-items-center hover-overlay">
            <FaUsers className="me-3" size={20} />
            <span className="fs-5">Users</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/artists" className="nav-link text-white d-flex align-items-center hover-overlay">
            <FaPalette className="me-3" size={20} />
            <span className="fs-5">Artists</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/services" className="nav-link text-white d-flex align-items-center hover-overlay">
            <FaClipboardList className="me-3" size={20} />
            <span className="fs-5">Services</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/appointments" className="nav-link text-white d-flex align-items-center hover-overlay">
            <FaCalendarCheck className="me-3" size={20} />
            <span className="fs-5">Appointments</span>
          </Link>
        </li>
      </ul>

      <hr className="bg-secondary mt-4 mb-4" />
      <div>
        <button 
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center py-2" 
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
