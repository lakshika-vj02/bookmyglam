import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./booking.css";

function Booking() {

  // STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at Salon");
  

  const [services, setServices] = useState([]);
  const location = useLocation();
  const {
  artistId,
  services: selectedServices = [],
  totalAmount = 0
} = location.state || {};
  // CHECKBOX FUNCTION
  const handleServiceChange = (service) => {

    if (services.includes(service)) {

      setServices(
        services.filter((s) => s !== service)
      );

    } else {

      setServices([...services, service]);

    }
  };

  // SAVE BOOKING
  const handleBooking = async () => {

    const bookingData = {
  user_id: 1,              // login ke baad dynamic hoga
  artist_id: artistId,
  booking_date: date,
  time_slot: time,
  address: address,
  total_price: totalAmount,
  customer_name: name,
  customer_phone: phone,
  services: selectedServices,
  payment_method: paymentMethod,
payment_status: "pending",

    };
    console.log(bookingData);

    try {

      const res = await axios.post(
  "http://localhost:5000/bookings",
  bookingData
);

      console.log(res.data);

      alert("Booking Saved Successfully");

      // CLEAR FORM
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setAddress("");
      setServices([]);

    } catch (err) {

      
      console.log(err.response?.data || err.message);

      alert("Booking Failed");

    }
  };

  return (

    <div className="container py-5"
      style={{
    marginTop: "80px"
  }}
>

      <div className="card p-4 shadow">

        <h3 className="mb-4 text-center">
          Book Appointment
        </h3>

        {/* NAME */}
        <div className="row">
        <div className="mb-3 col-md-6">
        <label className="form-label fw-bold">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
</div>

        {/* PHONE */}
        
            <div className="col-md-6">
        <label className="form-label col-md-4">Phone Number</label>
          <input
          type="text"
          placeholder="Phone Number"
          className="form-control mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
</div>
        {/* DATE */}
           <div className="col-md-6 mb-3">
        <input
          type="date"
          className="form-control col-md-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
</div>
        {/* TIME */}
           <div className="col-md-6 mb-6 ">
        <input
          type="time"
          className="form-control col-md-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        </div>
</div>
        {/* ADDRESS */}
        <textarea
          placeholder="Address"
          className="form-control mb-3"
          rows="2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
         {/* SERVICES */}
        <div className="col-md-6 mb-4">

        {/* <h5>Selected Services</h5>

  {selectedServices.map((service) => (

    <div
      key={service.id}
      className="card mb-2 p-3"
    >
      <div className="d-flex justify-content-between">

        <div>
          <h6>{service.subcategory_name}</h6>
          <small className="text-muted">
            {service.duration}
          </small>
        </div>

        <div
          style={{
            color: "#f472b6",
            fontWeight: "600"
          }}
        >
          ₹ {service.price}
        </div>

      </div>
    </div>

  ))}

  <h4
    className="text-end mt-3"
    style={{ color: "#f472b6" }}
  >
    Total: ₹ {totalAmount}
  </h4> */}
  <h5>Selected Services</h5>

{selectedServices.length > 0 ? (
  <>
    {selectedServices.map((service) => (
      <div
        key={service.id}
        className="card mb-2 p-3"
      >
        <div className="d-flex justify-content-between">

          <div>
            <h6>{service.subcategory_name}</h6>
            <small className="text-muted">
              {service.duration} min
            </small>
          </div>

          <div
            style={{
              color: "#f472b6",
              fontWeight: "600"
            }}
          >
            ₹ {service.price}
          </div>

        </div>
      </div>
    ))}


  </>
) : (
  <p className="text-muted">
    No services selected.
  </p>
)}
<div className="booking-summary">
  <h5>Booking Summary</h5>
  
<div className="summary-row">
  <span>Artist</span>
  <strong>{artistName}</strong>
</div>

  <div className="summary-row">
    <span>Services Selected</span>
    <strong>{selectedServices.length}</strong>
  </div>
  

  <div className="summary-row">
    <span>Total Amount</span>
    <strong>₹ {totalAmount}</strong>
  </div>
</div>
        </div>
        <div className="col-md-6mt-4">
  <h5>Payment Method</h5>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="payment"
      value="Pay at Salon"
      checked={paymentMethod === "Pay at Salon"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label className="form-check-label">
      Pay at Salon
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="payment"
      value="UPI"
      checked={paymentMethod === "UPI"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label className="form-check-label">
      UPI
    </label>
  </div>
</div>

        {/* BUTTON */}
        <button
          className="btn btn-dark "
          onClick={handleBooking}
            style={{
    backgroundColor: "#f472b6",
    borderColor: "#f472b6",
    color: "#ffffff"}}
        >
          Confirm Booking
        </button>

      </div>

    </div>

  );
}

export default Booking;                         