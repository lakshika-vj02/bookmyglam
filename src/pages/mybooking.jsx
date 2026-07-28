import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyBooking() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Helper function to format the date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to safely parse the stringified services array
  const parseServices = (servicesString) => {
    try {
      return typeof servicesString === "string"
        ? JSON.parse(servicesString)
        : servicesString;
    } catch (e) {
      console.error("Error parsing services:", e);
      return [];
    }
  };

  // Fetch bookings based on phone number
  const handleSearch = async () => {
    if (!phone) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/bookings?customer_phone=${phone}`
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings. Please check your connection.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ marginTop: "80px", maxWidth: "800px" }}>
      <div className="card p-4 shadow text-center">
        <h2 className="fw-bold mb-3">My Bookings</h2>
        <p className="text-muted mb-4">
          Enter your phone number to view and manage your salon appointments.
        </p>

        {/* Search Input Section */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              className="btn"
              style={{ backgroundColor: "#f472b6", color: "white", minWidth: "120px" }}
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Booking Results Section */}
        <div className="text-start mt-4">
          {hasSearched && !loading && bookings.length === 0 && !error && (
            <p className="text-center text-muted">No bookings found for this phone number.</p>
          )}

          {bookings.map((booking, index) => {
            const bookedServices = parseServices(booking.services);

            return (
              <div
                key={booking.id || index}
                className="card mb-4 p-4 border-0 shadow-sm"
                style={{ backgroundColor: "#fdf2f8", borderRadius: "12px" }}
              >
                {/* Header with Artist and Status */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                  <h5 className="mb-0 fw-bold">
                    Artist: <span style={{ color: "#f472b6" }}>{booking.artist_name}</span>
                  </h5>
                  <span
                    className={`badge ${
                      booking.status === "pending" ? "bg-warning text-dark" : "bg-success"
                    } px-3 py-2`}
                    style={{ borderRadius: "8px" }}
                  >
                    {booking.status?.toUpperCase()}
                  </span>
                </div>

                {/* Booking Details Grid */}
                <div className="row mb-3">
                  <div className="col-md-6 mb-2">
                    <strong className="text-muted">Customer Name:</strong>{" "}
                    {booking.customer_name}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong className="text-muted">Date:</strong>{" "}
                    {formatDate(booking.booking_date)}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong className="text-muted">Time:</strong>{" "}
                    {booking.time_slot}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong className="text-muted">Address:</strong>{" "}
                    {booking.address}
                  </div>
                </div>

                {/* Services List */}
                <div className="mb-3">
                  <strong className="text-muted d-block mb-2">Services Booked:</strong>
                  {bookedServices.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {bookedServices.map((service, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0"
                        >
                          <div>
                            <span className="fw-semibold">{service.subcategory_name}</span>
                            <small className="text-muted d-block">{service.duration} mins</small>
                          </div>
                          <span className="fw-bold">₹{service.price}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted">No services listed</span>
                  )}
                </div>

                {/* Footer with Price and Payment Status */}
                <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-muted">Payment:</strong>{" "}
                    {booking.payment_method} (
                    <span
                      className={
                        booking.payment_status === "pending" ? "text-danger" : "text-success"
                      }
                    >
                      {booking.payment_status}
                    </span>
                    )
                  </div>
                  <div className="fs-5 fw-bold" style={{ color: "#f472b6" }}>
                    Total: ₹{booking.total_price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: Keep your old navigation button if needed elsewhere */}
        <div className="mt-4 border-top pt-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyBooking;