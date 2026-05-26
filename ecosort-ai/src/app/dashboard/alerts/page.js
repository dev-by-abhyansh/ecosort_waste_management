"use client";
import { useState, useEffect } from 'react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data.alerts);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const getStyle = (level) => {
    if (level === 'CRITICAL') return 'border-red-500/50 bg-red-500/10 text-red-400';
    if (level === 'WARNING') return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
    return 'border-[#1e2d26] bg-[#121c17] text-gray-400';
  };

  return (
    <div className="space-y-6 pb-10 animate-[fadeIn_0.5s_ease-in]">
      <div>
        <h1 className="text-3xl font-bold mb-1">System Alerts</h1>
        <p className="text-gray-400 text-sm">Hardware diagnostics and classification anomalies.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 text-center text-[#10e58c] animate-pulse">SCANNING HARDWARE...</div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`p-5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:brightness-110 ${getStyle(alert.level)}`}>
              <div className="flex gap-4 items-start">
                <div className="text-2xl mt-1">
                  {alert.level === 'CRITICAL' ? '🛑' : alert.level === 'WARNING' ? '⚠️' : 'ℹ️'}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{alert.level}</span>
                    <span className="text-xs opacity-70 font-mono">• {alert.time}</span>
                  </div>
                  <p className="text-sm opacity-90">{alert.message}</p>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap border ${alert.level === 'CRITICAL' ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' : 'bg-[#0b120f] text-white border-[#1e2d26] hover:bg-[#1e2d26]'}`}>
                {alert.status}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}