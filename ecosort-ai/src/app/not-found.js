import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1512] text-white flex flex-col items-center justify-center font-sans selection:bg-[#10e58c] selection:text-black px-6 text-center">
      
      <div className="bg-[#121c17] border border-[#1e2d26] p-8 md:p-12 rounded-2xl max-w-lg w-full relative overflow-hidden shadow-2xl">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#10e58c] to-transparent opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#10e58c]/10 rounded-full blur-3xl"></div>
        
        <div className="text-[#10e58c] text-6xl mb-6">🚧</div>
        
        <h1 className="text-3xl font-bold mb-2">Module Offline</h1>
        <p className="text-[#10e58c] text-sm font-mono tracking-widest uppercase mb-6">Error 404: Route Not Found</p>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          This system module is currently under development or temporarily restricted. Please return to the active monitoring interface.
        </p>
        
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 bg-[#10e58c] hover:bg-[#0cc276] text-black font-bold py-3 px-8 rounded-lg transition-colors"
        >
          <span>⊞</span> Return to Dashboard
        </Link>
        
      </div>

      <div className="mt-8 text-xs text-gray-600 font-mono">
        SYSTEM DIAGNOSTIC: CONNECTION REFUSED AT NODE {Math.floor(Math.random() * 1000)}
      </div>

    </div>
  );
}