import { useEffect, useState } from "react";
import MovieCard from "./card";

type Movie = {
  title: string;
  genre: string;
  cast: string;
  director: string;
  production_house: string;
  release_date: string;
  plot: string;
  image_url?: string;
  video_url?: string;
};

export default function HomePage() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [movieName, setMovieName] = useState("Mahabhoj");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async (movie: string) => {
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please login first.");
      }

      const res = await fetch(
        `http://localhost:8000/recommend/?movie=${encodeURIComponent(movie)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to fetch recommendations");
      }

      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(movieName);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movieName.trim()) {
      fetchRecommendations(movieName.trim());
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-orange-800">Movie Recommender</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="flex-1 p-2 border-2 border-orange-600 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="bg-orange-700 text-white px-4 rounded hover:bg-orange-500"
        >
          Recommend
        </button>
      </form>

      {loading && <p className="text-orange-700">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {recommendations.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    </div>
  );
}
