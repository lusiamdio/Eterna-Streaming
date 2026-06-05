import React, { useState } from 'react';
import { 
  PlayCircle, Clock, DollarSign, Users, Globe, UploadCloud, Film, BarChart3, Settings, 
  ArrowUpRight, CheckCircle2, XCircle, Search, Edit, Upload, Eye, List, MoreVertical, MapPin, Smile, MessageSquare, TrendingUp, HandCoins, Activity, Star,
  X, Briefcase, Video, FileText, Download, Check, AlertCircle, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export function DashboardCenter({ setShowUpload }: { setShowUpload: any }) {
  const { reviews } = useAppStore();
  const partnerReviews = reviews; // In reality, filter by partner's content IDs
  const avgRating = partnerReviews.length > 0
    ? (partnerReviews.reduce((a, b) => a + b.rating, 0) / partnerReviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto relative z-10 mt-4 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">System Online, <span className="text-eterna-rose">Lusimadio.</span></h1>
          <p className="text-white/50 text-[15px] font-mono">Good Morning. Your content generated $1,845 yesterday.</p>
        </div>
        
        <button 
          className="bg-white hover:bg-gray-200 transition-colors text-black px-6 py-3 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
          onClick={() => setShowUpload(true)}
        >
          <UploadCloud className="w-5 h-5" />
          <span>Publish Content</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <StatsCard title="Total Views" value="2.4M" change="+12%" icon={<PlayCircle />} />
        <StatsCard title="Watch Hours" value="482K" change="+5.2%" icon={<Clock />} />
        <StatsCard title="Treasury" value="$15,420" change="+18%" icon={<DollarSign />} />
        <StatsCard title="Audience" value="+22%" change="SA & NGR" icon={<Users />} />
        <StatsCard title="Community Score" value={avgRating} change={`${partnerReviews.length} Reviews`} icon={<Star className="text-eterna-gold" />} />
        <StatsCard title="Active Streams" value="8" change="Live" icon={<Film />} />
      </div>

      <div className="bg-gradient-to-r from-eterna-rose/20 to-transparent p-4 rounded-xl border border-eterna-rose/30 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-eterna-rose/20 flex items-center justify-center shrink-0">
          <span className="text-eterna-rose text-xl">✨</span>
        </div>
        <div>
          <h3 className="font-bold text-white text-lg font-mono">AI Executive Briefing</h3>
          <p className="text-white/70 text-sm">3 licensing opportunities are available. <span className="text-white font-bold">Recommendation:</span> Promote "African Leadership Series" to East Africa.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#111] rounded-2xl p-6 border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="font-bold text-[20px] uppercase tracking-wider text-white">Performance Radar</h2>
            <select className="bg-black/50 border border-white/10 rounded font-mono px-3 py-1.5 text-[12px] text-white/70 outline-none backdrop-blur-md">
               <option>T-MINUS 30 DAYS</option>
               <option>YTD (Year to Date)</option>
            </select>
          </div>
          <div className="flex gap-4 items-end h-[200px] border-b border-white/10 pb-4">
             {[40, 65, 45, 80, 55, 90, 75, 100, 85, 110, 95, 120].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-eterna-rose/20 to-eterna-rose hover:to-eterna-violet rounded-t-[3px] transition-all duration-300 relative group/bar flex justify-center" style={{ height: `${h}%` }}>
                  <div className="absolute top-0 w-full h-[2px] bg-white shadow-[0_0_10px_white]" />
                </div>
             ))}
          </div>
        </div>

        <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
           <h2 className="font-bold text-[18px] mb-6 uppercase tracking-wider">Health Scores</h2>
           <div className="space-y-4">
             <div className="flex justify-between items-center"><span className="text-white/60 text-[13px]">Content Health Score</span><span className="font-bold text-green-400">92/100</span></div>
             <div className="flex justify-between items-center"><span className="text-white/60 text-[13px]">Audience Engagement</span><span className="font-bold text-green-400">88/100</span></div>
             <div className="flex justify-between items-center"><span className="text-white/60 text-[13px]">Revenue Efficiency</span><span className="font-bold text-yellow-400">76/100</span></div>
             <div className="flex justify-between items-center"><span className="text-white/60 text-[13px]">Content Quality</span><span className="font-bold text-green-400">95/100</span></div>
             <div className="flex justify-between items-center"><span className="text-white/60 text-[13px]">Growth Potential</span><span className="font-bold text-eterna-rose">Extreme</span></div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: any) {
  return (
    <div className="bg-[#111] rounded-2xl p-6 flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 group overflow-hidden relative">
      <div className="flex justify-between items-start mb-4">
         <span className="text-white/50 text-[12px] font-bold uppercase tracking-wider">{title}</span>
         <div className="text-white/30 group-hover:text-white transition-colors">{icon}</div>
      </div>
      <div>
         <span className="text-3xl font-bold block mb-1">{value}</span>
         <span className="text-[12px] font-bold text-green-400">{change}</span>
      </div>
    </div>
  );
}

