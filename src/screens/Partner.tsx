import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { 
  ArrowLeft, LayoutDashboard, Film, BarChart3, DollarSign, Users, 
  Settings, UploadCloud, PlayCircle, Clock, Globe, ArrowUpRight, CheckCircle2, XCircle
} from 'lucide-react';

export function PartnerScreen() {
  const { go } = useAppStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      
      {/* Sidebar */}
      <div className="w-[80px] md:w-[250px] border-r border-white/10 flex flex-col pt-6 shrink-0 bg-[#0f0f0f]">
        <div className="px-4 md:px-8 mb-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-eterna-red rounded-full flex items-center justify-center shrink-0 cursor-pointer" onClick={() => go('landing')}>
            <ArrowLeft className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block">
            <span className="font-bold text-xl text-eterna-red tracking-tight leading-none block">Eterna</span>
            <span className="text-[10px] uppercase text-white/50 tracking-wider font-semibold">Partner Panel</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-3">
          <NavItem active={activeTab === 'dashboard'} icon={<LayoutDashboard />} label="Dashboard" onClick={() => setActiveTab('dashboard')} />
          <NavItem active={activeTab === 'content'} icon={<Film />} label="My Content" onClick={() => setActiveTab('content')} />
          <NavItem active={activeTab === 'analytics'} icon={<BarChart3 />} label="Analytics" onClick={() => setActiveTab('analytics')} />
          <NavItem active={activeTab === 'revenue'} icon={<DollarSign />} label="Earnings" onClick={() => setActiveTab('revenue')} />
          <NavItem active={activeTab === 'community'} icon={<Users />} label="Community" onClick={() => setActiveTab('community')} />
        </div>

        <div className="mt-auto p-4 md:p-6 pb-6">
          <NavItem active={activeTab === 'settings'} icon={<Settings />} label="Settings" onClick={() => setActiveTab('settings')} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Director!</h1>
              <p className="text-white/50 text-[15px]">Here's what's happening with your films today.</p>
            </div>
            
            <button 
              className="bg-eterna-red hover:bg-eterna-rose transition-colors text-white px-6 py-3 rounded-md font-semibold text-[14px] flex items-center justify-center gap-2"
              onClick={() => setShowUpload(true)}
            >
              <UploadCloud className="w-5 h-5" />
              <span>Submit New Film</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard title="Total Views" value="2.4M" change="+12%" icon={<PlayCircle className="text-blue-400 w-5 h-5" />} />
            <StatsCard title="Watch Hours" value="482K" change="+5.2%" icon={<Clock className="text-green-400 w-5 h-5" />} />
            <StatsCard title="Monthly Revenue" value="$15,420" change="+18%" icon={<DollarSign className="text-eterna-red w-5 h-5" />} />
            <StatsCard title="Active Subs Generated" value="1,204" change="+2.4%" icon={<Users className="text-purple-400 w-5 h-5" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main graph/performance placeholder */}
            <div className="lg:col-span-2 bg-[#141414] border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-[18px]">Revenue Snapshot</h2>
                <select className="bg-[#222] border border-white/10 rounded-[4px] px-3 py-1 text-[13px] text-white outline-none">
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-[200px] flex items-end justify-between gap-2 border-b border-white/10 pb-4">
                {/* Simulated bar chart */}
                {[40, 65, 45, 80, 55, 90, 75, 100, 85, 110, 95, 120].map((h, i) => (
                  <div key={i} className="w-full bg-eterna-red/80 hover:bg-eterna-red rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      ${Math.floor(h * 1.5 * 10)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[11px] text-white/40 mt-3">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
              <div>
                 <h2 className="font-semibold text-[18px] mb-4">Financial Overview</h2>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <span className="text-white/60 text-[14px]">Ad Revenue</span>
                     <span className="font-medium">$5,000</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-white/60 text-[14px]">Subscription Rev</span>
                     <span className="font-medium">$7,000</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-white/60 text-[14px]">Rentals (PPV)</span>
                     <span className="font-medium">$2,000</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-white/60 text-[14px]">Community Tips</span>
                     <span className="font-medium">$1,420</span>
                   </div>
                 </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-[15px] font-semibold">Total Revenue</span>
                  <span className="font-bold text-eterna-red text-[20px]">$15,420</span>
                </div>
                <div className="text-[12px] text-[#46d369]">Available for withdrawal</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
              <h2 className="font-semibold text-[18px] mb-4">Content Status</h2>
              <div className="space-y-3">
                <StatusRow title="Beyond the Stars (Feature)" status="Published" type="success" />
                <StatusRow title="Echoes of Time (Short)" status="Approved" type="info" />
                <StatusRow title="Unknown Horizons S2" status="Under Review" type="warning" />
                <StatusRow title="The Lost Signal" status="Rejected - Audio Sync" type="error" />
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
              <h2 className="font-semibold text-[18px] mb-4">Audience Demographics</h2>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-white/40" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[13px] mb-1"><span className="text-white/80">North America</span><span className="font-medium">45%</span></div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full"><div className="bg-blue-400 h-1.5 rounded-full" style={{width: '45%'}} /></div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-white/40" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[13px] mb-1"><span className="text-white/80">Europe</span><span className="font-medium">32%</span></div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full"><div className="bg-purple-400 h-1.5 rounded-full" style={{width: '32%'}} /></div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-white/40" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[13px] mb-1"><span className="text-white/80">Asia</span><span className="font-medium">15%</span></div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full"><div className="bg-green-400 h-1.5 rounded-full" style={{width: '15%'}} /></div>
                    </div>
                 </div>
              </div>
            </div>
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
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        active ? 'bg-eterna-red/10 text-eterna-red' : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="shrink-0">{icon}</div>
      <div className="hidden md:block font-medium text-[14px]">{label}</div>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: any) {
  return (
    <div className="bg-[#141414] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-4">
         <span className="text-white/60 text-[14px] font-medium">{title}</span>
         {icon}
      </div>
      <div>
         <div className="text-3xl font-bold mb-1">{value}</div>
         <div className="flex items-center gap-1 text-[13px] text-[#46d369]">
           <ArrowUpRight className="w-4 h-4" />
           <span>{change} this month</span>
         </div>
      </div>
    </div>
  );
}

function StatusRow({ title, status, type }: any) {
  const colors = {
    success: 'text-[#46d369] bg-[#46d369]/10 border-[#46d369]/20',
    info: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    warning: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    error: 'text-eterna-red bg-eterna-red/10 border-eterna-red/20'
  };
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/5">
      <div className="font-medium text-[14px]">{title}</div>
      <div className={`px-2 py-1 rounded text-[11px] border font-semibold ${(colors as any)[type]}`}>
        {status}
      </div>
    </div>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#141414] border border-white/10 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
          <h2 className="text-xl font-bold">Submit New Content</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><XCircle className="w-6 h-6 text-white/50" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-eterna-red' : 'bg-white/10'}`} />
            ))}
          </div>
          
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-[18px] font-semibold mb-4">Basic Information</h3>
              <div className="space-y-1">
                <label className="text-[12px] text-white/60 uppercase tracking-widest font-semibold">Title</label>
                <input type="text" className="w-full bg-[#222] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red transition-colors" placeholder="Movie or Series title" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-white/60 uppercase tracking-widest font-semibold">Description</label>
                <textarea rows={4} className="w-full bg-[#222] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red transition-colors" placeholder="Logline or full synopsis..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[12px] text-white/60 uppercase tracking-widest font-semibold">Genre</label>
                  <select className="w-full bg-[#222] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red transition-colors">
                    <option>Drama</option><option>Documentary</option><option>Sci-Fi</option><option>Faith</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] text-white/60 uppercase tracking-widest font-semibold">Release Year</label>
                  <input type="number" className="w-full bg-[#222] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red transition-colors" placeholder="2024" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-[18px] font-semibold mb-4">Cast & Crew</h3>
              <div className="space-y-1">
                <label className="text-[12px] text-white/60 uppercase tracking-widest font-semibold">Director</label>
                <input type="text" className="w-full bg-[#222] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red transition-colors" placeholder="Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-white/60 uppercase tracking-widest font-semibold">Main Cast</label>
                <input type="text" className="w-full bg-[#222] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red transition-colors" placeholder="Comma separated list" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-white/60 uppercase tracking-widest font-semibold">Production Company</label>
                <input type="text" className="w-full bg-[#222] border border-white/10 p-3 rounded-md outline-none focus:border-eterna-red transition-colors" placeholder="Enter company name" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-[18px] font-semibold mb-4">Assets Upload</h3>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer bg-[#222]">
                <UploadCloud className="w-12 h-12 text-white/40 mx-auto mb-3" />
                <div className="font-semibold mb-1">Drag and drop your master video file</div>
                <div className="text-[12px] text-white/40">ProRes 422, H.264, or MP4 (Max 150GB)</div>
                <button className="mt-4 bg-white text-black px-4 py-2 rounded font-semibold text-[13px]">Select File</button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer bg-[#222]">
                  <Film className="w-6 h-6 text-white/40 mx-auto mb-2" />
                  <div className="font-semibold text-[14px]">Poster Banner</div>
                  <div className="text-[11px] text-white/40">1920x1080 JPG/PNG</div>
                </div>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer bg-[#222]">
                  <PlayCircle className="w-6 h-6 text-white/40 mx-auto mb-2" />
                  <div className="font-semibold text-[14px]">Trailer</div>
                  <div className="text-[11px] text-white/40">Under 2 mins</div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300 text-center py-10">
              <div className="w-20 h-20 bg-eterna-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-eterna-red" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready for AI QA Scan</h3>
              <p className="text-white/60 max-w-md mx-auto mb-6">
                Your content is ready. We will run an automated quality, compliance, and metadata check before submitting it for editorial review.
              </p>
              
              <div className="bg-[#222] border border-white/10 rounded-lg p-4 text-left max-w-md mx-auto space-y-3">
                 <div className="flex justify-between text-[13px]"><span className="text-white/60">Quality Scan</span> <span className="text-yellow-400">Pending</span></div>
                 <div className="flex justify-between text-[13px]"><span className="text-white/60">Compliance Scan</span> <span className="text-yellow-400">Pending</span></div>
                 <div className="flex justify-between text-[13px]"><span className="text-white/60">Rights Validation</span> <span className="text-yellow-400">Pending</span></div>
              </div>
            </div>
          )}

        </div>
        
        <div className="p-6 border-t border-white/10 bg-[#1a1a1a] flex justify-between">
          {step > 1 ? (
             <button className="px-6 py-2 rounded border border-white/20 font-semibold hover:bg-white/10 transition-colors" onClick={() => setStep(step-1)}>Back</button>
          ) : <div></div>}
          
          {step < 4 ? (
             <button className="bg-white text-black px-8 py-2 rounded font-bold hover:bg-white/80 transition-colors" onClick={() => setStep(step+1)}>Continue</button>
          ) : (
            <button className="bg-eterna-red text-white px-8 py-2 rounded font-bold hover:bg-eterna-rose transition-colors" onClick={onClose}>Run AI Scan & Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}
