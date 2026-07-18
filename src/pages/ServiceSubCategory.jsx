import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceSubCategory.css";

const ServiceSubCategory = () => {
  const { serviceId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/subcategory/${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        // Safety check — ensure data is array before calling .map()
        if (Array.isArray(data)) {
          setSubcategories(data);
        } else {
          console.error("Expected array, got:", data);
          setError(data.message || "Could not load subcategories");
          setSubcategories([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Network error — backend not reachable");
        setSubcategories([]);
      });
  }, [serviceId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Service Categories</h2>

      {/* ERROR */}
      {error && (
        <div className="alert alert-warning">⚠️ {error}</div>
      )}

      {/* EMPTY */}
      {!error && subcategories.length === 0 && (
        <p className="text-muted">No subcategories found.</p>
      )}

      {/* CARDS */}
      <div className="row">
        {subcategories.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card shadow-sm h-100">

              {item.image && (
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.subcategory_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5>{item.subcategory_name}</h5>
                <p>{item.description}</p>
                {/* <h6 className="text-danger">₹{item.price}</h6> */}

                <button
                  className="subcategory-btn btn w-100"
                  onClick={() => navigate(`/artists/${item.id}`)}
                >
                  View Artists
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ServiceSubCategory;