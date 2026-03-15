import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      // This matches the new 'login' endpoint in views.py
      await axios.post(`${apiUrl}/api/users/login/`, { email, password });
      
      localStorage.setItem("email", email);
      navigate("/format"); 
    } catch (err) {
      alert("Account not found or wrong password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white">
      <div className="bg-[#0f172a] p-10 rounded-3xl border border-white/5 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-black/40 border border-slate-800 rounded-xl" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-4 bg-black/40 border border-slate-800 rounded-xl" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 py-4 rounded-xl font-bold">Login</button>
        </form>
        <p className="mt-4 text-center cursor-pointer text-blue-500" onClick={() => navigate('/register')}>Need an account?</p>
      </div>
    </div>
  );
}