import React, { useState, useEffect } from 'react';
import { useAppStore } from '../lib/store';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import * as d3 from 'd3';
import { 
  ArrowLeft, LayoutDashboard, Film, BarChart3, Users,
  Activity, DollarSign, Brain, ShieldAlert, FileCheck, CheckCircle2, XCircle,
  ShoppingBag, Megaphone, UserCheck, Lock, Globe, Clock,
  Zap, Play, Download, Video, Bell, Upload, X
} from 'lucide-react';

export const eternaEventBus = {
  emit: (type: string, message: string) => {
    window.dispatchEvent(new CustomEvent('eterna-event', { detail: { type, message, time: new Date() } }));
  },
  subscribe: (callback: (e: any) => void) => {
    const handler = (e: any) => callback(e.detail);
    window.addEventListener('eterna-event', handler);
    return () => window.removeEventListener('eterna-event', handler);
  }
};

function NotificationCenter() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = eternaEventBus.subscribe((detail) => {
      setAlerts(prev => [detail, ...prev].slice(0, 50));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="absolute top-6 right-8 z-40">
      <div 
        className="relative cursor-pointer w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5 text-white/80" />
        {alerts.length > 0 && <div className="absolute top-0 right-0 w-4 h-4 bg-eterna-red rounded-full border border-black text-[9px] font-bold flex items-center justify-center text-white">{alerts.length}</div>}
      </div>

      {isOpen && (
        <div className="absolute top-14 right-0 w-[400px] bg-[#111] border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[500px]">
          <div className="p-4 border-b border-white/10 font-bold flex justify-between bg-[#0a0a0a]">
             <span>Eterna Event Bus</span>
             <button onClick={() => setAlerts([])} className="text-[12px] text-white/40 hover:text-white">Clear</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {alerts.length === 0 && <div className="text-white/30 text-center text-sm py-4">No recent events</div>}
             {alerts.map((a, i) => (
                <div key={i} className="flex gap-3 items-start animate-in slide-in-from-right-2">
                   <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      {a.type === 'SUCCESS' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Activity className="w-3.5 h-3.5 text-blue-400" />}
                   </div>
                   <div>
                     <div className="text-[13px]">{a.message}</div>
                     <div className="text-[10px] text-white/40 mt-1">{a.time.toLocaleTimeString()}</div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminScreen() {
  const { go } = useAppStore();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [workflowDetails, setWorkflowDetails] = useState<any>(null);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <Dashboard triggerWorkflow={setWorkflowDetails} />;
      case 'acquisition': return <AcquisitionCenter triggerWorkflow={setWorkflowDetails} />;
      case 'library': return <LibraryManagement triggerWorkflow={setWorkflowDetails} />;
      case 'creators': return <CreatorManagement triggerWorkflow={setWorkflowDetails} />;
      case 'marketplace': return <Marketplace triggerWorkflow={setWorkflowDetails} />;
      case 'audience': return <AudienceIntelligence triggerWorkflow={setWorkflowDetails} />;
      case 'ads': return <AdManagement triggerWorkflow={setWorkflowDetails} />;
      case 'streaming': return <StreamingOperations triggerWorkflow={setWorkflowDetails} />;
      case 'moderation': return <ModerationCenter triggerWorkflow={setWorkflowDetails} />;
      case 'revenue': return <RevenueIntelligence triggerWorkflow={setWorkflowDetails} />;
      case 'ai': return <AiIntelligence triggerWorkflow={setWorkflowDetails} />;
      default: return <Dashboard triggerWorkflow={setWorkflowDetails} />;
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
        <NotificationCenter />
        {renderContent()}
      </div>
      
      {workflowDetails && <SuperAdminWorkflowModal details={workflowDetails} onClose={() => setWorkflowDetails(null)} />}
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

function Dashboard({ triggerWorkflow }: any) {
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
            <button onClick={() => triggerWorkflow({
               title: "ROI & Performance Reporter",
               endpoint: "/analytics/reports/ceo-performance",
               steps: [
                 "Compile Global Viewing Data",
                 "Calculate Revenue Attribution",
                 "Format Executive Briefing",
                 "Deliver to Executive Inbox"
               ]
            })} className="text-[12px] bg-white/10 px-3 py-1 rounded hover:bg-white/20">Generate Report</button>
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

function AcquisitionCenter({ triggerWorkflow }: any) {
  const { showToast, publishContent } = useAppStore();
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('Legal Issues');
  
  const [auditLogs, setAuditLogs] = useState<any>({
    'SUB-8942': [{ time: '10:00 AM', user: 'Auto-Scanner AI', action: 'Passed Initial Screening' }],
  });

  const [submissions, setSubmissions] = useState([
    { id: 'SUB-8942', title: 'The Last Frontier', creator: 'Starlight Films', email: 'contact@starlight.com', type: 'Feature', status: 'Editorial Review', score: 88, genre: 'Action' },
    { id: 'SUB-8943', title: 'Ocean Deep', creator: 'Blue Wave Docs', email: 'hello@bluewave.com', type: 'Documentary', status: 'Legal Verification', score: 92, genre: 'Docs' },
    { id: 'SUB-8945', title: 'Uncharted Waters', creator: 'Independent', email: 'indie@dev.com', type: 'Short', status: 'Technical Assessment', score: 71, genre: 'Drama' },
  ]);

  const handleAction = (action: 'Approved' | 'Rejected' | 'Request Revisions') => {
    if (action === 'Approved') {
        publishContent({
          id: Math.floor(Math.random() * 1000000),
          emoji: '🎬',
          coverUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop',
          title: selectedSub.title,
          sub: `${selectedSub.creator} • ${selectedSub.type}`,
          tag: 'new',
          rating: '8.5',
          year: new Date().getFullYear(),
          eps: null,
          genres: [selectedSub.genre || 'Drama'],
          desc: `Approved partner submission by ${selectedSub.creator}.`,
          cast: [],
          episodes: []
        });
        setSubmissions(prev => prev.filter(s => s.id !== selectedSub.id));
        setSelectedSub(null);

        eternaEventBus.emit('SUCCESS', `Submission '${selectedSub?.title}' has been approved and moved to Global Library.`);
        triggerWorkflow({
          title: "Publish Authorization Sequence",
          endpoint: "/super-admin/acquisition/approval-center",
          steps: [
            "Generate Content ID",
            "Activate Distribution Rights",
            "Move Content → Global Library",
            "Notify Creator & Distribution Teams",
            "Create Audit Record",
            "Update Content Intelligence Dashboard"
          ]
        });
        return;
    } else if (action === 'Rejected') {
        triggerWorkflow({
          title: "Content Rejection Workflow",
          endpoint: "/super-admin/acquisition/review-decision",
          steps: [
            "Capture Rejection Reason",
            "Generate Rejection Report",
            "Notify Content Owner",
            "Archive Submission",
            "Update Compliance Logs",
            "Update Creator Performance Metrics"
          ]
        });
    } else if (action === 'Request Revisions') {
        triggerWorkflow({
          title: "Revision Request Sequence",
          endpoint: "/super-admin/acquisition/revision-workspace",
          steps: [
            "Add Revision Notes",
            "Tag Content Issues",
            "Assign Reviewer",
            "Send Revision Request",
            "Create Revision Ticket",
            "Track SLA"
          ]
        });
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev: any) => ({
      ...prev,
      [selectedSub.id]: [
        { time: timestamp, user: 'Super Admin', action: `${action}${action === 'Rejected' || action === 'Request Revisions' ? ` - Reason: ${rejectReason}` : ''}` },
        ...(prev[selectedSub.id] || [])
      ]
    }));
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

function LibraryManagement({ triggerWorkflow }: any) {
  const { showToast, publishContent, catalog } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDirectPublishModal, setShowDirectPublishModal] = useState(false);
  const [directTitle, setDirectTitle] = useState("");
  const [directGenre, setDirectGenre] = useState("Drama");

  const handleDirectPublish = () => {
    if (!directTitle.trim()) return;
    publishContent({
      id: Math.floor(Math.random() * 1000000),
      emoji: '🎬',
      coverUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=300&auto=format&fit=crop',
      title: directTitle,
      sub: `Super Admin Direct Publish`,
      tag: 'new',
      rating: '9.9',
      year: new Date().getFullYear(),
      eps: null,
      genres: [directGenre],
      desc: 'Directly published by Super Administrator via Central Command.',
      cast: [],
      episodes: []
    });
    setDirectTitle('');
    setShowDirectPublishModal(false);
  };
  
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

  const handleUnpublishQueue = () => {
     triggerWorkflow({
        title: "Unpublish & Governance Queue",
        endpoint: "/library/governance/unpublish-queue",
        steps: [
          "Remove from Search Index",
          "Remove from Recommendations",
          "Deactivate Streaming & DRM",
          "Notify Rights Holders",
          "Update DRM Registry"
        ]
     });
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;
    
    if (action === 'Publish') {
       triggerWorkflow({
          title: "Bulk Publishing Engine",
          endpoint: "/library/bulk-publishing-center",
          steps: [
             "Select Territories & Release Date",
             "Select Distribution Channels",
             "Rebuild Search Index",
             "Trigger CDN Distribution",
             "Update Content Intelligence",
          ]
       });
    } else if (action === 'Delete') {
       triggerWorkflow({
          title: "Content Retirement Center",
          endpoint: "/administration/content-retirement-center",
          steps: [
             "Archive Check",
             "Legal Validation",
             "Delete Approval",
             "Execute Removal",
             "Create Audit Log"
          ]
       });
    }
    setSelectedIds([]);
  };

  const handleSingleAction = (action: string, id: string) => {
    if (action === 'Edit') {
       triggerWorkflow({
          title: "Content Editor Workspace",
          endpoint: `/library/content-editor/${id}`,
          steps: [
            "Open Metadata Schema",
            "Load DRM Profiles",
            "Fetch Localization Rules",
            "Initialize Rights Workspace"
          ]
       });
    } else if (action === 'Archive') {
       triggerWorkflow({
          title: "Archive Manager Pipeline",
          endpoint: "/library/archive-manager",
          steps: [
            "Archive Request",
            "Rights Validation",
            "Storage Migration",
            "Update Library Count",
            "Content Archived"
          ]
       });
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Global Library, DRM & Lifecycle</h1>
          <p className="text-white/50">Manage active assets, digital rights security, and licensing expirations.</p>
        </div>
        <button 
          onClick={() => setShowDirectPublishModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
        >
           <Upload className="w-5 h-5" /> Direct Publish (VIP)
        </button>
      </div>

      {showDirectPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowDirectPublishModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-blue-400"/> Publish Content Instantly</h2>
            <p className="text-white/50 text-sm mb-6">This circumvents normal approval workflows. Content will be immediately available to all users.</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Content Title</label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g. Eterna Spotlight"
                  className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                  value={directTitle}
                  onChange={(e) => setDirectTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDirectPublish()}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Primary Genre</label>
                <select 
                  className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                  value={directGenre}
                  onChange={(e) => setDirectGenre(e.target.value)}
                >
                  <option>Drama</option>
                  <option>Action</option>
                  <option>Sci-Fi</option>
                  <option>Documentary</option>
                  <option>Comedy</option>
                  <option>Sports</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={handleDirectPublish}
              disabled={!directTitle.trim()}
              className="w-full bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors"
            >
              Push to Live Platform
            </button>
          </div>
        </div>
      )}
      
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
             <button onClick={handleUnpublishQueue} className="text-[12px] bg-white/10 px-3 py-1.5 rounded hover:bg-white/20 transition-colors">Review & Unpublish Queue</button>
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
                   <button onClick={() => handleSingleAction('Edit', item.id)} className="hover:text-white">Edit</button>
                   <button onClick={() => handleSingleAction('Archive', item.id)} className="hover:text-eterna-red">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CreatorManagement({ triggerWorkflow }: any) {
  const [board, setBoard] = useState({
    'Concept & Scripting': ['Sci-Fi Epic (Project Echo)', 'African Safari Doc S2'],
    'Pre-Production (Budgets)': ['Comedy Special 24', 'Eterna Tech Series'],
    'Principal Photography': ['Neon Nights S2'],
    'Post-Production (VFX)': ['The Last Frontier'],
    'Ready for Release': ['Cosmic Voyage Origin']
  });

  const handleDrop = (e: React.DragEvent, col: string) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    if (!item) return;
    
    // Check if dragging to a different column
    let sourceCol = '';
    Object.entries(board).forEach(([k, v]) => {
       if ((v as string[]).includes(item)) sourceCol = k;
    });
    
    if (sourceCol && sourceCol !== col) {
       setBoard(prev => {
          const next = { ...prev };
          next[sourceCol as keyof typeof board] = next[sourceCol as keyof typeof board].filter(i => i !== item);
          next[col as keyof typeof board] = [...next[col as keyof typeof board], item];
          return next;
       });
       
       triggerWorkflow({
          title: "Production Pipeline Update",
          endpoint: "/studio/production-board",
          steps: [
            `Move "${item}" to ${col}`,
            "Update Production Database",
            "Notify Assigned Teams",
            "Update Budget Forecast",
            "Update Timeline & Executive Dashboard"
          ]
       });
    }
  };

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
        <h2 className="text-xl font-bold mb-6">Original Content Pipeline (Drag & Drop)</h2>
        <div className="flex gap-4 min-w-[1000px] pb-4">
           {Object.entries(board).map(([title, items]) => (
              <KanbanColumn key={title} title={title} items={items} onDrop={(e: any) => handleDrop(e, title)} />
           ))}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ title, items, onDrop }: any) {
  return (
    <div 
      className="flex-1 min-w-[250px] bg-[#0a0a0a] rounded-lg border border-white/10 p-3 flex flex-col"
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
       <div className="text-[12px] font-bold text-white/50 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">{title}</div>
       <div className="space-y-2 flex-1 relative">
         {items.map((it: string, i: number) => (
            <div 
              key={i} 
              draggable 
              onDragStart={e => e.dataTransfer.setData('text/plain', it)}
              className="bg-[#1a1a1a] border border-white/5 p-3 rounded shadow-lg text-[13px] font-medium hover:border-eterna-red focus:border-eterna-red transition-colors cursor-grab active:cursor-grabbing transform active:scale-95 duration-100"
            >
              {it}
            </div>
         ))}
         {items.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-[11px] text-white/20 font-bold uppercase tracking-widest border border-dashed border-white/10 rounded">Drop Here</div>}
       </div>
    </div>
  );
}

function Marketplace({ triggerWorkflow }: any) {
  const [showBidModal, setShowBidModal] = useState(false);

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Marketplace Ecosystem</h1>
      <p className="text-white/50 mb-8">B2B portal for film licensing, script sales, and production equipment rentals.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[250px] text-center">
           <FileCheck className="w-10 h-10 text-white/30 mb-4" />
           <h3 className="font-bold text-[18px] mb-2">Film Licensing Rights</h3>
           <p className="text-[13px] text-white/50 mb-4">Manage territorial syndication and external distribution bids.</p>
           <button onClick={() => setShowBidModal(true)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-[13px]">View 12 Open Bids</button>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[250px] text-center">
           <BookOpenIcon className="w-10 h-10 text-white/30 mb-4" />
           <h3 className="font-bold text-[18px] mb-2">Script Sales Hub</h3>
           <p className="text-[13px] text-white/50 mb-4">Connect vetted screenwriters with partner production studios.</p>
           <button onClick={() => triggerWorkflow({
              title: "Script Marketplace",
              endpoint: "/studio/script-marketplace",
              steps: [
                "Run AI Script Analysis",
                "Match Genre & Production Readiness",
                "Notify Writers & Studios",
                "Prepare Deal Room"
              ]
           })} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-[13px]">Review Scripts</button>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[250px] text-center">
           <Video className="w-10 h-10 text-white/30 mb-4" />
           <h3 className="font-bold text-[18px] mb-2">Equipment Workflow</h3>
           <p className="text-[13px] text-white/50 mb-4">Internal ARRI/RED camera rentals and set equipment deployment.</p>
           <button onClick={() => triggerWorkflow({
              title: "Logistics Dashboard",
              endpoint: "/studio/equipment-logistics",
              steps: [
                "Track Camera Inventory",
                "Generate Dispatch Order",
                "Update Production Finance",
                "Schedule Maintenance"
              ]
           })} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-[13px]">Logistics Dashboard</button>
        </div>
      </div>
      {showBidModal && <BidsModal onClose={() => setShowBidModal(false)} triggerWorkflow={triggerWorkflow} />}
    </div>
  );
}

function BidsModal({ onClose, triggerWorkflow }: any) {
  const [loading, setLoading] = useState(false);
  const [agreement, setAgreement] = useState('');
  
  const partnerCountry = "France (EU)";
  const saJurisdiction = "South Africa (ZA)";

  const handleGenerate = async () => {
    setLoading(true);
    triggerWorkflow({
       title: "AI Licensing Generation",
       endpoint: "/api/gemini/generate-license",
       steps: [
         "Resolve Jurisdiction Conflicts (ZA vs EU)",
         "Compile Payment Clauses",
         "Draft Agreement",
         "Dispatch for e-Signature"
       ]
    });
    
    try {
      const res = await fetch("/api/gemini/generate-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata: { title: "Cosmic Voyage", rights: "SVOD France", duration: "3 Years", offer: "€850,000" },
          partnerCountry: partnerCountry,
          saJurisdiction: saJurisdiction
        })
      });
      const data = await res.json();
      setAgreement(data.agreement);
      eternaEventBus.emit('SUCCESS', `AI License Agreement generated for ${partnerCountry} and sent to partner.`);
    } catch (e) {
      console.error(e);
      eternaEventBus.emit('ERROR', `Failed to generate AI License Agreement.`);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4">
       <div className="bg-[#111] border border-white/10 w-[800px] h-[600px] rounded-xl flex flex-col">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="font-bold text-lg">Open Bid: 'Cosmic Voyage'</h2>
            <button onClick={onClose}><XCircle className="w-5 h-5 text-white/50 hover:text-white" /></button>
          </div>
          <div className="flex-1 p-6 flex flex-col">
             <div className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-lg border border-white/5 mb-4">
                <div>
                  <div className="font-bold mb-1">CineStream Europe</div>
                  <div className="text-[13px] text-white/50">Territory: {partnerCountry} • Offer: €850,000</div>
                </div>
                <button onClick={handleGenerate} disabled={loading} className="px-4 py-2 bg-eterna-red rounded font-bold hover:bg-red-600 disabled:opacity-50">
                  {loading ? 'Generating AI Agreement...' : 'Generate AI Agreement (ZA-EU)'}
                </button>
             </div>
             <div className="flex-1 bg-[#050505] rounded border border-white/10 p-4 overflow-y-auto font-mono text-[11px] text-white/70 whitespace-pre-wrap">
                {agreement || "Click 'Generate AI Agreement' to draft the multi-jurisdiction licensing contract..."}
             </div>
          </div>
       </div>
    </div>
  );
}

const BookOpenIcon = ({className}:any) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;

function SuperAdminWorkflowModal({ details, onClose }: { details: any, onClose: () => void }) {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    if (step < details.steps.length) {
      const t = setTimeout(() => {
        setStep(s => s + 1);
      }, 1000 + Math.random() * 500);
      return () => clearTimeout(t);
    }
  }, [step, details.steps.length]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
          <div className="flex items-center gap-3">
             <Activity className="w-5 h-5 text-eterna-red" />
             <div className="font-bold text-[15px]">{details.title}</div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8">
           <div className="mb-6">
              <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1">Target Endpoint</div>
              <div className="font-mono text-[13px] text-blue-400 bg-blue-400/10 p-2 rounded border border-blue-400/20">{details.endpoint}</div>
           </div>
           
           <div className="space-y-4 mb-8">
              <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Enterprise Event Bus Execution</div>
              {details.steps.map((s: string, i: number) => {
                 const isActive = step === i;
                 const isDone = step > i;
                 return (
                   <div key={i} className={`flex items-start gap-4 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : isDone ? 'opacity-60 scale-100' : 'opacity-0 scale-95'}`}>
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isDone ? 'bg-green-500/20 text-green-400' : isActive ? 'bg-eterna-red/20 text-eterna-red animate-pulse' : 'bg-white/5 text-white/20'}`}>
                         {isDone ? <CheckCircle2 className="w-4 h-4" /> : isActive ? <SettingsIcon className="w-4 h-4 animate-spin-slow" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                      </div>
                      <div className={`text-[14px] ${isDone ? 'text-white' : isActive ? 'text-white font-bold' : 'text-white/40'}`}>
                        {s}
                      </div>
                   </div>
                 );
              })}
           </div>
           
           {step >= details.steps.length && (
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center animate-in zoom-in slide-in-from-bottom-4">
                 <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-2" />
                 <div className="font-bold text-lg text-green-400 mb-1">Workflow Completed</div>
                 <div className="text-[13px] text-green-400/70 mb-4">All downstream systems have been updated and synchronized.</div>
                 <button onClick={onClose} className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-2.5 rounded-lg transition-colors">Acknowledge</button>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

function SettingsIcon({className}:any) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}

// ----------------------------------------------------
// AUDIENCE & OPERATIONS
// ----------------------------------------------------

function AudienceIntelligence({ triggerWorkflow }: any) {
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
                   <button onClick={() => triggerWorkflow({
                      title: "Retention Campaign Engine",
                      endpoint: "/intelligence/churn-prevention",
                      steps: [
                        "Query At-Risk Users (42,108)",
                        "Generate 50% Off Offer Code",
                        "Launch Retention Campaign",
                        "Queue Email & Push Notifications"
                      ]
                   })} className="text-[11px] bg-red-600 hover:bg-red-700 font-bold px-3 py-1.5 rounded mt-2 transition-colors">Trigger 50% Off Retention Campaign</button>
                </div>
             </div>
             <div className="flex justify-between items-center p-4 bg-[#1a1a1a] border border-white/5 rounded-lg border-l-4 border-l-yellow-500">
                <div>
                   <div className="font-bold text-[14px]">Medium Risk Cohort</div>
                   <div className="text-[12px] text-white/50">Decreasing watch hours MoM, canceled one add-on</div>
                </div>
                <div className="text-right">
                   <div className="font-bold text-[18px]">115,402 users</div>
                   <button onClick={() => triggerWorkflow({
                      title: "Predictive Recommendation Engine",
                      endpoint: "/intelligence/recommendation-engine",
                      steps: [
                        "Select Audience Segment (115k)",
                        "Generate AI Recommendations",
                        "Build Dynamic Email Layouts",
                        "Launch Predictive Campaign"
                      ]
                   })} className="text-[11px] bg-white/10 hover:bg-white/20 font-bold px-3 py-1.5 rounded mt-2 transition-colors">Send Personalized Recs Email</button>
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

function AdManagement({ triggerWorkflow }: any) {
  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <div className="flex justify-between items-start mb-2">
         <h1 className="text-3xl font-bold">Advertising Management (AVOD)</h1>
         <button onClick={() => triggerWorkflow({
            title: "Advertising Command Center",
            endpoint: "/advertising/command-center",
            steps: [
              "Create Campaign: Video/Banner",
              "Set Media Placements",
              "Define Audience Targeting",
              "Schedule & Launch",
              "Activate Real-Time Optimization Alerts"
            ]
         })} className="bg-white text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-white/90">Launch Command Center</button>
      </div>
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

function StreamingOperations({ triggerWorkflow }: any) {
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
             <div className="flex justify-between items-center p-3 border border-white/10 hover:border-eterna-red transition-colors cursor-pointer rounded bg-[#1a1a1a]" onClick={() => triggerWorkflow({
                title: "CDN Edge Configuration",
                endpoint: "/streaming/edge-routing",
                steps: [
                   "Authenticate Infrastructure API",
                   "Modify CloudFront BGP Routes",
                   "Purge Global Edge Cache",
                   "Verify Telemetry Metrics"
                ]
             })}>
               <div className="font-bold text-[14px]">AWS CloudFront <span className="text-[11px] font-normal text-white/50 ml-2">Primary Node</span></div>
               <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end p-0.5"><div className="w-4 h-4 bg-white rounded-full shadow"></div></div>
             </div>
             <div className="flex justify-between items-center p-3 border border-white/10 hover:border-eterna-red transition-colors cursor-pointer rounded bg-[#1a1a1a]" onClick={() => triggerWorkflow({
                title: "CDN Edge Configuration",
                endpoint: "/streaming/edge-routing",
                steps: [
                   "Authenticate Infrastructure API",
                   "Update Cloudflare Enterprise rules",
                   "Propagate DNS Records",
                   "Verify Telemetry Metrics"
                ]
             })}>
               <div className="font-bold text-[14px]">Cloudflare Enterprise <span className="text-[11px] font-normal text-white/50 ml-2">Edge Rules</span></div>
               <div className="w-10 h-5 bg-green-500 rounded-full flex items-center justify-end p-0.5"><div className="w-4 h-4 bg-white rounded-full shadow"></div></div>
             </div>
             <div className="flex justify-between items-center p-3 border border-white/10 hover:border-eterna-red transition-colors cursor-pointer rounded bg-[#1a1a1a]" onClick={() => triggerWorkflow({
                title: "CDN Edge Configuration",
                endpoint: "/streaming/edge-routing",
                steps: [
                   "Authenticate Infrastructure API",
                   "Enable Akamai Fallback Node",
                   "Warming Edge Caches",
                   "Verify Telemetry Metrics"
                ]
             })}>
               <div className="font-bold text-[14px]">Akamai <span className="text-[11px] font-normal text-white/50 ml-2">Fallback Node</span></div>
               <div className="w-10 h-5 bg-white/20 rounded-full flex items-center justify-start p-0.5"><div className="w-4 h-4 bg-white rounded-full shadow"></div></div>
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

function AuditHeatmap() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const data = Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      value: Math.floor(Math.random() * 50)
    })).reverse();

    d3.select(containerRef.current).selectAll('*').remove();

    const margin = { top: 10, right: 10, bottom: 20, left: 30 };
    const width = containerRef.current.clientWidth - margin.left - margin.right;
    const height = 120 - margin.top - margin.bottom;

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([height, 0]);

    const line = d3.area<{ date: Date, value: number }>()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'rgba(229, 9, 20, 0.2)')
      .attr('stroke', '#E50914')
      .attr('stroke-width', 2)
      .attr('d', line);

    const xAxis = d3.axisBottom(x).ticks(5).tickFormat((d) => d3.timeFormat("%b %d")(d as Date));
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#666');

  }, []);

  return (
    <div className="bg-[#111] border border-white/5 rounded-xl p-6 mb-6">
       <h3 className="font-bold mb-4 text-white/80">Compliance & Audit Activity (90 Days)</h3>
       <div ref={containerRef} className="w-full h-[120px]" />
    </div>
  );
}

function ModerationCenter({ triggerWorkflow }: any) {
  const [logs, setLogs] = useState([
    { ts: '2026-06-03 12:15:02', admin: 'Super Admin (simao@neuro...)', action: "Approved submission 'The Last Frontier'", module: 'Acquisition', status: 'Success' },
    { ts: '2026-06-03 11:42:18', admin: 'Auto-Expire Lifecycle Bot', action: "Archived 'Legacy Series' due to license expiry", module: 'Library', status: 'Success' },
    { ts: '2026-06-03 10:20:00', admin: 'Billing Engine Server', action: "Processed 42,000 monthly subscriber renewals", module: 'Monetization', status: 'Success' },
    { ts: '2026-06-03 09:12:33', admin: 'Legal Moderator (John D.)', action: "Processed DMCA Takedown Notice ID #84992", module: 'Compliance', status: 'Success' }
  ]);

  const handleExport = (format: 'csv' | 'json') => {
    // Audit Log Entry
    const newLog = {
      ts: new Date().toISOString().replace('T', ' ').substr(0, 19),
      admin: 'Super Admin (current)',
      action: `Exported Compliance Report (${format.toUpperCase()})`,
      module: 'Compliance',
      status: 'Success'
    };
    
    setLogs(prev => [newLog, ...prev]);
    eternaEventBus.emit('SUCCESS', `Compliance Report Exported as ${format.toUpperCase()}`);

    // Generate File
    const filename = `Compliance_Report_${Date.now()}.${format}`;
    let dataStr = '';
    
    if (format === 'csv') {
      const headers = Object.keys(logs[0]).join(',');
      const rows = [newLog, ...logs].map(row => Object.values(row).map(v => `"${v}"`).join(','));
      dataStr = [headers, ...rows].join('\n');
    } else {
      dataStr = JSON.stringify([newLog, ...logs], null, 2);
    }
    
    const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    triggerWorkflow({
       title: "Compliance Export Sequence",
       endpoint: "/compliance/export-center",
       steps: [
         "Select Data Range & Dataset",
         "Generate Audit Report",
         "Encrypt Output File (AES-256)",
         "Store Compliance Export Record",
         "Initiate Download"
       ]
    });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-2">Enterprise Audit & Compliance</h1>
      <p className="text-white/50 mb-8">Role-based auditing, GDPR/POPIA tracking, and legal DMCA governance logs.</p>
      
      <AuditHeatmap />
      
      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden mt-4">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
           <div className="font-bold text-[14px]">System-Wide Action Log</div>
           <div className="flex gap-2">
             <button onClick={() => handleExport('csv')} className="px-4 py-1.5 bg-white/10 rounded text-[12px] font-semibold hover:bg-white/20">Export CSV</button>
             <button onClick={() => handleExport('json')} className="px-4 py-1.5 bg-white/10 rounded text-[12px] font-semibold hover:bg-white/20">Export JSON</button>
           </div>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#141414] text-white/50 font-medium">
            <tr><th className="p-4">Timestamp</th><th className="p-4">Admin/System Entity</th><th className="p-4">Action Taken</th><th className="p-4">Module</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-white/50">{log.ts}</td>
                <td className="p-4 font-bold text-eterna-red">{log.admin}</td>
                <td className="p-4">{log.action}</td>
                <td className="p-4"><span className="bg-[#222] px-2 py-1 rounded">{log.module}</span></td>
                <td className="p-4 text-green-400 font-bold">{log.status}</td>
              </tr>
            ))}
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
