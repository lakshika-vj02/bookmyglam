import { Link } from "react-router-dom";

function Navbar() {
  return (
   <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 shadow-sm fixed-top">
      <div className="container d-flex align-items-center">

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
          <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">

            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/">Home</Link>
            </li>
            
            {/* <li className="nav-item">
              <Link className="nav-link fw-bold" to="/services">Service</Link>
            </li> */}
            <li className="nav-item dropdown mx-3">
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

            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/artists">Artist</Link>
            </li>

        

            {/* <li className="nav-item">
              <Link className="nav-link fw-bold" to="/booking">My Booking</Link>
            </li> */}
<li className="nav-item  mx-3">
              <Link className="nav-link fw-bold" to="/My-booking">My-booking</Link>
            </li>
           
          </ul>

          {/* LOGIN BUTTON */}
          {/* <Link
         className="btn ms-3"
          to="/login"
          style={{
          backgroundColor: "#f472b6",
          borderColor: "#f472b6"
        }}
>
  Login
</Link> */}
<li className="nav-item dropdown ms-3" style={{ listStyle: "none" }}>
  <a
    className="nav-link"
    href="/#"
    id="profileDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i
      className="bi bi-person-circle"
      style={{ fontSize: "2rem", color: "#f472b6" }}
    ></i>
  </a>

  <ul className="dropdown-menu dropdown-menu-end">
    <li>
      <Link className="dropdown-item" to="/login">
        🔑 Login
      </Link>
    </li>

    <li>
      <Link className="dropdown-item" to="/My-booking">
        📖 My Booking
      </Link>
    </li>

    <li>
      <button className="dropdown-item">
        🚪 Logout
      </button>
    </li>
  </ul>
</li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;