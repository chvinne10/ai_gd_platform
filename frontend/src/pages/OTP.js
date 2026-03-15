import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/users/verify-otp/", { email, otp });
      navigate("/format");
    } catch {
      alert("Invalid OTP code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] p-6">
      <div className="bg-[#0f172a] p-10 rounded-[2.5rem] border border-white/5 w-full max-w-md text-center shadow-2xl">
        <div className="text-blue-500 text-5xl mb-6">✉️</div>
        <h1 className="text-3xl font-bold mb-2">Verify Email</h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          We've sent a 6-digit verification code to <br/><span className="text-white font-medium">{email}</span>
        </p>

        <form onSubmit={verifyOtp} className="space-y-6">
          <input 
            type="text" placeholder="000000" maxLength="6"
            className="w-full p-5 bg-black/40 border border-slate-800 rounded-2xl text-center text-3xl font-bold tracking-[0.5em] focus:border-blue-500 outline-none transition-all"
            onChange={(e) => setOtp(e.target.value)} required
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all">
            Verify & Continue
          </button>
        </form>

        <button onClick={() => navigate('/')} className="mt-8 text-slate-500 text-sm hover:text-white transition-all">
          ← Back to Login
        </button>
      </div>
    </div>
  );
}