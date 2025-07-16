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
    <div className="shadow-md p-4 w-full rounded-2xl border-8 border-[#6D271B] bg-[#F2ECE3]">
      <h2 className="text-2xl font-bold text-orange-800 mb-2">{movie.title}</h2>
      <div className="bg-orange-200 rounded-2xl text-orange-800 border "><p className="m-2"><strong>Genre:</strong> {movie.genre}</p>
      <p className="m-2"><strong>Cast:</strong> {movie.cast}</p> 
      <p className="m-2"><strong>Director:</strong> {movie.director}</p> 
      
      <p className="m-2"><strong>Production:</strong> {movie.production_house}</p>
      <p className="m-2"><strong>Release:</strong> {movie.release_date}</p>
      <p className="mt-2 ml-2">{movie.plot}</p>
      </div>
       
      
      {movie.image_url && (
        movie.video_url ? (
        <a href={movie.video_url} target="_blank" rel="noopener noreferrer">
        <img
        src={movie.image_url}
        alt={movie.title}
        className="mt-3 rounded-md w-full"
        />
        </a>
  ) : (
    <img
      src={movie.image_url}
      alt={movie.title}
      className="mt-3 rounded-md w-full opacity-60"
    />
  )
)}


      
    </div>
  );
}