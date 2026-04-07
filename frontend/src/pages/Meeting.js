import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MeetingRoom() {
    const [topic, setTopic] = useState("AI is preparing the topic...");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [emotionHistory, setEmotionHistory] = useState([]);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

    // --- OS HARDWARE: ON ---
    useEffect(() => {
        const startHardware = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                streamRef.current = stream;
                if (videoRef.current) videoRef.current.srcObject = stream;
                
                const res = await axios.post(`${apiUrl}/discussion/start/`);
                setTopic(res.data.topic);
            } catch (err) {
                console.error("Hardware Error:", err);
            }
        };
        startHardware();
        // Cleanup: Ensures OS access ends if user closes tab
        return () => stopHardware();
    }, [apiUrl]);

    // --- OS HARDWARE: OFF ---
    const stopHardware = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const capture = useCallback(async () => {
        if (isVideoOff || !videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = 640; canvas.height = 480;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        try {
            const res = await axios.post(`${apiUrl}/api/ai/analyze/`, { image: canvas.toDataURL('image/jpeg') });
            setEmotionHistory(prev => [...prev, res.data.emotion]);
        } catch (e) { console.log("AI monitoring..."); }
    }, [apiUrl, isVideoOff]);

    useEffect(() => {
        const interval = setInterval(capture, 5000);
        return () => clearInterval(interval);
    }, [capture]);

    // --- END SESSION & REDIRECT ---
    const handleEndSession = async () => {
        try {
            // 1. Physically turn off Camera/Mic
            stopHardware(); 

            // 2. Send data to Backend for scoring
            const res = await axios.post(`${apiUrl}/api/ai/evaluate/`, {
                emotion_history: emotionHistory,
                transcript: "User participated in the discussion." 
            });

            // 3. Redirect with data
            navigate('/result', { state: res.data });
        } catch (err) {
            stopHardware();
            navigate('/result', { state: { score: 0, grade: 'N/A', insight: 'Connection error during evaluation.' } });
        }
    };

    return (
        <div className="h-screen bg-[#020617] text-white flex flex-col p-8">
            <div className="flex-1 relative bg-black rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                <video ref={videoRef} autoPlay playsInline muted={isMuted} className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`} />
                {isVideoOff && <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 text-xl font-bold">Camera is OFF</div>}
                
                <div className="absolute top-10 left-10 bg-black/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10 max-w-md">
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">Live Topic</p>
                    <p className="text-sm font-medium leading-relaxed">{topic}</p>
                </div>
            </div>

            <div className="p-10 flex justify-center items-center gap-8 bg-[#020617]">
                <button onClick={() => {
                    const t = streamRef.current?.getAudioTracks()[0];
                    if(t) { t.enabled = !t.enabled; setIsMuted(!t.enabled); }
                }} className={`p-6 rounded-full transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-slate-800'}`}>
                    {isMuted ? '🔇' : '🎤'}
                </button>
                <button onClick={() => {
                    // Logic: Hard stop video track to turn off light
                    const t = streamRef.current?.getVideoTracks()[0];
                    if(t) { t.stop(); setIsVideoOff(true); } 
                }} className={`p-6 rounded-full transition-all ${isVideoOff ? 'bg-red-500/20 text-red-500' : 'bg-slate-800'}`}>
                    {isVideoOff ? '🚫' : '📹'}
                </button>
                <button onClick={handleEndSession} className="bg-red-600 hover:bg-red-500 px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all">
                    End Session
                </button>
            </div>
        </div>
    );
}