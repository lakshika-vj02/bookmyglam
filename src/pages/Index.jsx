import React from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="container-fluid p-0">

      {/* HOME SECTION */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-4">Welcome to BookMyGlam</h1>
          <p className="lead mb-4">
            Find and book professional makeup artists for every special occasion.
          </p>

          <Link
            to="/services"
            className="btn btn-lg px-5"
            style={{ backgroundColor: "#f472b6", color: "white" }}
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="container py-5">
        <div className="row align-items-center py-4">
          <div className="col-md-6">
            <h2 className="fw-bold">About Us</h2>
            <hr className="w-25 mb-4" style={{ borderTop: "3px solid #f472b6" }} />
            <p className="text-muted">
              BookMyGlam is a trusted makeup booking platform that connects
              customers with professional makeup artists. We aim to make your
              special moments memorable by providing easy booking, reliable
              services, and high-quality beauty experiences.
            </p>
          </div>

          <div className="col-md-6 text-center">
            <div className="bg-light border rounded p-5 shadow-sm">
              <h4 className="text-secondary">Best Beauty Experts</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Contact Us</h2>
            <p>
              Have questions or need help with booking? We're here for you!
              Reach out anytime and our team will assist you.
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
        <h2 className="mb-4">Join Us</h2>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-outline-dark px-4">
            Login
          </Link>
          <Link to="/signup" className="btn btn-dark px-4">
            Register
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Index;