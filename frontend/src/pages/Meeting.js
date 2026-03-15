import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Meeting() {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [topic, setTopic] = useState("Loading Topic...");
    const [warning, setWarning] = useState("");
    const [chunks, setChunks] = useState([]);
    const navigate = useNavigate();

    // 1. Initialize Topic and Camera
    useEffect(() => {
        const storedTopic = localStorage.getItem("gd_topic");
        if (storedTopic) setTopic(storedTopic);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                // Start Recording Audio
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (e) => setChunks(prev => [...prev, e.data]);
                recorder.start();
                mediaRecorderRef.current = recorder;
            });
    }, []);

    // 2. Real-time AI Monitoring (Every 3 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!videoRef.current) return;
            const canvas = document.createElement("canvas");
            canvas.width = 640; canvas.height = 480;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoRef.current, 0, 0, 640, 480);
            
            axios.post("http://127.0.0.1:8000/discussion/analyze-frame/", {
                image: canvas.toDataURL("image/jpeg")
            }).then(res => {
                if (res.data.warning) setWarning(res.data.warning);
                else setWarning("");
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const finishSession = () => {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = async () => {
            const blob = new Blob(chunks, { type: "audio/webm" });
            const formData = new FormData();
            formData.append("audio", blob);
            formData.append("session_id", localStorage.getItem("session_id"));

            // Send to backend for Whisper + Gemini analysis
            await axios.post("http://127.0.0.1:8000/discussion/finish/", formData);
            navigate('/result');
        };
    };

    return (
        <div className="h-screen bg-black flex flex-col">
            <div className="p-6 flex justify-between items-center bg-[#050505] border-b border-white/5">
                <h2 className="font-bold text-blue-400">{topic}</h2>
                <div className="bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-sm animate-pulse">
                    {warning || "Monitoring Active"}
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-10">
                <video ref={videoRef} autoPlay muted className="rounded-3xl border-4 border-white/5 shadow-2xl w-full max-w-4xl" />
            </div>
            <div className="p-10 flex justify-center gap-6 bg-[#050505]">
                <button className="p-4 bg-white/5 rounded-full">🎤</button>
                <button className="p-4 bg-white/5 rounded-full">📹</button>
                <button onClick={finishSession} className="bg-red-600 px-10 py-4 rounded-2xl font-bold">End Session</button>
            </div>
        </div>
    );
}