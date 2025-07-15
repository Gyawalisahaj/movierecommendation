import React, { useState, ChangeEvent, FormEvent } from "react";

interface SignupForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface SignupPageProps {
  onToggle: () => void;
}

export default function SignupPage({ onToggle }: SignupPageProps) {
  const [form, setForm] = useState<SignupForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

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
    setSuccess("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Signup failed");
        return;
      }

      setSuccess("Signup successful! You can now login.");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } catch (err: any) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-start px-2 py-4"
    >
      <h1 className="mt-2 sm:mt-5 text-orange-950 text-3xl font-bold">
        Signup Page
      </h1>

      {error && (
        <div className="text-red-600 text-lg font-semibold mt-4">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-lg font-semibold mt-4">{success}</div>
      )}

      {[
        { label: "First Name", id: "first_name", type: "text", placeholder: "Enter your First Name" },
        { label: "Last Name", id: "last_name", type: "text", placeholder: "Enter your Last Name" },
        { label: "Email", id: "email", type: "email", placeholder: "Enter your Email" },
        { label: "Password", id: "password", type: "password", placeholder: "Enter your Password" },
        { label: "Confirm Password", id: "confirm_password", type: "password", placeholder: "Confirm your Password" },
      ].map(({ label, id, type, placeholder }) => (
        <div
          key={id}
          className="flex flex-col text-orange-950 mt-4 w-full max-w-md"
        >
          <label className="mb-1 text-2xl" htmlFor={id}>
            {label}:
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className="p-2 border-2 border-orange-700 rounded-md text-black text-base outline-none focus:ring-4 focus:ring-orange-400"
            value={form[id as keyof SignupForm]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <div className="flex w-full max-w-md mt-6">
        <button
          type="submit"
          className="w-full bg-orange-700 text-orange-950 py-2 px-4 rounded hover:bg-orange-400 transition"
        >
          Sign Up
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-2 items-center text-m text-orange-950 underline cursor-pointer">
        <div onClick={onToggle}>Already have an account? Login here</div>
      </div>
    </form>
  );
}
