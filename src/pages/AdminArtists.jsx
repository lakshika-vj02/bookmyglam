import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../component/common/PageHeader";
import SearchBar from "../component/common/SearchBar";
import CommonModal from "../component/common/CommonModal";
import Pagination from "../component/common/Pagination";

function AdminArtists() {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [artistData, setArtistData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    location: "",
    base_price: "",
    gender: "",
    profile_image: null,
  });
  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", artistData.name);
      formData.append("email", artistData.email);
      formData.append("phone", artistData.phone);
      formData.append("specialty", artistData.specialty);
      formData.append("experience_years", artistData.experience);
      formData.append("location", artistData.location);
      formData.append("base_price", artistData.base_price);
      formData.append("gender", artistData.gender);

      if (artistData.profile_image) {
        formData.append("profile_image", artistData.profile_image);
      }

      const url = isEdit
        ? `http://localhost:5000/artists/${editId}`
        : "http://localhost:5000/artists";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert(isEdit ? "Artist Updated Successfully" : "Artist Added Successfully");

        const res = await fetch("http://localhost:5000/artists");
        const artists = await res.json();
        setArtists(artists);

        setShowModal(false);
        setIsEdit(false);
        setEditId(null);

        setArtistData({
          name: "",
          email: "",
          phone: "",
          specialty: "",
          experience: "",
          location: "",
          base_price: "",
          gender: "",
          profile_image: null,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (artist) => {
    setIsEdit(true);
    setEditId(artist.id);

    setArtistData({
      name: artist.name,
      email: artist.email,
      phone: artist.phone,
      specialty: artist.specialty,
      experience: artist.experience_years,
      location: artist.location,
      base_price: artist.base_price,
      gender: artist.gender,
      profile_image: null,
    });

    setShowModal(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this artist?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/artists/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Artist Deleted Successfully");
        setArtists(artists.filter((artist) => artist.id !== id));
      } else {
        alert(data.message || "Failed to delete artist");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredArtists = artists.filter(
    (artist) =>
      (artist.name && artist.name.toLowerCase().includes(search.toLowerCase())) ||
      (artist.specialty && artist.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArtists = filteredArtists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);

  return (
    <div className="container-fluid py-3">
      <PageHeader
        title="Manage Artists"
        subtitle="Manage all registered beauty professionals and stylists."
        buttonText="Back to Dashboard"
        buttonIcon={<i className="bi bi-arrow-left"></i>}
        onButtonClick={() => navigate("/admin")}
      />

      {/* Top Action & Filter Bar */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "12px", backgroundColor: "#fff" }}>
        <div className="card-body p-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-6">
              <div className="w-100">
                <SearchBar
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search artist by Name or Specialty..."
                />
              </div>
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
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-circle me-2 fs-5"></i>
                Add Artist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artists Table Card */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ minWidth: "750px" }}>
            <thead className="table-dark">
              <tr>
                <th className="py-3 px-4" style={{ width: "250px" }}>Artist Profile</th>
                <th className="py-3" style={{ width: "220px" }}>Specialty & Services</th>
                <th className="py-3" style={{ width: "160px" }}>Experience</th>
                <th className="py-3" style={{ width: "160px" }}>Location & Price</th>
                <th className="py-3 text-center" style={{ width: "130px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentArtists.length > 0 ? (
                currentArtists.map((artist) => {
                  const imageUrl = artist.profile_image
                    ? artist.profile_image.startsWith("http") || artist.profile_image.startsWith("data:")
                      ? artist.profile_image
                      : `http://localhost:5000/images/${artist.profile_image}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

                  return (
                    <tr key={artist.id} style={{ transition: "all 0.2s" }}>
                      {/* Avatar & Name */}
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={imageUrl}
                            alt={artist.name}
                            onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; }}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid #f472b6",
                              padding: "2px",
                            }}
                            className="shadow-sm"
                          />
                          <div className="ms-3">
                            <h6 className="mb-1 fw-bold text-dark text-capitalize" style={{ fontSize: "0.95rem" }}>
                              {artist.name}
                            </h6>
                            {artist.gender && (
                              <span className="badge bg-light text-secondary border px-2 py-0" style={{ fontSize: "0.7rem", borderRadius: "4px" }}>
                                {artist.gender}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Specialty / Services */}
                      <td>
                        <span
                          className="badge text-capitalize d-inline-flex align-items-center"
                          style={{
                            backgroundColor: "#fff0f6",
                            color: "#d63384",
                            border: "1px solid #f8b4d9",
                            borderRadius: "20px",
                            padding: "6px 14px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                          }}
                        >
                          <i className="bi bi-stars me-1 text-warning"></i>
                          {artist.specialty || (artist.services ? artist.services.join(", ") : "Makeup Stylist")}
                        </span>
                      </td>

                      {/* Experience */}
                      <td>
                        <span
                          className="badge bg-light text-dark border px-3 py-2 d-inline-flex align-items-center"
                          style={{ borderRadius: "10px", fontSize: "0.85rem", fontWeight: "500" }}
                        >
                          <i className="bi bi-briefcase me-2 text-primary"></i>
                          {artist.experience_years ? `${artist.experience_years} Years` : "Fresher / N/A"}
                        </span>
                      </td>

                      {/* Location & Price */}
                      <td>
                        <div className="d-flex flex-column">
                          <span className="fw-semibold small text-dark d-flex align-items-center mb-1">
                            <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                            {artist.location || "Udaipur"}
                          </span>
                          <span className="badge bg-success-subtle text-success border border-success-subtle d-inline-block text-start" style={{ width: "fit-content", fontSize: "0.8rem" }}>
                            ₹ {artist.base_price || "Standard"}
                          </span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-warning btn-sm d-flex align-items-center justify-content-center shadow-sm"
                            style={{ width: "36px", height: "36px", borderRadius: "8px", border: "none", backgroundColor: "#ffc107" }}
                            onClick={() => handleEdit(artist)}
                            title="Edit Artist"
                          >
                            <i className="bi bi-pencil-square fs-6 text-dark"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center justify-content-center shadow-sm"
                            style={{ width: "36px", height: "36px", borderRadius: "8px", border: "none", backgroundColor: "#dc3545" }}
                            onClick={() => handleDelete(artist.id)}
                            title="Delete Artist"
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
                  <td colSpan="5" className="text-center py-5">
                    <i className="bi bi-person-x display-4 text-muted d-block mb-2"></i>
                    <p className="fs-6 text-muted mb-0">No artists found matching your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Component */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* 2-Column Professional Modal Form */}
      <CommonModal
        show={showModal}
        title={isEdit ? "✏️ Edit Artist Profile" : "🎨 Add New Artist"}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      >
        <div className="row g-3 p-1">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Artist Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Ritika Gupta"
              value={artistData.name}
              onChange={(e) =>
                setArtistData({ ...artistData, name: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="artist@gmail.com"
              value={artistData.email}
              onChange={(e) =>
                setArtistData({ ...artistData, email: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="9876543210"
              value={artistData.phone}
              onChange={(e) =>
                setArtistData({ ...artistData, phone: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Specialty / Category *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Bridal Makeup, Hair"
              value={artistData.specialty}
              onChange={(e) =>
                setArtistData({ ...artistData, specialty: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold text-secondary">Experience (Years)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 5"
              min="0"
              value={artistData.experience}
              onChange={(e) =>
                setArtistData({ ...artistData, experience: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold text-secondary">Location / City</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Udaipur"
              value={artistData.location}
              onChange={(e) =>
                setArtistData({ ...artistData, location: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold text-secondary">Starting Price (₹)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 2500"
              value={artistData.base_price}
              onChange={(e) =>
                setArtistData({ ...artistData, base_price: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Gender</label>
            <select
              className="form-select"
              value={artistData.gender}
              onChange={(e) =>
                setArtistData({ ...artistData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold text-secondary">Profile Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) =>
                setArtistData({
                  ...artistData,
                  profile_image: e.target.files[0],
                })
              }
            />
          </div>
        </div>
      </CommonModal>
    </div>
  );
}

export default AdminArtists;
