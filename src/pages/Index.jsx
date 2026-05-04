import React from "react";
import Footer from "../component/Footer";
function Index() {
  return (
    <div className="container-fluid p-0">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
     <img 
      src="/makeuplogo.png" 
      alt="logo" 
      style={{ height: "60px" }}
    />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav me-auto mb-2 mb-lg-0"> 
        {/* </div><ul class="navbar-nav mx-auto mb-2 mb-lg-0"></ul> */}
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Artist</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="#">service</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">My Booking</a>
        </li>
        
        
      </ul>
      <form class="d-flex">
        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> */}
      </form>
      <a class="btn btn-primary" href="/login" role="button">Login</a>
    </div>
  </div>
</nav>
      {/* 1. HOME / HERO SECTION */}
      <section id="home" className="bg-dark text-white text-center py-5">
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-4">Welcome to BookMyGlam</h1>
          <p className="lead mb-4">Find and book professional makeup artists for every special occasion.</p>
          <button className="btn btn-lg px-5" style={{backgroundColor: "#f472b6", color: "white"}}>
            Explore Services
          </button>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="container py-5">
        <div className="row align-items-center py-4">
          <div className="col-md-6">
            <h2 className="fw-bold">About Us</h2>
            <hr className="w-25 mb-4" style={{borderTop: "3px solid #f472b6"}} />
            <p className="text-muted">
              BookMyGlam is a trusted makeup booking platform that connects customers with professional makeup artists.
               We aim to make your special moments
               memorable by providing easy booking, reliable services, and high-quality beauty experiences.
            </p>
          </div>
          <div className="col-md-6 text-center">
            {/* Aap yahan image tag bhi laga sakte hain */}
            <div className="bg-light border rounded p-5 shadow-sm">
               <h4 className="text-secondary">Best Beauty Experts</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT SECTION */}
      <section id="contact" className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Contact Us</h2>
            <p>Have questions or need help with booking? We're here for you! 
Reach out to us anytime and our team will assist you with the best possible solutions.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 bg-white p-4 shadow-sm rounded">
              <div className="row text-center">
                <div className="col-md-6">
                  <p className="mb-1 fw-bold">Email:</p>
                  <p>support@bookmyglam.com</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 fw-bold">Call:</p>
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOGIN / CTA SECTION */}
      <section className="container text-center py-5">
        <div className="py-4">
          <h2 className="mb-4">Humein Join Karein</h2>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-dark px-4 py-2">Login</button>
            <button className="btn btn-dark px-4 py-2">Register Now</button>
          </div>
        </div>
      </section>

        <Footer />
    </div>
  );
}

export default Index;