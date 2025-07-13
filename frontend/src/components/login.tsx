import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
 

interface LoginPageProps {
  onToggle: () => void;
}

export default function LoginPage({ onToggle }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Login failed");
      }
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/home"); // or /recommend if you name your route that
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center px-2 py-6">
      <h1 className="mb-6 text-orange-950 text-3xl font-bold">Login</h1>
      <form className="w-full max-w-md flex flex-col gap-6" onSubmit={handleLogin}>
        {/* ...inputs as before */}
        <button
          type="submit"
          className="w-full bg-orange-700 text-orange-50 py-2 px-4 rounded hover:bg-orange-600 hover:ring-4 hover:ring-orange-400 transition font-semibold"
        >
          Login
        </button>
        {error && <div className="text-red-600 font-semibold">{error}</div>}
      </form>
      <div className="mt-8 flex flex-col gap-2 items-center text-m text-orange-950 underline w-full max-w-md">
        <a href="/forgot-password">Forgot Password?</a>
        <button
          type="button"
          className="underline text-orange-950"
          onClick={onToggle}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}