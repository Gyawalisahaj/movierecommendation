import { useEffect,useRef, useState } from "react";
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allTitles, setAllTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);


  const fetchAllTitles = async () => {
    try {
      const res = await fetch("http://localhost:8000/recommend/titles");
      const data = await res.json();
      setAllTitles(data.titles || []);
    } catch (err) {
      console.error("Error fetching titles");
    }
  };

  const fetchRecommendations = async (movie: string) => {
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated. Please login first.");

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
  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsTyping(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, []);


  useEffect(() => {
    fetchAllTitles();
    fetchRecommendations(movieName);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMovieName(value);
    setIsTyping(true);
    const filtered = allTitles.filter((title) =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); 
  };

  const handleSuggestionClick = (title: string) => {
    setMovieName(title);
    setSuggestions([]);
    setIsTyping(false);
    fetchRecommendations(title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(false);
    if (movieName.trim()) fetchRecommendations(movieName.trim());
  };

  return (
    <div className="p-6 flex flex-col h-max w-screen bg-[#F9F6EF] items-center gap-6">
      <h1 className="text-3xl font-bold text-orange-800">Movie Recommender</h1>

      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <input
        ref={inputRef}
        type="text"
        placeholder="Enter movie name..."
        value={movieName}
        onChange={handleInputChange}
        onFocus={() => setIsTyping(true)} 
        className="w-full p-2 border-2 border-orange-600 rounded-md outline-none focus:ring-2 focus:ring-orange-400 text-orange-800"
        />

      {isTyping && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md mt-1 shadow-md text-left max-h-60 overflow-y-auto">
        {suggestions.map((title, index) => (
          <li
          key={index}
          onClick={() => handleSuggestionClick(title)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-orange-800"
          >
            {title}
          </li>
        ))}
        </ul>
      )}
        
        <button
          type="submit"
          className="absolute h-11 right-0 top-0  bg-orange-700 text-orange-50  rounded-2xl hover:bg-orange-400"
        >
          Recommended
        </button>
      </form>

      {loading && <p className="text-orange-700">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {recommendations.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    </div>
  );
}
