import React, { useState } from 'react';
import { useAppStore } from '../lib/store';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  ArrowLeft, LayoutDashboard, Film, BarChart3, Users,
  Activity, DollarSign, Brain, ShieldAlert, FileCheck, CheckCircle2, XCircle,
  ShoppingBag, Megaphone, UserCheck, Lock, Globe, Clock,
  Zap, Play, Download
} from 'lucide-react';

export function AdminScreen() {
  const { go } = useAppStore();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <Dashboard />;
      case 'acquisition': return <AcquisitionCenter />;
      case 'library': return <LibraryManagement />;
      case 'creators': return <CreatorManagement />;
      case 'marketplace': return <Marketplace />;
      case 'audience': return <AudienceIntelligence />;
      case 'ads': return <AdManagement />;
      case 'streaming': return <StreamingOperations />;
      case 'moderation': return <ModerationCenter />;
      case 'revenue': return <RevenueIntelligence />;
      case 'ai': return <AiIntelligence />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <div className="w-[80px] md:w-[280px] border-r border-white/10 flex flex-col shrink-0 bg-[#0a0a0a] overflow-y-auto no-scrollbar">
        <div className="px-4 md:px-8 py-6 mb-2 flex items-center md:items-start flex-col gap-1 border-b border-white/10">
          <div className="w-10 h-10 bg-eterna-red rounded-full flex items-center justify-center shrink-0 cursor-pointer mb-2 shadow-[0_0_15px_rgba(229,9,20,0.5)]" onClick={() => go('landing')}>
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
          <div className="hidden md:block">
            <span className="font-bold text-xl text-white tracking-tight leading-none block">Streaming OS</span>
            <span className="text-[10px] uppercase text-eterna-red tracking-wider font-bold shadow-eterna-red">Super Administrator</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-3 py-4">
          <div className="text-[10px] text-white/40 uppercase tracking-widest px-3 mb-1 mt-2 font-semibold">Executive Hub</div>
          <NavItem active={activeMenu === 'dashboard'} icon={<LayoutDashboard />} label="CEO Dashboard" onClick={() => setActiveMenu('dashboard')} />
          <NavItem active={activeMenu === 'revenue'} icon={<DollarSign />} label="Monetization Engine" onClick={() => setActiveMenu('revenue')} />
          <NavItem active={activeMenu === 'ai'} icon={<Brain />} label="AI Command Center" onClick={() => setActiveMenu('ai')} />

          <div className="text-[10px] text-white/40 uppercase tracking-widest px-3 mb-1 mt-5 font-semibold">Content & Creators</div>
          <NavItem active={activeMenu === 'acquisition'} icon={<FileCheck />} label="Acqusition & AI Review" onClick={() => setActiveMenu('acquisition')} />
          <NavItem active={activeMenu === 'library'} icon={<Film />} label="Global Library & DRM" onClick={() => setActiveMenu('library')} />
          <NavItem active={activeMenu === 'creators'} icon={<Users />} label="Studio & Originals" onClick={() => setActiveMenu('creators')} />
          <NavItem active={activeMenu === 'marketplace'} icon={<ShoppingBag />} label="Marketplace Engine" onClick={() => setActiveMenu('marketplace')} />

          <div className="text-[10px] text-white/40 uppercase tracking-widest px-3 mb-1 mt-5 font-semibold">Audience & Operations</div>
          <NavItem active={activeMenu === 'audience'} icon={<UserCheck />} label="Audience Intel & A/B" onClick={() => setActiveMenu('audience')} />
          <NavItem active={activeMenu === 'ads'} icon={<Megaphone />} label="Ad Management (AVOD)" onClick={() => setActiveMenu('ads')} />
          <NavItem active={activeMenu === 'streaming'} icon={<Activity />} label="CDN & Live Streaming" onClick={() => setActiveMenu('streaming')} />
          <NavItem active={activeMenu === 'moderation'} icon={<ShieldAlert />} label="Enterprise Audit" onClick={() => setActiveMenu('moderation')} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative min-h-0 bg-[#080808]">
        {renderContent()}
      </div>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        active ? 'bg-eterna-red text-white shadow-lg' : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="shrink-0">{React.cloneElement(icon, { className: 'w-[18px] h-[18px]' })}</div>
      <div className="hidden md:block font-medium text-[13px]">{label}</div>
    </div>
  );
}

function MetricCard({ label, value, status, type = 'normal' }: any) {
  const isWarn = type === 'warning';
  const isErr = type === 'error';
  const colorClass = isErr ? 'text-red-400' : isWarn ? 'text-yellow-400' : 'text-green-400';
  
  return (
    <div className="bg-[#111] p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
      <div className="text-[13px] text-white/50 mb-2 font-medium uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className={`text-[12px] font-bold ${colorClass}`}>{status}</div>
    </div>
  );
}

// ----------------------------------------------------
// EXECUTIVE SCREENS
// ----------------------------------------------------

