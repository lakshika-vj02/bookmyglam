import React, { useState } from "react";
import { artists } from "../Data/artists"; 
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔍 Filter
  const filteredArtists = artists.filter((artist) =>
    artist.services.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* ✅ HEADING */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Choose Your Artist 💄
      </h2>

      {/* ✅ SEARCH BAR */}
      <input
        type="text"
        placeholder="Search (Bridal, Party...)"
        className="border p-2 w-full mb-6 rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ ARTIST CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            className="bg-white shadow rounded-xl p-4"
          >
            {/* Name */}
            <h3 className="text-lg font-semibold">
              {artist.name}
            </h3>

            {/* Services */}
            <p className="text-gray-500 text-sm">
              {artist.services.join(", ")}
            </p>

            {/* ✅ BOOK BUTTON */}
            <button
              onClick={() => navigate("/booking", { state: artist })}
              className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;
