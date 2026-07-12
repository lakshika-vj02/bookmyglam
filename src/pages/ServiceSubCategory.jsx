import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ServiceSubCategory.css";

const ServiceSubCategory = () => {
  const { serviceId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/subcategory/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data))
      .catch((err) => console.log(err));
  }, [serviceId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Service Categories</h2>

      <div className="row">
        {subcategories.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card shadow-sm h-100">
              {item.image && (
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.subcategory_name}
                />
              )}

              <div className="card-body">
                <h5>{item.subcategory_name}</h5>

                <p>{item.description}</p>

                <h6 className="text-danger">
                  ₹{item.price}
                </h6>

                <button className="subcategory-btn btn w-100"
                   onClick={() => navigate(`/artists/${item.id}`)}>
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