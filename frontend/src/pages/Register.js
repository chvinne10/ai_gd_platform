import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  // These were missing (Line 5 & 7 errors)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // This was missing (Line 10 error)

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create user in MySQL
      await axios.post("http://127.0.0.1:8000/api/users/register/", { 
        email: email, 
        password: password 
      });

      // Step 2: Trigger OTP send
      await axios.post("http://127.0.0.1:8000/api/users/send-otp/", { 
        email: email, 
        password: password 
      });

      localStorage.setItem("email", email);
      navigate("/otp");
    } catch (err) {
      alert(err.response?.data?.error || "Registration Failed. Try a different email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] p-6">
      <div className="bg-[#0f172a] p-10 rounded-[2.5rem] border border-white/5 w-full max-w-md shadow-2xl">
        <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 text-xl">👤</div>
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-slate-500 text-center mb-8 text-sm">Join the AI Group Discussion Platform</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" placeholder="name@example.com" 
              className="w-full p-4 mt-2 bg-black/40 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
              onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" placeholder="Create Password" 
              className="w-full p-4 mt-2 bg-black/40 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold text-lg mt-4 shadow-lg shadow-blue-600/20">
            Register & Continue
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-sm">
          Already have an account? <span onClick={() => navigate('/')} className="text-blue-500 font-bold cursor-pointer hover:underline">Sign In</span>
        </p>
      </div>
    </div>
  );
}