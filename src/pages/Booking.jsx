import React, { useState } from "react";
import axios from "axios";

function Booking() {

  // STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  const [services, setServices] = useState([]);

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

      customer_name: name,

      customer_phone: phone,

      service_name: services.join(", "),

      booking_date: date,

      booking_time: time,

      customer_location: address

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

          <h5>Select Services</h5>

          <label className="me-3">

            <input
              type="checkbox"
              checked={services.includes("Hair Styling")}
              onChange={() =>
                handleServiceChange("Hair Styling")
              }
            />

            {" "}Hair Styling

          </label>

          <br />

          <label className="me-3">

            <input
              type="checkbox"
              checked={services.includes("Nail Art")}
              onChange={() =>
                handleServiceChange("Nail Art")
              }
            />

            {" "}Nail Art

          </label>

          <br />

          <label className="me-3">

            <input
              type="checkbox"
              checked={services.includes("Bridal Makeup")}
              onChange={() =>
                handleServiceChange("Bridal Makeup")
              }
            />

            {" "}Bridal Makeup

          </label>

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