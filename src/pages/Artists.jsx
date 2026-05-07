import React, { useEffect, useState } from "react";
import ArtistCard from "../component/ArtistCard";

function Artists() {

  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH DATABASE DATA
  useEffect(() => {

    fetch("http://localhost:5000/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.log(err));
      console.log(artists);

  }, []);

  // SEARCH FILTER
  const filteredArtists = artists.filter((artist) =>
    artist.speciality
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="p-6">

      {/* HEADING */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Choose Your Artist 💄
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search (Bridal, Party...)"
        className="border p-2 w-full mb-6 rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        {filteredArtists.map((artist) => (

          <ArtistCard
            key={artist.id}
            artist={artist}
          />

        ))}

      </div>

    </div>

  );
}

export default Artists;