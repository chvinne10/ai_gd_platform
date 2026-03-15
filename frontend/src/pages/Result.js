import React, { useState } from "react";

export default function Result() {

  const [scores] = useState({
    grammar: "Analyzing...",
    focus: "85%",
    emotion: "Confident",
    overall: 0,
  });

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-sans">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-2 text-blue-500">
          Performance Report
        </h1>

        <p className="text-slate-400 mb-10">
          AI-Generated Analysis of your Discussion
        </p>

        {/* Score Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-slate-500 text-xs mb-2">
              Behavior Score
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              {scores.focus}
            </h2>
          </div>

          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-slate-500 text-xs mb-2">
              Dominant Tone
            </p>

            <h2 className="text-3xl font-bold text-blue-400">
              {scores.emotion}
            </h2>
          </div>

          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-slate-500 text-xs mb-2">
              Grammar Accuracy
            </p>

            <h2 className="text-3xl font-bold text-purple-400">
              92%
            </h2>
          </div>

        </div>

        {/* Table */}

        <div className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden">

          <table className="w-full">

            <thead className="bg-white/5">
              <tr>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">AI Feedback</th>
                <th className="p-4 text-right">Impact</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td className="p-4">Eye Contact</td>
                <td className="p-4">
                  Maintained focus for 105/120 seconds.
                </td>
                <td className="p-4 text-right text-green-400">
                  High
                </td>
              </tr>

              <tr>
                <td className="p-4">Filler Words</td>
                <td className="p-4">
                  Used Um 2 times
                </td>
                <td className="p-4 text-right text-yellow-400">
                  Medium
                </td>
              </tr>

              <tr>
                <td className="p-4">Vocabulary</td>
                <td className="p-4">
                  Good words used
                </td>
                <td className="p-4 text-right text-green-400">
                  High
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex gap-4">

          <button
            onClick={handleDownload}
            className="bg-blue-600 px-8 py-3 rounded-2xl"
          >
            Download PDF
          </button>

          <button
            onClick={() => (window.location.href = "/home")}
            className="border px-8 py-3 rounded-2xl"
          >
            Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}