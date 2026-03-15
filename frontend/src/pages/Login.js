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
      await axios.post("http://127.0.0.1:8000/api/users/send-otp/", { email, password });
      localStorage.setItem("email", email);
      navigate("/otp");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("Account not found. Redirecting to Register...");
        navigate("/register");
      } else {
        alert("Invalid Email or Password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] p-6">
      <div className="bg-[#0f172a] p-10 rounded-[2.5rem] border border-white/5 w-full max-w-md shadow-2xl">
        <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 text-xl">🧠</div>
        <h1 className="text-3xl font-bold text-center mb-2">AI Group Discussion</h1>
        <p className="text-slate-500 text-center mb-8 text-sm">Practice communication skills with AI monitoring</p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" placeholder="you@example.com" 
              className="w-full p-4 mt-2 bg-black/40 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
              onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" placeholder="••••••••" 
              className="w-full p-4 mt-2 bg-black/40 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold text-lg mt-4 transition-all shadow-lg shadow-blue-600/20">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-sm">
          Don't have an account? <span onClick={() => navigate('/register')} className="text-blue-500 font-bold cursor-pointer hover:underline">Create Account</span>
        </p>
      </div>
    </div>
  );
}