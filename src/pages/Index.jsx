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

      <section
  className="text-white text-center d-flex align-items-center"
  style={{
    minHeight: "90vh",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
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
            Popular Artists
          </h2>

          <p className="text-muted fst-italic">
  Transform your look with skilled artists
  who create beauty that feels unforgettable.
</p>

        </div>

        <div className="row">

          {artists.length > 0 ? (

            artists.slice(0, 3).map((artist) => (

              <div
                className="col-md-4 mb-4"
                key={artist.id}
              >

                <div className="card shadow-sm h-100">

                  <img
                    src={`http://localhost:5000/images/${artist.profile_image}`}
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
                      to="/Artists"
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
      {/* CONTACT + CTA SECTION */}
<section
  className="py-5"
  style={{
    background:
      "linear-gradient(to right, #fff1f2, #fdf2f8)"
  }}
>

  <div className="container">

    <div className="row align-items-center">

      {/* LEFT CONTENT */}
      <div className="col-md-6 mb-4">

        <h1
          className="fw-bold mb-4"
          style={{
            fontSize:"55px"
          }}
        >
          Book Your
          Dream Look ✨
        </h1>

        <p
          className="text-muted mb-4"
          style={{
            fontSize:"18px"
          }}
        >
          Professional makeup artists,
          bridal makeover, hair styling,
          nail art and premium beauty
          services for every occasion.
        </p>

        <div className="d-flex gap-3 flex-wrap">

          <Link
            to="/services"
            className="btn px-4 py-3"
            style={{
              background:"#f472b6",
              color:"white",
              borderRadius:"12px",
              fontWeight:"600"
            }}
          >
            Explore Services
          </Link>

          <Link
            to="/signup"
            className="btn btn-dark px-4 py-3"
            style={{
              borderRadius:"12px"
            }}
          >
            Join Now
          </Link>

        </div>

      </div>

      {/* RIGHT CARD */}
      <div className="col-md-6">

        <div
          className="bg-white p-5 shadow-lg"
          style={{
            borderRadius:"25px"
          }}
        >

          <h3 className="fw-bold mb-4">
            Contact Us
          </h3>

          <div className="mb-4">

            <h6 className="fw-bold">
              📧 Email
            </h6>

            <p className="text-muted">
              support@bookmyglam.com
            </p>

          </div>

          <div className="mb-4">

            <h6 className="fw-bold">
              📞 Call
            </h6>

            <p className="text-muted">
              +91 98765 43210
            </p>

          </div>

          <div>

            <h6 className="fw-bold">
              📍 Location
            </h6>

            <p className="text-muted">
              Jaipur, Rajasthan
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
</div>
  );
}

export default Index;