export function ArsenalCenter({ setShowUpload }: { setShowUpload: any }) {
  const [selectedContent, setSelectedContent] = useState<any>(null);

  if (selectedContent) {
    return (
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto relative z-10 mt-4 animate-in fade-in">
        <button onClick={() => setSelectedContent(null)} className="flex items-center gap-2 text-white/50 hover:text-white mb-6 uppercase tracking-widest text-sm font-bold">
          <X className="w-4 h-4" /> Back to Vault
        </button>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">{selectedContent.title}</h1>
            <p className="text-white/50 font-mono flex items-center gap-2">
              <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">Published</span> 
              • {selectedContent.type} • 154,000 Views
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <h2 className="font-bold text-lg mb-4 uppercase tracking-wider">Analytics & Distribution</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                 <div><div className="text-white/50 text-xs uppercase mb-1">Views</div><div className="font-bold text-xl">154K</div></div>
                 <div><div className="text-white/50 text-xs uppercase mb-1">Watch Time</div><div className="font-bold text-xl">42K hrs</div></div>
                 <div><div className="text-white/50 text-xs uppercase mb-1">Completion</div><div className="font-bold text-xl">82%</div></div>
                 <div><div className="text-white/50 text-xs uppercase mb-1">Top Location</div><div className="font-bold text-xl">South Africa</div></div>
              </div>
              <h3 className="font-bold text-md mb-3 text-white/80">Revenue Sources</h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-center"><span className="text-sm">Streaming</span><span className="font-mono text-green-400">+$6,500</span></div>
                 <div className="flex justify-between items-center"><span className="text-sm">Licensing</span><span className="font-mono text-green-400">+$9,000</span></div>
                 <div className="flex justify-between items-center"><span className="text-sm">Sponsorship</span><span className="font-mono text-green-400">+$1,000</span></div>
              </div>
            </div>

            <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <h2 className="font-bold text-lg mb-4 uppercase tracking-wider">Rights & Management</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <Globe className="w-5 h-5 text-eterna-rose mb-2"/>
                    <div className="font-bold mb-1">Territories</div>
                    <div className="text-xs text-white/50">Global, Excl. France</div>
                 </div>
                 <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <FileText className="w-5 h-5 text-eterna-rose mb-2"/>
                    <div className="font-bold mb-1">Languages</div>
                    <div className="text-xs text-white/50">EN, FR Subtitles</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-b from-[#111] to-eterna-rose/10 rounded-2xl p-6 border border-eterna-rose/20">
               <div className="flex items-center gap-2 mb-4"><span className="text-xl">✨</span><h2 className="font-bold text-lg uppercase tracking-wider">AI Optimization</h2></div>
               <p className="text-sm text-white/80 mb-4">
                 Add <span className="font-bold">Portuguese subtitles</span> to increase reach in Angola and Mozambique.
               </p>
               <button className="w-full bg-eterna-rose text-white py-2 rounded-lg font-bold text-sm hover:bg-eterna-rose/80 transition-colors">
                 Auto-Generate Subtitles
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto relative z-10 mt-4 animate-in fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Arsenal</h1>
          <p className="text-white/50 text-[15px] font-mono">Content Creation, Management & Distribution Center.</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="bg-eterna-rose hover:bg-eterna-rose/80 text-white px-6 py-2 rounded-full font-bold flex gap-2"><UploadCloud className="w-5 h-5"/> Publish</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3 bg-[#111] rounded-2xl p-6 border border-white/5">
           <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl uppercase tracking-wider">Content Vault</h2>
              <div className="flex gap-2">
                 <select className="bg-black/50 border border-white/10 rounded px-3 py-1.5 text-sm outline-none"><option>All Content</option><option>Films</option><option>Series</option></select>
                 <button className="bg-white/10 p-1.5 rounded"><Search className="w-5 h-5" /></button>
              </div>
           </div>
           <table className="w-full text-left text-sm">
             <thead className="text-white/50 border-b border-white/10">
               <tr><th className="pb-3 font-normal">Title</th><th className="pb-3 font-normal">Type</th><th className="pb-3 font-normal">Status</th><th className="pb-3 font-normal">Views</th><th className="pb-3 font-normal text-right">Actions</th></tr>
             </thead>
             <tbody className="divide-y divide-white/5 text-white/90">
               <tr className="hover:bg-white/5">
                 <td className="py-4 font-bold flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedContent({title: 'African Leadership Series', type: 'Docuseries'})}>
                   <div className="w-12 h-8 bg-white/10 rounded overflow-hidden group-hover:ring-2 ring-eterna-rose transition-all">
                     <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                   </div>
                   African Leadership Series
                 </td>
                 <td className="py-4 text-white/50">Docuseries</td>
                 <td className="py-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">Published</span></td>
                 <td className="py-4 font-mono">1.2M</td>
                 <td className="py-4 text-right">
                   <button className="text-white/50 hover:text-white px-2"><Edit className="w-4 h-4"/></button>
                   <button className="text-white/50 hover:text-white px-2"><MoreVertical className="w-4 h-4"/></button>
                 </td>
               </tr>
               <tr className="hover:bg-white/5">
                 <td className="py-4 font-bold flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedContent({title: 'The Rise of Lagos', type: 'Documentary'})}>
                   <div className="w-12 h-8 bg-white/10 rounded overflow-hidden group-hover:ring-2 ring-eterna-rose transition-all">
                     <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                   </div>
                   The Rise of Lagos
                 </td>
                 <td className="py-4 text-white/50">Documentary</td>
                 <td className="py-4"><span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">Scheduled</span></td>
                 <td className="py-4 font-mono">-</td>
                 <td className="py-4 text-right">
                   <button className="text-white/50 hover:text-white px-2"><Edit className="w-4 h-4"/></button>
                   <button className="text-white/50 hover:text-white px-2"><MoreVertical className="w-4 h-4"/></button>
                 </td>
               </tr>
             </tbody>
           </table>
        </div>

        <div className="space-y-6">
           <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <h2 className="font-bold text-lg mb-4 uppercase tracking-wider flex items-center gap-2"><span className="text-eterna-violet">✧</span> AI Studio</h2>
              <div className="space-y-2">
                 <button className="w-full text-left p-3 rounded-lg border border-white/10 bg-black/40 hover:bg-white/5 text-sm">Generate Trailer</button>
                 <button className="w-full text-left p-3 rounded-lg border border-white/10 bg-black/40 hover:bg-white/5 text-sm">Create Thumbnails</button>
                 <button className="w-full text-left p-3 rounded-lg border border-white/10 bg-black/40 hover:bg-white/5 text-sm">Auto-Translate Subtitles</button>
              </div>
           </div>
           <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <h2 className="font-bold text-lg mb-4 uppercase tracking-wider text-red-400">Live Studio</h2>
              <button className="w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 font-bold text-sm shadow-[0_0_15px_rgba(220,38,38,0.4)]">Go Live Now</button>
              <p className="text-xs text-white/50 mt-3 text-center">Broadcast events, sports, or educational sessions globally.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

export function IntelligenceCenter() {
  const [isAdvising, setIsAdvising] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const getStrategicAdvice = async () => {
    setIsAdvising(true);
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: "Generate a brief, 3-bullet marketing campaign strategy for an 'African Leadership Series' documentary performing well in Kenya. Format as concise text." })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAdvice(data.text);
    } catch (err) {
      console.error(err);
      setAdvice("Error generating strategy. Please try again later.");
    } finally {
      setIsAdvising(false);
    }
  };
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto relative z-10 mt-4 animate-in fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Intelligence</h1>
          <p className="text-white/50 text-[15px] font-mono">AI Analytics & Strategic Insights Center.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
             <MapPin className="text-eterna-rose w-6 h-6" />
             <h2 className="font-bold text-xl uppercase tracking-wider">Audience</h2>
          </div>
          <div className="space-y-4">
             <div>
               <div className="flex justify-between text-sm mb-1"><span className="text-white/60">Nigeria</span><span className="font-bold">45%</span></div>
               <div className="w-full bg-white/5 h-1.5 rounded-full"><div className="bg-eterna-rose h-1.5 rounded-full" style={{width:'45%'}}></div></div>
             </div>
             <div>
               <div className="flex justify-between text-sm mb-1"><span className="text-white/60">Kenya</span><span className="font-bold">25%</span></div>
               <div className="w-full bg-white/5 h-1.5 rounded-full"><div className="bg-eterna-rose h-1.5 rounded-full" style={{width:'25%'}}></div></div>
             </div>
             <div>
               <div className="flex justify-between text-sm mb-1"><span className="text-white/60">South Africa</span><span className="font-bold">18%</span></div>
               <div className="w-full bg-white/5 h-1.5 rounded-full"><div className="bg-eterna-rose h-1.5 rounded-full" style={{width:'18%'}}></div></div>
             </div>
          </div>
        </div>

        <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
             <Smile className="text-eterna-violet w-6 h-6" />
             <h2 className="font-bold text-xl uppercase tracking-wider">Sentiment</h2>
          </div>
          <div className="flex items-center justify-center h-32 mb-4">
             <div className="text-center">
                <div className="text-5xl font-black text-green-400 mb-2">94%</div>
                <div className="text-sm text-white/50 uppercase tracking-widest">Positive Feedback</div>
             </div>
          </div>
          <p className="text-sm text-white/70 text-center">"African Leadership Series" is highly praised for its cinematography.</p>
        </div>

        <div className="bg-[#111] rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-[#111] to-eterna-rose/10">
          <div className="flex items-center gap-3 mb-6">
             <span className="text-eterna-rose text-2xl">✨</span>
             <h2 className="font-bold text-xl uppercase tracking-wider">AI Advisor</h2>
          </div>
          <div className="bg-black/40 p-4 rounded-lg border border-white/10 mb-4 h-[180px] overflow-y-auto hide-scrollbar">
            {!advice ? (
               <p className="text-sm text-white/90">Your documentary content performs <span className="text-green-400 font-bold">47% better</span> in Kenya than Ghana.</p>
            ) : (
               <div className="text-xs text-white/80 whitespace-pre-wrap leading-relaxed">{advice}</div>
            )}
            {isAdvising && (
               <p className="text-xs text-eterna-rose mt-4 animate-pulse">Generating strategic pathways...</p>
            )}
          </div>
          <button 
            onClick={getStrategicAdvice}
            disabled={isAdvising}
            className="w-full bg-eterna-rose hover:bg-eterna-rose/80 text-white font-bold py-2.5 rounded-lg text-sm shadow-[0_0_15px_rgba(225,29,72,0.4)] disabled:opacity-50"
          >
            {isAdvising ? "Analyzing..." : "Suggest Marketing Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function TreasuryCenter() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto relative z-10 mt-4 animate-in fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Treasury</h1>
          <p className="text-white/50 text-[15px] font-mono">Revenue, Finance & Monetization Center.</p>
        </div>
        <button onClick={() => setActiveModal('payout')} className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">Initiate Payout</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111] rounded-2xl p-8 border border-white/5 col-span-2 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-white/50 font-bold tracking-widest uppercase text-sm mb-2">Creator Wallet Balance</h2>
          <div className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-green-400 mb-8">$15,420.50</div>

          <h3 className="font-bold text-lg mb-4 uppercase border-b border-white/10 pb-2">Revenue Breakdown</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Subscriptions</div>
                <div className="text-2xl font-bold">$7,240</div>
             </div>
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Advertising (AVOD)</div>
                <div className="text-2xl font-bold">$4,180</div>
             </div>
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Licensing</div>
                <div className="text-2xl font-bold">$3,500</div>
             </div>
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Sponsorships & Tips</div>
                <div className="text-2xl font-bold">$500</div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
             <h2 className="font-bold text-lg mb-4 uppercase tracking-wider flex items-center gap-2"><HandCoins className="w-5 h-5 text-eterna-gold" /> Licensing Marketplace</h2>
             <p className="text-sm text-white/50 mb-4">You have 3 active bids from international TV stations for your content.</p>
             <button onClick={() => setActiveModal('licensing')} className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold transition-colors">Review Bids</button>
           </div>
           <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
             <h2 className="font-bold text-lg mb-4 uppercase tracking-wider flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-400" /> AI Forecast</h2>
             <p className="text-sm text-white/50 mb-4">Projected monthly revenue for next 30 days based on current growth trajectory.</p>
             <div className="text-3xl font-black text-green-400 mb-2">~$22,500</div>
           </div>
        </div>
      </div>

      {activeModal === 'licensing' && <LicensingMarketplaceModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'payout' && <PayoutModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}

function PayoutModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 text-white/50 hover:text-white"><X className="w-5 h-5"/></button>
        <h2 className="text-2xl font-bold mb-6">Initiate Payout</h2>
        
        {step === 1 && (
          <div className="space-y-4">
             <div className="bg-white/5 rounded-xl p-4 font-mono mb-6">
                <div className="text-white/50 text-xs uppercase mb-1">Available Balance</div>
                <div className="text-3xl text-green-400 font-bold">$15,420.50</div>
             </div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-4">Select Method</h3>
             {['Bank Transfer', 'PayPal', 'Stripe', 'Mobile Money', 'Crypto Wallet'].map(m => (
               <button key={m} onClick={() => { setMethod(m); setStep(2); }} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-left hover:border-eterna-rose hover:bg-eterna-rose/10 transition-colors flex justify-between items-center">
                 <span>{m}</span>
                 <ArrowRight className="w-4 h-4 text-white/50" />
               </button>
             ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
             <p className="text-white/50 text-sm">Transferring via <span className="text-white font-bold">{method}</span></p>
             <div>
               <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">Amount</label>
               <input type="text" placeholder="$0.00" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-2xl font-mono text-white outline-none focus:border-eterna-gold" />
             </div>
             <button onClick={() => setStep(3)} className="w-full bg-eterna-rose text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-eterna-rose/90 shadow-[0_0_20px_rgba(225,29,72,0.4)]">Continue</button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
             <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
               <CheckCircle2 className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-bold mb-2">Processing Payout</h3>
             <p className="text-white/50 mb-8">Your withdrawal has been initiated securely.</p>
             <button onClick={onClose} className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-xl font-bold">Return to Treasury</button>
          </div>
        )}
      </div>
    </div>
  );
}

function LicensingMarketplaceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#111]/90 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><Globe className="w-6 h-6 text-eterna-rose" /> Licensing Marketplace</h2>
            <p className="text-white/50 text-sm mt-1">Negotiate distribution rights with networks and streaming platforms.</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 p-2 rounded-full"><X className="w-6 h-6"/></button>
        </div>

        <div className="p-6 space-y-8">
          <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-xl border border-green-500/20 flex gap-4 items-start">
             <div className="text-3xl mt-1">🤖</div>
             <div>
               <h3 className="font-bold text-green-400 mb-1">Smart Licensing Intelligence</h3>
               <p className="text-sm text-white/80">The BBC Africa offer is <span className="font-bold text-red-400">18% below market value</span> for this territory and duration. Recommended counter offer: <span className="font-bold text-white">$24,500</span>.</p>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-white/50 border-b border-white/10">
                <tr><th className="pb-3 font-normal">Buyer</th><th className="pb-3 font-normal">Territory</th><th className="pb-3 font-normal">Duration</th><th className="pb-3 font-normal">Offer</th><th className="pb-3 font-normal">Status</th><th className="pb-3 justify-end flex font-normal">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5">
                  <td className="py-4 font-bold flex items-center gap-2"><div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-xs">T5</div> TV5 Monde</td>
                  <td className="py-4">Global Francophone</td>
                  <td className="py-4">36 Months</td>
                  <td className="py-4 font-mono font-bold">$35,000</td>
                  <td className="py-4"><span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">Pending</span></td>
                  <td className="py-4 flex gap-2 justify-end">
                    <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-widest">Accept</button>
                    <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-widest">Counter</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="py-4 font-bold flex items-center gap-2"><div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-xs">BBC</div> BBC Africa</td>
                  <td className="py-4">Africa</td>
                  <td className="py-4">24 Months</td>
                  <td className="py-4 font-mono font-bold">$18,000</td>
                  <td className="py-4"><span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">Pending</span></td>
                  <td className="py-4 flex gap-2 justify-end">
                    <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-widest">Accept</button>
                    <button className="bg-eterna-rose text-white hover:opacity-90 px-3 py-1.5 rounded font-bold text-xs border border-eterna-rose uppercase tracking-widest shadow-[0_0_10px_rgba(225,29,72,0.4)]">Counter $24.5k</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="py-4 font-bold flex items-center gap-2"><div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-xs">C+</div> Canal+</td>
                  <td className="py-4">Francophone Afr.</td>
                  <td className="py-4">18 Months</td>
                  <td className="py-4 font-mono font-bold">$22,000</td>
                  <td className="py-4"><span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">Pending</span></td>
                  <td className="py-4 flex gap-2 justify-end">
                    <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-widest">Accept</button>
                    <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-widest">Counter</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AllianceCenter() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto relative z-10 mt-4 animate-in fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Alliance</h1>
          <p className="text-white/50 text-[15px] font-mono">Partnerships, Community & Collaboration Center.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-[#111] rounded-2xl p-6 border border-white/5 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-eterna-rose/20 flex items-center justify-center mb-4"><Users className="w-8 h-8 text-eterna-rose" /></div>
            <h2 className="font-bold text-xl mb-2">Partner Network</h2>
            <p className="text-sm text-white/50 mb-6">Connect with filmmakers, producers, distributors, and broadcasters globally.</p>
            <button onClick={() => setActiveModal('network')} className="mt-auto w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold">Discover Partners</button>
         </div>

         <div className="bg-[#111] rounded-2xl p-6 border border-white/5 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"><DollarSign className="w-8 h-8 text-green-400" /></div>
            <h2 className="font-bold text-xl mb-2">Investment Hub</h2>
            <p className="text-sm text-white/50 mb-6">Access production funding, grants, venture capital, and sponsorship...</p>
            <button onClick={() => setActiveModal('invest')} className="mt-auto w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold">Find Funding</button>
         </div>

         <div className="bg-[#111] rounded-2xl p-6 border border-white/5 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4"><MessageSquare className="w-8 h-8 text-blue-400" /></div>
            <h2 className="font-bold text-xl mb-2">Messaging Center</h2>
            <p className="text-sm text-white/50 mb-6">Secure communication spaces, group discussions, and project rooms.</p>
            <button onClick={() => setActiveModal('messaging')} className="mt-auto w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold">Open Inbox</button>
         </div>
      </div>

      <div className="bg-[#111] rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-eterna-rose/5 blur-3xl rounded-full group-hover:bg-eterna-rose/10 transition-colors pointer-events-none" />
         <h2 className="font-bold text-xl mb-6 uppercase tracking-wider flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-400" /> Collaboration Marketplace</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div onClick={() => setActiveModal('market-editors')} className="bg-black/40 p-6 border border-white/5 rounded-2xl text-center hover:border-indigo-400/50 hover:bg-indigo-400/5 transition-all cursor-pointer">
               <div className="font-bold mb-2 text-lg">Editors Needed</div>
               <div className="text-xs uppercase tracking-widest text-indigo-400 font-bold">84 Open Roles</div>
            </div>
            <div onClick={() => setActiveModal('market-directors')} className="bg-black/40 p-6 border border-white/5 rounded-2xl text-center hover:border-eterna-rose/50 hover:bg-eterna-rose/5 transition-all cursor-pointer">
               <div className="font-bold mb-2 text-lg">Directors Wanted</div>
               <div className="text-xs uppercase tracking-widest text-eterna-rose font-bold">12 Projects</div>
            </div>
            <div onClick={() => setActiveModal('market-cinematographers')} className="bg-black/40 p-6 border border-white/5 rounded-2xl text-center hover:border-green-400/50 hover:bg-green-400/5 transition-all cursor-pointer">
               <div className="font-bold mb-2 text-lg">Cinematographers</div>
               <div className="text-xs uppercase tracking-widest text-green-400 font-bold">34 Requests</div>
            </div>
            <div onClick={() => setActiveModal('market-voice')} className="bg-black/40 p-6 border border-white/5 rounded-2xl text-center hover:border-blue-400/50 hover:bg-blue-400/5 transition-all cursor-pointer">
               <div className="font-bold mb-2 text-lg">Voice Artists</div>
               <div className="text-xs uppercase tracking-widest text-blue-400 font-bold">115 Auditions</div>
            </div>
         </div>
      </div>
{activeModal === 'network' && <PartnerNetworkModal onClose={() => setActiveModal(null)} />}
{activeModal === 'invest' && <InvestmentHubModal onClose={() => setActiveModal(null)} />}
{activeModal === 'messaging' && <MessagingCenterModal onClose={() => setActiveModal(null)} />}
{activeModal && activeModal.startsWith('market-') && <CollabMarketplaceModal category={activeModal.replace('market-', '')} onClose={() => setActiveModal(null)} />}
    </div>
  );
}

function PartnerNetworkModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#111]/90 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-eterna-rose" /> Partner Network</h2>
            <p className="text-white/50 text-sm mt-1">Discover and connect with top industry professionals.</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 p-2 rounded-full"><X className="w-6 h-6"/></button>
        </div>
        <div className="p-6">
           <div className="bg-gradient-to-r from-eterna-rose/20 to-transparent p-6 rounded-xl border border-eterna-rose/20 flex gap-4 items-center mb-8">
              <span className="text-4xl">⚡</span>
              <div>
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">AI Matchmaking <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs uppercase tracking-widest">89% Match</span></h3>
                <p className="text-sm text-white/80">Recommended Partner: <span className="font-bold text-white">Amara Okafor</span> (Documentary Producer, Kenya). Highly compatible for your upcoming series based on shared thematic interests.</p>
              </div>
              <button className="ml-auto bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]">Connect</button>
           </div>
           
           <h3 className="font-bold uppercase tracking-wider text-sm text-white/50 mb-4">Discover Partners</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Lusimadio Simão', title: 'Independent Filmmaker', loc: 'Cape Town, South Africa', stats: '12 Films • 5 Awards • 320k Views', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop' },
                { name: 'Amara Okafor', title: 'Documentary Producer', loc: 'Nairobi, Kenya', stats: '8 Films • 11 Awards • 1.2M Views', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1eb4aa?q=80&w=150&auto=format&fit=crop' },
                { name: 'David Chen', title: 'Distributor', loc: 'London, UK', stats: '500+ Acquisitions', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' },
                { name: 'Elena Rostova', title: 'Screenwriter', loc: 'Berlin, Germany', stats: '22 Scripts • 3 Features', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' }
              ].map((p, i) => (
                <div key={i} className="bg-black/50 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-colors group">
                   <div className="flex gap-4 mb-4">
                     <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                       <img src={p.avatar} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                     </div>
                     <div>
                       <h4 className="font-bold text-lg">{p.name}</h4>
                       <div className="text-sm text-white/50 mb-1">{p.title}</div>
                       <div className="text-xs text-white/40 flex items-center gap-1"><MapPin className="w-3 h-3"/> {p.loc}</div>
                     </div>
                   </div>
                   <div className="text-xs text-white/80 font-mono bg-white/5 p-2 rounded mb-4">{p.stats}</div>
                   <div className="flex gap-2 mt-auto">
                     <button className="flex-1 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">Profile</button>
                     <button className="flex-1 bg-white hover:bg-gray-200 text-black px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">Message</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function InvestmentHubModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#111]/90 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><DollarSign className="w-6 h-6 text-green-400" /> Investment Hub</h2>
            <p className="text-white/50 text-sm mt-1">Access production funding and venture capital.</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 p-2 rounded-full"><X className="w-6 h-6"/></button>
        </div>
        <div className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-3xl rounded-full" />
                 <div className="text-6xl font-black text-green-400 mb-2 relative z-10">89<span className="text-2xl text-green-400/50">/100</span></div>
                 <div className="text-sm font-bold uppercase tracking-widest text-green-400/70 mb-4 relative z-10">AI Funding Score</div>
                 <p className="text-xs text-white/70 relative z-10">Strong market potential for your upcoming documentary series. Funding readiness is exceptionally high.</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                 <h3 className="font-bold uppercase tracking-wider text-sm text-white/50">Active Opportunities</h3>
                 
                 <div className="bg-black/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center group hover:border-white/20 transition-all">
                    <div>
                      <div className="flex gap-2 items-center mb-2"><span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">Grant</span><h4 className="font-bold text-lg">African Film Development Fund</h4></div>
                      <p className="text-sm text-white/50">$50,000 - $250,000 • Status: <span className="text-green-400 font-bold">Open</span></p>
                    </div>
                    <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 transition-all">Apply</button>
                 </div>

                 <div className="bg-black/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center group hover:border-white/20 transition-all">
                    <div>
                      <div className="flex gap-2 items-center mb-2"><span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">Investor</span><h4 className="font-bold text-lg">Media Growth Ventures</h4></div>
                      <p className="text-sm text-white/50">Seeking: Documentaries • $100K - $2M</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shrink-0 transition-colors backdrop-blur">Pitch</button>
                 </div>

                 <div className="bg-black/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center group hover:border-white/20 transition-all">
                    <div>
                      <div className="flex gap-2 items-center mb-2"><span className="bg-yellow-500/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">Sponsor</span><h4 className="font-bold text-lg">Samsung Africa Sponsorship</h4></div>
                      <p className="text-sm text-white/50">Budget: $500,000 Total Pool</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shrink-0 transition-colors backdrop-blur">Propel</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MessagingCenterModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-3xl max-w-[1200px] w-full h-[85vh] flex overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
         <div className="w-[320px] border-r border-white/5 bg-black/40 flex flex-col overflow-hidden shrink-0 hidden md:flex">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#111]">
              <h2 className="font-bold text-xl flex items-center gap-2"><MessageSquare className="w-5 h-5 text-blue-400"/> Inbox</h2>
            </div>
            <div className="p-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="text" placeholder="Search messages..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-eterna-rose transition-colors" />
              </div>
            </div>
            <div className="p-3 space-y-1 overflow-y-auto flex-1 hide-scrollbar">
               <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 py-2 mt-2">Project Rooms</div>
               <div className="p-3 rounded-xl bg-eterna-rose/10 border border-eterna-rose/30 cursor-pointer">
                 <div className="flex justify-between items-center mb-1">
                    <div className="font-bold text-sm">Ubuntu Documentary</div>
                    <span className="text-[10px] text-eterna-rose font-bold">10:46 AM</span>
                 </div>
                 <div className="text-xs text-white/60 line-clamp-1">Eterna System: Meeting scheduled and invites sent.</div>
               </div>
               <div className="p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent">
                 <div className="flex justify-between items-center mb-1">
                    <div className="font-bold text-sm">Design Assets</div>
                    <span className="text-[10px] text-white/40">Yesterday</span>
                 </div>
                 <div className="text-xs text-white/60 line-clamp-1">Mark: I've uploaded the new posters.</div>
               </div>
               
               <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 py-2 mt-4 flex items-center gap-2">Direct Messages <span className="bg-eterna-rose text-white text-[9px] px-1.5 py-0.5 rounded-full">1</span></div>
               <div className="p-3 rounded-xl hover:bg-white/5 cursor-pointer flex gap-3 transition-colors">
                 <div className="w-10 h-10 rounded-full bg-blue-600 shrink-0 flex items-center justify-center font-bold relative">
                   D <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#111] rounded-full flex items-center justify-center"><div className="w-2.5 h-2.5 bg-green-500 rounded-full" /></div>
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-center mb-0.5">
                     <div className="font-bold text-sm truncate">David Chen</div>
                   </div>
                   <div className="text-xs text-white/60 line-clamp-1">Checking on the distribution rights. Need an update by EOD.</div>
                 </div>
               </div>
               <div className="p-3 rounded-xl hover:bg-white/5 cursor-pointer flex gap-3 transition-colors bg-white/5 border border-white/5">
                 <div className="w-10 h-10 rounded-full bg-red-600 shrink-0 flex items-center justify-center font-bold">B</div>
                 <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-center mb-0.5">
                     <div className="font-bold text-sm truncate">BBC Africa</div>
                     <div className="w-2 h-2 rounded-full bg-eterna-rose shrink-0" />
                   </div>
                   <div className="text-xs text-white/90 font-medium line-clamp-1">New Bid Proposal attached for Q3.</div>
                 </div>
               </div>
            </div>
         </div>
         
         <div className="flex-1 flex flex-col bg-[#111] relative">
            <div className="h-[72px] p-6 border-b border-white/5 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-4">
                  <div className="md:hidden">
                    <button onClick={onClose} className="p-2"><ArrowLeft className="w-5 h-5"/></button>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg leading-tight">Ubuntu Documentary</h3>
                    <p className="text-xs text-green-400 font-mono font-bold mt-0.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span> 12 Members Active</p>
                  </div>
               </div>
               <div className="flex gap-2">
                 <button className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-colors"><Video className="w-5 h-5"/></button>
                 <button className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-colors"><FileText className="w-5 h-5"/></button>
                 <button onClick={onClose} className="bg-white/5 hover:bg-eterna-rose/20 hover:text-eterna-rose p-2.5 rounded-xl transition-colors ml-2 hidden md:block"><X className="w-5 h-5"/></button>
               </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-8 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
               <div className="text-center"><span className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-white/40 px-3 py-1 rounded-full">Today</span></div>
               
               <div className="flex gap-4 max-w-[85%]">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0"><img src="https://images.unsplash.com/photo-1531123897727-8f129e1eb4aa?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" /></div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1.5"><span className="font-bold text-sm">Amara Okafor</span> <span className="text-[10px] text-white/40">10:42 AM</span></div>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-sm text-sm text-white/90 leading-relaxed shadow-sm">I've uploaded the new contracts to the file share. Let's schedule a video meeting to review before we sign.</div>
                    <div className="mt-2 flex gap-2">
                       <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center gap-3 w-64 hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded bg-[#111] text-eterna-rose flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold truncate">Distribution_Agreement_v3.pdf</div>
                            <div className="text-[10px] text-white/40">2.4 MB</div>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
               
               <div className="flex gap-4 flex-row-reverse max-w-[85%] ml-auto">
                  <div className="w-10 h-10 rounded-full bg-eterna-rose flex items-center justify-center font-bold shrink-0">L</div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-2 mb-1.5"><span className="text-[10px] text-white/40">10:45 AM</span> <span className="font-bold text-sm">You</span></div>
                    <div className="bg-gradient-to-r from-eterna-rose to-[#d61b4d] p-4 rounded-2xl rounded-tr-sm text-sm text-white shadow-[0_5px_15px_rgba(225,29,72,0.2)] leading-relaxed">Sounds perfect. I'll read through them now. Let's meet at 2 PM GMT?</div>
                  </div>
               </div>
               
               <div className="flex gap-4 max-w-[85%] mt-8 relative">
                  <div className="absolute -left-12 top-6 w-8 h-[1px] bg-green-500/30"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center font-bold shrink-0 shadow-[0_0_15px_rgba(74,222,128,0.3)]">✨</div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1.5"><span className="font-bold text-sm text-green-400">Eterna Engine</span> <span className="text-[10px] text-white/40">10:46 AM</span></div>
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl rounded-tl-sm text-sm text-white flex flex-col gap-3 backdrop-blur-sm">
                       <div className="flex items-start gap-3">
                         <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                         <div className="leading-relaxed font-mono">Meeting scheduled successfully. Calendar invites distributed to 12 room members. Virtual production room initialized.</div>
                       </div>
                       <div className="ml-8 mt-1">
                         <button className="bg-green-500 text-black hover:bg-green-400 px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">Join Video Room</button>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="p-4 md:p-6 border-t border-white/5 bg-[#111]">
               <div className="relative flex items-end gap-3 bg-black/40 border border-white/10 rounded-2xl p-2 focus-within:border-eterna-rose/50 focus-within:bg-black/60 transition-all">
                 <button className="p-3 text-white/40 hover:text-white transition-colors rounded-xl hover:bg-white/5 shrink-0"><Upload className="w-5 h-5"/></button>
                 <textarea 
                   placeholder="Message #Ubuntu-Documentary..." 
                   className="w-full bg-transparent border-none text-sm outline-none resize-none min-h-[46px] max-h-[150px] py-3 text-white placeholder-white/30"
                   rows={1}
                 />
                 <button className="p-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-xl shrink-0 shadow-lg"><ArrowUpRight className="w-5 h-5"/></button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function CollabMarketplaceModal({ category, onClose }: { category: string, onClose: () => void }) {
  const getDetails = () => {
    switch(category) {
      case 'editors': return {
        title: 'Editors Needed',
        icon: '🎬',
        roles: [
          { project: 'Ubuntu Rising', type: 'Lead Editor', rate: '$5k - $8k', status: 'Urgent' },
          { project: 'Lagos Nights', type: 'Colorist', rate: '$3k', status: 'Open' },
          { project: 'The Trade', type: 'VFX Compositor', rate: '$10k', status: 'Reviewing' }
        ]
      };
      case 'directors': return {
        title: 'Directors Wanted',
        icon: '🎥',
        roles: [
          { project: 'Savannah Series', type: 'Series Director', rate: 'Negotiable', status: 'Open' },
          { project: 'Echoes of Time', type: '2nd Unit Director', rate: '$15k', status: 'Urgent' }
        ]
      };
      case 'cinematographers': return {
        title: 'Cinematographers',
        icon: '📹',
        roles: [
          { project: 'Kigali Dawn (Doc)', type: 'DoP', rate: '$6k', status: 'Open' },
          { project: 'The Market (Short)', type: 'Camera Op', rate: '$1.5k', status: 'Urgent' }
        ]
      };
      case 'voice': return {
        title: 'Voice Artists',
        icon: '🎙️',
        roles: [
          { project: 'Ancestors (Animation)', type: 'Lead Voice', rate: '$2k', status: 'Open' },
          { project: 'Naja Commercial', type: 'Narrator', rate: '$500', status: 'Reviewing' }
        ]
      };
      default: return { title: 'Marketplace', icon: '💼', roles: [] };
    }
  };

  const details = getDetails();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#111]/90 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">{details.icon} {details.title}</h2>
            <p className="text-white/50 text-sm mt-1">Browse open roles and apply across the Eterna network.</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 p-2 rounded-full"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-6 space-y-4">
           {details.roles.map((role, i) => (
              <div key={i} className="bg-black border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all cursor-pointer group">
                 <div>
                    <div className="text-xs uppercase tracking-widest text-[#4f46e5] font-bold mb-1">{role.status}</div>
                    <div className="font-bold text-lg text-white group-hover:text-eterna-rose transition-colors">{role.type}</div>
                    <div className="text-sm text-white/50">{role.project}</div>
                 </div>
                 <div className="flex flex-row sm:flex-col justify-between sm:items-end w-full sm:w-auto">
                    <span className="font-mono text-green-400 font-bold">{role.rate}</span>
                    <button className="mt-0 sm:mt-2 bg-white/10 hover:bg-white text-white hover:text-black px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-widest">Apply Now</button>
                 </div>
              </div>
           ))}
           {details.roles.length === 0 && (
             <div className="text-center text-white/50 py-10">No open roles found for this category.</div>
           )}
        </div>
      </div>
    </div>
  );
}