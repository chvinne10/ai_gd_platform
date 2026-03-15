import { useNavigate } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const navigate = useNavigate();

  const data = {
    labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
    datasets: [{
      label: 'Performance Score',
      data: [65, 72, 68, 85, 90],
      backgroundColor: '#2563eb',
      borderRadius: 10,
    }]
  };

  return (
    <div className="min-h-screen bg-[#020617] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black">Performance Dashboard</h1>
          <button onClick={() => navigate('/format')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20">
            Start New Session
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-[2rem]">
            <p className="text-slate-400 text-sm mb-1">Total Sessions</p>
            <h3 className="text-3xl font-bold">12</h3>
          </div>
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-[2rem]">
            <p className="text-slate-400 text-sm mb-1">Avg. Confidence</p>
            <h3 className="text-3xl font-bold text-blue-500">84%</h3>
          </div>
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-[2rem]">
            <p className="text-slate-400 text-sm mb-1">Global Rank</p>
            <h3 className="text-3xl font-bold text-yellow-500">#142</h3>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2.5rem]">
          <h2 className="text-xl font-bold mb-6">Improvement Progress</h2>
          <div className="h-64">
            <Bar data={data} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: '#1e293b' } } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}