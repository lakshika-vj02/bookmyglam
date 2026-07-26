import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../component/common/PageHeader";
import SearchBar from "../component/common/SearchBar";
import CommonModal from "../component/common/CommonModal";

function AdminArtists() {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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
    const response = await fetch("http://localhost:5000/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artistData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Artist Added Successfully");

      // Artist list refresh
      const res = await fetch("http://localhost:5000/artists");
      const artists = await res.json();
      setArtists(artists);

      setShowModal(false);

      // Form reset
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
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search Artist..."
/>
<CommonModal
  show={showModal}
  title="Add Artist"
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
  <button className="btn btn-warning btn-sm me-2">
    <i className="bi bi-pencil-square"></i>
  </button>

  <button className="btn btn-danger btn-sm">
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
        </div>
      </div>
    </div>
  );
}

export default AdminArtists;
