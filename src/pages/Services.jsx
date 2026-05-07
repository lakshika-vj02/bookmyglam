import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {

  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/services")
      .then(res => {
        setServices(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container py-5">

      <h2 className="text-center fw-bold mb-5">Our Services</h2>

      <div className="row">
        {services.map((service) => {
          console.log(service.img); // ✅ correct

          return (
            <div className="col-md-4 mb-4" key={service.id}>
              <div className="card shadow-sm h-100">

                <img
               src={`http://localhost:5000/${service.img}`}
               className="card-img-top"
               alt={service.name}
               style={{
                height: "250px",
                width: "100%",
                objectFit: "cover",
                 borderTopLeftRadius: "10px",
                 borderTopRightRadius: "10px"
                 }}
              />

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{service.name}</h5>

                  {service.offer_price ? (
                    <>
                      <span className="text-muted text-decoration-line-through">
                        ₹{service.price}
                      </span>
                      <span className="text-danger ms-2">
                        ₹{service.offer_price}
                      </span>
                    </>
                  ) : (
                    <p className="text-muted">₹{service.price}</p>
                  )}
      

                 <p className="small text-secondary">
                 Duration: {service.duration}
                </p>

                  <p className="small">{service.description}</p>

                  <button
                    className="btn w-100"
                    style={{ backgroundColor: "#f472b6", color: "white" }}
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Services;