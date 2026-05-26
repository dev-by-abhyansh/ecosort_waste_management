import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b120f] text-white flex font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-[#1e2d26] bg-[#0b120f] flex flex-col justify-between hidden md:flex">
        
        {/* Logo & Nav Links */}
        <div>
          <div className="p-6 flex items-center gap-2 font-bold text-lg">
            <span className="text-[#10e58c]">❖</span> RecycleAI
          </div>
          <nav className="px-4 space-y-2 mt-4">
            <Link href="/dashboard" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-[#121c17] px-4 py-3 rounded-lg transition">
              <span>⊞</span> Dashboard
            </Link>
            <Link href="/dashboard/live-feed" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-[#121c17] px-4 py-3 rounded-lg transition">
              <span>📹</span> Live Feed
            </Link>
            <Link href="/dashboard/analytics" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-[#121c17] px-4 py-3 rounded-lg transition">
              <span>📊</span> Analytics
            </Link>
            
            {/* UPDATED: Alerts Link */}
            <Link href="/dashboard/alerts" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-[#121c17] px-4 py-3 rounded-lg transition">
              <span>🔔</span> Alerts
            </Link>
            
            {/* UPDATED: History Link */}
            <Link href="/dashboard/history" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-[#121c17] px-4 py-3 rounded-lg transition">
              <span>🗄️</span> History
            </Link>
          </nav>
        </div>

        {/* Bottom Sidebar (System Load & Settings) */}
        <div className="p-6">
          <div className="bg-[#121c17] border border-[#1e2d26] p-4 rounded-lg mb-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#10e58c] font-bold">SYSTEM LOAD</span>
              <span className="text-[#10e58c]">24%</span>
            </div>
            <div className="w-full bg-[#0b120f] rounded-full h-1.5">
              <div className="bg-[#10e58c] h-1.5 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
          
          {/* UPDATED: Settings Link */}
          <Link href="/dashboard/settings" className="flex items-center gap-3 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-[#121c17] transition">
            <span>⚙</span> Settings
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen">
        
        {/* Top Header */}
        <header className="h-20 border-b border-[#1e2d26] flex items-center justify-between px-8 bg-[#0b120f]">
          <div className="relative w-96">
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
            <input 
              type="text" 
              placeholder="Search facilities or alerts..." 
              className="w-full bg-[#121c17] border border-[#1e2d26] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#10e58c] transition"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white">✉</button>
            <button className="text-gray-400 hover:text-white">❓</button>
            <div className="flex items-center gap-3 border-l border-[#1e2d26] pl-6">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold">Admin User</div>
                <div className="text-xs text-gray-400">System Admin</div>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-[#10e58c]"></div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#0b120f]">
          {children}
        </main>

      </div>
    </div>
  );
}