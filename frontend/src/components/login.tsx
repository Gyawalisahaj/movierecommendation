import React from "react";

interface LoginPageProps {
  onToggle: () => void;
}

export default function LoginPage({ onToggle }: LoginPageProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center px-2 py-6">
      <h1 className="mb-6 text-orange-950 text-3xl font-bold">Login</h1>
      <form className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col text-orange-950">
          <label className="mb-2 text-2xl" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            className="p-2 border-2 border-orange-700 rounded-md text-black text-base outline-none focus:ring-4 focus:ring-orange-400"
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-700 text-orange-50 py-2 px-4 rounded hover:bg-orange-600 hover:ring-4 hover:ring-orange-400 transition font-semibold"
        >
          Login
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-2 items-center text-m text-orange-950 underline w-full max-w-md">
        <button
          type="button"
          className="w-full bg-orange-700 text-orange-50 py-2 px-4 rounded hover:bg-orange-600 hover:ring-4 hover:ring-orange-400 transition font-semibold"
          onClick={onToggle}
        >
          Create New Account
        </button>
         <a href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
}