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
    <div className="container-fluid">
      <div className="row">

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <PageHeader
            title="Manage Artists"
            subtitle="Manage all registered artists."
            buttonText="Back"
            buttonIcon={<i className="bi bi-arrow-left"></i>}
            onButtonClick={() => navigate("/admin")}
          />
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-success"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Artist
            </button>
          </div>

          <SearchBar
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Artist..."
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
          <CommonModal
            show={showModal}
            title={isEdit ? "Edit Artist" : "Add Artist"}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          >
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Artist Name"
              value={artistData.name}
              onChange={(e) =>
                setArtistData({ ...artistData, name: e.target.value })
              }
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={artistData.email}
              onChange={(e) =>
                setArtistData({ ...artistData, email: e.target.value })
              }
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone"
              value={artistData.phone}
              onChange={(e) =>
                setArtistData({ ...artistData, phone: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Specialty (e.g. Bridal Makeup)"
              value={artistData.specialty}
              onChange={(e) =>
                setArtistData({ ...artistData, specialty: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Experience (Years)"
              min="0"
              value={artistData.experience}
              onChange={(e) =>
                setArtistData({ ...artistData, experience: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Location (e.g. Udaipur)"
              value={artistData.location}
              onChange={(e) =>
                setArtistData({ ...artistData, location: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Price"
              value={artistData.base_price}
              onChange={(e) =>
                setArtistData({ ...artistData, base_price: e.target.value })
              }
            />
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={(e) =>
                setArtistData({
                  ...artistData,
                  profile_image: e.target.files[0],
                })
              }
            />
            <select
              className="form-select mb-3"
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
          </CommonModal>
          <div className="card shadow">
            <div className="card-body">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Specialty / Services</th>
                    <th>Experience</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentArtists.length > 0 ? (
                    currentArtists.map((artist) => (
                      <tr key={artist.id}>
                        <td>
                          <img
                            src={artist.profile_image || "https://via.placeholder.com/50"}
                            alt={artist.name}
                            style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                          />
                        </td>
                        <td className="fw-bold">{artist.name}</td>
                        <td>{artist.specialty || (artist.services ? artist.services.join(", ") : "N/A")}</td>
                        <td>{artist.experience_years ? `${artist.experience_years} years` : "N/A"}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(artist)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(artist.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No artists found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminArtists;
