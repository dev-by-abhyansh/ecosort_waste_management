"use client";
import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the analytics data from our Python backend
    fetch('http://127.0.0.1:8000/api/analytics')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch analytics:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-[#10e58c] font-mono animate-pulse">
        [SYSTEM] AGGREGATING HISTORICAL DATA...
      </div>
    );
  }

  // Fallback data just in case the backend is offline
  const safeData = data || {
    metrics: { total_volume: "---", volume_trend: "---", avg_confidence: "---", confidence_trend: "---", contamination_rate: "---", contamination_trend: "---" },
    composition: []
  };

  return (
    <div className="space-y-6 pb-10 animate-[fadeIn_0.5s_ease-in]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">System Reports</h1>
          <p className="text-[#10e58c] text-sm font-mono mb-2">● Live Data Synced from Python Backend</p>
          <p className="text-gray-400 text-sm">Comprehensive analysis of waste processing efficiency and facility throughput.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#1e2d26] bg-[#121c17] rounded-lg text-sm hover:bg-[#1e2d26] transition flex gap-2 items-center">
            <span>≡</span> Filter
          </button>
          <button className="px-4 py-2 bg-[#10e58c] text-black font-bold rounded-lg text-sm hover:bg-[#0cc276] transition flex gap-2 items-center">
            <span>📄</span> Generate New Report
          </button>
        </div>
      </div>

      {/* Top Metrics Grid - NOW DYNAMIC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-[#121c17] border border-[#1e2d26] p-6 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-400 text-sm">Total Volume (Monthly)</span>
            <span className="text-[#10e58c]">⌛</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold">{safeData.metrics.total_volume}</span>
            <span className="text-gray-400">t</span>
            <span className="text-[#10e58c] text-xs font-bold ml-2">{safeData.metrics.volume_trend}</span>
          </div>
          <div className="w-full bg-[#0b120f] rounded-full h-1">
            <div className="bg-[#10e58c] h-1 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#121c17] border border-[#1e2d26] p-6 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-400 text-sm">Avg. Confidence Score</span>
            <span className="text-[#10e58c]">🛡</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold">{safeData.metrics.avg_confidence}</span>
            <span className="text-gray-400">%</span>
            <span className="text-[#10e58c] text-xs font-bold ml-2">{safeData.metrics.confidence_trend}</span>
          </div>
          <div className="w-full bg-[#0b120f] rounded-full h-1">
            <div className="bg-[#10e58c] h-1 rounded-full" style={{ width: '97%' }}></div>
          </div>
        </div>

        {/* Metric 3 (Warning) */}
        <div className="bg-[#121c17] border border-[#1e2d26] p-6 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-400 text-sm">Contamination Rate</span>
            <span className="text-red-400">⚠</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold">{safeData.metrics.contamination_rate}</span>
            <span className="text-gray-400">%</span>
            <span className="text-[#10e58c] text-xs font-bold ml-2">{safeData.metrics.contamination_trend}</span>
          </div>
          <div className="w-full bg-[#0b120f] rounded-full h-1">
            <div className="bg-red-500 h-1 rounded-full" style={{ width: '10%' }}></div>
          </div>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Composition Distribution Chart - NOW DYNAMIC */}
          <div className="bg-[#121c17] border border-[#1e2d26] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold">Composition Distribution</h2>
              <div className="flex bg-[#0b120f] rounded-lg p-1 border border-[#1e2d26]">
                <button className="px-3 py-1 bg-[#121c17] text-[#10e58c] text-xs font-bold rounded-md">Weekly</button>
                <button className="px-3 py-1 text-gray-400 hover:text-white text-xs transition">Monthly</button>
              </div>
            </div>
            
            {/* Dynamic CSS Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-4 border-b border-[#1e2d26] pb-2 px-2">
              {safeData.composition.map((bar, index) => (
                <div key={index} className="flex flex-col items-center justify-end w-full h-full group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {bar.height}
                  </div>
                  <div 
                    className="w-full max-w-[4rem] bg-[#10e58c] rounded-t-sm opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(16,229,140,0.3)]" 
                    style={{ height: bar.height }}
                  ></div>
                  <div className="absolute -bottom-8 w-full text-center text-[10px] text-gray-500 font-bold tracking-wider">{bar.label}</div>
                </div>
              ))}
            </div>
            <div className="h-8"></div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#10e58c] p-6 rounded-xl text-black">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📄</span>
              <h2 className="text-lg font-bold">Instant Export</h2>
            </div>
            <p className="text-sm opacity-80 mb-6">Quickly download the current data view in your preferred format.</p>
            <div className="space-y-3">
              <button className="w-full flex justify-between items-center bg-[#0b120f] text-white p-4 rounded-lg hover:bg-[#121c17] transition">
                <span className="font-bold text-sm">Download PDF</span>
                <span className="text-gray-400">📄</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}