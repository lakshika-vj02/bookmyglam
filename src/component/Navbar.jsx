import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white w-full">
      {/* Container to handle padding and max-width */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT → Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold tracking-tight">
            💄 BookMyGlam
          </h1>
        </div>

        {/* RIGHT → Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/home" className="hover:text-pink-400 transition-colors">Home</Link>
          <Link to="/artists" className="hover:text-pink-400 transition-colors">Artists</Link>
          <Link to="/services" className="hover:text-pink-400 transition-colors">Services</Link>
          <Link to="/booking" className="hover:text-pink-400 transition-colors">Booking</Link>
        </div>

      </div>
    </nav>
  );
}