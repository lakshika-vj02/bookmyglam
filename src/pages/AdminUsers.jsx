import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../component/common/PageHeader";
import SearchBar from "../component/common/SearchBar";
import Pagination from "../component/common/Pagination";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`)
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
      `${process.env.REACT_APP_API_URL}/api/admin/users/${id}`,
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
const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentUsers = filteredUsers.slice(
  indexOfFirstItem,
  indexOfLastItem
);

const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  return (
    <div className="container-fluid">

        <PageHeader
          title="User Management"
          subtitle="Manage all registered users."
          buttonText="Back to Dashboard"
          buttonIcon={<i className="bi bi-arrow-left"></i>}
          onButtonClick={() => navigate("/admin")}
        />

        <SearchBar
  value={search}
  onChange={(e) =>{setSearch(e.target.value);
   setCurrentPage(1);
  }}
  placeholder="Search by Name or Email..."
/>
<div className="d-flex justify-content-end align-items-center mb-3">
  <label className="me-2 mb-0">Rows per page:</label>

  <select
    className="form-select w-auto"
    value={itemsPerPage}
    onChange={(e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={20}>20</option>
  </select>
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
            {currentUsers.map((user) => (
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
        <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  setCurrentPage={setCurrentPage}
/>
    </div>
  );
}

export default AdminUsers;