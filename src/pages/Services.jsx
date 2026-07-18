import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");

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
        <div className="row justify-content-center mb-4">
  <div className="col-md-4">

    <select
      className="form-select"
      value={selectedService}
      onChange={(e) => {
        const id = e.target.value;
        setSelectedService(id);

        if (id) {
          navigate(`/subcategory/${id}`);
        }
      }}
    >
      <option value="">Select Service</option>

      {services.map((service) => (
        <option key={service.id} value={service.id}>
          {service.name}
        </option>
      ))}
    </select>

  </div>
</div>

        {/* FILTER BUTTONS */}
        {/* <div className="text-center mb-5">

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

        </div> */}

        <div className="row">

          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service.id}>

              <div className="card shadow-sm h-100">
                {/* IMAGE */}
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      display: "block"
                    }}
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
                  <button
                    className="view-category btn btn-outline-pink w-100 pink-btn "
                    onClick={() => navigate(`/subcategory/${service.id}`)}
                    className="btn w-100 mb-2 mt-2 pink-btn"
                    style={{
                      background: "#f472b6",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                    }}
                  >
                    <i className="bi bi-grid-3x3-gap"></i> View Categories
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