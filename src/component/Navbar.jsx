import { Link } from "react-router-dom";

function Navbar() {
  return (
   <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 shadow-sm fixed-top">
      <div className="container-fluid d-flex align-items-center">

        {/* LOGO LEFT */}
        <Link className="navbar-brand" to="/">
          <img 
            src="/makeupnavlogo-1.png" 
            alt="logo" 
            style={{ height: "60px", objectFit: "contain" }}
          />
        </Link>

        {/* TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* CENTER MENU */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/">Home</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/services">Service</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/artists">Artist</Link>
            </li>

        

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/booking">My Booking</Link>
            </li>

          </ul>

          {/* LOGIN BUTTON */}
          <Link
         className="btn btn-primary"
          to="/login"
          style={{
          backgroundColor: "#f472b6",
          borderColor: "#f472b6"
        }}
>
  Login
</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;