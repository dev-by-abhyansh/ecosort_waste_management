"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a secure network authentication delay for the presentation
    setTimeout(() => {
      // Route the user directly to the Live Feed dashboard
      router.push('/dashboard/live-feed');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d1512] flex items-center justify-center p-4 font-sans selection:bg-[#10e58c] selection:text-black">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#10e58c] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#10e58c] rounded-full blur-[120px] opacity-5"></div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#121c17] border border-[#1e2d26] rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#121c17] via-[#10e58c] to-[#121c17]"></div>

        <div className="p-8 sm:p-10">
          
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0b120f] border border-[#1e2d26] mb-4 shadow-[0_0_15px_rgba(16,229,140,0.1)]">
              <span className="text-[#10e58c] text-2xl">⬡</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">Recycle<span className="text-[#10e58c]">AI</span></h1>
            <p className="text-sm text-gray-400 mt-2 font-mono">AUTHORIZED PERSONNEL ONLY</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operator ID / Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0b120f] border border-[#1e2d26] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#10e58c] focus:ring-1 focus:ring-[#10e58c] transition-all"
                placeholder="admin@recycleai.sys"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Access Node Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0b120f] border border-[#1e2d26] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#10e58c] focus:ring-1 focus:ring-[#10e58c] transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#1e2d26] bg-[#0b120f] text-[#10e58c] focus:ring-[#10e58c] focus:ring-offset-0 accent-[#10e58c]" />
                <span className="text-xs text-gray-400 hover:text-gray-300 transition">Save terminal session</span>
              </label>
              <a href="#" className="text-xs text-[#10e58c] hover:underline">Forgot credentials?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full mt-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                ${isLoading 
                  ? 'bg-[#0b120f] text-[#10e58c] border border-[#10e58c]' 
                  : 'bg-[#10e58c] text-black hover:bg-[#0cc276] hover:shadow-[0_0_20px_rgba(16,229,140,0.3)]'
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#10e58c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ESTABLISHING SECURE LINK...
                </>
              ) : (
                'INITIALIZE SYSTEM'
              )}
            </button>
          </form>

        </div>
        
        {/* Footer Status */}
        <div className="bg-[#0b120f] border-t border-[#1e2d26] px-8 py-4 flex justify-between items-center text-[10px] text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10e58c] animate-pulse"></span>
            BACKEND: ONLINE
          </div>
          <div>v2.4.1 (CUDA ACTIVE)</div>
        </div>

      </div>
    </div>
  );
}