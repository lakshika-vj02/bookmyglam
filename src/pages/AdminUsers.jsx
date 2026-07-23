import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `http://localhost:5000/api/admin/users/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {

      alert(data.message);

      // Table se deleted user hata do
      setUsers(users.filter((user) => user.id !== id));

    } else {
      alert("Failed to delete user");
    }

  } catch (error) {
    console.error(error);
  }

};
  return (
    <div className="row g-0">
         {/* Sidebar */}
    <div className="col-md-2">
      <Sidebar />
    </div>

    {/* Main Content */}
    <div
  className="col-md-10"
  style={{ marginLeft: "260px", width: "calc(100% - 260px)" }}
>
    <div className="container mt-4">
      <h2>All Users</h2>
      
      <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search by Name or Email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {users
    .filter((user) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    })
    .map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_no}</td>
              <td>{user.role}</td>
              <td>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDelete(user.id)}
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>     
</div>
  );
}

export default AdminUsers;