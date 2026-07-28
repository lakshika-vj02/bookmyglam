import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageHeader from "../component/common/PageHeader";
import SearchBar from "../component/common/SearchBar";
import Pagination from "../component/common/Pagination";




function AdminBookingList() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch("http://localhost:5000/api/admin/bookings")
    fetch(`${process.env.REACT_APP_API_URL}/api/admin/bookings`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
       `${process.env.REACT_APP_API_URL}/api/admin/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setBookings(
          bookings.map((booking) =>
            booking.id === id ? { ...booking, status } : booking
          )
        );
        alert(`Booking has been marked as ${status}`);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // ── KPI COUNTS ─────────────────────────────────────────────────────────────
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => ["pending", ""].includes((b.status || "").toLowerCase())).length;
  const acceptedCount = bookings.filter((b) => ["confirmed", "accepted"].includes((b.status || "").toLowerCase())).length;
  const rejectedCount = bookings.filter((b) => ["cancelled", "rejected"].includes((b.status || "").toLowerCase())).length;

  // ── FILTERING & SEARCH ──────────────────────────────────────────────────────
  const filteredBookings = bookings.filter((booking) => {
    const customerName = (booking.customer_name ?? "").toLowerCase();
    const artistName = (booking.artist_name ?? "").toLowerCase();
    const searchText = search.toLowerCase();
    const matchesSearch = customerName.includes(searchText) || artistName.includes(searchText);

    if (!matchesSearch) return false;

    const status = (booking.status || "pending").toLowerCase();
    if (statusFilter === "pending") return status === "pending" || status === "";
    if (statusFilter === "accepted") return status === "confirmed" || status === "accepted";
    if (statusFilter === "rejected") return status === "cancelled" || status === "rejected";
    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="container-fluid py-3">
      <PageHeader
        title="Booking & Appointment Management"
        subtitle="Track, filter, accept, or reject client beauty appointments."
        buttonText="Back to Dashboard"
        buttonIcon={<i className="bi bi-arrow-left"></i>}
        onButtonClick={() => navigate("/admin")}
      />

      {/* ── KPI STATUS CARDS (CLICK TO FILTER) ───────────────────────────── */}
      <div className="row mb-4">
        {/* Total Card */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div
            className={`card shadow-sm border-0 h-100 p-3 ${statusFilter === "all" ? "bg-dark text-white" : "bg-white text-dark"}`}
            style={{ borderRadius: "12px", cursor: "pointer", transition: "all 0.2s", borderTop: "4px solid #0d6efd" }}
            onClick={() => { setStatusFilter("all"); setCurrentPage(1); }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 small fw-bold text-uppercase opacity-75">Total Bookings</p>
                <h2 className="mb-0 fw-bold">{totalCount}</h2>
              </div>
              <div className="p-3 rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-calendar-check fs-4"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted d-flex align-items-center">
              <i className="bi bi-hand-index-thumb me-1"></i>
              {statusFilter === "all" ? <span className="text-info fw-bold">● Showing All</span> : "Click to view all"}
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div
            className={`card shadow-sm border-0 h-100 p-3 ${statusFilter === "pending" ? "bg-warning text-dark shadow" : "bg-white text-dark"}`}
            style={{ borderRadius: "12px", cursor: "pointer", transition: "all 0.2s", borderTop: "4px solid #ffc107" }}
            onClick={() => { setStatusFilter("pending"); setCurrentPage(1); }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 small fw-bold text-uppercase text-warning-emphasis">Pending</p>
                <h2 className="mb-0 fw-bold">{pendingCount}</h2>
              </div>
              <div className="p-3 rounded-circle bg-warning-subtle text-warning-emphasis d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-clock-history fs-4"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted d-flex align-items-center">
              <i className="bi bi-hand-index-thumb me-1"></i>
              {statusFilter === "pending" ? <span className="text-dark fw-bold">● Filtered by Pending</span> : "Click to filter Pending"}
            </div>
          </div>
        </div>

        {/* Accepted Card */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div
            className={`card shadow-sm border-0 h-100 p-3 ${statusFilter === "accepted" ? "bg-success text-white shadow" : "bg-white text-dark"}`}
            style={{ borderRadius: "12px", cursor: "pointer", transition: "all 0.2s", borderTop: "4px solid #198754" }}
            onClick={() => { setStatusFilter("accepted"); setCurrentPage(1); }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className={`mb-1 small fw-bold text-uppercase ${statusFilter === "accepted" ? "text-white-50" : "text-success"}`}>Accepted / Confirmed</p>
                <h2 className="mb-0 fw-bold">{acceptedCount}</h2>
              </div>
              <div className="p-3 rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-check-circle-fill fs-4"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted d-flex align-items-center">
              <i className="bi bi-hand-index-thumb me-1"></i>
              {statusFilter === "accepted" ? <span className="text-white fw-bold">● Filtered by Accepted</span> : "Click to filter Accepted"}
            </div>
          </div>
        </div>

        {/* Rejected Card */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div
            className={`card shadow-sm border-0 h-100 p-3 ${statusFilter === "rejected" ? "bg-danger text-white shadow" : "bg-white text-dark"}`}
            style={{ borderRadius: "12px", cursor: "pointer", transition: "all 0.2s", borderTop: "4px solid #dc3545" }}
            onClick={() => { setStatusFilter("rejected"); setCurrentPage(1); }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className={`mb-1 small fw-bold text-uppercase ${statusFilter === "rejected" ? "text-white-50" : "text-danger"}`}>Rejected / Cancelled</p>
                <h2 className="mb-0 fw-bold">{rejectedCount}</h2>
              </div>
              <div className="p-3 rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-x-circle-fill fs-4"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted d-flex align-items-center">
              <i className="bi bi-hand-index-thumb me-1"></i>
              {statusFilter === "rejected" ? <span className="text-white fw-bold">● Filtered by Rejected</span> : "Click to filter Rejected"}
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH BAR & ROWS PER PAGE ──────────────────────────────────── */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "12px", backgroundColor: "#fff" }}>
        <div className="card-body p-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-7">
              <SearchBar
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Customer name or Artist name..."
              />
            </div>
            <div className="col-12 col-md-5 d-flex justify-content-md-end align-items-center gap-3">
              {statusFilter !== "all" && (
                <button
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                  onClick={() => setStatusFilter("all")}
                >
                  <i className="bi bi-funnel me-1"></i> Reset Filter
                </button>
              )}
              <div className="d-flex align-items-center">
                <label className="me-2 mb-0 small text-secondary fw-semibold">Rows per page:</label>
                <select
                  className="form-select form-select-sm border-secondary-subtle shadow-none"
                  style={{ width: "70px", borderRadius: "6px" }}
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOOKINGS TABLE ──────────────────────────────────────────────── */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ minWidth: "900px" }}>
            <thead className="table-dark">
              <tr>
                <th className="py-3 px-3">Booking #</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Artist Assigned</th>
                <th className="py-3">Services</th>
                <th className="py-3">Date & Time</th>
                <th className="py-3">Total Amount</th>
                <th className="py-3 text-center">Status</th>
                <th className="py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => {
                  let serviceList = [];
                  try {
                    serviceList = JSON.parse(booking.services || "[]");
                  } catch (e) {
                    serviceList = [];
                  }

                  const st = (booking.status || "pending").toLowerCase();
                  let badgeStyle = "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
                  let badgeIcon = "bi-clock-history text-warning me-1";
                  if (st === "confirmed" || st === "accepted") {
                    badgeStyle = "bg-success-subtle text-success border border-success-subtle";
                    badgeIcon = "bi-check-circle-fill text-success me-1";
                  }
                  if (st === "cancelled" || st === "rejected") {
                    badgeStyle = "bg-danger-subtle text-danger border border-danger-subtle";
                    badgeIcon = "bi-x-circle-fill text-danger me-1";
                  }

                  return (
                    <tr key={booking.id} style={{ transition: "all 0.2s" }}>
                      <td className="px-3 fw-bold text-secondary">#{booking.id}</td>
                      <td>
                        <div className="fw-bold text-dark">{booking.customer_name || "N/A"}</div>
                        {booking.customer_phone && <div className="small text-muted">{booking.customer_phone}</div>}
                      </td>
                      <td>
                        <span className="fw-semibold text-primary">
                          <i className="bi bi-person-badge me-1"></i>
                          {booking.artist_name || "N/A"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {Array.isArray(serviceList) && serviceList.length > 0 ? (
                            serviceList.map((srv, idx) => (
                              <span key={idx} className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: "0.75rem" }}>
                                {srv.subcategory_name || srv.name || "Service"}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted small">Standard Service</span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="fw-medium text-dark">
                          <i className="bi bi-calendar-event me-1 text-secondary"></i>
                          {booking.booking_date ? booking.booking_date.substring(0, 10) : "N/A"}
                        </div>
                        <div className="small text-muted">
                          <i className="bi bi-clock me-1 text-info"></i>
                          {booking.time_slot || "Time unset"}
                        </div>
                      </td>

                      <td className="fw-bold text-success fs-6">
                        ₹{booking.total_price || 0}
                      </td>

                      <td className="text-center">
                        <span className={`badge px-3 py-2 text-capitalize d-inline-flex align-items-center ${badgeStyle}`} style={{ borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600" }}>
                          <i className={`bi ${badgeIcon}`}></i>
                          {booking.status || "Pending"}
                        </span>
                      </td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-success btn-sm px-2 py-1 d-flex align-items-center shadow-sm"
                            style={{ borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600" }}
                            onClick={() => updateStatus(booking.id, "confirmed")}
                            title="Accept & Confirm Booking"
                            disabled={st === "confirmed" || st === "accepted"}
                          >
                            <i className="bi bi-check2-circle me-1 fs-6"></i>
                            Accept
                          </button>

                          <button
                            className="btn btn-danger btn-sm px-2 py-1 d-flex align-items-center shadow-sm"
                            style={{ borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600" }}
                            onClick={() => updateStatus(booking.id, "cancelled")}
                            title="Reject & Cancel Booking"
                            disabled={st === "cancelled" || st === "rejected"}
                          >
                            <i className="bi bi-x-circle me-1 fs-6"></i>
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <i className="bi bi-calendar-x display-4 text-muted d-block mb-2"></i>
                    <p className="fs-6 text-muted mb-0">No bookings found matching the selected filter/search</p>
                    {statusFilter !== "all" && (
                      <button className="btn btn-link btn-sm text-decoration-none mt-1" onClick={() => setStatusFilter("all")}>
                        Show all bookings
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── PAGINATION ──────────────────────────────────────────────────── */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default AdminBookingList;