import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { 
  ArrowLeft, LayoutDashboard, Film, BarChart3, DollarSign, Users, 
  Settings, UploadCloud, PlayCircle, Clock, Globe, ArrowUpRight, CheckCircle2, XCircle
} from 'lucide-react';

import { DashboardCenter, ArsenalCenter, IntelligenceCenter, TreasuryCenter, AllianceCenter } from './partner/PartnerCenters';
import { SettingsCenter } from './partner/SettingsCenter';

export function PartnerScreen() {
  const [onboarded, setOnboarded] = useState(false);
  const [step, setStep] = useState(0);

  if (onboarded) {
    return <PartnerControlCenter />;
  }

  return <PartnerOnboarding flowStep={step} setFlowStep={setStep} setOnboarded={setOnboarded} />;
}

function PartnerControlCenter() {
  const { go } = useAppStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUpload, setShowUpload] = useState(false);
  const [isNovaOpen, setIsNovaOpen] = useState(false);
  const [novaInput, setNovaInput] = useState("");
  const [novaMessages, setNovaMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    {role: 'ai', text: 'System Online. Eterna Oracle / Pulse ready. How can I assist you with your global telemetry or strategy today?'}
  ]);
  const [isNovaLoading, setIsNovaLoading] = useState(false);

  const handleNovaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaInput.trim()) return;
    
    const userText = novaInput.trim();
    setNovaMessages(prev => [...prev, {role: 'user', text: userText}]);
    setNovaInput("");
    setIsNovaLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setNovaMessages(prev => [...prev, {role: 'ai', text: data.text}]);
    } catch (err: any) {
      console.error(err);
      setNovaMessages(prev => [...prev, {role: 'ai', text: 'ERROR: Unable to reach Eterna neural network. Please check your connection.'}]);
    } finally {
      setIsNovaLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardCenter setShowUpload={setShowUpload} />;
      case 'content': return <ArsenalCenter setShowUpload={setShowUpload} />;
      case 'analytics': return <IntelligenceCenter />;
      case 'revenue': return <TreasuryCenter />;
      case 'community': return <AllianceCenter />;
      case 'settings': return <SettingsCenter />;
      default: return <DashboardCenter setShowUpload={setShowUpload} />;
    }
  };

  return (
    <div className="flex h-screen bg-eterna-bg text-white font-sans overflow-hidden">
      
      {/* Sidebar - Floating Glass */}
      <div className="w-[80px] md:w-[260px] flex flex-col p-4 shrink-0 relative z-20">
        <div className="bg-eterna-bg/40 backdrop-blur-3xl border border-white/5 rounded-2xl h-[calc(100vh-2rem)] flex flex-col p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="px-2 mb-10 flex items-center gap-4 mt-2">
            <div className="w-10 h-10 bg-grad rounded-xl flex items-center justify-center shrink-0 cursor-pointer shadow-lg hover:scale-105 transition-transform" onClick={() => go('landing')}>
              <ArrowLeft className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-xl text-transparent bg-clip-text bg-grad tracking-tight leading-none block font-sans">Eterna</span>
              <span className="text-[10px] uppercase text-white/50 tracking-[2px] font-bold">Command Center</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <NavItem active={activeTab === 'dashboard'} icon={<LayoutDashboard />} label="Dashboard" onClick={() => setActiveTab('dashboard')} />
            <NavItem active={activeTab === 'content'} icon={<Film />} label="Arsenal" onClick={() => setActiveTab('content')} />
            <NavItem active={activeTab === 'analytics'} icon={<BarChart3 />} label="Intelligence" onClick={() => setActiveTab('analytics')} />
            <NavItem active={activeTab === 'revenue'} icon={<DollarSign />} label="Treasury" onClick={() => setActiveTab('revenue')} />
            <NavItem active={activeTab === 'community'} icon={<Users />} label="Alliance" onClick={() => setActiveTab('community')} />
          </div>

          {/* XP & Level Status (Achievement System) */}
          <div className="hidden md:block mt-8 bg-black/40 rounded-xl p-4 border border-white/5">
             <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-eterna-rose uppercase tracking-wider">Level 12 Director</span>
                <span className="text-[10px] font-mono text-white/50">4.2k XP</span>
             </div>
             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-grad w-[65%]" />
             </div>
             <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-eterna-rose/20 border border-eterna-rose flex items-center justify-center" title="Rising Creator">🥉</div>
                <div className="w-8 h-8 rounded-full bg-eterna-violet/20 border border-eterna-violet flex items-center justify-center" title="Trending Creator">🥈</div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40">🔒</div>
             </div>
          </div>

          <div className="mt-auto pb-2">
            <NavItem active={activeTab === 'settings'} icon={<Settings />} label="Settings" onClick={() => setActiveTab('settings')} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-eterna-rose/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-eterna-violet/10 rounded-full blur-[100px] pointer-events-none" />
        
        {renderContent()}

        {/* Nova AI Helper overlaying dashboard */}
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[200]">
           <div className="relative group cursor-pointer" onClick={() => setIsNovaOpen(!isNovaOpen)}>
              <div className="absolute -inset-2 bg-gradient-to-r from-eterna-rose to-eterna-violet rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              <button className={`relative w-16 h-16 bg-black border ${isNovaOpen ? 'border-eterna-rose' : 'border-white/20'} rounded-full flex items-center justify-center shadow-2xl overflow-hidden backdrop-blur-2xl transition-all`}>
                  <div className="absolute inset-0 bg-grad opacity-20" />
                  <div className="flex flex-col items-center justify-center">
                    {isNovaOpen ? (
                      <XCircle className="w-6 h-6 text-eterna-rose" />
                    ) : (
                      <>
                        <span className="w-4 h-4 rounded-full bg-eterna-rose mb-1 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                        <span className="text-[9px] font-black text-white tracking-widest drop-shadow-md">NOVA</span>
                      </>
                    )}
                  </div>
              </button>
           </div>
        </div>

        {/* Nova AI Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#0a0a0a]/95 backdrop-blur-3xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[150] transition-transform duration-500 flex flex-col ${isNovaOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-gradient-to-r from-[#111] to-eterna-rose/5">
              <div className="w-10 h-10 rounded-full bg-eterna-rose/20 flex items-center justify-center border border-eterna-rose shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                 <span className="text-xl">✨</span>
              </div>
              <div>
                 <h3 className="font-bold text-white text-lg tracking-wide">Eterna Oracle</h3>
                 <p className="text-[10px] text-eterna-rose font-mono uppercase tracking-widest animate-pulse">Neural Network Active</p>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar flex flex-col">
              {novaMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                   <div className={`max-w-[85%] rounded-2xl p-4 text-[14px] ${
                     msg.role === 'user' 
                       ? 'bg-white/10 border border-white/20 text-white rounded-br-none' 
                       : 'bg-black/50 border border-eterna-rose/30 text-white/90 rounded-bl-none shadow-[0_0_15px_rgba(225,29,72,0.1)]'
                   }`}>
                     {msg.role === 'ai' && <div className="text-[10px] font-bold text-eterna-rose mb-2 font-mono uppercase tracking-widest">Oracle Response</div>}
                     <div className="markdown-body text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                   </div>
                </div>
              ))}
              {isNovaLoading && (
                <div className="flex justify-start">
                   <div className="max-w-[85%] rounded-2xl p-4 bg-black/50 border border-eterna-violet/30 rounded-bl-none">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-eterna-violet animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-eterna-violet animate-bounce" style={{animationDelay: '0.2s'}} />
                        <span className="w-2 h-2 rounded-full bg-eterna-violet animate-bounce" style={{animationDelay: '0.4s'}} />
                      </div>
                   </div>
                </div>
              )}
           </div>

           <div className="p-4 bg-black/50 border-t border-white/10">
              <form onSubmit={handleNovaSubmit} className="relative">
                 <input 
                   type="text" 
                   value={novaInput}
                   onChange={e => setNovaInput(e.target.value)}
                   disabled={isNovaLoading}
                   placeholder="Ask Eterna Oracle..." 
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white outline-none focus:border-eterna-rose transition-colors disabled:opacity-50 pr-12 font-mono"
                 />
                 <button 
                   type="submit" 
                   disabled={!novaInput.trim() || isNovaLoading}
                   className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-eterna-rose hover:bg-eterna-rose/80 rounded-lg flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:hover:bg-eterna-rose"
                 >
                   <ArrowUpRight className="w-5 h-5" />
                 </button>
              </form>
           </div>
        </div>
      </div>

      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} />
      )}

    </div>
  );
}

function NavItem({ active, icon, label, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        active ? 'bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10 font-bold' : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'
      }`}
    >
      <div className={`shrink-0 ${active ? 'text-eterna-rose' : ''}`}>{icon}</div>
      <div className="hidden md:block text-[14px] uppercase tracking-wider">{label}</div>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: any) {
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl group overflow-hidden relative">
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-30 transform group-hover:scale-110 transition-all duration-500 pointer-events-none">
         {icon}
      </div>
      <div className="flex items-center justify-between mb-4 relative z-10">
         <span className="text-white/50 text-[11px] font-mono font-bold tracking-widest uppercase">{title}</span>
         <div className="bg-white/5 p-2 rounded-lg border border-white/5">
           {icon}
         </div>
      </div>
      <div className="relative z-10">
         <div className="text-3xl font-black mb-2 tracking-tight">{value}</div>
         <div className="flex items-center gap-1 text-[11px] font-bold text-eterna-violet bg-eterna-violet/10 w-fit px-2 py-1 rounded">
           <ArrowUpRight className="w-3 h-3" />
           <span>{change} NET CHANGE</span>
         </div>
      </div>
    </div>
  );
}

function StatusRow({ title, status, type }: any) {
  const colors = {
    success: 'text-eterna-violet bg-eterna-violet/10 border-eterna-violet/20 shadow-[0_0_10px_rgba(0,214,143,0.2)]',
    info: 'text-eterna-rose bg-eterna-rose/10 border-eterna-rose/20 shadow-[0_0_10px_rgba(60,174,255,0.2)]',
    warning: 'text-eterna-gold bg-eterna-gold/10 border-eterna-gold/20 shadow-[0_0_10px_rgba(245,176,65,0.2)]',
    error: 'text-red-500 bg-red-500/10 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
  };
  
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="font-bold text-[14px] group-hover:text-white text-white/90">{title}</div>
      <div className={`px-3 py-1 rounded font-mono text-[10px] font-bold border tracking-wider ${(colors as any)[type]}`}>
        {status}
      </div>
    </div>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasPoster, setHasPoster] = useState(false);
  const [hasTrailer, setHasTrailer] = useState(false);
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);

  const runAiScan = () => {
    setIsScanning(true);
    
    // Simulate AI Scan processing time
    setTimeout(() => {
      // Generate somewhat random but realistic scores for the criteria
      // Base score generator that ensures we usually pass but sometimes fail
      const getScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
      
      const isGood = Math.random() > 0.3; // 70% chance of a good overall score
      
      const story = getScore(isGood ? 80 : 60, 100);
      const production = getScore(isGood ? 80 : 60, 100);
      const audience = getScore(isGood ? 75 : 55, 95);
      const commercial = getScore(isGood ? 75 : 50, 95);
      const technical = getScore(isGood ? 90 : 70, 100); // Technical is usually higher
      const cultural = getScore(isGood ? 70 : 50, 95);
      const localization = getScore(isGood ? 85 : 40, 100);
      
      // Calculate weighted total
      const totalScore = (
        (story * 0.25) +
        (production * 0.20) +
        (audience * 0.15) +
        (commercial * 0.15) +
        (technical * 0.10) +
        (cultural * 0.10) +
        (localization * 0.05)
      );

      setScanResults({
        metrics: [
          { name: "Story Quality", weight: "25%", score: story, pass: story >= 70 },
          { name: "Production Quality", weight: "20%", score: production, pass: production >= 75 },
          { name: "Audience Appeal", weight: "15%", score: audience, pass: audience >= 70 },
          { name: "Commercial Potential", weight: "15%", score: commercial, pass: commercial >= 70 },
          { name: "Technical Compliance", weight: "10%", score: technical, pass: technical >= 85 },
          { name: "Cultural Relevance", weight: "10%", score: cultural, pass: cultural >= 60 },
          { name: "Localization Readiness", weight: "5%", score: localization, pass: localization >= 60 }
        ],
        totalScore: Math.round(totalScore),
        passed: totalScore >= 75
      });
      
      setIsScanning(false);
      setScanComplete(true);
    }, 4000);
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-[#050505] border border-white/20 w-full max-w-3xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] glass-panel">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-eterna-rose animate-pulse" />
             <h2 className="text-xl font-bold font-mono tracking-wider">SECURE UPLOAD TERMINAL</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><XCircle className="w-6 h-6 text-white/50" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8 relative">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full relative overflow-hidden bg-white/10`}>
                 {step >= i && <div className="absolute inset-0 bg-grad animate-in slide-in-from-left duration-1000 shadow-[0_0_10px_rgba(60,174,255,0.8)]" />}
              </div>
            ))}
          </div>
          
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-[18px] font-bold mb-4 uppercase tracking-wider text-white">Metadata Entry</h3>
              <div className="space-y-1">
                <label className="text-[11px] text-white/60 uppercase font-mono tracking-widest font-semibold">Title</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 p-3 rounded-lg outline-none focus:border-eterna-rose focus:shadow-[0_0_10px_rgba(60,174,255,0.2)] transition-all font-mono text-[14px]" placeholder="Movie or Series title" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-white/60 uppercase font-mono tracking-widest font-semibold">Description (Synopsis)</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 p-3 rounded-lg outline-none focus:border-eterna-rose focus:shadow-[0_0_10px_rgba(60,174,255,0.2)] transition-all font-mono text-[14px]" placeholder="Logline or full synopsis..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-white/60 uppercase font-mono tracking-widest font-semibold">Genre</label>
                  <select className="w-full bg-black/50 border border-white/10 p-3 rounded-lg outline-none focus:border-eterna-rose transition-all font-mono text-[14px] text-white/80">
                    <option>Drama</option><option>Documentary</option><option>Sci-Fi</option><option>Faith</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-white/60 uppercase font-mono tracking-widest font-semibold">Release Year</label>
                  <input type="number" className="w-full bg-black/50 border border-white/10 p-3 rounded-lg outline-none focus:border-eterna-rose transition-all font-mono text-[14px]" placeholder="2024" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-[18px] font-bold mb-4 uppercase tracking-wider text-white">Cast & Crew</h3>
              <div className="space-y-1">
                <label className="text-[11px] text-white/60 uppercase font-mono tracking-widest font-semibold">Director</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 p-3 rounded-lg outline-none focus:border-eterna-rose transition-all font-mono text-[14px]" placeholder="Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-white/60 uppercase font-mono tracking-widest font-semibold">Main Cast</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 p-3 rounded-lg outline-none focus:border-eterna-rose transition-all font-mono text-[14px]" placeholder="Comma separated list" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-white/60 uppercase font-mono tracking-widest font-semibold">Production Company</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 p-3 rounded-lg outline-none focus:border-eterna-rose transition-all font-mono text-[14px]" placeholder="Enter company name" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[18px] font-bold uppercase tracking-wider text-white">Asset Transfer</h3>
                <div className="text-[11px] text-eterna-violet font-mono uppercase font-bold">Required: Video, Poster, Trailer</div>
              </div>
              
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer bg-black/40 ${hasVideo ? 'border-eterna-violet/50 shadow-[inset_0_0_20px_rgba(0,214,143,0.1)]' : 'border-white/20 hover:bg-white/5 hover:border-eterna-rose/50'}`}
                onClick={() => setHasVideo(!hasVideo)}
              >
                {hasVideo ? (
                  <CheckCircle2 className="w-12 h-12 text-eterna-violet mx-auto mb-3 filter drop-shadow-[0_0_10px_rgba(0,214,143,0.8)] animate-in zoom-in" />
                ) : (
                  <UploadCloud className="w-12 h-12 text-white/40 mx-auto mb-3 group-hover:text-eterna-rose transition-colors" />
                )}
                <div className="font-bold mb-1 tracking-wide">{hasVideo ? 'MASTER VIDEO UPLOADED' : 'DRAG & DROP MASTER VIDEO FILE'}</div>
                <div className="text-[11px] text-white/40 font-mono">ProRes 422, H.264, or MP4 (Max 150GB)</div>
                {!hasVideo && <button className="mt-4 ui-button px-6 py-2 rounded-lg font-bold text-[12px] uppercase">Select Directory</button>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer bg-black/40 ${hasPoster ? 'border-eterna-violet/50 shadow-[inset_0_0_20px_rgba(0,214,143,0.1)]' : 'border-white/20 hover:bg-white/5 hover:border-eterna-rose/50'}`}
                  onClick={() => setHasPoster(!hasPoster)}
                >
                  <Film className={`w-8 h-8 mx-auto mb-2 transition-colors ${hasPoster ? 'text-eterna-violet drop-shadow-[0_0_10px_rgba(0,214,143,0.8)]' : 'text-white/40'}`} />
                  <div className="font-bold text-[12px] tracking-wide uppercase">Poster Banner</div>
                  <div className="text-[10px] text-white/40 font-mono">{hasPoster ? 'UPLOADED' : '1920x1080 JPG/PNG'}</div>
                </div>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer bg-black/40 ${hasTrailer ? 'border-eterna-violet/50 shadow-[inset_0_0_20px_rgba(0,214,143,0.1)]' : 'border-white/20 hover:bg-white/5 hover:border-eterna-rose/50'}`}
                  onClick={() => setHasTrailer(!hasTrailer)}
                >
                  <PlayCircle className={`w-8 h-8 mx-auto mb-2 transition-colors ${hasTrailer ? 'text-eterna-violet drop-shadow-[0_0_10px_rgba(0,214,143,0.8)]' : 'text-white/40'}`} />
                  <div className="font-bold text-[12px] tracking-wide uppercase">Trailer</div>
                  <div className="text-[10px] text-white/40 font-mono">{hasTrailer ? 'UPLOADED' : 'UNDER 2 MINS'}</div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {!isScanning && !scanComplete && (
                <div className="text-center py-10 relative">
                  <div className="absolute inset-0 bg-grad opacity-10 blur-3xl rounded-full" />
                  <div className="w-24 h-24 bg-white/5 border border-eterna-rose/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-r-2 border-eterna-rose animate-spin" />
                    <Film className="w-10 h-10 text-eterna-rose" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-widest text-transparent bg-clip-text bg-grad">Ready for AI QA Scan</h3>
                  <p className="text-white/60 max-w-md mx-auto mb-8 font-mono text-[12px]">
                    Assets verified. Nova AI will now evaluate storytelling elements, production value, technical compliance, and metadata integrity.
                  </p>
                  
                  <button 
                    className="bg-white text-black px-8 py-3.5 rounded-full font-black uppercase tracking-wider hover:bg-gray-200 transition-all text-[14px] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
                    onClick={runAiScan}
                  >
                    Initiate AI Scan
                  </button>
                </div>
              )}

              {isScanning && (
                <div className="text-center py-12">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 border-[3px] border-white/5 rounded-full"></div>
                    <div className="absolute inset-0 border-[3px] border-eterna-rose rounded-full border-t-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute inset-0 border-[3px] border-eterna-violet rounded-full border-b-transparent border-r-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="w-2 h-2 bg-eterna-rose rounded-full animate-ping mb-2" />
                      <span className="text-[10px] font-mono text-white/50">SCANNING</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-wider text-white">Nova AI Processing...</h3>
                  <p className="text-white/50 text-[12px] font-mono">Evaluating narrative arc and frame integrity...</p>
                </div>
              )}

              {scanComplete && scanResults && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                   <div className="flex items-center justify-between mb-6">
                     <h3 className="text-[18px] font-bold uppercase tracking-wider">Analysis Complete</h3>
                     <div className={`px-4 py-1.5 rounded-full font-bold text-[12px] border ${scanResults.passed ? 'bg-eterna-violet/10 text-eterna-violet border-eterna-violet/30 shadow-[0_0_15px_rgba(0,214,143,0.2)]' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                       SYS_SCORE: {scanResults.totalScore}/100 
                       <span className="opacity-75 font-black ml-2 border-l border-current pl-2 tracking-widest">
                         {scanResults.passed ? 'APPROVED' : 'REJECTED'}
                       </span>
                     </div>
                   </div>
                  
                  <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden mb-6 backdrop-blur-sm">
                    <div className="grid grid-cols-12 bg-white/5 text-[10px] font-bold text-white/50 p-3 uppercase tracking-wider font-mono">
                      <div className="col-span-6">Evaluation Matrix</div>
                      <div className="col-span-2 text-center">Weight</div>
                      <div className="col-span-2 text-center">Score</div>
                      <div className="col-span-2 text-right">Status</div>
                    </div>
                    
                    <div className="divide-y divide-white/5">
                      {scanResults.metrics.map((metric: any, idx: number) => (
                        <div key={idx} className="grid grid-cols-12 p-3 text-[13px] items-center hover:bg-white/5 transition-colors">
                          <div className="col-span-6 font-medium text-white/90">{metric.name}</div>
                          <div className="col-span-2 text-center text-white/50 text-[11px] font-mono">{metric.weight}</div>
                          <div className="col-span-2 text-center font-mono font-bold text-white">{metric.score}</div>
                          <div className="col-span-2 text-right flex justify-end">
                            {metric.pass ? 
                              <span className="text-eterna-violet text-[10px] font-black uppercase tracking-wider flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" />PASS</span> : 
                              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider flex items-center"><XCircle className="w-3 h-3 mr-1" />FAIL</span>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {!scanResults.passed && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div className="text-[13px]">
                        <p className="font-bold text-white mb-1 tracking-wide uppercase text-[12px]">Acquisition Threshold Not Met (Score &lt; 75)</p>
                        <p className="text-white/70 font-mono">Please resolve the failing criteria above before attempting to publish to the global content delivery network.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
        
        <div className="p-6 border-t border-white/10 bg-black/60 flex justify-between items-center backdrop-blur-md">
          {(step > 1 && !isScanning && !scanComplete) ? (
             <button className="ui-button px-6 py-2 rounded-lg font-bold text-[12px] uppercase tracking-wider" onClick={() => setStep(step-1)}>Retract</button>
          ) : <div></div>}
          
          {step < 3 ? (
             <button className="bg-white text-black px-8 py-2.5 rounded-lg font-black uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]" onClick={() => setStep(step+1)}>Proceed</button>
          ) : step === 3 ? (
             <button 
               className={`px-8 py-2.5 rounded-lg font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] ${hasVideo && hasPoster && hasTrailer ? 'bg-white text-black hover:bg-gray-200 hover:scale-105' : 'bg-white/10 text-white/30 cursor-not-allowed shadow-none border border-white/5'}`} 
               onClick={() => { if(hasVideo && hasPoster && hasTrailer) setStep(step+1); }}
               disabled={!(hasVideo && hasPoster && hasTrailer)}
             >
               Confirm Assets
             </button>
          ) : (
            scanComplete && scanResults?.passed && (
              <button 
                className="bg-eterna-violet text-black px-8 py-2.5 rounded-lg font-black uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,214,143,0.4)] hover:scale-105" 
                onClick={() => {
                  onClose();
                  alert("Transmission successful. Content synced to global CDN.");
                }}
              >
                <CheckCircle2 className="w-5 h-5" /> Publish to CDN
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerOnboarding({ flowStep, setFlowStep, setOnboarded }: any) {
  const { go, setInfoPage } = useAppStore();
  const [showLogin, setShowLogin] = React.useState(false);

  const handleNext = () => setFlowStep(flowStep + 1);

  return (
    <div className="flex flex-col h-screen bg-eterna-bg text-white relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-eterna-rose/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-eterna-violet/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-black/40 backdrop-blur-3xl relative z-20">
        <div className="w-10 h-10 bg-grad rounded-xl flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(225,29,72,0.4)]" onClick={() => {
          if (showLogin) {
            setShowLogin(false);
          } else if (flowStep === 0) {
            go('landing');
          } else {
            setFlowStep(flowStep - 1);
          }
        }}>
          <ArrowLeft className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-2xl text-white tracking-tight leading-none block">Eterna</span>
          <span className="text-[10px] uppercase text-white/50 tracking-widest font-bold">Creator Ecosystem</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto p-6 md:p-12 md:px-12 pt-10 md:pt-16 pb-40 relative z-20 hide-scrollbar">
        {showLogin ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto py-12">
            <h2 className="text-3xl font-bold mb-2">Partner Portal Login</h2>
            <p className="text-white/50 mb-8">Sign in to access your creator dashboard.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your partner email" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-eterna-gold transition-colors font-mono text-sm placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-eterna-gold transition-colors font-mono text-sm placeholder:text-white/20"
                />
              </div>
            </div>

            <button 
              onClick={() => setOnboarded(true)} 
              className="w-full bg-eterna-gold hover:bg-eterna-gold/80 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(245,176,65,0.3)] hover:shadow-[0_0_30px_rgba(245,176,65,0.5)] mb-6"
            >
              Sign In
            </button>
            
            <div className="text-center">
              <button 
                onClick={() => setShowLogin(false)} 
                className="text-eterna-gold font-bold text-sm underline decoration-white/20 underline-offset-4 hover:decoration-eterna-gold transition-colors"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </div>
        ) : flowStep === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center flex flex-col items-center min-h-full max-w-3xl mx-auto py-8 lg:py-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight mt-auto">Bring Your Stories to the World.<br/><span className="text-white">Monetize Your Creativity.</span></h1>
            <p className="text-white/60 text-lg md:text-xl mb-12 font-mono max-w-2xl">
              Join thousands of filmmakers, studios, producers, and content creators distributing premium content to a global audience while earning revenue through streaming, subscriptions, advertising, rentals, and licensing opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <button onClick={handleNext} className="bg-white hover:bg-gray-200 text-black px-8 py-3.5 rounded-full font-black text-[15px] uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">Become a Partner</button>
              <button onClick={() => { setInfoPage('Partner Pricing'); go('info'); }} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors backdrop-blur-md">Explore Benefits</button>
              <button className="bg-transparent border border-white/10 hover:bg-white/5 text-white px-8 py-3.5 rounded-full font-bold text-[15px] transition-colors">Schedule a Demo</button>
            </div>
            
            <div className="text-left w-full mb-auto">
              <h2 className="text-2xl font-bold mb-8 text-center text-white/50 uppercase tracking-widest text-[12px] font-mono">Why Join Our Platform?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="bg-eterna-rose/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-eterna-rose drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">Global Distribution</h3>
                  <p className="text-white/50 text-[14px] font-mono">Reach audiences in over 190+ countries instantly.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="bg-eterna-gold/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-6 h-6 text-eterna-gold drop-shadow-[0_0_10px_rgba(245,176,65,0.8)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">Revenue Generation</h3>
                  <p className="text-white/50 text-[14px] font-mono">Earn from subscriptions, advertising, rentals, and licensing.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="bg-[rgba(96,165,250,0.2)] w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">Advanced Analytics</h3>
                  <p className="text-white/50 text-[14px] font-mono">Understand your audience and optimize performance.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform cursor-pointer group">
                  <div className="bg-eterna-violet/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-eterna-violet drop-shadow-[0_0_10px_rgba(0,214,143,0.8)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">Creator Growth Programs</h3>
                  <p className="text-white/50 text-[14px] font-mono">Access funding, promotion, and strategic partnerships.</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-12 mb-8">
                <button 
                  onClick={() => setShowLogin(true)} 
                  className="group flex flex-col items-center justify-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-[14px] font-mono font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Already a partner?</span>
                  <span className="text-eterna-gold font-bold text-lg underline decoration-white/20 underline-offset-4 group-hover:decoration-eterna-gold transition-colors">Log In Here</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {!showLogin && flowStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Select Your Partnership Category</h2>
            <p className="text-white/50 mb-8">Choose the profile that best describes your operations.</p>
            
            <div className="space-y-4">
              {[
                { title: 'Independent Filmmaker', desc: 'For individual creators and directors.' },
                { title: 'Production Company', desc: 'For registered studios and media houses.' },
                { title: 'Distributor', desc: 'For content aggregators and distributors.' },
                { title: 'TV Network', desc: 'For broadcasters and media groups.' },
                { title: 'Educational Content Provider', desc: 'For institutions and trainers.' },
                { title: 'Faith-Based Organization', desc: 'For ministries, churches, and faith creators.' }
              ].map((c, i) => (
                <div key={i} onClick={handleNext} className="bg-[#111] hover:bg-[#1a1a1a] border border-white/10 hover:border-eterna-red/50 p-6 rounded-xl cursor-pointer transition-all flex items-center justify-between group">
                  <div>
                    <h3 className="font-bold text-lg">{c.title}</h3>
                    <p className="text-white/60 text-[14px]">{c.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-eterna-red transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {flowStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
             <p className="text-white/50 mb-8">Personal Information details</p>
             
             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">FIRST NAME</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                  <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">LAST NAME</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                </div>
                <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">EMAIL ADDRESS</label>
                    <input type="email" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-[12px] text-white/60 font-semibold mb-1 block">MOBILE NUMBER</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                  <div>
                      <label className="text-[12px] text-white/60 font-semibold mb-1 block">COUNTRY</label>
                      <select className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red appearance-none">
                         <option>United States</option><option>United Kingdom</option><option>South Africa</option><option>Nigeria</option>
                      </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-[12px] text-white/60 font-semibold mb-1 block">PASSWORD</label>
                      <input type="password" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                  <div>
                      <label className="text-[12px] text-white/60 font-semibold mb-1 block">CONFIRM PASSWORD</label>
                      <input type="password" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                </div>
                
                <div className="flex items-start gap-3 mt-4">
                  <input type="checkbox" id="terms" className="mt-1" defaultChecked />
                  <label htmlFor="terms" className="text-[14px] text-white/80">I agree to the <span className="text-eterna-red hover:underline cursor-pointer">Partner Terms and Conditions</span></label>
                </div>
             </div>
          </div>
        )}

        {flowStep === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
             <div className="bg-eterna-red/10 border border-eterna-red/30 p-4 rounded-lg mb-8">
               <h3 className="font-bold text-eterna-red mb-1">Welcome to the Creator Partner Network</h3>
               <p className="text-[14px] text-white/80">Let's build your professional profile.</p>
             </div>
             
             <h2 className="text-2xl font-bold mb-6">Creator Information</h2>
             
             <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-[#111] rounded-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 cursor-pointer hover:bg-white/5 transition-colors">
                     <UploadCloud className="w-6 h-6 mb-1" />
                     <span className="text-[10px] font-semibold text-center leading-tight">Headshot /<br/>Logo</span>
                  </div>
                  <div className="text-[13px] text-white/50 max-w-xs">Upload your professional headshot or company logo. Max size 5MB. JPG or PNG.</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">CREATOR / STAGE NAME</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                  <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">COMPANY NAME (OPTIONAL)</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">INDUSTRY</label>
                    <select className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red appearance-none">
                       <option>Filmmaking</option><option>Documentary</option><option>Vlogging</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">YEARS OF EXPERIENCE</label>
                    <input type="number" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                  </div>
                </div>
                
                <div>
                  <label className="text-[12px] text-white/60 font-semibold mb-1 block">BIOGRAPHY (Tell audiences about yourself)</label>
                  <textarea rows={4} className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" placeholder="Max 500 words"></textarea>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h3 className="font-bold text-lg mb-4">Social Media Links</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="Website" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
                     <input type="text" placeholder="LinkedIn" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
                     <input type="text" placeholder="Instagram" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
                     <input type="text" placeholder="YouTube" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
                  </div>
                </div>
             </div>
          </div>
        )}

        {flowStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold mb-2">Business Verification</h2>
             <p className="text-white/50 mb-8">For security and monetization compliance</p>
             
             <div className="space-y-6">
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                   <h3 className="font-bold mb-4">Identity Verification</h3>
                   <p className="text-[13px] text-white/60 mb-4">Upload one of the following: Passport, National ID, or Driver's License.</p>
                   <div className="border-2 border-dashed border-white/20 p-8 rounded-lg text-center cursor-pointer hover:bg-white/5 transition-colors">
                      <UploadCloud className="w-8 h-8 mx-auto mb-3 text-white/40" />
                      <div className="font-semibold text-[14px]">Click to upload Document</div>
                   </div>
                </div>
                
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                   <h3 className="font-bold mb-4">Address Verification</h3>
                   <p className="text-[13px] text-white/60 mb-4">Upload a recent Utility Bill or Bank Statement (last 3 months).</p>
                   <div className="border-2 border-dashed border-white/20 p-8 rounded-lg text-center cursor-pointer hover:bg-white/5 transition-colors">
                      <UploadCloud className="w-8 h-8 mx-auto mb-3 text-white/40" />
                      <div className="font-semibold text-[14px]">Click to upload Document</div>
                   </div>
                </div>
                
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 space-y-4">
                   <h3 className="font-bold mb-2">Rights Ownership Declaration</h3>
                   <div className="flex items-start gap-3">
                     <input type="checkbox" id="declare1" className="mt-1" defaultChecked />
                     <label htmlFor="declare1" className="text-[14px]">I own the content rights.</label>
                   </div>
                   <div className="flex items-start gap-3">
                     <input type="checkbox" id="declare2" className="mt-1" defaultChecked />
                     <label htmlFor="declare2" className="text-[14px]">I have authority to distribute the content.</label>
                   </div>
                   <div className="flex items-start gap-3">
                     <input type="checkbox" id="declare3" className="mt-1" defaultChecked />
                     <label htmlFor="declare3" className="text-[14px]">I understand copyright compliance requirements.</label>
                   </div>
                </div>
             </div>
          </div>
        )}
        
        {flowStep === 5 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold mb-2">Payment and Revenue Setup</h2>
             <p className="text-white/50 mb-8">How would you like to receive your earnings?</p>
             
             <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Bank Transfer', 'PayPal', 'Stripe', 'Mobile Money', 'Crypto Wallet'].map(m => (
                      <div key={m} className="border border-white/20 p-4 rounded-lg bg-[#111] hover:bg-white/5 cursor-pointer flex items-center justify-between">
                         <span className="font-medium">{m}</span><div className="w-4 h-4 rounded-full border border-white/40"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4">Tax Information</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-[12px] text-white/60 font-semibold mb-1 block">TAX NUMBER</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                    </div>
                    <div>
                      <label className="text-[12px] text-white/60 font-semibold mb-1 block">VAT NUMBER (OPTIONAL)</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] text-white/60 font-semibold mb-1 block">COUNTRY OF TAX RESIDENCE</label>
                    <select className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red appearance-none">
                       <option>United States</option>
                    </select>
                  </div>
                </div>
                
                <div>
                   <h3 className="font-bold text-lg mb-4">Revenue Preferences</h3>
                   <div className="grid grid-cols-2 gap-3">
                     {['Subscription Revenue', 'Advertising Revenue', 'Pay-Per-View', 'Rentals', 'Donations', 'Licensing Marketplace'].map((opt, i) => (
                       <label key={i} className="flex items-center gap-3 bg-[#111] p-3 rounded border border-white/10">
                         <input type="checkbox" defaultChecked />
                         <span className="text-[14px]">{opt}</span>
                       </label>
                     ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {flowStep === 6 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold mb-2">Content Readiness Assessment</h2>
             <p className="text-white/50 mb-8">Tell us about the content you're bringing.</p>
             
             <div className="space-y-8">
                <div>
                   <h3 className="font-bold mb-4">Content Type (Multiple selection)</h3>
                   <div className="flex flex-wrap gap-3">
                     {['Movies', 'Short Films', 'Documentaries', 'TV Series', 'Animation', 'Educational Content', 'Spiritual Content', 'Live Events'].map(c => (
                       <label key={c} className="bg-[#111] border border-white/20 px-4 py-2 rounded-full text-[14px] cursor-pointer hover:bg-white/10 flex items-center gap-2">
                         <input type="checkbox" /> <span>{c}</span>
                       </label>
                     ))}
                   </div>
                </div>
                
                <div>
                   <h3 className="font-bold mb-4">Content Library Size</h3>
                   <select className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red appearance-none">
                      <option>1–5 Titles</option><option>5–20 Titles</option><option>20–50 Titles</option><option>50–100 Titles</option><option>100+ Titles</option>
                   </select>
                </div>
                
                <div>
                   <h3 className="font-bold mb-4">Production Quality</h3>
                   <select className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red appearance-none">
                      <option>HD (1080p)</option><option>4K Ultra HD</option><option>8K</option>
                   </select>
                </div>
                
                <div>
                   <h3 className="font-bold mb-4">Languages Available</h3>
                   <input type="text" placeholder="e.g. English, Spanish, French" className="w-full bg-[#111] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red" />
                </div>
             </div>
          </div>
        )}

        {flowStep === 7 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold mb-2">Upload Your First Title</h2>
             <p className="text-white/50 mb-8">Let's get your first piece of content into the system.</p>
             
             <div className="flex justify-between text-[11px] font-bold text-white/40 mb-8 px-4 relative">
               <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -z-10"></div>
               {['Account', 'Profile', 'Verification', 'Payment', 'Content'].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                     <div className="w-4 h-4 rounded-full bg-eterna-red flex items-center justify-center text-white"><CheckCircle2 className="w-3 h-3" /></div>
                     <span>{s} ✓</span>
                  </div>
               ))}
               <div className="flex flex-col items-center gap-2">
                 <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"></div>
                 <span className="text-blue-400">Upload</span>
               </div>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <h3 className="font-bold text-lg border-b border-white/10 pb-2">Film Information</h3>
                 <input type="text" placeholder="Title" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
                 <textarea rows={3} placeholder="Synopsis" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]"></textarea>
                 <div className="grid grid-cols-2 gap-3">
                   <select className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]"><option>Genre</option></select>
                   <input type="text" placeholder="Release Year" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
                 </div>
                 <input type="text" placeholder="Director" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
                 <input type="text" placeholder="Cast (comma separated)" className="w-full bg-[#111] border border-white/10 p-3 rounded-md text-[14px]" />
               </div>
               
               <div className="space-y-4">
                 <h3 className="font-bold text-lg border-b border-white/10 pb-2">Upload Assets</h3>
                 <div className="border border-dashed border-white/20 p-4 rounded text-center cursor-pointer hover:bg-white/5"><div className="font-semibold text-[13px] mb-1">Movie File</div><div className="text-[11px] text-white/40">Required</div></div>
                 <div className="border border-dashed border-white/20 p-4 rounded text-center cursor-pointer hover:bg-white/5"><div className="font-semibold text-[13px] mb-1">Trailer</div><div className="text-[11px] text-white/40">Required</div></div>
                 <div className="border border-dashed border-white/20 p-4 rounded text-center cursor-pointer hover:bg-white/5"><div className="font-semibold text-[13px] mb-1">Poster & Banner</div><div className="text-[11px] text-white/40">Required</div></div>
                 <div className="border border-dashed border-white/20 p-4 rounded text-center cursor-pointer hover:bg-white/5"><div className="font-semibold text-[13px] mb-1">Video Thumbnail</div><div className="text-[11px] text-white/40">Required</div></div>
               </div>
             </div>
          </div>
        )}

        {flowStep === 8 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto text-center">
             <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <LayoutDashboard className="w-10 h-10 text-blue-400" />
             </div>
             <h2 className="text-3xl font-bold mb-4">AI Review Assistant</h2>
             <p className="text-white/60 mb-8 max-w-md mx-auto">Our automated system is performing a preliminary quality assessment of your submission.</p>
             
             <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-left max-w-lg mx-auto mb-8">
               <h3 className="font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400"/> Automated Quality Checks</h3>
               <ul className="space-y-3 mb-6 text-[14px]">
                 <li className="flex justify-between"><span>Video Quality</span> <span className="text-green-400 font-mono">4K Verified</span></li>
                 <li className="flex justify-between"><span>Audio Quality</span> <span className="text-green-400 font-mono">5.2 Surround</span></li>
                 <li className="flex justify-between"><span>Subtitle Quality</span> <span className="text-green-400 font-mono">Synced</span></li>
                 <li className="flex justify-between"><span>Copyright Compliance</span> <span className="text-green-400 font-mono">Cleared</span></li>
                 <li className="flex justify-between"><span>Metadata Accuracy</span> <span className="text-green-400 font-mono">99%</span></li>
               </ul>
               
               <div className="bg-[#1a1a1a] p-4 rounded-lg border border-blue-500/20">
                 <h4 className="font-bold text-blue-400 text-[12px] uppercase mb-2">AI Suggestions for Growth</h4>
                 <ul className="list-disc pl-4 space-y-1 text-[13px] text-white/70">
                   <li>Your poster contrast can be improved by 15% for better CTR.</li>
                   <li>Trailer duration is slightly longer than the recommended 90s.</li>
                   <li>Consider adding French subtitles to reach 12% more audience.</li>
                 </ul>
               </div>
             </div>
          </div>
        )}

        {flowStep === 9 && (
          <div className="animate-in zoom-in-95 duration-700 max-w-2xl mx-auto text-center mt-12 bg-eterna-red border border-eterna-rose p-10 rounded-2xl shadow-[0_0_50px_rgba(229,9,20,0.5)]">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
               <CheckCircle2 className="w-12 h-12 text-eterna-red" />
             </div>
             <h2 className="text-4xl font-bold mb-2 text-white">Congratulations!</h2>
             <p className="text-white/90 text-xl font-medium mb-8">You are now an approved Streaming Partner.</p>
             
             <div className="bg-black/20 p-6 rounded-xl text-left backdrop-blur-sm border border-white/20 mb-8">
                <h3 className="font-bold text-white mb-4 text-lg">Your creator dashboard is active and ready to help you:</h3>
                <ul className="space-y-2 font-medium text-white/90">
                  <li className="flex items-center gap-2">• Publish content globally</li>
                  <li className="flex items-center gap-2">• Track performance</li>
                  <li className="flex items-center gap-2">• Earn revenue</li>
                  <li className="flex items-center gap-2">• Access licensing opportunities</li>
                  <li className="flex items-center gap-2">• Participate in creator funding programs</li>
                </ul>
             </div>
             
             <button 
               onClick={() => setOnboarded(true)} 
               className="bg-white text-eterna-red px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl"
             >
               Enter Creator Dashboard
             </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Nav for flow control */}
      {flowStep > 0 && flowStep < 9 && (
        <div className="fixed bottom-0 right-0 p-6 md:p-12 z-50">
           <div className="flex gap-4">
             {flowStep === 8 ? (
                <button onClick={handleNext} className="bg-eterna-violet text-black font-black px-8 py-3.5 rounded-full uppercase tracking-wider hover:brightness-110 transition shadow-[0_0_20px_rgba(0,214,143,0.4)] hover:-translate-y-1">Submit Application</button>
             ) : (
                <button onClick={handleNext} className="bg-white text-black font-black px-8 py-3.5 rounded-full uppercase tracking-wider hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-1">Continue</button>
             )}
           </div>
        </div>
      )}
    </div>
  );
}
