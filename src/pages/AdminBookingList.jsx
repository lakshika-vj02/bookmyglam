import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageHeader from "../component/common/PageHeader";
import SearchBar from "../component/common/SearchBar";
// import CommonTable from "../component/common/CommonTable";
import Pagination from "../component/common/Pagination";


function AdminBookingList() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/bookings/${id}`,
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

        alert("Status Updated");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const filteredBookings = bookings.filter((booking) => {
  const customerName = (booking.customer_name ?? "").toLowerCase();
  const artistName = (booking.artist_name ?? "").toLowerCase();
  const searchText = search.toLowerCase();

  return (
    customerName.includes(searchText) ||
    artistName.includes(searchText)
  );
});

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentBookings = filteredBookings.slice(
  indexOfFirstItem,
  indexOfLastItem
);

const totalPages = Math.ceil(
  filteredBookings.length / itemsPerPage
);
  return (
    <div className="container-fluid">

          <PageHeader
            title="Booking List"
            subtitle="Manage all customer bookings."
            buttonText="Back"
            buttonIcon={<i className="bi bi-arrow-left"></i>}
            onButtonClick={() => navigate("/admin")}
          />
          <SearchBar
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
               setCurrentPage(1);
            }}
            placeholder="Search Customer or Artist..."
          />
          <div className="d-flex justify-content-end align-items-center mb-3">
  <label className="me-2 mb-0">Rows per page:</label>

  <select
    className="form-select w-auto"
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
          <table className="table table-bordered table-hover mt-4">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Artist</th>
                <th>Services</th>
                <th>Date</th>
                <th>Time</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentBookings.map((booking) => {
                const serviceList = JSON.parse(booking.services || "[]");

                return (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer_name}</td>
                    <td>{booking.artist_name}</td>

                    <td>
                      {serviceList.map((service) => (
                        <div key={service.id}>
                          {service.subcategory_name}
                        </div>
                      ))}
                    </td>

                    <td>{booking.booking_date.substring(0, 10)}</td>
                    <td>{booking.time_slot}</td>
                    <td>₹{booking.total_price}</td>
                    <td>{booking.status}</td>

                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateStatus(booking.id, "confirmed")}
                      >
                        Confirm
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(booking.id, "cancelled")}
                      >
                        Reject
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  setCurrentPage={setCurrentPage}
/>

    </div>
  );
}

export default AdminBookingList;