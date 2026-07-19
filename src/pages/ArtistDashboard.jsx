import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ArtistDashboard() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Editable fields
  const [bio, setBio] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/artists/by-user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.artist) {
          setArtist(data.artist);
          setBio(data.artist.bio || "");
          setSpecialty(data.artist.specialty || "");
          setBasePrice(data.artist.base_price || "");
          setPhone(data.artist.phone || "");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching artist details:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleUpdate = () => {
    if (!artist) return;
    
    fetch(`http://localhost:5000/artists/${artist.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, specialty, base_price: basePrice, phone })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage("Profile updated successfully! ✅");
          setTimeout(() => setMessage(""), 3000);
        } else {
          setMessage("Failed to update profile ❌");
        }
      })
      .catch(err => {
        console.error("Update error:", err);
        setMessage("Server error ❌");
      });
  };

  if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

  if (!artist) {
    return (
      <div className="container text-center py-5">
        <h4>Artist profile not found.</h4>
        <p className="text-muted">Please ask admin to link your account to an artist profile.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0" style={{ borderRadius: "16px" }}>
            
            <div className="card-header text-white" style={{ background: "linear-gradient(135deg, #f472b6, #ec4899)", borderRadius: "16px 16px 0 0" }}>
              <h3 className="mb-0 py-2 text-center">🎨 Artist Dashboard</h3>
            </div>
            
            <div className="card-body p-5">
              
              <div className="text-center mb-4">
                {artist.profile_image ? (
                  <img 
                    src={artist.profile_image} 
                    alt="Profile" 
                    className="rounded-circle shadow"
                    style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #fce7f3" }} 
                  />
                ) : (
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto shadow" style={{ width: "120px", height: "120px", fontSize: "3rem" }}>
                    👤
                  </div>
                )}
                <h4 className="fw-bold mt-3">{artist.name}</h4>
                <span className="badge bg-secondary mb-2">Experience: {artist.experience_years} years</span>
              </div>

              {message && <div className="alert alert-info text-center">{message}</div>}

              <div className="mb-3">
                <label className="fw-semibold mb-1">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                />
              </div>

              <div className="mb-3">
                <label className="fw-semibold mb-1">Specialty</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Bridal Makeup, Hair Styling"
                  value={specialty} 
                  onChange={e => setSpecialty(e.target.value)} 
                />
              </div>

              <div className="mb-3">
                <label className="fw-semibold mb-1">Your Base Price (₹)</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">₹</span>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Enter your starting price"
                    value={basePrice} 
                    onChange={e => setBasePrice(e.target.value)} 
                  />
                </div>
                <small className="text-muted">This helps customers know your starting rate before booking.</small>
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-1">Bio / Description</label>
                <textarea 
                  className="form-control" 
                  rows="4"
                  placeholder="Write something about your experience and style..."
                  value={bio} 
                  onChange={e => setBio(e.target.value)} 
                ></textarea>
              </div>

              <button 
                className="btn w-100 fw-bold py-2" 
                style={{ background: "#f472b6", color: "#fff", borderRadius: "10px" }}
                onClick={handleUpdate}
              >
                Save Changes
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDashboard;
