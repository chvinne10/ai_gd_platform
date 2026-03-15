import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      await axios.post(`${apiUrl}/api/users/register/`, { email, password });
      alert("Account Created! You can now Sign In.");
      navigate("/"); // Go to Login
    } catch (err) {
      alert(err.response?.data?.error || "Registration Failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
      <div className="bg-[#0f172a] p-10 rounded-3xl border border-white/5 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-black/40 border border-slate-800 rounded-xl" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-4 bg-black/40 border border-slate-800 rounded-xl" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 py-4 rounded-xl font-bold">Create Account</button>
        </form>
        <p className="mt-4 text-center cursor-pointer text-blue-500" onClick={() => navigate('/')}>Back to Login</p>
      </div>
    </div>
  );
}