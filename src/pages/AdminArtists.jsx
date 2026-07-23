import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../component/common/PageHeader";
import SearchBar from "../component/common/SearchBar";

function AdminArtists() {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.log(err));
  }, []);

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

<SearchBar
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search Artist..."
/>

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
                  {artists.length > 0 ? (
                    artists.map((artist) => (
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
                        <td>{artist.experience ? `${artist.experience} years` : "N/A"}</td>
                        <td>
                          <button className="btn btn-sm btn-danger">Delete</button>
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
        </div>
      </div>
    </div>
  );
}

export default AdminArtists;
