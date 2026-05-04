import { Link } from "react-router-dom";

export default function Navbar() {
  // Inline Styles
  const navStyle = {
    backgroundColor: "black",
    color: "white",
    width: "100%",
  };

  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Logo left, Links right
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    letterSpacing: "-0.025em",
  };

  const linksContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        
        {/* LEFT: Logo Area */}
        <div>
          <img 
      src="/makeuplogo.png" 
      alt="logo" 
      style={{ height: "40px" }}
    />
          <h1 style={logoStyle}>
            💄 BookMyGlam
          </h1>
        </div>

        {/* RIGHT: Links Area */}
        <div style={linksContainerStyle}>
          <Link to="/home" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#f472b6'} onMouseOut={(e) => e.target.style.color = 'white'}>Home</Link>
          <Link to="/artists" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#f472b6'} onMouseOut={(e) => e.target.style.color = 'white'}>Artists</Link>
          <Link to="/services" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#f472b6'} onMouseOut={(e) => e.target.style.color = 'white'}>Services</Link>
          <Link to="/booking" style={linkStyle} onMouseOver={(e) => e.target.style.color = '#f472b6'} onMouseOut={(e) => e.target.style.color = 'white'}>Booking</Link>
        </div>

      </div>
    </nav>
  );
}