import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d1512] text-white font-sans selection:bg-[#10e58c] selection:text-black">
      
      {/* Top Navigation */}
      <nav className="flex justify-between items-center p-6 lg:px-12 border-b border-[#1e2d26]/50 sticky top-0 bg-[#0d1512]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <span className="text-[#10e58c]">❖</span> EcoSort AI
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Technology</a>
          <a href="#" className="hover:text-white transition">Dashboard</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
        <Link 
          href="/login" 
          className="bg-[#10e58c] hover:bg-[#0cc276] text-black font-bold py-2 px-6 rounded-lg text-sm transition-colors"
        >
          Get Started
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section */}
        <div className="py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block border border-[#10e58c]/30 bg-[#10e58c]/10 text-[#10e58c] text-xs font-bold px-3 py-1 rounded-full">
              AI Multispectral Imaging
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Autonomous <span className="text-[#10e58c]">Waste Classification</span> for a Circular Future
            </h1>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Revolutionizing recycling with robotic precision. Our multispectral AI system detects, classifies, and sorts biodegradable waste with 99.8% accuracy.
            </p>
            <div className="flex gap-4 pt-4">
              <Link 
                href="/login" 
                className="bg-[#10e58c] hover:bg-[#0cc276] text-black font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Access Dashboard
              </Link>
              <button className="border border-[#1e2d26] hover:bg-[#1e2d26] text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Watch System Demo
              </button>
            </div>
          </div>
          
          {/* Hero Image / Video Placeholder */}
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#1e2d26] relative bg-[#121c17]">
              {/* Fake Robot Arm visual using CSS */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,229,140,0.1)_0%,transparent_70%)]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-64 bg-yellow-500/20 rounded-lg border-2 border-yellow-500/50 flex items-center justify-center">
                <span className="text-yellow-500 text-4xl">🤖</span>
              </div>
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#0d1512] to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-[#1e2d26]">
          <div className="bg-[#121c17] p-8 rounded-2xl border border-[#1e2d26]">
            <div className="text-[#10e58c] text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#10e58c] rounded-full"></span> DETECTION ACCURACY
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl lg:text-5xl font-bold">99.8%</span>
              <span className="text-[#10e58c] text-sm font-bold mb-1">+12.4% YoY</span>
            </div>
          </div>
          <div className="bg-[#121c17] p-8 rounded-2xl border border-[#1e2d26]">
            <div className="text-[#10e58c] text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#10e58c] rounded-full"></span> PROCESSING SPEED
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl lg:text-5xl font-bold">4.2 <span className="text-2xl text-gray-400">tons/hr</span></span>
              <span className="text-[#10e58c] text-sm font-bold mb-1">~15% Efficiency</span>
            </div>
          </div>
          <div className="bg-[#121c17] p-8 rounded-2xl border border-[#1e2d26]">
            <div className="text-[#10e58c] text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#10e58c] rounded-full"></span> WASTE DIVERTED
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl lg:text-5xl font-bold">520k <span className="text-2xl text-gray-400">t</span></span>
              <span className="text-[#10e58c] text-sm font-bold mb-1">Milestone Reached</span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="py-24">
          <div className="mb-12">
            <div className="text-[#10e58c] text-xs font-bold tracking-widest uppercase mb-3">OUR CORE TECHNOLOGY</div>
            <h2 className="text-4xl font-bold mb-4">Cutting-Edge Robotic Sorting</h2>
            <p className="text-gray-400 max-w-2xl">Our integrated system combines high-speed robotics with proprietary multispectral AI to automate the most challenging waste streams in real-time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-[#1a2922] to-[#0a0f0d] rounded-xl border border-[#1e2d26] relative overflow-hidden">
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(16,229,140,0.05)_10px,rgba(16,229,140,0.05)_20px)]"></div>
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-[#10e58c]">⊚</span> AI Detection
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">Multispectral imaging sensors identify organic materials and contaminants invisible to the human eye, ensuring high purity outputs.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="aspect-video bg-[#121c17] rounded-xl border border-[#1e2d26] flex items-center justify-center">
                <span className="text-5xl opacity-50">🦾</span>
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-gray-300">🦾</span> Robotic Sorting
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">Ultra-fast delta robots execute physical separation with millisecond precision, handling diverse biodegradable waste shapes.</p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-tr from-[#0d1512] to-[#16382a] rounded-xl border border-[#1e2d26] flex items-end p-4">
                 {/* Fake mini chart */}
                 <div className="flex gap-2 w-full h-1/2 items-end">
                    <div className="w-1/4 h-full bg-[#10e58c] rounded-t-sm opacity-50"></div>
                    <div className="w-1/4 h-2/3 bg-[#10e58c] rounded-t-sm opacity-80"></div>
                    <div className="w-1/4 h-1/4 bg-[#10e58c] rounded-t-sm opacity-30"></div>
                    <div className="w-1/4 h-full bg-[#10e58c] rounded-t-sm"></div>
                 </div>
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-[#10e58c]">📊</span> Real-time Monitoring
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">Cloud-integrated dashboard provides deep insights into material composition, throughput trends, and system health 24/7.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-[#10e58c] to-[#0cc276] rounded-3xl p-12 lg:p-20 text-center text-black relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 relative z-10">Ready to modernize your<br/>recycling workflow?</h2>
          <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto relative z-10">Join over 45 waste management facilities already using EcoSort AI to reach zero-waste targets.</p>
          <div className="flex justify-center gap-4 relative z-10">
            <button className="bg-[#0b120f] hover:bg-black text-white font-bold py-4 px-8 rounded-xl transition-colors">
              Request Custom Audit
            </button>
            <button className="border-2 border-black hover:bg-black/5 text-black font-bold py-4 px-8 rounded-xl transition-colors">
              View Case Studies
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#0b120f] border-t border-[#1e2d26] pt-16 pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-xl font-bold tracking-wide mb-4">
              <span className="text-[#10e58c]">❖</span> EcoSort AI
            </div>
            <p className="text-gray-500 text-sm">Next-generation multispectral waste management systems, built for performance, designed for the planet.</p>
          </div>
          <div className="flex gap-16 text-sm">
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <div className="flex flex-col gap-3 text-gray-500">
                <a href="#" className="hover:text-[#10e58c] transition">Technology</a>
                <a href="#" className="hover:text-[#10e58c] transition">Integration</a>
                <a href="#" className="hover:text-[#10e58c] transition">Safety</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <div className="flex flex-col gap-3 text-gray-500">
                <a href="#" className="hover:text-[#10e58c] transition">About Us</a>
                <a href="#" className="hover:text-[#10e58c] transition">Sustainability</a>
                <a href="#" className="hover:text-[#10e58c] transition">News</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <div className="flex flex-col gap-3 text-gray-500">
                <a href="#" className="hover:text-[#10e58c] transition">Privacy</a>
                <a href="#" className="hover:text-[#10e58c] transition">Terms</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 pt-8 border-t border-[#1e2d26]">
          <p>© 2026 EcoSort AI Technologies Inc. All rights reserved.</p>
          <p>📍 Innovation District, Tech City</p>
        </div>
      </footer>

    </div>
  );
}