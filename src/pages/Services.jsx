import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Services() {

  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // FETCH SERVICES
  const fetchServices = async (cat = "") => {

    let url = "http://localhost:5000/services";

    if (cat) {
      url += `?category=${cat}`;
    }

    try {
      const res = await axios.get(url);
      console.log("API Response:", res.data);
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices(category);
  }, [category]);
console.log("Services State:", services);
  return (

    <div
      className="container-fluid py-5"
      style={{
        background: "#fff7fb"
      }}
    >

      <div className="container">
<h4>Total Services: {services.length}</h4>
        <h2 className="text-center fw-bold mb-4">
          Our Services
        </h2>

        {/* FILTER BUTTONS */}
        <div className="text-center mb-5">

          <button
            className="btn btn-dark me-2"
            onClick={() => setCategory("")}
          >
            All
          </button>

          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setCategory("Makeup")}
          >
            Makeup
          </button>

          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setCategory("Hair")}
          >
            Hair
          </button>

          <button
            className="btn btn-outline-dark"
            onClick={() => setCategory("Nails")}
          >
            Nails
          </button>

        </div>

        <div className="row">

          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service.id}>

              <div className="card shadow-sm h-100">
                {/* IMAGE */}
      {service.image && (
        <img
          src={`http://localhost:5000/images/${service.image}`}
          alt={service.name}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            display: "block"
          }}
          onError={() => console.log("Image not found:", service.image)}
        />
      )}

                 
                <div className="card-body text-center">

                  <h5 className="fw-bold">
                    {service.name}
                  </h5>

    

                  <p className="small">
                    {service.description}
                  </p>

                 <button
  onClick={() =>
    navigate("/artists", {
      state: {
        service: service.name
      }
    })
  }
  className="btn w-100"
  style={{
    background: "#f472b6",
    color: "white",
    borderRadius: "10px"
  }}
>
  View Artists
</button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Services;