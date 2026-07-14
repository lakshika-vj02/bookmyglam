// import React from "react";
// import { useParams } from "react-router-dom";

// function ArtistServices() {
//   const { artistId } = useParams();

//   return (
//     <div className="container">
//       <h2>Artist Services</h2>
//       <p>Artist ID: {artistId}</p>
//     </div>
//   );
// }

// export default ArtistServices;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArtistServices() {

  const { artistId } = useParams();
  const [services, setServices] = useState([]);

  useEffect(() => {

    fetch(`http://localhost:5000/artists/${artistId}/services`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServices(data);
      })
      .catch((err) => console.log(err));

  }, [artistId]);

  return (
    <div className="container py-5">

      <h2 className="mb-4">Artist Services</h2>

      {/* <div className="row">

        {services.map((service) => (

          <div className="col-md-4 mb-4" key={service.id}>

            <div className="card h-100 shadow">

              {service.image && (
                <img
                  src={service.image}
                  alt={service.subcategory_name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />
              )}

              <div className="card-body">

                <h5>{service.subcategory_name}</h5>

                <p>{service.description}</p>

                <h6>₹ {service.price}</h6>

              </div>

            </div>

          </div>

        ))}

      </div> */}
      <div>

  {services.map((service) => (

    <div className="card shadow-sm mb-3 p-3" key={service.id}
style={{
    border: "2px solid #f472b6",
    backgroundColor: "#fff5fa"
  }}>
      <div className="row align-items-center">

        {/* Image */}
        <div className="col-md-2">
          {service.image && (
            <img
              src={service.image}
              alt={service.subcategory_name}
              className="img-fluid rounded"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover"
              }}
            />
          )}
        </div>

        {/* Service Details */}
        <div className="col-md-8">
          <h5>{service.subcategory_name}</h5>

          <p>{service.description}</p>

          <h6>₹ {service.price}</h6>
        </div>

        {/* Checkbox */}
        <div className="col-md-2 text-end">

          <input
            type="checkbox"
            className="form-check-input"
            style={{
              accentColor: "#f472b6",
              width: "22px",
              height: "22px",
              cursor: "pointer"
            }}
          />

        </div>

      </div>

    </div>

  ))}

</div>

    </div>
  );
}

export default ArtistServices;