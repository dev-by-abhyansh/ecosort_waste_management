"use client";
import { useState, useEffect } from 'react';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/history')
      .then(res => res.json())
      .then(data => {
        setHistory(data.data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6 pb-10 animate-[fadeIn_0.5s_ease-in]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-1">Detection Log</h1>
          <p className="text-gray-400 text-sm">Chronological record of all AI classifications.</p>
        </div>
        <button className="px-4 py-2 bg-[#121c17] border border-[#1e2d26] text-gray-300 rounded-lg text-sm hover:text-white transition">
          ⬇ Download CSV
        </button>
      </div>

      <div className="bg-[#121c17] border border-[#1e2d26] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-[#10e58c] animate-pulse">FETCHING LOGS...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0b120f] border-b border-[#1e2d26] text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Log ID</th>
                <th className="px-6 py-4 font-medium">Classification</th>
                <th className="px-6 py-4 font-medium">AI Confidence</th>
                <th className="px-6 py-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2d26]/50">
              {history.map((log, i) => (
                <tr key={i} className="hover:bg-[#0b120f]/50 transition text-gray-300">
                  <td className="px-6 py-4 font-mono text-xs">#LOG-{9999 - i}</td>
                  <td className="px-6 py-4 font-bold text-white uppercase">{log.class}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#0b120f] rounded-full overflow-hidden">
                        <div className="bg-[#10e58c] h-full" style={{ width: `${log.confidence * 100}%` }}></div>
                      </div>
                      <span className="text-xs">{(log.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-[#10e58c]/10 text-[#10e58c] px-2 py-1 rounded text-[10px] font-bold">SORTED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}