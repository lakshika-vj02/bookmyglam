import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";


function AdminServices() {

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/services");
      setServices(res.data);
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  return (
    <div className="container-fluid p-4">

      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Service Management</h2>
          <p className="text-muted">
            Manage all beauty services here.
          </p>
        </div>

        <button className="btn btn-success">
          <FaPlus className="me-2" />
          Add Service
        </button>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Service Name</th>
                <th>Description</th>
                <th>Image</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {services
                .filter((service) =>
                  service.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((service) => (

                  <tr key={service.id}>

                    <td>{service.id}</td>

                    <td>{service.name}</td>

                    <td>{service.description}</td>

                    <td>
                      <img
                        src={service.image}
                        alt={service.name}
                        width="70"
                        height="50"
                        className="rounded"
                      />
                    </td>

                    <td className="text-center">

                      <button className="btn btn-warning btn-sm me-2">
                        <FaEdit />
                      </button>

                      <button className="btn btn-danger btn-sm">
                        <FaTrash />
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

export default AdminServices;