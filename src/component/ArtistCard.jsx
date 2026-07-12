import { useNavigate } from "react-router-dom";

export default function ArtistCard({ artist }) {

  const navigate = useNavigate();

  return (

    <div className="card shadow-lg border-0 rounded-4 overflow-hidden h-100">

      {/* IMAGE */}
      <img
        src={artist.profile_image}
        alt={artist.profile_image}
        className="card-img-top"
        style={{
          height: "250px",
          objectFit: "cover"
        }}
      />

      <div className="card-body">

        {/* NAME */}
        <h4 className="card-title fw-bold">
          {artist.name}
        </h4>
        

        {/* SPECIALITY */}
        <p className="text-muted mb-2">
          {artist.speciality}
        </p>
        {artist.offer_price ? (
  <>
    <span className="text-decoration-line-through text-muted">
      ₹{artist.price}
    </span>

    <span className="text-danger ms-2 fw-bold">
      ₹{artist.offer_price}
    </span>
  </>
) : (
  <p>₹{artist.price}</p>
)}


<p className="text-secondary">
  Duration: {artist.duration}
</p>

        {/* EXPERIENCE */}
        <p className="mb-2">
          Experience: {artist.experience}
        </p>

        {/* RATING */}
        <p className="text-warning fw-semibold mb-2">
          ⭐ {artist.rating}
        </p>

        {/* CATEGORY */}
        <p className="text-danger mb-3">
          {artist.category}
        </p>

        {/* BUTTON */}
        <div className="d-grid gap-2">
        <button
          onClick={() => navigate(`/artist-services/${artist.id}`)}
            className="btn w-100 mb-2"
  style={{
    backgroundColor: "#f472b6",
    border: "none",
    color: "white"
   }}>
   View Services
</button>
        <button
  onClick={() =>
    navigate("/booking", { state: artist })
  }
  className="btn w-100 rounded-pill"
  style={{
    backgroundColor: "#f472b6",
    border: "none",
    color: "white"
  }}
>
  Book Now
</button>
</div>
      </div>

    </div>

  );
}