
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

    fetch(`${process.env.REACT_APP_API_URL}/artists/${artistId}/services`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched services data:", data);
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data && Array.isArray(data.services)) {
          setServices(data.services);
        } else if (data && Array.isArray(data.data)) {
          setServices(data.data);
        } else {
          console.warn("Expected array of services but received:", data);
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setServices([]);
      });

  }, [artistId]);

  const servicesList = Array.isArray(services) ? services : [];

  const totalAmount = servicesList
    .filter((service) => selectedServices.includes(service.id))
    .reduce((total, service) => total + Number(service.price || service.base_price || 0), 0);

  // Get complete details of the selected services
  console.log("Services:", servicesList);
  console.log("Type:", typeof servicesList);
  console.log("Is Array:", Array.isArray(servicesList));
  const bookingServices = servicesList.filter((service) =>
    selectedServices.includes(service.id)
  );
// Handle Book Now button click
const handleBookNow = () => {

  // Check whether the user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // // Redirect to login if the user is not authenticated
  // if (!isLoggedIn) {

  //   navigate("/login", {
  //     state: {
  //       artistId,
  //       artistName,
  //       services: bookingServices,
  //       totalAmount
  //     }
  //   });

  //   return;
  // }

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

  {servicesList.length === 0 && (
    <div className="alert alert-info text-center my-4">
      No services found for this artist at the moment.
    </div>
  )}

  {servicesList.map((service) => (

    <div className="card shadow-sm mb-3 p-3" key={service.id}
     onClick={() => {
       if (selectedServices.includes(service.id)) {
          setSelectedServices(
            selectedServices.filter((id) => id !== service.id)
          );
 } else {
          setSelectedServices([...selectedServices, service.id]);
        }
      }}
      style={{
        cursor: "pointer",
        border: selectedServices.includes(service.id)
          ? "2px solid #f472b6"
          : "1px solid #dee2e6",
        backgroundColor: selectedServices.includes(service.id)
          ? "#fff5fa"
          : "#fff"
      }}
    >
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
           ₹ {service.price || service.base_price || 0}
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