import React, { useState, ChangeEvent, FormEvent } from "react";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginPageProps {
  onToggle: () => void;
  onLoginSuccess: () => void;  // add this prop
}

export default function LoginPage({ onToggle, onLoginSuccess }: LoginPageProps) {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      setLoading(false);

      // Call onLoginSuccess callback here:
      onLoginSuccess();

    } catch (err: any) {
      setError("Network error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto min-h-[400px] border rounded-md shadow-md bg-[#F2ECE3]">
      <h1 className="mb-6 text-orange-950 text-3xl font-bold">Login Page</h1>

      {error && (
        <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="flex flex-col text-orange-950">
          <label className="mb-2 text-2xl" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            className="p-2 border-2 border-orange-700 rounded-md text-black text-base outline-none focus:ring-4 focus:ring-orange-400"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col text-orange-950">
          <label className="mb-2 text-2xl" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your Password"
            className="p-2 border-2 border-orange-700 rounded-md text-black text-base outline-none focus:ring-4 focus:ring-orange-400"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-700 text-orange-950 py-2 px-4 rounded hover:bg-orange-400 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div
        className="mt-8 text-orange-950 underline cursor-pointer text-center"
        onClick={onToggle}
      >
        Create New Account
      </div>
    </div>
  );
}
