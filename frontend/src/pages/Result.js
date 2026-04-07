import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const report = state || { score: 0, feedback: "No data found.", status: "Rejected" };

    return (
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-10 font-sans">
            <div className="max-w-3xl w-full bg-[#0f172a] rounded-[3rem] border border-white/10 p-16 shadow-2xl relative overflow-hidden">
                {/* Status Badge */}
                <div className={`absolute top-10 right-10 px-6 py-2 rounded-full font-black text-xs tracking-widest border ${
                    report.status === "Selected" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                }`}>
                    {report.status.toUpperCase()}
                </div>

                <h1 className="text-4xl font-black mb-2 tracking-tighter italic">HR Interview Report</h1>
                <p className="text-slate-500 mb-10 text-sm">Automated Behavioral & Technical Assessment</p>

                <div className="flex gap-6 mb-10">
                    <div className="flex-1 bg-black/40 p-8 rounded-3xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Behavioral Rating</p>
                        <p className="text-5xl font-black text-blue-500">{report.score}%</p>
                    </div>
                    <div className="flex-1 bg-black/40 p-8 rounded-3xl border border-white/5 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Hiring Recommendation</p>
                            <p className={`text-2xl font-black ${report.status === "Selected" ? "text-green-500" : "text-yellow-500"}`}>
                                {report.status}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] mb-10">
                    <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">HR Manager Feedback</h3>
                    <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {report.feedback}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => navigate('/format')} className="flex-1 bg-slate-800 hover:bg-slate-700 py-4 rounded-full font-bold transition-all text-sm">
                        Re-Attempt GD
                    </button>
                    <button onClick={() => navigate('/')} className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-full font-bold transition-all text-sm shadow-lg shadow-blue-600/20">
                        Finish & Exit
                    </button>
                </div>
            </div>
        </div>
    );
}