
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ArtistServices() {

  const { artistId } = useParams();
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const [artist, setArtist] = useState({});
  const location = useLocation();
  const artistName = location.state?.artistName || "";

  useEffect(() => {

    fetch(`http://localhost:5000/artists/${artistId}/services`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServices(data);
      })
      .catch((err) => console.log(err));

  }, [artistId]);
  const totalAmount = services
  .filter((service) => selectedServices.includes(service.id))
  .reduce((total, service) => total + Number(service.price), 0);
// Get complete details of the selected services
const bookingServices = services.filter((service) =>
  selectedServices.includes(service.id)
);
// Handle Book Now button click
const handleBookNow = () => {

  // Check whether the user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Redirect to login if the user is not authenticated
  if (!isLoggedIn) {

    navigate("/login", {
      state: {
        artistId,
        services: bookingServices,
        totalAmount
      }
    });

    return;
  }

  // Navigate to booking page if the user is already logged in
  navigate("/booking", {
    state: {
      artistId,
      artistName,
      services: bookingServices,
      totalAmount
    }
  });

};
  return (

<div className="container py-5">

<button
  onClick={() => navigate(-1)}
  className="btn btn-link ps-0 mb-2"
  style={{
    color: "#f472b6",
    textDecoration: "none",
    fontWeight: "600"
  }}
>
  <i className="bi bi-arrow-left me-2"></i>
  Back to Artist Profile
</button>

<h2 className="fw-bold">Artist Services</h2>

<p className="text-muted">
  Select one or more services before booking.
</p>

 
        
      <div>

  {services.map((service) => (

    <div className="card shadow-sm mb-3 p-3" key={service.id}
style={{
    border: selectedServices.includes(service.id)
      ? "2px solid #f472b6"
      : "1px solid #dee2e6",

    backgroundColor:selectedServices.includes(service.id)
      ? "#fff5fa"
      : "#fff"
  }}>
      <div className="row align-items-center">

        {/* Image */}
        <div className="col-md-2">
          {service.image && (
            <img
              src={service.image}
              alt={service.subcategory_name}
              className="img-fluid rounded"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover"
              }}
            />
          )}
        </div>

        {/* Service Details */}
        <div className="col-md-8">
          <h5>{service.subcategory_name}</h5>

          <p>{service.description}</p>

          <h6
           style={{
            color: "#f472b6", 
            fontWeight: "700"
          }}>
           ₹ {service.price}
           </h6>
           <p className="mb-0 text-muted">
  <i className="bi bi-clock me-2"></i>
  {service.duration}
</p>
        </div>

        {/* Checkbox */}
        <div className="col-md-2 text-end">

          <input
            type="checkbox"
            className="form-check-input"
            checked={selectedServices.includes(service.id)}
  onChange={(e) => {
    if (e.target.checked) {
      setSelectedServices([...selectedServices, service.id]);
    } else {
      setSelectedServices(
        selectedServices.filter((id) => id !== service.id)
      );  }
  }}
            style={{
              accentColor: "#f472b6",
              width: "22px",
              height: "22px",
              cursor: "pointer"
            }}
          />

        </div>

      </div>

    </div>

  ))}
<div className="card shadow-sm mt-4">
  <div className="card-body d-flex justify-content-between align-items-center">

    <div>
      <h6 className="text-center">
          <i className="bi bi-check2-circle me-2"></i>
        Selected Services
      </h6>
      <h3 className=" text-center fw-bold">
        {selectedServices.length}</h3>
    </div>

    <div className="text-center">
      <h6 className="fw-bold">
        Total Amount</h6>
        <h2
  style={{
    color:"#f472b6",
    fontWeight:"700"
  }}
>  ₹ {totalAmount}</h2>
      </div>
 {/* Continue Booking Button */}
  <div className="d-flex justify-content-end mt-3">

    <button
      className="btn px-4 py-2"
      style={{
        background: "#f472b6",
        color: "#fff",
        borderRadius: "10px"
      }}
      disabled={selectedServices.length === 0}
       onClick={handleBookNow}
    >
      Book Now
    </button>

  </div>
  </div>
</div>
</div>

    </div>
  );
}

export default ArtistServices;