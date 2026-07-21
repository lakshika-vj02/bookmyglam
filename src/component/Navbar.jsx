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
            
            {/* <li className="nav-item">
              <Link className="nav-link fw-bold" to="/services">Service</Link>
            </li> */}
            <li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle fw-bold"
    href="#"
    id="serviceDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Service
  </a>

  <ul className="dropdown-menu">
    <li>
      <Link className="dropdown-item" to="/services">
        All Services
      </Link>
    </li>

    <li>
      <Link className="dropdown-item" to="/subcategory/1">
         Hair Styling
      </Link>
    </li>

    <li>
      <Link className="dropdown-item" to="/subcategory/2">
        Nail Art
      </Link>
    </li>

    <li>
      <Link className="dropdown-item" to="/subcategory/3">
        Skin care
      </Link>
    </li>

    <li>
      <Link className="dropdown-item" to="/subcategory/4">
        Makeup
      </Link>
    </li>
  </ul>
</li>

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/artists">Artist</Link>
            </li>

        

            {/* <li className="nav-item">
              <Link className="nav-link fw-bold" to="/booking">My Booking</Link>
            </li> */}
<li className="nav-item">
              <Link className="nav-link fw-bold" to="/My-booking">My-booking</Link>
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