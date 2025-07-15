// src/components/card.tsx
interface Movie {
  title: string;
  genre: string;
  cast: string;
  director: string;
  production_house: string;
  release_date: string;
  plot: string;
  image_url?: string;
  video_url?: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="bg-white shadow-md border border-orange-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-orange-800 mb-2">{movie.title}</h2>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <div className="bg-orange-400 rounded-2xl"><p><strong>Cast:</strong> {movie.cast}</p> </div>
      <div className="bg-orange-400 rounded-2xl"> <p><strong>Director:</strong> {movie.director}</p> </div>
      
      <p><strong>Production:</strong> {movie.production_house}</p>
      <p><strong>Release:</strong> {movie.release_date}</p>
      <p className="mt-2">{movie.plot}</p>
      {movie.image_url && (
        <img src={movie.image_url} alt={movie.title} className="mt-3 rounded-md w-full" />
      )}
    </div>
  );
}
