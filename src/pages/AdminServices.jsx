import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../component/common/PageHeader";
import SearchBar from "../component/common/SearchBar";
import CommonModal from "../component/common/CommonModal";
import Pagination from "../component/common/Pagination";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal & Form states
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setEditId(null);
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      duration: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleEditClick = (service) => {
    setIsEdit(true);
    setEditId(service.id);
    setFormData({
      name: service.name || "",
      category: service.category || "",
      description: service.description || "",
      price: service.price || "",
      duration: service.duration || "",
      image: service.image || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.name) {
      alert("Please enter a service name!");
      return;
    }

    try {
      const url = isEdit
        ? `http://localhost:5000/services/${editId}`
        : "http://localhost:5000/services";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        name: formData.name,
        category: formData.category || "General Beauty",
        description: formData.description || "Professional beauty service.",
        price: Number(formData.price) || 499,
        duration: formData.duration || "45 Mins",
        image: formData.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        active: 1,
      };

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success || res.ok) {
        alert(isEdit ? "Service Updated Successfully!" : "Service Added Successfully!");
        setShowModal(false);
        fetchServices();
      } else {
        alert("Error saving service: " + (data.message || "Unknown error occurred"));
      }
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to communicate with backend server.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/services/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success || res.ok) {
        setServices(services.filter((service) => service.id !== id));
        alert("Service Deleted Successfully!");
      } else {
        alert("Error deleting service: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Could not delete service.");
    }
  };

  // ── FILTERING & PAGINATION ──────────────────────────────────────────────
  const filteredServices = services.filter((service) => {
    const serviceName = (service.name || "").toLowerCase();
    const serviceCat = (service.category || "").toLowerCase();
    const query = search.toLowerCase();
    return serviceName.includes(query) || serviceCat.includes(query);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  return (
    <div className="container-fluid py-3">
      <PageHeader
        title="Service Management"
        subtitle="Create, edit, analyze and delete beauty & spa services."
        buttonText="Back to Dashboard"
        buttonIcon={<i className="bi bi-arrow-left"></i>}
        onButtonClick={() => navigate("/admin")}
      />

      {/* ── TOP ACTION & FILTER BAR ──────────────────────────────────────── */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "12px", backgroundColor: "#fff" }}>
        <div className="card-body p-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-6">
              <SearchBar
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Service Name or Category (e.g. Hair, Makeup)..."
              />
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-center">
                <label className="me-2 mb-0 small text-secondary fw-semibold">Rows per page:</label>
                <select
                  className="form-select form-select-sm border-secondary-subtle shadow-none"
                  style={{ width: "70px", borderRadius: "6px" }}
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

              <button
                className="btn btn-success px-4 py-2 shadow-sm d-flex align-items-center"
                style={{ borderRadius: "8px", fontWeight: "600", fontSize: "0.95rem" }}
                onClick={handleAddClick}
              >
                <i className="bi bi-plus-circle me-2 fs-5"></i>
                Add Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES TABLE ────────────────────────────────────────────────── */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ minWidth: "800px" }}>
            <thead className="table-dark">
              <tr>
                <th className="py-3 px-4" style={{ width: "280px" }}>Service Details</th>
                <th className="py-3" style={{ width: "160px" }}>Category</th>
                <th className="py-3" style={{ width: "320px" }}>Description & Duration</th>
                <th className="py-3 text-center" style={{ width: "130px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.length > 0 ? (
                currentServices.map((service) => {
                  const imageUrl = service.image
                    ? service.image.startsWith("http") || service.image.startsWith("data:")
                      ? service.image
                      : `http://localhost:5000/images/${service.image}`
                    : "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80";

                  return (
                    <tr key={service.id} style={{ transition: "all 0.2s" }}>
                      {/* Image and Name */}
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={imageUrl}
                            alt={service.name}
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80";
                            }}
                            style={{
                              width: "70px",
                              height: "50px",
                              borderRadius: "8px",
                              objectFit: "cover",
                              border: "1px solid #dee2e6",
                            }}
                            className="shadow-sm"
                          />
                          <div className="ms-3">
                            <h6 className="mb-1 fw-bold text-dark text-capitalize" style={{ fontSize: "1rem" }}>
                              {service.name}
                            </h6>
                            <span className="text-success fw-bold small">
                              ₹{service.price ? service.price : "Standard Rates"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span
                          className="badge text-capitalize d-inline-flex align-items-center"
                          style={{
                            backgroundColor: "#f0fdf4",
                            color: "#15803d",
                            border: "1px solid #bcf0da",
                            borderRadius: "20px",
                            padding: "6px 14px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                          }}
                        >
                          <i className="bi bi-tag-fill me-1 text-success"></i>
                          {service.category || "General Beauty"}
                        </span>
                      </td>

                      {/* Description & Duration */}
                      <td>
                        <p className="mb-1 text-muted small" style={{ display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {service.description || "No description provided."}
                        </p>
                        {service.duration && (
                          <span className="badge bg-light text-secondary border" style={{ fontSize: "0.75rem", borderRadius: "6px" }}>
                            <i className="bi bi-clock me-1 text-primary"></i>
                            {service.duration}
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-warning btn-sm d-flex align-items-center justify-content-center shadow-sm"
                            style={{ width: "36px", height: "36px", borderRadius: "8px", border: "none", backgroundColor: "#ffc107" }}
                            onClick={() => handleEditClick(service)}
                            title="Edit Service"
                          >
                            <i className="bi bi-pencil-square fs-6 text-dark"></i>
                          </button>

                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center justify-content-center shadow-sm"
                            style={{ width: "36px", height: "36px", borderRadius: "8px", border: "none", backgroundColor: "#dc3545" }}
                            onClick={() => handleDelete(service.id)}
                            title="Delete Service"
                          >
                            <i className="bi bi-trash fs-6 text-white"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <i className="bi bi-folder-x display-4 text-muted d-block mb-2"></i>
                    <p className="fs-6 text-muted mb-0">No beauty services found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── PAGINATION ────────────────────────────────────────────────────── */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* ── ADD / EDIT SERVICE MODAL ─────────────────────────────────────── */}
      <CommonModal
        show={showModal}
        title={isEdit ? "✏️ Edit Service Details" : "✨ Add New Beauty Service"}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      >
        <div className="row g-3 p-1">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Service Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Deluxe Hydra Facial"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Category *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Facial, Bridal Makeup, Hair Care"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Starting Price (₹)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 1500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Est. Duration</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 45 Mins or 1 Hour"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold text-secondary">Image URL or Filename</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. facial.jpg or https://image-link..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <div className="form-text small">Leave blank to use an automatic professional spa/beauty placeholder image.</div>
          </div>

          <div className="col-12">
            <label className="form-label small fw-bold text-secondary">Service Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Provide details about the procedure, benefits, or products used..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
        </div>
      </CommonModal>
    </div>
  );
}

export default AdminServices;