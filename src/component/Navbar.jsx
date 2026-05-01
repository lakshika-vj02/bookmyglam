import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#000",
      color: "#fff",
      padding: "12px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>

      {/* Logo */}
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
        💄 BookMyGlam
      </h1>

      {/* Links */}
      <div style={{
        display: "flex",
        gap: "30px",
        fontSize: "16px"
      }}>
        <Link to="/home" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/artists" style={{ color: "white", textDecoration: "none" }}>Artists</Link>
        <Link to="/services" style={{ color: "white", textDecoration: "none" }}>Services</Link>
        <Link to="/booking" style={{ color: "white", textDecoration: "none" }}>Booking</Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>profile</Link>
      </div>

    </nav>
  );
}