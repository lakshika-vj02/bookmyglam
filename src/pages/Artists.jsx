import React, { useEffect, useState } from "react";
import ArtistCard from "../component/ArtistCard";
import "./Artists.css";

function Artists() {

  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH DATABASE DATA
  useEffect(() => {

    fetch("http://localhost:5000/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.log(err));

  }, []);

  // SEARCH FILTER
const filteredArtists = artists.filter((artist) => {

  const speciality = artist.speciality
    ?.toLowerCase();

  const searchWords = search
    .toLowerCase()
    .split(" ");

  return searchWords.some((word) =>
    speciality.includes(word)
  );

});
  return (
     <div className="artist-page">
    <div className="container py-5">
      

      {/* HEADING */}
      <h2 className="text-center fw-bold mb-4">
        Choose Your Artist 💄
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search (Bridal, Party...)"
        className="form-control mb-5"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CARDS */}
      <div className="row g-4">

        {filteredArtists.map((artist) => (

          <div className="col-lg-4 col-md-6" key={artist.id}>

            <ArtistCard artist={artist} />

          </div>

        ))}

      </div>

    </div>
    </div>

  );
}

export default Artists;