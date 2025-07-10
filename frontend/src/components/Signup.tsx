import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

interface SignupPageProps {
  onToggle: () => void;
}

export default function SignupPage({ onToggle }: SignupPageProps) {
  const [form, setForm] = useState({
    first_name : "",
    last_name : "",
    email : "",
    password :"",
    conform_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setForm({ ...form, [e.target.id]:e.target.value});
  };

  const handleSignup = async (e: React.FormEvent) =>{
    e.preventDefault();
    setError("");
    try{
      const response = await fetch("http://localhost:8000/auth/signup",{
        method : "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
      if (!response.ok){
        const data = await response.json();
        throw new Error(data.detail || "Signup Falid");
      }
      
    
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center px-2 py-6">
      <h1 className="mb-6 text-orange-950 text-3xl font-bold">Signup</h1>
      <form className="w-full max-w-md flex flex-col gap-6" onSubmit={handleSignup}>
        {/* ...inputs as before */}
        <button
          type="submit"
          className="w-full bg-orange-700 text-orange-50 py-2 px-4 rounded hover:bg-orange-600 hover:ring-4 hover:ring-orange-400 transition font-semibold"
        >
          Sign Up
        </button>
        {error && <div className="text-red-600 font-semibold">{error}</div>}
      </form>
      <div className="mt-8 flex flex-col gap-2 items-center text-m text-orange-950 underline w-full max-w-md">
        <button
          type="button"
          className="underline text-orange-950"
          onClick={onToggle}
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}