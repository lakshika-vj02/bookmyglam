export default function ArtistCard({ artist }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src="https://via.placeholder.com/150"
        alt={artist.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-lg font-bold mt-2">{artist.name}</h2>

      <p className="text-sm text-gray-500">
        {artist.services.join(", ")}
      </p>

      <button className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg w-full">
        Book Now
      </button>
    </div>
  );
}