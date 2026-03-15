import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Otp from './pages/OTP'; 
import Format from './pages/Format';
import Home from './pages/Home';
import Topic from './pages/Topic';
import Meeting from './pages/Meeting';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <div className="bg-[#020617] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/format" element={<Format />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;