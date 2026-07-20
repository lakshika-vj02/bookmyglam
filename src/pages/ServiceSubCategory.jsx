import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceSubCategory.css";

const ServiceSubCategory = () => {
  const { serviceId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Which subcategory is expanded (Level 3 items shown)
  const [expandedId, setExpandedId] = useState(null);
  const [items, setItems] = useState({});         // { subcategoryId: [...items] }
  const [loadingItems, setLoadingItems] = useState({});

  // Emoji map per serviceId
  const serviceEmojis = { "1": "💇", "2": "💅", "3": "🧖", "4": "💄" };

  // ── Fetch Level 2 subcategories ───────────────────────────
  useEffect(() => {
    fetch(`http://localhost:5000/subcategory/${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSubcategories(data);
        } else {
          setError(data.message || "Could not load subcategories");
          setSubcategories([]);
        }
      })
      .catch(() => {
        setError("Network error — backend not reachable");
        setSubcategories([]);
      });

    // Fetch service name
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((s) => String(s.id) === String(serviceId));
        if (found) setServiceName(found.name);
      })
      .catch(() => {});
  }, [serviceId]);

  // ── Fetch Level 3 items when a subcategory is clicked ─────
  const handleSubcategoryClick = (subcategoryId) => {
    // Toggle off if already expanded
    if (expandedId === subcategoryId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(subcategoryId);

    // Already loaded? skip fetch
    if (items[subcategoryId]) return;

    setLoadingItems((prev) => ({ ...prev, [subcategoryId]: true }));
    fetch(`http://localhost:5000/subcategory-items/${subcategoryId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems((prev) => ({ ...prev, [subcategoryId]: data }));
        } else {
          setItems((prev) => ({ ...prev, [subcategoryId]: [] }));
        }
        setLoadingItems((prev) => ({ ...prev, [subcategoryId]: false }));
      })
      .catch(() => {
        setItems((prev) => ({ ...prev, [subcategoryId]: [] }));
        setLoadingItems((prev) => ({ ...prev, [subcategoryId]: false }));
      });
  };

  return (
    <div className="container-fluid py-5" style={{ background: "#fff7fb" }}>
      <div className="container">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-link ps-0 mb-3"
          style={{ color: "#f472b6", textDecoration: "none", fontWeight: "600" }}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Services
        </button>

        {/* HEADING */}
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ fontSize: "2rem" }}>
            {serviceEmojis[serviceId] || "✨"} {serviceName || "Service"} Categories
          </h2>
          <p className="text-muted">
            Click a category to explore all available treatments
          </p>
        </div>

        {/* ERROR */}
        {error && <div className="alert alert-warning">⚠️ {error}</div>}

        {/* EMPTY */}
        {!error && subcategories.length === 0 && (
          <p className="text-center text-muted">No subcategories found.</p>
        )}

        {/* ── LEVEL 2 SUBCATEGORY CARDS ── */}
        <div className="subcategory-scroll">
        <div className="row">
          {subcategories.map((item) => {
            const isExpanded = expandedId === item.id;
            const subItems = items[item.id] || [];
            const isLoading = loadingItems[item.id];

            return (
              <div className="col-md-4 mb-4" key={item.id}>
                <div
                  className="card shadow-sm"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: isExpanded ? "2px solid #f472b6" : "none",
                    boxShadow: isExpanded
                      ? "0 8px 30px rgba(244,114,182,0.3)"
                      : "0 4px 15px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* ── Subcategory Header (clickable) ── */}
                  <div
                    onClick={() => handleSubcategoryClick(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* IMAGE or emoji */}
                    {item.image ? (
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.subcategory_name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "200px",
                          background: "linear-gradient(135deg, #fce7f3, #fdf2f8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "5rem"
                        }}
                      >
                        {serviceEmojis[serviceId] || "✨"}
                      </div>
                      
                    )}

                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h5 className="fw-bold mb-0">{item.subcategory_name}</h5>
                        <i
                          className={`bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"}`}
                          style={{ color: "#f472b6", fontSize: "1.1rem" }}
                        ></i>
                      </div>
                      <p className="text-muted small mb-3">{item.description}</p>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold" style={{ color: "#f472b6" }}>
                          Starting ₹{Number(item.price).toLocaleString()}
                        </span>
                        {item.duration && (
                          <span
                            className="badge border fw-normal"
                            style={{
                              background: "#fff1f9",
                              color: "#be185d",
                              fontSize: "0.75rem",
                              padding: "5px 8px",
                              borderRadius: "20px"
                            }}
                          >
                            <i className="bi bi-clock me-1"></i>
                            {item.duration} min
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── LEVEL 3 ITEMS (expanded inline) ── */}
                  {isExpanded && (
                    <div
                      style={{
                        background: "#fff7fb",
                        borderTop: "1px solid #fce7f3",
                        padding: "16px"
                      }}
                    >
                      <p
                        className="fw-semibold mb-3 text-center"
                        style={{ color: "#be185d", fontSize: "0.9rem" }}
                      >
                        ✨ Choose your {item.subcategory_name} style:
                      </p>

                      {/* Loading */}
                      {isLoading && (
                        <div className="text-center py-3">
                          <div
                            className="spinner-border spinner-border-sm"
                            style={{ color: "#f472b6" }}
                          ></div>
                        </div>
                      )}

                      {/* Empty items */}
                      {!isLoading && subItems.length === 0 && (
                        <p className="text-muted text-center small">No items found.</p>
                      )}

                      {/* Items list */}
                      {!isLoading && subItems.map((si) => (
                        <div 
                          key={si.id}
                          className="d-flex justify-content-between align-items-center mb-3 p-3"
                          style={{
                            background: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(244,114,182,0.1)"
                          }}
                >

                          <div style={{ flex: 1 }}>
                            <p className="fw-semibold mb-0" style={{ fontSize: "0.9rem" }}>
                              {si.item_name}
                            </p>
                            <div className="d-flex align-items-center gap-2 mt-1">
                              <span
                                className="fw-bold"
                                style={{ color: "#f472b6", fontSize: "0.95rem" }}
                              >
                                ₹{Number(si.price).toLocaleString()}
                              </span>
                              {si.duration && (
                                <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                                  <i className="bi bi-clock me-1"></i>{si.duration} min
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            className="btn btn-sm fw-semibold ms-3"
                            style={{
                              background: "linear-gradient(135deg, #f472b6, #ec4899)",
                              color: "#fff",
                              borderRadius: "10px",
                              border: "none",
                              padding: "6px 14px",
                              whiteSpace: "nowrap"
                            }}
                            onClick={() =>
                              navigate("/artists", {
                                state: {
                                  serviceId,
                                  subcategoryId: item.id,
                                  itemId: si.id,
                                  itemName: si.item_name,
                                  price: si.price
                                }
                              })
                            }
                          >
                            Book Now
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
</div>
      </div>
    </div>
  );
};

export default ServiceSubCategory;

