import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Topic() {
    const [topic, setTopic] = useState("Generating Topic...");
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://127.0.0.1:8000/discussion/start/")
            .then(res => {
                setTopic(res.data.topic);
                localStorage.setItem("gd_topic", res.data.topic);
                localStorage.setItem("session_id", res.data.session_id);
            });
    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#020617]">
            <div className="bg-[#0f172a] p-12 rounded-[3rem] border border-white/5 text-center max-w-2xl">
                <h2 className="text-blue-500 uppercase tracking-widest text-sm mb-4">Preparation Mode</h2>
                <h1 className="text-4xl font-bold mb-10">"{topic}"</h1>
                <button 
                    onClick={() => navigate('/meeting')}
                    className="bg-blue-600 w-full py-5 rounded-2xl font-bold text-xl shadow-lg shadow-blue-500/20"
                >
                    Start Discussion
                </button>
            </div>
        </div>
    );
}