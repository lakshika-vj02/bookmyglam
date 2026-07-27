import React, { useEffect, useState } from "react";
import ArtistCard from "../component/ArtistCard";
import { useParams } from "react-router-dom";

function Artists() {

  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const { subcategoryId } = useParams();

  // FETCH DATABASE DATA
  useEffect(() => {

    // fetch("`${process.env.REACT_APP_API_URL}/artists")
    // fetch(``${process.env.REACT_APP_API_URL}/artists/subcategory/${subcategoryId}`)
    const url = subcategoryId
      ? `${process.env.REACT_APP_API_URL}/artists/subcategory/${subcategoryId}`
      : `${process.env.REACT_APP_API_URL}/artists`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.log(err));
  }, [subcategoryId]);

  // SEARCH FILTER
const filteredArtists = artists.filter((artist) => {

    if (!search.trim()) return true;

  const specialty = (artist.specialty || "").toLowerCase();

  return specialty.includes(search.toLowerCase());

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