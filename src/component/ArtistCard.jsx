import { useNavigate } from "react-router-dom";

export default function ArtistCard({ artist }) {

  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-xl shadow p-4">

      {/* IMAGE */}
      <img
    src={`http://localhost:5000/${artist.img}`}
    alt={artist.name}
    className="w-100 rounded"
    style={{
    height: "250px",
    objectFit: "cover"
     }}
    />

      {/* NAME */}
      <h2 className="text-lg font-bold mt-2">
        {artist.name}
      </h2>

      {/* SPECIALITY */}
      <p className="text-sm text-gray-500">
        {artist.speciality}
      </p>

      {/* EXPERIENCE */}
      <p className="text-sm text-gray-500">
        Experience: {artist.experience}
      </p>

      {/* RATING */}
      <p className="text-sm text-yellow-500">
        ⭐ {artist.rating}
      </p>

      {/* CATEGORY */}
      <p className="text-sm text-pink-500">
        {artist.category}
      </p>

      {/* BUTTON */}
      <button
        onClick={() =>
          navigate("/booking", { state: artist })
        }
        className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg w-full"
      >
        Book Now
      </button>

    </div>

  );
}