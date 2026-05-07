import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Index() {

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid p-0">

      {/* HOME SECTION */}
      <section className="bg-dark text-white text-center py-5">

        <div className="container py-5">

          <h1 className="hero-title">
            Book Your{" "}
            <span
              style={{
                color: "#ff69b4",
                fontStyle: "italic"
              }}
            >
              Favorite
            </span>{" "}
            Makeup Artist
          </h1>

          <p className="lead mb-4">
            Find and book professional makeup artists
            for every special occasion.
          </p>

          <Link
            to="/services"
            className="btn btn-lg px-5"
            style={{
              backgroundColor: "#f472b6",
              color: "white"
            }}
          >
            Explore Services
          </Link>

        </div>

      </section>

      {/* SERVICES PREVIEW */}
      <section className="container py-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Popular Services
          </h2>

          <p className="text-muted">
            Explore our most loved beauty services
          </p>

        </div>

        <div className="row">

          {artists.length > 0 ? (

            artists.slice(0, 3).map((artist) => (

              <div
                className="col-md-4 mb-4"
                key={artist._id}
              >

                <div className="card shadow-sm h-100">

                  <img
                    src="https://via.placeholder.com/300"
                    className="card-img-top"
                    alt={artist.name}
                    style={{
                      height: "250px",
                      objectFit: "cover"
                    }}
                  />

                  <div className="card-body text-center">

                    <h5 className="fw-bold">
                      {artist.name}
                    </h5>

                    <p className="text-muted">
                      {artist.services?.join(", ")}
                    </p>

                    <Link
                      to="/services"
                      className="btn w-100"
                      style={{
                        backgroundColor: "#f472b6",
                        color: "white"
                      }}
                    >
                      Explore
                    </Link>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <p className="text-center">
              No artists found
            </p>

          )}

        </div>

      </section>

      {/* CONTACT SECTION */}
      <section className="bg-light py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Contact Us
            </h2>

            <p>
              Have questions or need help with booking?
              We're here for you!
            </p>

          </div>

          <div className="row justify-content-center">

            <div className="col-md-8 bg-white p-4 shadow-sm rounded">

              <div className="row text-center">

                <div className="col-md-6">
                  <p className="fw-bold">Email:</p>
                  <p>support@bookmyglam.com</p>
                </div>

                <div className="col-md-6">
                  <p className="fw-bold">Call:</p>
                  <p>+91 98765 43210</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="container text-center py-5">

        <h2 className="mb-4">
          Join Us
        </h2>

        <div className="d-flex justify-content-center gap-3">

          <Link
            to="/login"
            className="btn btn-outline-dark px-4"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="btn btn-dark px-4"
          >
            Register
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Index;