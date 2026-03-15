import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formats = [
  { id: '1', title: 'One Member', desc: 'Practice solo with AI feedback', icons: 1 },
  { id: '2', title: 'Two Members', desc: 'One-on-one discussion practice', icons: 2 },
  { id: '3', title: 'Three Members', desc: 'Small group dynamics', icons: 3 },
  { id: '4', title: 'Group Discussion', desc: '4+ members for full experience', icons: 4 },
];

export default function Format() {
  const [selected, setSelected] = useState('1');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="bg-blue-600 p-3 rounded-xl mb-6 shadow-lg shadow-blue-500/20">🧠</div>
      <h1 className="text-4xl font-bold mb-3">Select Discussion Format</h1>
      <p className="text-slate-400 mb-12 max-w-lg text-center">Choose the number of participants for your AI-monitored discussion session</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl mb-12">
        {formats.map((f) => (
          <div 
            key={f.id} 
            onClick={() => setSelected(f.id)}
            className={`bg-[#0f172a]/80 border-2 p-8 rounded-3xl transition-all cursor-pointer text-center ${selected === f.id ? 'border-blue-500 shadow-2xl shadow-blue-500/10' : 'border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(f.icons)].map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center bg-slate-800 ${selected === f.id ? 'text-blue-400' : 'text-slate-500'}`}>👤</div>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            <div className={`mt-8 w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center ${selected === f.id ? 'border-blue-500' : 'border-slate-700'}`}>
              {selected === f.id && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/topic')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl font-bold transition-all flex items-center shadow-xl shadow-blue-600/20"
      >
        Continue to Discussion <span className="ml-2">→</span>
      </button>
    </div>
  );
}