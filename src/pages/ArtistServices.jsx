import React from "react";
import { useParams } from "react-router-dom";

function ArtistServices() {
  const { artistId } = useParams();

  return (
    <div className="container">
      <h2>Artist Services</h2>
      <p>Artist ID: {artistId}</p>
    </div>
  );
}

export default ArtistServices;