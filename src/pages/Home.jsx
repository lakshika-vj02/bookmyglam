import React from "react";
import { artists } from "../Data/artists";

function Home() {
  return (
    <div>
      {artists.map((artist) => (
        <div key={artist.id}>
          <h3>{artist.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;