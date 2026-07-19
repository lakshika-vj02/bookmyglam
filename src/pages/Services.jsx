import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  // 4 Main Categories
  const categories = [
    { name: "All",      icon: "✨", value: "" },
    { name: "Hair",     icon: "💇", value: "Hair" },
    { name: "Nail",     icon: "💅", value: "Nail" },
    { name: "Skincare", icon: "🧖", value: "Skincare" },
    { name: "Makeup",   icon: "💄", value: "Makeup" },
  ];

  // FETCH SERVICES
  const fetchServices = async (cat = "") => {
    let url = "http://localhost:5000/services";
    if (cat) {
      url += `?category=${cat}`;
    }
    try {
      const res = await axios.get(url);
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices(activeCategory);
  }, [activeCategory]);

  return (
    <div
      className="container-fluid py-5"
      style={{ background: "#fff7fb" }}
    >
      <div className="container">

        {/* HEADING */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ fontSize: "2rem" }}>
            Our Services
          </h2>
          <p className="text-muted">
            Choose a category to explore our beauty services
          </p>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className="btn px-4 py-2 fw-semibold"
              style={{
                background: activeCategory === cat.value ? "#f472b6" : "#fff",
                color: activeCategory === cat.value ? "#fff" : "#f472b6",
                border: "2px solid #f472b6",
                borderRadius: "50px",
                transition: "all 0.3s ease",
                boxShadow: activeCategory === cat.value ? "0 4px 15px rgba(244,114,182,0.4)" : "none"
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* SERVICE CARDS */}
        <div className="row">
          {services.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted fs-5">No services found.</p>
            </div>
          ) : (
            services.map((service) => (
              <div className="col-md-3 mb-4" key={service.id}>
                <div
                  className="card shadow-sm h-100"
                  style={{ borderRadius: "16px", overflow: "hidden", border: "none" }}
                >
                  {/* IMAGE */}
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "220px",
                        background: "linear-gradient(135deg, #fce7f3, #fdf2f8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "4rem"
                      }}
                    >
                      {service.name === "Hair" ? "💇" :
                       service.name === "Nail" ? "💅" :
                       service.name === "Skincare" ? "🧖" : "💄"}
                    </div>
                  )}

                  <div className="card-body text-center p-4">
                    <h5 className="fw-bold mb-1">{service.name}</h5>
                    <p className="text-muted small mb-3">{service.description}</p>

                    <p className="fw-bold mb-3" style={{ color: "#f472b6" }}>
                      Starting ₹{Number(service.price).toLocaleString()}
                    </p>

                    {/* View Subcategories Button */}
                    <button
                      className="btn w-100 mb-2"
                      style={{
                        background: "#f472b6",
                        color: "#fff",
                        borderRadius: "10px",
                        fontWeight: "600"
                      }}
                      onClick={() => navigate(`/subcategory/${service.id}`)}
                    >
                      <i className="bi bi-grid-3x3-gap me-2"></i>
                      View Categories
                    </button>

                    {/* View Artists Button */}
                    <button
                      onClick={() =>
                        navigate("/artists", {
                          state: { service: service.name }
                        })
                      }
                      className="btn w-100 btn-outline-secondary"
                      style={{ borderRadius: "10px" }}
                    >
                      View Artists
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Services;