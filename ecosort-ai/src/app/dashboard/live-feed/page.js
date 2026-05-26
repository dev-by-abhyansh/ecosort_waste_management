"use client";
import { useState, useRef, useEffect } from 'react';

export default function LiveFeedPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  
  // NEW: Array to hold our continuous detection log
  const [history, setHistory] = useState([]); 
  
  const fileInputRef = useRef(null);
  // Reference to auto-scroll the terminal to the bottom
  const terminalEndRef = useRef(null);

  // Auto-scroll effect whenever history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isProcessing]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show the image on the screen instantly
    setSelectedImage(URL.createObjectURL(file));
    setResult(null);
    setIsProcessing(true);

    // 2. Prepare the file to send to Python
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 3. Send to FastAPI backend
      const response = await fetch('http://127.0.0.1:8000/api/detect', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setResult(data); 

      // NEW: Add the successful scan to our history log
      const timeStamp = new Date().toLocaleTimeString([], { hour12: false });
      setHistory(prevHistory => {
        const newLog = {
          id: Date.now(),
          time: timeStamp,
          classification: data.classification,
          confidence: data.confidence
        };
        // Keep only the last 10 entries so the UI doesn't lag
        return [...prevHistory, newLog].slice(-10);
      });

    } catch (error) {
      console.error("Backend connection failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      
      {/* INNER SIDEBAR: Controls & Status */}
      <div className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
        <div>
          <h3 className="text-[10px] text-[#10e58c] font-bold tracking-widest uppercase mb-3">Device Status</h3>
          <div className="space-y-2">
            <div className="bg-[#121c17] border border-[#10e58c]/30 p-3 rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="text-[#10e58c]">●</span> Neural Engine
              </div>
              <span className="text-[#10e58c] text-xs">Active</span>
            </div>
          </div>
        </div>

        {/* Dynamic Detection Terminal */}
        <div className="flex-1 min-h-[300px] flex flex-col">
          <h3 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3">Detection History</h3>
          <div className="bg-[#0b120f] border border-[#1e2d26] p-4 rounded-lg flex-1 overflow-y-auto font-mono text-[10px] flex flex-col gap-2 relative">
            
            {history.length === 0 && !isProcessing && (
              <div className="text-gray-500 mt-auto">[SYSTEM] <span className="text-gray-300">AWAITING VISUAL INPUT...</span></div>
            )}
            
            {/* NEW: Dynamically map over our history array */}
            {history.map((log) => (
              <div key={log.id} className="text-[#10e58c] bg-[#10e58c]/10 p-2 rounded border border-[#10e58c]/30 flex flex-col gap-1 shrink-0 animate-[fadeIn_0.3s_ease-in]">
                <span className="text-gray-500 text-[8px] tracking-wider">{log.time}</span>
                <span>[SUCCESS] {log.classification.toUpperCase()} DETECTED ({(log.confidence * 100).toFixed(1)}%)</span>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isProcessing && (
              <div className="text-yellow-400 animate-pulse p-2 shrink-0">[SYSTEM] ANALYZING MULTISPECTRAL DATA...</div>
            )}

            {/* Invisible div to help us auto-scroll to the bottom */}
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>

      {/* MAIN VIDEO / UPLOAD AREA */}
      <div className="flex-1 flex flex-col">
        
        {/* Header with Upload Button */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Manual Inspection Port</h2>
            <p className="text-xs text-gray-400">Upload sample image for AI classification</p>
          </div>
          <div className="flex gap-2">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 px-6 py-2 bg-[#10e58c] text-black text-xs font-bold rounded-lg hover:bg-[#0cc276] transition shadow-[0_0_15px_rgba(16,229,140,0.2)]"
            >
              <span>↑</span> UPLOAD TEST IMAGE
            </button>
          </div>
        </div>

        {/* Display Area */}
        <div className="flex-1 bg-[#0b120f] border border-[#1e2d26] rounded-xl relative overflow-hidden flex items-center justify-center min-h-[500px]">
          
          {!selectedImage && (
            <div className="text-center opacity-50">
              <div className="text-4xl mb-4">📷</div>
              <p className="text-sm font-mono">NO IMAGE SOURCE</p>
            </div>
          )}

          {selectedImage && (
            <>
              {/* The Uploaded Image */}
              <img 
                src={selectedImage} 
                alt="Uploaded waste" 
                className={`max-w-full max-h-[500px] object-contain transition-all duration-500 ${isProcessing ? 'opacity-50 blur-sm' : 'opacity-100'}`}
              />

              {/* Scanning Animation overlay while processing */}
              {isProcessing && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="w-full h-1 bg-[#10e58c] shadow-[0_0_15px_#10e58c] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                </div>
              )}

              {/* Result Bounding Box */}
              {result && !isProcessing && (
                <div 
                  className="absolute border-2 border-[#10e58c] bg-[#10e58c]/10 z-20 flex items-start justify-start transition-all duration-300"
                  style={{ top: '30%', left: '30%', width: '40%', height: '40%' }}
                >
                  <div className="absolute -top-6 left-[-2px] bg-[#10e58c] text-black text-[10px] font-bold px-2 py-0.5 whitespace-nowrap">
                    {result.classification.toUpperCase()} • {(result.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
      
    </div>
  );
}