function Dashboard() {
  const genreData = [
    { name: 'Drama', value: 580000 },
    { name: 'Docs', value: 420000 },
    { name: 'Faith', value: 390000 },
    { name: 'Comedy', value: 450000 },
    { name: 'Action', value: 510000 },
    { name: 'Business', value: 210000 },
  ];
  const mrrData = [
    { month: 'Jul', mrr: 88.5 },
    { month: 'Aug', mrr: 92.4 },
    { month: 'Sep', mrr: 95.1 },
    { month: 'Oct', mrr: 98.8 },
    { month: 'Nov', mrr: 102.3 },
    { month: 'Dec', mrr: 108.9 },
    { month: 'Jan', mrr: 110.1 },
    { month: 'Feb', mrr: 112.5 },
    { month: 'Mar', mrr: 115.8 },
    { month: 'Apr', mrr: 118.2 },
    { month: 'May', mrr: 121.5 },
    { month: 'Jun', mrr: 125.0 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">CEO Executive Dashboard</h1>
      <p className="text-white/50 mb-8">Real-time overview of global platform performance, revenue, and subscriber growth.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Content" value="42,854" status="+12% YoY" />
        <MetricCard label="Total Subscribers" value="18.4M" status="+8.4% YoY" />
        <MetricCard label="Monthly Rev (MRR)" value="$112.5M" status="+14% YoY" />
        <MetricCard label="Churn Rate" value="2.1%" status="-0.3% Improved" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#111] border border-white/5 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Content Performance & ROI by Genre</h2>
            <button className="text-[12px] bg-white/10 px-3 py-1 rounded hover:bg-white/20">Generate Report</button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" tick={{fontSize: 12}} />
                <YAxis stroke="#888" tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#000', borderColor: '#333'}} />
                <Bar dataKey="value" fill="#E50914" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col">
          <h2 className="text-xl font-bold mb-4">Global Market Expansion</h2>
          <div className="space-y-4 flex-1">
             <RegionRow name="North America" val="8.2M subs" pct="45" />
             <RegionRow name="Europe" val="5.1M subs" pct="32" />
             <RegionRow name="Africa" val="3.8M subs" pct="24" />
             <RegionRow name="Asia" val="2.9M subs" pct="18" />
             <RegionRow name="Middle East" val="1.1M subs" pct="8" />
          </div>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 p-6 rounded-xl h-[350px] flex flex-col">
        <h2 className="text-xl font-bold mb-4">Monthly Recurring Revenue (MRR) Trends</h2>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mrrData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="month" stroke="#888" tick={{fontSize: 12}} />
              <YAxis stroke="#888" tick={{fontSize: 12}} tickFormatter={(val) => `$${val}M`} />
              <Tooltip 
                contentStyle={{backgroundColor: '#111', borderColor: '#333', borderRadius: '8px'}} 
                itemStyle={{color: '#fff'}}
                formatter={(value: any) => [`$${value}M`, 'MRR']} 
              />
              <Line type="monotone" dataKey="mrr" stroke="#E50914" strokeWidth={3} dot={{r: 4, fill: '#E50914'}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function RegionRow({ name, val, pct }: any) {
  return (
    <div>
      <div className="flex justify-between text-[13px] mb-1">
        <span>{name}</span>
        <span className="text-white/50">{val}</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-eterna-red rounded-full" style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CONTENT & CREATORS
// ----------------------------------------------------

function AcquisitionCenter() {
  const { showToast } = useAppStore();
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('Legal Issues');
  
  const [auditLogs, setAuditLogs] = useState<any>({
    'SUB-8942': [{ time: '10:00 AM', user: 'Auto-Scanner AI', action: 'Passed Initial Screening' }],
  });

  const submissions = [
    { id: 'SUB-8942', title: 'The Last Frontier', creator: 'Starlight Films', email: 'contact@starlight.com', type: 'Feature', status: 'Editorial Review', score: 88 },
    { id: 'SUB-8943', title: 'Ocean Deep', creator: 'Blue Wave Docs', email: 'hello@bluewave.com', type: 'Documentary', status: 'Legal Verification', score: 92 },
    { id: 'SUB-8945', title: 'Uncharted Waters', creator: 'Independent', email: 'indie@dev.com', type: 'Short', status: 'Technical Assessment', score: 71 },
  ];

  const handleAction = (action: 'Approved' | 'Rejected' | 'Request Revisions') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev: any) => ({
      ...prev,
      [selectedSub.id]: [
        { time: timestamp, user: 'Super Admin', action: `${action}${action === 'Rejected' || action === 'Request Revisions' ? ` - Reason: ${rejectReason}` : ''}` },
        ...(prev[selectedSub.id] || [])
      ]
    }));
    if (action === 'Rejected' || action === 'Request Revisions') {
      showToast(`Automated email sent to ${selectedSub.email} regarding: ${action}`);
    } else {
      showToast(`${selectedSub.title} approved and scheduled for publish!`);
    }
    setShowRejectReason(false);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto h-full flex flex-col animate-in fade-in duration-300">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Acquisition Workspace & AI Review</h1>
          <p className="text-white/50">Manage incoming film submissions and editorial approvals based on AI scanning scores.</p>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        <div className="w-[45%] bg-[#111] border border-white/5 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/5 font-semibold bg-[#1a1a1a]">Intake Queue</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {submissions.map(s => (
              <div 
                key={s.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedSub?.id === s.id ? 'border-eterna-red bg-white/5' : 'border-white/10 hover:border-white/30 bg-black/20'}`}
                onClick={() => { setSelectedSub(s); setShowRejectReason(false); }}
              >
                <div className="flex justify-between mb-2">
                  <div className="font-bold">{s.title}</div>
                  <div className="text-[11px] px-2 py-0.5 rounded-full bg-white/10">{s.status}</div>
                </div>
                <div className="flex justify-between text-[13px] text-white/50">
                  <span>{s.creator} • {s.type}</span>
                  {s.score > 0 && <span className={s.score >= 75 ? 'text-green-400 font-bold' : 'text-yellow-400 font-bold'}>AI Score: {s.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[55%] flex flex-col min-h-0 bg-[#111] border border-white/5 rounded-xl">
          {selectedSub ? (
            <div className="flex-1 flex flex-col overflow-y-auto p-6">
              <div className="text-[12px] text-white/50 mb-1">{selectedSub.id}</div>
              <h2 className="text-2xl font-bold mb-1">{selectedSub.title}</h2>
              <div className="text-[14px] text-white/60 mb-6">{selectedSub.creator} ({selectedSub.email}) • {selectedSub.type} • USA</div>
              
              <h3 className="font-semibold mb-3 border-b border-white/10 pb-2">Mandatory Acquisition Checklist</h3>
              <div className="space-y-3 mb-6">
                <CheckItem label="Copyright Verification & Chain of Title" pass />
                <CheckItem label="Exclusive Distribution Rights" pass />
                <CheckItem label="Music Licensing & Sync" pass />
                <CheckItem label="Errors and Omissions (E&O) Insurance" pass={false} />
                <CheckItem label="Technical Compliance (4K, ProRes, Dolby)" pass />
                <CheckItem label="Marketing Assets (Key Art, Trailer)" pass />
              </div>

              <div className="mb-6 border border-white/10 rounded-lg bg-black/20 overflow-hidden flex flex-col">
                 <div className="p-3 border-b border-white/10 bg-[#1a1a1a] font-semibold text-[13px] text-white/80">Audit Log</div>
                 <div className="p-4 space-y-3 max-h-[120px] overflow-y-auto text-[13px] flex-1">
                   {(auditLogs[selectedSub.id] || []).map((log: any, i: number) => (
                     <div key={i} className="flex gap-4">
                       <span className="text-white/40 whitespace-nowrap font-mono">{log.time}</span>
                       <span><span className="font-semibold text-white/80">{log.user}:</span> <span className="text-white/60">{log.action}</span></span>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="mt-auto pt-4 flex flex-col gap-3">
                {showRejectReason && (
                  <div className="bg-black/60 p-4 rounded-lg border border-white/10 mb-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-[13px] font-semibold text-white/80 mb-2">Select Reason for Rejection/Revision:</div>
                    <select 
                      className="w-full bg-[#222] border border-white/20 rounded p-2 mb-3 text-[14px] outline-none"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    >
                      <option>Missing E&O Insurance</option>
                      <option>Legal / Copyright Disputes</option>
                      <option>Technical Quality Flaws</option>
                      <option>Content Policy Violation</option>
                    </select>
                    <div className="flex gap-2">
                       <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded font-bold text-[13px]" onClick={() => handleAction('Rejected')}>Confirm Rejection</button>
                       <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-2 rounded font-bold text-[13px]" onClick={() => handleAction('Request Revisions')}>Require Revisions</button>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 p-3 rounded font-bold text-[14px] transition-colors" onClick={() => handleAction('Approved')}>Final Approval</button>
                  <button className="flex-1 bg-[#222] hover:bg-[#333] border border-white/10 p-3 rounded font-bold text-[14px] transition-colors" onClick={() => setShowRejectReason(!showRejectReason)}>
                     {showRejectReason ? 'Cancel' : 'Reject / Revise'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/30">Select a submission to review</div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckItem({ label, pass }: any) {
  return (
    <div className="flex items-center justify-between bg-black/40 p-2.5 rounded border border-white/5">
      <span className="text-[13px]">{label}</span>
      {pass !== undefined ? (
        pass ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-500" />
      ) : <span className="text-[11px] text-white/40">Pending</span>}
    </div>
  );
}

function LibraryManagement() {
  const { showToast } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const tempLibrary = [
    { id: '1', title: 'Stranger Things', creator: 'Netflix Originals', views: '1.2B', status: 'Published', expiry: 'Perpetual' },
    { id: '2', title: 'The Crown', creator: 'Left Bank', views: '840M', status: 'Published', expiry: 'Perpetual' },
    { id: '3', title: 'Cosmic Voyage', creator: 'Starlight Films', views: '120K', status: 'Archive', expiry: 'Expired' },
    { id: '4', title: 'The Matrix 4', creator: 'Warner Bros', views: '550M', status: 'Published', expiry: '12 Days' },
  ];

  const handleSelectAll = (e: any) => {
    if (e.target.checked) setSelectedIds(tempLibrary.map(i => i.id));
    else setSelectedIds([]);
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;
    showToast(`Bulk action '${action}' applied to ${selectedIds.length} items.`);
    setSelectedIds([]);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Global Library, DRM & Lifecycle</h1>
      <p className="text-white/50 mb-8">Manage active assets, digital rights security, and licensing expirations.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111] p-5 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-white/50 mb-4 font-semibold uppercase text-[11px] tracking-wider"><Lock className="w-4 h-4"/> DRM Security Status</div>
          <div className="flex gap-2 flex-wrap">
             <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[12px] rounded font-bold border border-green-500/30">Widevine: Active</span>
             <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[12px] rounded font-bold border border-green-500/30">FairPlay: Active</span>
             <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[12px] rounded font-bold border border-green-500/30">PlayReady: Active</span>
          </div>
        </div>
        <div className="bg-[#111] p-5 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-white/50 mb-4 font-semibold uppercase text-[11px] tracking-wider"><Clock className="w-4 h-4"/> Content Lifecycle Engine</div>
          <div className="text-[14px]">
             <p className="text-yellow-400 mb-2 font-medium">12 Licenses expiring in the next 30 days.</p>
             <button className="text-[12px] bg-white/10 px-3 py-1.5 rounded hover:bg-white/20 transition-colors">Review & Unpublish Queue</button>
          </div>
        </div>
        <div className="bg-[#111] p-5 rounded-xl border border-white/5">
           <div className="flex items-center gap-2 text-white/50 mb-4 font-semibold uppercase text-[11px] tracking-wider"><Globe className="w-4 h-4"/> Localization Status</div>
           <div className="text-[13px] text-white/80 space-y-1">
             <div className="flex justify-between"><span>English (Sub/Dub)</span> <span className="font-mono">98% Data</span></div>
             <div className="flex justify-between"><span>Spanish (Sub/Dub)</span> <span className="font-mono">84% Data</span></div>
             <div className="flex justify-between"><span>French (Sub/Dub)</span> <span className="font-mono">45% Data</span></div>
           </div>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
          <div className="flex gap-4">
            <input type="text" placeholder="Search by ID, Title, Creator..." className="bg-[#050505] border border-white/10 rounded px-3 py-1.5 text-[13px] w-[250px] outline-none focus:border-eterna-red" />
            <select className="bg-[#050505] border border-white/10 rounded px-3 text-[13px] outline-none"><option>All Genres</option></select>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex gap-2 items-center">
              <span className="text-[13px] px-2 text-white/60">{selectedIds.length} selected</span>
              <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-[12px] font-medium" onClick={() => handleBulkAction('Publish')}>Publish Bulk</button>
              <button className="px-3 py-1.5 bg-eterna-red/80 hover:bg-eterna-red rounded text-[12px] font-medium" onClick={() => handleBulkAction('Delete')}>Delete Bulk</button>
            </div>
          )}
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#141414] text-white/50">
            <tr>
              <th className="p-4 w-[50px]"><input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === tempLibrary.length && tempLibrary.length > 0} className="w-4 h-4 cursor-pointer accent-eterna-red"/></th>
              <th className="p-4">Title</th>
              <th className="p-4">License Expiry</th>
              <th className="p-4">Views</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tempLibrary.map(item => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4"><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelect(item.id)} className="w-4 h-4 cursor-pointer accent-eterna-red"/></td>
                <td className="p-4 font-medium">{item.title} <br/><span className="text-[11px] text-white/40 font-normal">{item.creator}</span></td>
                <td className="p-4"><span className={item.expiry !== 'Perpetual' ? 'text-yellow-400' : 'text-white/50'}>{item.expiry}</span></td>
                <td className="p-4 font-mono text-white/70">{item.views}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-[11px] uppercase tracking-wider font-bold ${item.status === 'Published' ? 'text-green-400 bg-green-400/10' : 'text-white/40 bg-white/10'}`}>{item.status}</span></td>
                <td className="p-4 text-right flex justify-end gap-3 text-white/50 mt-1">
                   <button className="hover:text-white">Edit</button>
                   <button className="hover:text-eterna-red">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CreatorManagement() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Original Productions & Studio Portal</h1>
      <p className="text-white/50 mb-8">Manage platform-exclusive productions from concept to release, and overview the multi-tenant studio ecosystem.</p>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard label="Active Original Productions" value="14" status="On Schedule" />
        <MetricCard label="Registered Partner Studios" value="1,204" status="+42 This Month" />
        <MetricCard label="Creator Payouts Pending" value="$8.4M" status="Processing" />
      </div>

      <div className="bg-[#111] border border-white/5 p-6 rounded-xl overflow-x-auto">
        <h2 className="text-xl font-bold mb-6">Original Content Pipeline (Kanban)</h2>
        <div className="flex gap-4 min-w-[1000px] pb-4">
           <KanbanColumn title="Concept & Scripting" items={['Sci-Fi Epic (Project Echo)', 'African Safari Doc S2']} />
           <KanbanColumn title="Pre-Production (Budgets)" items={['Comedy Special 24', 'Eterna Tech Series']} />
           <KanbanColumn title="Principal Photography" items={['Neon Nights S2']} />
           <KanbanColumn title="Post-Production (VFX)" items={['The Last Frontier']} />
           <KanbanColumn title="Ready for Release" items={['Cosmic Voyage Origin']} />
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ title, items }: any) {
  return (
    <div className="flex-1 min-w-[250px] bg-[#0a0a0a] rounded-lg border border-white/10 p-3">
       <div className="text-[12px] font-bold text-white/50 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">{title}</div>
       <div className="space-y-2">
         {items.map((it: string, i: number) => (
            <div key={i} className="bg-[#1a1a1a] border border-white/5 p-3 rounded shadow-lg text-[13px] font-medium hover:border-eterna-red transition-colors cursor-pointer">
              {it}
            </div>
         ))}
       </div>
    </div>
  );
}

function Marketplace() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Marketplace Ecosystem</h1>
      <p className="text-white/50 mb-8">B2B portal for film licensing, script sales, and production equipment rentals.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[250px] text-center">
          <FileCheck className="w-10 h-10 text-white/30 mb-4" />
          <h3 className="font-bold text-[18px] mb-2">Film Licensing Rights</h3>
          <p className="text-[13px] text-white/50 mb-4">Manage territorial syndication and external distribution bids.</p>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-[13px]">View 12 Open Bids</button>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[250px] text-center">
          <BookOpenIcon className="w-10 h-10 text-white/30 mb-4" />
          <h3 className="font-bold text-[18px] mb-2">Script Sales Hub</h3>
          <p className="text-[13px] text-white/50 mb-4">Connect vetted screenwriters with partner production studios.</p>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-[13px]">Review Scripts</button>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[250px] text-center">
          <Video className="w-10 h-10 text-white/30 mb-4" />
          <h3 className="font-bold text-[18px] mb-2">Equipment Workflow</h3>
          <p className="text-[13px] text-white/50 mb-4">Internal ARRI/RED camera rentals and set equipment deployment.</p>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-[13px]">Logistics Dashboard</button>
        </div>
      </div>
    </div>
  );
}
const BookOpenIcon = ({className}:any) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;

// ----------------------------------------------------
// AUDIENCE & OPERATIONS
// ----------------------------------------------------

function AudienceIntelligence() {
  const [variants, setVariants] = useState([
    { id: 1, name: 'Variant A', ctr: 30, url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=300&auto=format&fit=crop' },
    { id: 2, name: 'Variant B', ctr: 70, url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop' }
  ]);
  const [activeVariant, setActiveVariant] = useState(1);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      const newVar = { id: Date.now(), name: `Variant ${String.fromCharCode(65 + variants.length)}`, ctr: 0, url };
      setVariants([...variants, newVar]);
      setActiveVariant(newVar.id);
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Audience Intelligence & A/B Testing</h1>
      <p className="text-white/50 mb-8">Customer segmentation, churn prediction, user engagement, and platform optimization testing.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111] border border-white/5 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold">Predictive Churn Engine</h2>
             <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[11px] rounded border border-red-500/20 font-bold uppercase">AI Active</span>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-4 bg-[#1a1a1a] border border-white/5 rounded-lg border-l-4 border-l-red-500">
                <div>
                   <div className="font-bold text-[14px]">High Risk Cohort</div>
                   <div className="text-[12px] text-white/50">Inactive for 14+ days, zero watch completions this month</div>
                </div>
                <div className="text-right">
                   <div className="font-bold text-[18px]">42,108 users</div>
                   <button className="text-[11px] bg-red-600 hover:bg-red-700 font-bold px-3 py-1.5 rounded mt-2 transition-colors">Trigger 50% Off Retention Campaign</button>
                </div>
             </div>
             <div className="flex justify-between items-center p-4 bg-[#1a1a1a] border border-white/5 rounded-lg border-l-4 border-l-yellow-500">
                <div>
                   <div className="font-bold text-[14px]">Medium Risk Cohort</div>
                   <div className="text-[12px] text-white/50">Decreasing watch hours MoM, canceled one add-on</div>
                </div>
                <div className="text-right">
                   <div className="font-bold text-[18px]">115,402 users</div>
                   <button className="text-[11px] bg-white/10 hover:bg-white/20 font-bold px-3 py-1.5 rounded mt-2 transition-colors">Send Personalized Recs Email</button>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold">Thumbnail A/B Testing Manager</h2>
             <span className="text-[12px] text-white/50 font-mono">Title: "Stranger Things"</span>
           </div>
           
           <div className="flex gap-4 mb-4">
             {/* Preview Pane */}
             <div className="w-[180px] h-[270px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden shrink-0 relative flex items-center justify-center group">
               {variants.find(v => v.id === activeVariant)?.url ? (
                 <img src={variants.find(v => v.id === activeVariant)?.url} className="w-full h-full object-cover" alt="Variant Preview" />
               ) : (
                 <span className="text-white/30 text-[12px]">No Image</span>
               )}
               <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 rounded text-[10px] font-bold text-white uppercase backdrop-blur">
                  Live Preview
               </div>
             </div>
             
             {/* List Pane */}
             <div className="flex-1 flex flex-col min-h-0 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
               {variants.map(v => (
                 <div 
                   key={v.id} 
                   onClick={() => setActiveVariant(v.id)}
                   className={`p-3 rounded-lg flex justify-between items-center cursor-pointer transition-colors border ${activeVariant === v.id ? 'bg-white/10 border-white/30' : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'}`}
                 >
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded bg-[#222] overflow-hidden shrink-0">
                       {v.url && <img src={v.url} className="w-full h-full object-cover" alt={v.name} />}
                     </div>
                     <div>
                       <div className="text-[13px] font-bold">{v.name}</div>
                       <div className="text-[11px] text-white/50">{v.ctr}% Traffic Allocation</div>
                     </div>
                   </div>
                   <div className="flex flex-col items-end gap-1">
                      {v.ctr > 50 && <span className="bg-green-500/20 text-green-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Winning</span>}
                   </div>
                 </div>
               ))}
               
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="p-3 mt-2 rounded-lg border border-dashed border-white/20 text-white/50 hover:bg-white/5 hover:text-white transition-colors text-[13px] font-medium flex items-center justify-center"
               >
                 + Upload New Variant
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AdManagement() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Advertising Management (AVOD)</h1>
      <p className="text-white/50 mb-8">Manage ad inventory, campaigns, and audience targeting for the AVOD tier.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Active Campaigns" value="1,240" status="Running" />
        <MetricCard label="Pre-roll Fill Rate" value="98.2%" status="Optimal" />
        <MetricCard label="Mid-roll Fill Rate" value="84.5%" status="Needs Inventory" type="warning" />
        <MetricCard label="AVOD Revenue (YTD)" value="$32.4M" status="+11% MoM" />
      </div>

      <div className="bg-[#111] border border-white/5 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Advertiser Dashboard & Active Campaigns</h2>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#1a1a1a] text-white/50 font-medium">
            <tr>
              <th className="p-4">Brand / Campaign</th>
              <th className="p-4">Targeting</th>
              <th className="p-4">Type</th>
              <th className="p-4">Impressions (M)</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5">
              <td className="p-4 font-bold">Nike Global <br/><span className="text-[11px] font-normal text-white/50">Run Club '26</span></td>
              <td className="p-4">Sports, Docs, Men 18-35</td>
              <td className="p-4"><span className="px-2 py-1 bg-[#222] rounded text-[11px]">Pre-roll</span></td>
              <td className="p-4 font-mono">14.2 / 20.0</td>
              <td className="p-4"><span className="text-green-400">Active</span></td>
            </tr>
            <tr className="hover:bg-white/5">
              <td className="p-4 font-bold">Coca-Cola <br/><span className="text-[11px] font-normal text-white/50">Summer Vibes</span></td>
              <td className="p-4">All Genres, Global, All Ages</td>
              <td className="p-4"><span className="px-2 py-1 bg-[#222] rounded text-[11px]">Mid-roll</span></td>
              <td className="p-4 font-mono">82.1 / 100.0</td>
              <td className="p-4"><span className="text-green-400">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StreamingOperations() {
  const cdnData = [
    { time: '10:00', bandwidth: 42.1, buffer: 0.5, viewers: 1.10 },
    { time: '10:05', bandwidth: 45.3, buffer: 0.4, viewers: 1.15 },
    { time: '10:10', bandwidth: 48.2, buffer: 0.6, viewers: 1.20 },
    { time: '10:15', bandwidth: 52.4, buffer: 0.4, viewers: 1.22 },
    { time: '10:20', bandwidth: 48.8, buffer: 0.3, viewers: 1.24 },
    { time: '10:25', bandwidth: 48.2, buffer: 0.4, viewers: 1.24 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">CDN & Live Streaming Operations</h1>
      <p className="text-white/50 mb-8">Infrastructure health, multi-CDN routing, and premium live event management.</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Concurrent Viewers" value="1.24M" status="Optimal Capacity" />
        <MetricCard label="Global Bandwidth" value="48.2 Tbps" status="High Load (Edge)" type="warning" />
        <MetricCard label="Avg Buffer Rate" value="0.4%" status="Excellent" />
        <MetricCard label="API Latency" value="112ms" status="Optimal" />
      </div>

      <div className="bg-[#111] border border-white/5 rounded-xl p-6 mb-8 h-[350px] flex flex-col">
        <h2 className="text-xl font-bold mb-4">Real-Time CDN Performance & Telemetry</h2>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cdnData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#46d369" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#46d369" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBuf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E50914" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#888" tick={{fontSize: 12}} />
              <YAxis yAxisId="left" stroke="#888" tick={{fontSize: 12}} orientation="left" />
              <YAxis yAxisId="right" stroke="#888" tick={{fontSize: 12}} orientation="right" />
              <Tooltip 
                contentStyle={{backgroundColor: '#111', borderColor: '#333', borderRadius: '8px'}} 
                itemStyle={{color: '#fff'}}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area yAxisId="left" type="monotone" dataKey="bandwidth" stroke="#46d369" fillOpacity={1} fill="url(#colorBw)" name="Bandwidth (Tbps)" />
              <Area yAxisId="right" type="monotone" dataKey="buffer" stroke="#E50914" fillOpacity={1} fill="url(#colorBuf)" name="Buffer Rate (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Multi-CDN Edge Routing</h2>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 border border-white/10 rounded bg-[#1a1a1a]">
               <div className="font-bold text-[14px]">AWS CloudFront <span className="text-[11px] font-normal text-white/50 ml-2">Primary Node</span></div>
               <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end p-0.5"><div className="w-4 h-4 bg-white rounded-full"></div></div>
             </div>
             <div className="flex justify-between items-center p-3 border border-white/10 rounded bg-[#1a1a1a]">
               <div className="font-bold text-[14px]">Cloudflare Enterprise <span className="text-[11px] font-normal text-white/50 ml-2">Edge Rules</span></div>
               <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end p-0.5"><div className="w-4 h-4 bg-white rounded-full"></div></div>
             </div>
             <div className="flex justify-between items-center p-3 border border-white/10 rounded bg-[#1a1a1a]">
               <div className="font-bold text-[14px]">Akamai <span className="text-[11px] font-normal text-white/50 ml-2">Fallback Node</span></div>
               <div className="w-10 h-5 bg-white/20 rounded-full flex items-center justify-start p-0.5"><div className="w-4 h-4 bg-white rounded-full"></div></div>
             </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-xl p-6 flex flex-col justify-center items-center text-center">
             <Activity className="w-12 h-12 text-green-400 mb-4" />
             <div className="text-[20px] font-bold mb-2">Adaptive Bitrate: ACTIVE</div>
             <div className="text-[14px] text-white/50 max-w-sm">
                Stream quality is automatically scaling (360p up to 4K / Dolby Vision) on-the-fly based on real-time client bandwidth telemetry.
             </div>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-xl p-6">
         <h2 className="text-xl font-bold mb-4">Premium Live Events Hub</h2>
         <table className="w-full text-left text-[13px]">
          <thead className="bg-[#1a1a1a] text-white/50">
            <tr><th className="p-4">Event Name</th><th className="p-4">Type</th><th className="p-4">Tickets/Viewers</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-4 font-bold">Global Tech Conference '26</td><td className="p-4">Conference</td><td className="p-4 font-mono">1.2M Ready</td><td className="p-4 text-green-400">Live Queueing</td>
            </tr>
            <tr>
              <td className="p-4 font-bold">Championship Finals</td><td className="p-4">Sports</td><td className="p-4 font-mono">Waiting Room: 50K</td><td className="p-4 text-yellow-400">Starting in 2 hrs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ModerationCenter() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Enterprise Audit & Compliance</h1>
      <p className="text-white/50 mb-8">Role-based auditing, GDPR/POPIA tracking, and legal DMCA governance logs.</p>
      
      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden mt-4">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
           <div className="font-bold text-[14px]">System-Wide Action Log</div>
           <button className="px-4 py-1.5 bg-white/10 rounded text-[12px] font-semibold hover:bg-white/20">Export CSV</button>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#141414] text-white/50 font-medium">
            <tr><th className="p-4">Timestamp</th><th className="p-4">Admin/System Entity</th><th className="p-4">Action Taken</th><th className="p-4">Module</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-mono text-white/50">2026-06-03 12:15:02</td>
              <td className="p-4 font-bold text-eterna-red">Super Admin (simao@neuro...)</td>
              <td className="p-4">Approved submission 'The Last Frontier'</td>
              <td className="p-4"><span className="bg-[#222] px-2 py-1 rounded">Acquisition</span></td>
              <td className="p-4 text-green-400 font-bold">Success</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-mono text-white/50">2026-06-03 11:42:18</td>
              <td className="p-4 font-bold">Auto-Expire Lifecycle Bot</td>
              <td className="p-4">Archived 'Legacy Series' due to license expiry</td>
              <td className="p-4"><span className="bg-[#222] px-2 py-1 rounded">Library</span></td>
              <td className="p-4 text-green-400 font-bold">Success</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-mono text-white/50">2026-06-03 10:20:00</td>
              <td className="p-4 font-bold">Billing Engine Server</td>
              <td className="p-4">Processed 42,000 monthly subscriber renewals</td>
              <td className="p-4"><span className="bg-[#222] px-2 py-1 rounded">Monetization</span></td>
              <td className="p-4 text-green-400 font-bold">Success</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-mono text-white/50">2026-06-03 09:12:33</td>
              <td className="p-4 font-bold">Legal Moderator (John D.)</td>
              <td className="p-4">Processed DMCA Takedown Notice ID #84992</td>
              <td className="p-4"><span className="bg-[#222] px-2 py-1 rounded">Compliance</span></td>
              <td className="p-4 text-green-400 font-bold">Success</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// INTELLIGENCE & REVENUE
// ----------------------------------------------------

function RevenueIntelligence() {
  const financialData = [
    { month: 'Jul', mrr: 88.5, profit: 12.1 },
    { month: 'Aug', mrr: 92.4, profit: 14.5 },
    { month: 'Sep', mrr: 95.1, profit: 15.2 },
    { month: 'Oct', mrr: 98.8, profit: 16.8 },
    { month: 'Nov', mrr: 102.3, profit: 18.5 },
    { month: 'Dec', mrr: 108.9, profit: 21.0 },
    { month: 'Jan', mrr: 110.1, profit: 22.1 },
    { month: 'Feb', mrr: 112.5, profit: 23.5 },
    { month: 'Mar', mrr: 115.8, profit: 25.1 },
    { month: 'Apr', mrr: 118.2, profit: 26.8 },
    { month: 'May', mrr: 121.5, profit: 28.5 },
    { month: 'Jun', mrr: 125.0, profit: 31.2 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Monetization Engine</h1>
      <p className="text-white/50 mb-8">Comprehensive financial tracking powering SVOD, AVOD, TVOD, and Creator Payouts.</p>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="SVOD (Subscriptions)" value="$98.2M" status="+8% MoM" />
        <MetricCard label="AVOD (Advertising)" value="$32.4M" status="+11% MoM" />
        <MetricCard label="TVOD (Pay-Per-View)" value="$8.1M" status="Events Driven" />
        <MetricCard label="Platform Profit Margin" value="31.2%" status="Scaling Up" />
      </div>

      <div className="bg-[#111] border border-white/5 p-8 rounded-xl h-[450px] flex flex-col">
        <h2 className="text-xl font-bold mb-6">Revenue & Profitability Trends (12 Mo)</h2>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="month" stroke="#888" tick={{fontSize: 12}} />
              <YAxis yAxisId="left" stroke="#888" tick={{fontSize: 12}} tickFormatter={(value) => `$${value}M`} />
              <YAxis yAxisId="right" orientation="right" stroke="#888" tick={{fontSize: 12}} tickFormatter={(value) => `$${value}M`} />
              <Tooltip 
                contentStyle={{backgroundColor: '#111', borderColor: '#333', borderRadius: '8px'}} 
                itemStyle={{color: '#fff'}}
                formatter={(value: any) => [`$${value}M`]} 
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line yAxisId="left" type="monotone" dataKey="mrr" stroke="#46d369" strokeWidth={3} name="Total MRR" dot={{r: 4, fill: '#46d369'}} activeDot={{r: 6}} />
              <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#e50914" strokeWidth={3} name="Net Profitability" dot={{r: 4, fill: '#e50914'}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AiIntelligence() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'user', text: 'Show me the top 20 films in Africa this month and predict the next big genre.' },
    { role: 'ai', text: 'Analysis Complete:\n* African action-thrillers saw a 140% spike in watch-hours across Nigeria, SA, and Kenya.\n* "City of Shadows" is the #1 performer, generating $2.1M AVOD revenue.\n* AI Prediction: Localized Sci-Fi will be the dominant breakout genre next quarter due to search semantic overlaps.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to Command Center. Please verify API configuration.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">AI Executive Command Center</h1>
      <p className="text-white/50 mb-8">Conversational business intelligence, semantic search configuration, and automated metadata generation.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conversational AI */}
        <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col h-[500px]">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Brain className="text-eterna-red w-5 h-5"/> Conversational BI Assistant</h2>
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-[12px] ${m.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-eterna-red/20 text-eterna-red'}`}>
                  {m.role === 'user' ? 'SA' : <Brain className="w-4 h-4"/>}
                </div>
                <div className={`${m.role === 'user' ? 'bg-[#222]' : 'bg-eterna-red/10 border border-eterna-red/20'} p-3 rounded-lg rounded-tl-none text-[14px] text-white/90 whitespace-pre-wrap`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-eterna-red/20 text-eterna-red flex items-center justify-center shrink-0"><Brain className="w-4 h-4"/></div>
                <div className="bg-eterna-red/10 border border-eterna-red/20 p-3 rounded-lg rounded-tl-none text-[14px] text-white/90">
                  <div className="flex gap-1">
                     <span className="w-1.5 h-1.5 bg-eterna-red rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-eterna-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                     <span className="w-1.5 h-1.5 bg-eterna-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative mt-auto">
            <input 
              type="text" 
              placeholder="e.g., Which creators should we sign next?" 
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-3.5 pl-6 pr-12 text-[14px] outline-none focus:border-eterna-red shadow-inner transition-colors disabled:opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-eterna-red hover:bg-eterna-rose rounded-full text-white transition-colors disabled:opacity-50"
              onClick={sendMessage}
              disabled={loading}
            >
              <Zap className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* AI Features config */}
        <div className="space-y-6">
           <div className="bg-[#111] border border-white/5 p-6 rounded-xl">
             <h2 className="text-xl font-bold mb-4">Advanced Semantic Search</h2>
             <div className="text-[13px] text-white/60 mb-4">Users can search contextually rather than matching strict titles. The LLM processes intended meaning in real-time.</div>
             <div className="p-3 bg-[#1a1a1a] rounded text-[13px] font-mono text-white/70 border border-white/10">
               <span className="text-white/40">Query: </span> "Inspirational leadership documentaries about African tech startups" <span className="text-green-400 ml-2">✓ 99.8% Match Accuracy</span>
             </div>
           </div>
           
           <div className="bg-[#111] border border-white/5 p-6 rounded-xl">
             <h2 className="text-xl font-bold mb-4">Automated Content Screening</h2>
             <ul className="space-y-4 text-[13px]">
               <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0"/> <span><strong>Violence & Nudity Detection:</strong> Generating automatic timestamps and age ratings.</span></li>
               <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0"/> <span><strong>Metadata Generation:</strong> AI automatically generating deep tags, synopses, and SEO keywords for new ingestions.</span></li>
               <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0"/> <span><strong>Technical Defects:</strong> Blank frames and audio clipping mapped in pre-acquisition.</span></li>
             </ul>
           </div>
        </div>

      </div>
    </div>
  );
}
