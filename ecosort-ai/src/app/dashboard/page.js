"use client"; // Tells Next.js this page fetches dynamic data
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  // 1. Set up state to hold our backend data
  const [systemData, setSystemData] = useState({
    active_nodes: 0,
    gpu_temp: "Loading...",
    throughput: "Loading...",
    alerts: 0
  });

  // 2. Fetch the data from Python when the page loads
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/system-status')
      .then(response => response.json())
      .then(data => setSystemData(data))
      .catch(error => console.error("Error fetching from backend:", error));
  }, []);

  return (
    <div className="space-y-6 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">System Overview</h1>
          <p className="text-[#10e58c] text-sm animate-pulse">● Connected to Python Backend API</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#1e2d26] bg-[#121c17] rounded-lg text-sm hover:bg-[#1e2d26] transition flex gap-2 items-center">
            <span>📅</span> Last 24 Hours
          </button>
          <button className="px-4 py-2 bg-[#10e58c] text-black font-bold rounded-lg text-sm hover:bg-[#0cc276] transition flex gap-2 items-center">
            <span>📥</span> Export Data
          </button>
        </div>
      </div>

      {/* 4 Metric Cards Grid - NOW USING REAL BACKEND DATA! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Nodes */}
        <div className="bg-[#121c17] border border-[#1e2d26] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#0b120f] rounded-lg text-blue-400">🌐</div>
            <span className="text-[#10e58c] text-xs font-bold bg-[#10e58c]/10 px-2 py-1 rounded">Online</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">Active Sensor Nodes</div>
          <div className="text-3xl font-bold">{systemData.active_nodes}</div>
        </div>

        {/* Card 2: GPU Temp */}
        <div className="bg-[#121c17] border border-[#1e2d26] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#0b120f] rounded-lg text-[#10e58c]">🌡</div>
            <span className="text-[#10e58c] text-xs font-bold bg-[#10e58c]/10 px-2 py-1 rounded">Stable</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">Neural Engine Temp</div>
          <div className="text-3xl font-bold">{systemData.gpu_temp}</div>
        </div>

        {/* Card 3: Throughput */}
        <div className="bg-[#121c17] border border-[#1e2d26] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#0b120f] rounded-lg text-yellow-400">⚡</div>
            <span className="text-gray-400 text-xs bg-[#0b120f] px-2 py-1 rounded">Live</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">System Throughput</div>
          <div className="text-3xl font-bold">{systemData.throughput.split(' ')[0]} <span className="text-sm font-normal text-gray-500">items/m</span></div>
        </div>

        {/* Card 4: Alerts */}
        <div className="bg-[#121c17] border border-[#1e2d26] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#0b120f] rounded-lg text-red-400">⚠</div>
            <span className="text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded">Critical</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">Active Alerts</div>
          <div className="text-3xl font-bold">{systemData.alerts}</div>
        </div>

      </div>

      {/* (The rest of the charts and tables below remain unchanged for now, to save space, but you can copy them back in from your old file if you want the full page look!) */}
      <div className="mt-8 p-6 bg-[#121c17] border border-[#1e2d26] rounded-xl text-center text-gray-500">
         Charts and Live Feed Simulation Loading...
      </div>

    </div>
  );
}