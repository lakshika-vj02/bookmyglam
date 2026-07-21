import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import "./booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting after success

  // FORM STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at Salon");
  const [services, setServices] = useState([]);

  // UI STATES (For Tick mark / Loading / Error)
  const [bookingStatus, setBookingStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const {
    artistId,
    artistName,
    services: selectedServices = [],
    totalAmount = 0,
  } = location.state || {};

  // SAVE BOOKING
  const handleBooking = async () => {
    // Basic validation
    if (!name || !phone || !date || !time) {
      setBookingStatus("error");
      setErrorMessage("Please fill all required fields (Name, Phone, Date, Time).");
      return;
    }

    setBookingStatus("loading"); // Start loading
    setErrorMessage("");

    const bookingData = {
      user_id: 1, // login ke baad dynamic hoga
      artist_id: artistId,
      artist_name: artistName,
      service_id: selectedServices[0]?.id,
      booking_date: date,
      time_slot: time,
      address: address,
      total_price: totalAmount,
      customer_name: name,
      customer_phone: phone,
      services: selectedServices,
      payment_method: paymentMethod,
      notes: "Please arrive 15 minutes early.",
      payment_status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:5000/bookings", bookingData);
      
      // Update state to success to show the tick mark UI
      setBookingStatus("success");

      // CLEAR FORM
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setAddress("");
      setServices([]);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setBookingStatus("error");
      setErrorMessage("Booking Failed. Please try again.");
    }
  };

  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      <div className="card p-4 shadow">
        
        {/* SUCCESS UI (Shows when booking is successful) */}
        {bookingStatus === "success" ? (
          <div className="text-center py-5">
            <div 
              style={{ 
                fontSize: "80px", 
                color: "#28a745", 
                marginBottom: "20px" 
              }}
            >
              ✔️
            </div>
            <h2 className="fw-bold" style={{ color: "#28a745" }}>
              Booking Confirmed!
            </h2>
            <p className="text-muted mt-3 fs-5">
              Thank you, {name}! Your appointment with <strong>{artistName}</strong> has been successfully booked.
            </p>
            <button
              className="btn mt-4 px-4 py-2"
              style={{ backgroundColor: "#f472b6", color: "white", fontWeight: "bold" }}
              onClick={() => navigate("/")} // Navigate back to home
            >
              Go to Homepage
            </button>
          </div>
        ) : (
          
          /* NORMAL FORM UI */
          <>
            <h3 className="mb-4 text-center">Book Appointment</h3>

            {/* Error Alert Box */}
            {bookingStatus === "error" && (
              <div className="alert alert-danger text-center shadow-sm">
                ❌ {errorMessage}
              </div>
            )}

            <div className="row">
              {/* NAME */}
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
                <label className="form-label fw-bold">Phone Number</label>
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
                <label className="form-label fw-bold">Select Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* TIME */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Select Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <label className="form-label fw-bold mt-2">Address</label>
            <textarea
              placeholder="Full Address"
              className="form-control mb-4"
              rows="2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <div className="row">
              {/* SERVICES */}
              <div className="col-md-6 mb-4">
                <h5 className="fw-bold">Selected Services</h5>
                {selectedServices.length > 0 ? (
                  <>
                    {selectedServices.map((service) => (
                      <div key={service.id} className="card mb-2 p-3">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="mb-1">{service.subcategory_name}</h6>
                            <small className="text-muted">{service.duration} min</small>
                          </div>
                          <div style={{ color: "#f472b6", fontWeight: "600" }}>
                            ₹ {service.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-muted">No services selected.</p>
                )}

                <div className="booking-summary mt-4 p-3 bg-light rounded">
                  <h6 className="fw-bold mb-3">Booking Summary</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Artist</span>
                    <strong>{artistName}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Services Selected</span>
                    <strong>{selectedServices.length}</strong>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold fs-5">Total Amount</span>
                    <strong className="fs-5" style={{ color: "#f472b6" }}>₹ {totalAmount}</strong>
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="col-md-6 mt-4 mt-md-0">
                <h5 className="fw-bold mb-3">Payment Method</h5>
                <div className="form-check p-3 border rounded mb-2 bg-light">
                  <input
                    className="form-check-input ms-1"
                    type="radio"
                    name="payment"
                    id="payAtSalon"
                    value="Pay at Salon"
                    checked={paymentMethod === "Pay at Salon"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label ms-2 fw-semibold" htmlFor="payAtSalon">
                    Pay at Salon
                  </label>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="text-center mt-4 border-top pt-4">
              <button
                className="btn btn-lg w-50"
                onClick={handleBooking}
                disabled={bookingStatus === "loading"}
                style={{
                  backgroundColor: "#f472b6",
                  borderColor: "#f472b6",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                {bookingStatus === "loading" ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Booking;