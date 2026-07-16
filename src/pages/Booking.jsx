import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Booking() {

  // STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  

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
        <input
          type="text"
          placeholder="Enter Name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* SERVICES */}
        <div className="mb-3">

        <h5>Selected Services</h5>

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
  </h4>

        </div>

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone Number"
          className="form-control mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* DATE */}
        <input
          type="date"
          className="form-control mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* TIME */}
        <input
          type="time"
          className="form-control mb-3"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {/* ADDRESS */}
        <textarea
          placeholder="Address"
          className="form-control mb-3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

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