import React from "react";

function Services() {
  const services = [
  {
    name: "Bridal Makeup",
    price: "₹5000",
    img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec" // bridal makeup
  },
  {
    name: "Party Makeup",
    price: "₹2000",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" // party makeup
  },
  {
    name: "Hair Styling",
    price: "₹1500",
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702" // hair styling
  },
  {
    name: "Facial",
    price: "₹1200",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908" // facial
  },
  {
    name: "Waxing",
    price: "₹800",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348" // waxing
  },
  {
    name: "Nail Art",
    price: "₹1000",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371" // nail art
  }
];

  return (
    <div className="container py-5">

      {/* HEADING */}
      <h2 className="text-center fw-bold mb-5">Our Services</h2>

      {/* CARDS */}
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm h-100">

              {/* IMAGE */}
              <img
                src={service.img}
                className="card-img-top"
                alt={service.name}
                style={{ height: "200px", objectFit: "cover" }}
              />

              {/* CONTENT */}
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{service.name}</h5>
                <p className="text-muted">{service.price}</p>

                {/* BUTTON */}
                <button
                  className="btn w-100"
                  style={{ backgroundColor: "#f472b6", color: "white" }}
                >
                  Book Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Services;