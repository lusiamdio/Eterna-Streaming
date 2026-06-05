import React, { useState } from 'react';
import { 
  Building, Users, DollarSign, Film, Globe, Shield, Sparkles, 
  Unplug, MessageSquare, Palette, Bell, BarChart, Code, 
  CreditCard, FileText, Settings as SettingsIcon,
  CheckCircle2, AlertCircle, Save, Upload, Activity, Download
} from 'lucide-react';

export function SettingsCenter() {
  const [activeTab, setActiveTab] = useState('org');

  const tabs = [
    { id: 'org', label: 'Organization Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'team', label: 'Team & Access', icon: <Users className="w-4 h-4" /> },
    { id: 'revenue', label: 'Revenue & Treasury', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'content', label: 'Content & Distribution', icon: <Film className="w-4 h-4" /> },
    { id: 'licensing', label: 'Licensing & Rights', icon: <Globe className="w-4 h-4" /> },
    { id: 'security', label: 'Security & Compliance', icon: <Shield className="w-4 h-4" /> },
    { id: 'ai', label: 'AI & Automation', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'integrations', label: 'Integrations', icon: <Unplug className="w-4 h-4" /> },
    { id: 'communication', label: 'Communication Center', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'brand', label: 'Brand & White Label', icon: <Palette className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'data', label: 'Data & Analytics', icon: <BarChart className="w-4 h-4" /> },
    { id: 'api', label: 'API & Developer Hub', icon: <Code className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing & Subscription', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit & Activity Logs', icon: <FileText className="w-4 h-4" /> },
    { id: 'system', label: 'System Preferences', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto relative z-10 mt-4 animate-in fade-in flex flex-col h-full h-[calc(100vh-120px)]">
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Settings & Administration</h1>
          <p className="text-white/50 text-[15px] font-mono">Control your global media operating system.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-[600px] pb-10">
        {/* Left Nav */}
        <div className="w-full md:w-[280px] shrink-0 flex flex-col space-y-1 overflow-y-auto pr-2 hide-scrollbar h-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-[13px] uppercase tracking-wider ${
                activeTab === tab.id 
                  ? 'bg-eterna-rose text-white shadow-[0_0_15px_rgba(225,29,72,0.3)] border border-eterna-rose/20' 
                  : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-y-auto relative hide-scrollbar shadow-2xl h-full pb-10">
           {activeTab === 'org' && <OrgSettings />}
           {activeTab === 'team' && <TeamSettings />}
           {activeTab === 'revenue' && <TreasurySettings />}
           {activeTab === 'content' && <ContentSettings />}
           {activeTab === 'licensing' && <LicensingSettings />}
           {activeTab === 'security' && <SecuritySettings />}
           {activeTab === 'ai' && <AISettings />}
           {activeTab === 'integrations' && <IntegrationsSettings />}
           {activeTab === 'brand' && <BrandSettings />}
           {activeTab === 'audit' && <AuditLogsSettings />}
           {activeTab === 'communication' && <div className="p-8 text-white/50">Communication settings coming soon...</div>}
           {activeTab === 'notifications' && <div className="p-8 text-white/50">Smart Notification Engine coming soon...</div>}
           {activeTab === 'data' && <div className="p-8 text-white/50">Reporting Preferences coming soon...</div>}
           {activeTab === 'api' && <div className="p-8 text-white/50">Developer Sandbox coming soon...</div>}
           {activeTab === 'billing' && <div className="p-8 text-white/50">Subscription plans coming soon...</div>}
           {activeTab === 'system' && <div className="p-8 text-white/50">System Preferences coming soon...</div>}
        </div>
      </div>
    </div>
  );
}

function OrgSettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Building className="text-eterna-rose" /> Organization Profile</h2>
        <p className="text-white/50 text-sm max-w-2xl">Manage your company identity, legal entity status, and official verification.</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Organization Name</label>
            <input type="text" defaultValue="Eterna Studios Africa" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-eterna-rose outline-none focus:ring-1 focus:ring-eterna-rose/50" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Legal Entity Name</label>
            <input type="text" defaultValue="Eterna Media Group LLC" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-eterna-rose outline-none focus:ring-1 focus:ring-eterna-rose/50" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Registration Number</label>
            <input type="text" defaultValue="REG-2940184M" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-eterna-rose outline-none font-mono focus:ring-1 focus:ring-eterna-rose/50" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Tax Number (VAT/GST)</label>
            <input type="text" defaultValue="VAT-ZA-99182" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-eterna-rose outline-none font-mono focus:ring-1 focus:ring-eterna-rose/50" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Industry Type</label>
            <select className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-eterna-rose outline-none appearance-none">
              <option>Film Production</option>
              <option>Broadcasting</option>
              <option>Distribution</option>
              <option>Ministry / Institutional</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Headquarters Location</label>
            <input type="text" defaultValue="Cape Town, South Africa" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-eterna-rose outline-none focus:ring-1 focus:ring-eterna-rose/50" />
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex gap-4 mt-8">
          <button className="bg-eterna-rose hover:bg-eterna-rose/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all hover:scale-[1.02]">
            <Save className="w-4 h-4"/> Save Changes
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-green-400 px-6 py-3 rounded-xl font-bold border border-green-400/20 flex items-center gap-2 transition-colors pointer-events-none">
            <CheckCircle2 className="w-4 h-4"/> Verified Entity
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamSettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center sm:items-start flex-col sm:flex-row gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Users className="text-blue-400" /> Team & Access Control</h2>
          <p className="text-white/50 text-sm max-w-xl">Invite and manage team members with a dynamic permissions matrix.</p>
        </div>
        <button className="bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 shadow-lg shrink-0 w-full sm:w-auto transition-colors">Invite User</button>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-white/50 uppercase tracking-widest text-[10px] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold">User</th>
                <th className="px-6 py-4 font-bold">Role</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-eterna-rose flex items-center justify-center font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">L</div>
                  <div><div className="font-bold text-base">Lusimadio Simão</div><div className="text-xs text-white/50 mt-0.5">lusimadio12@gmail.com</div></div>
                </td>
                <td className="px-6 py-4"><span className="bg-eterna-rose/10 text-eterna-rose px-3 py-1.5 rounded-lg text-xs font-bold border border-eterna-rose/20 uppercase tracking-widest">Owner</span></td>
                <td className="px-6 py-4"><span className="text-green-400 font-medium flex items-center gap-1.5 bg-green-500/10 px-3 py-1.5 rounded-lg w-fit text-xs uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5"/> Active</span></td>
                <td className="px-6 py-4 text-right"><button className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors font-medium">Manage</button></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm shadow-inner overflow-hidden"><img src="https://images.unsplash.com/photo-1531123897727-8f129e1eb4aa?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover"/></div>
                  <div><div className="font-bold text-base">Amara Okafor</div><div className="text-xs text-white/50 mt-0.5">amara@eternastudios.com</div></div>
                </td>
                <td className="px-6 py-4"><span className="bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500/20 uppercase tracking-widest">Producer</span></td>
                <td className="px-6 py-4"><span className="text-green-400 font-medium flex items-center gap-1.5 bg-green-500/10 px-3 py-1.5 rounded-lg w-fit text-xs uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5"/> Active</span></td>
                <td className="px-6 py-4 text-right"><button className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors font-medium">Manage</button></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">D</div>
                  <div><div className="font-bold text-base">David Chen</div><div className="text-xs text-white/50 mt-0.5">david@eternastudios.com</div></div>
                </td>
                <td className="px-6 py-4"><span className="bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-purple-500/20 uppercase tracking-widest">Content Mgr</span></td>
                <td className="px-6 py-4"><span className="text-yellow-400 font-medium flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1.5 rounded-lg w-fit text-xs uppercase tracking-wider"><AlertCircle className="w-3.5 h-3.5"/> Pending</span></td>
                <td className="px-6 py-4 text-right"><button className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors font-medium">Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TreasurySettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><DollarSign className="text-green-400" /> Revenue & Treasury</h2>
        <p className="text-white/50 text-sm max-w-2xl">Configure payment methods, automated revenue distribution rules, and tax settings.</p>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-white/50"/> Payout Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#111] border border-white/10 hover:border-green-400/50 p-5 rounded-2xl flex justify-between items-start transition-all cursor-pointer group">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors"><Building className="w-6 h-6 text-white" /></div>
                <div><div className="font-bold text-base">Standard Bank SA</div><div className="text-xs text-white/50 font-mono mt-0.5">**** 5932</div></div>
              </div>
              <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-widest">Default</span>
            </div>
            
            <button className="border border-dashed border-white/20 hover:border-white/50 hover:bg-white/5 rounded-2xl flex flex-col items-center justify-center text-white/50 hover:text-white transition-all p-5 h-[140px] gap-2">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-1"><DollarSign className="w-5 h-5"/></div>
              <span className="font-bold text-sm">Add Payment Method</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Revenue Split Rules (Automated Allocations)</h3>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 shadow-xl">
            <p className="text-sm text-white/50 mb-6">These rules dictate how incoming revenue on specifically tagged projects distributes automatically.</p>
            <div className="space-y-6">
              <div>
                 <div className="flex justify-between items-center text-sm mb-2"><span className="font-bold text-white tracking-wide">Studio Treasury</span><span className="font-mono font-bold text-green-400 text-base">40%</span></div>
                 <div className="w-full bg-black h-3 rounded-full overflow-hidden border border-white/5"><div className="bg-gradient-to-r from-green-500 to-green-400 h-full w-[40%] rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div></div>
              </div>
              <div>
                 <div className="flex justify-between items-center text-sm mb-2"><span className="font-bold text-white tracking-wide">Creator / Producer Pool</span><span className="font-mono font-bold text-blue-400 text-base">40%</span></div>
                 <div className="w-full bg-black h-3 rounded-full overflow-hidden border border-white/5"><div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full w-[40%] rounded-full"></div></div>
              </div>
              <div>
                 <div className="flex justify-between items-center text-sm mb-2"><span className="font-bold text-white tracking-wide">Marketing Fund</span><span className="font-mono font-bold text-purple-400 text-base">20%</span></div>
                 <div className="w-full bg-black h-3 rounded-full overflow-hidden border border-white/5"><div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full w-[20%] rounded-full"></div></div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
               <button className="text-white/50 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg transition-colors">Edit Allocation Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Film className="text-purple-400" /> Content & Distribution Defaults</h2>
        <p className="text-white/50 text-sm max-w-2xl">Set rules for how your content is processed, published, and protected across the Eterna network.</p>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Publishing Workflow</label>
            <select className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-purple-400 outline-none appearance-none font-medium">
              <option>Require Admin Approval</option>
              <option>Auto-Publish when ready</option>
            </select>
            <p className="text-xs text-white/40 mt-3 leading-relaxed">When creators or producers upload assets, they remain <span className="font-bold text-yellow-400/80">Pending Review</span> until an Admin greenlights the publication.</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
            <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Default Distribution Territories</label>
            <select className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-purple-400 outline-none appearance-none font-medium">
              <option>Global (Worldwide)</option>
              <option>Africa Continent Only</option>
              <option>Custom Geoblocking List</option>
            </select>
            <p className="text-xs text-white/40 mt-3 leading-relaxed">Newly uploaded content will automatically inherit this region access profile.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 p-8 rounded-2xl relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full"></div>
           <div className="relative z-10">
             <h3 className="font-bold text-xl text-purple-400 mb-2 flex items-center gap-2"><Shield className="w-5 h-5"/> Eterna Trace™ Invisible Watermarking</h3>
             <p className="text-sm text-white/70 mb-6 max-w-2xl leading-relaxed">Automatically embed dynamic, untamperable cryptographic payloads into your video stream's pixel data. This tracks illicit screen-recording leaks back to the exact user session ID.</p>
             <label className="flex items-center gap-4 cursor-pointer w-fit p-1">
               <div className="relative">
                 <input type="checkbox" className="sr-only peer" defaultChecked />
                 <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-purple-500 shadow-inner border border-white/5"></div>
               </div>
               <span className="text-sm font-bold tracking-wide">Enable Trace Protocol for all outbound streams</span>
             </label>
           </div>
        </div>
      </div>
    </div>
  );
}

function LicensingSettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Globe className="text-teal-400" /> Licensing & Rights</h2>
        <p className="text-white/50 text-sm max-w-2xl">Configure intellectual property rules, automated acceptances, and exclusivity bounds.</p>
      </div>
      
      <div className="space-y-8 max-w-3xl">
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl shadow-xl">
          <label className="block text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">Automated Bid Acceptance Matrix</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-black border border-white/10 rounded-xl p-4 transition-all focus-within:border-teal-500/50">
             <span className="text-white/80 text-sm font-medium">Auto-accept exclusive broadcast bids greater than:</span>
             <div className="relative ml-auto w-full sm:w-auto mt-2 sm:mt-0">
               <DollarSign className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" />
               <input type="text" defaultValue="50000" className="bg-[#1a1a1a] border border-white/5 rounded-lg py-3 pr-4 pl-10 font-mono font-bold text-white outline-none w-full sm:w-40 text-lg shadow-inner focus:border-teal-500 transition-colors" />
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="border border-white/5 hover:border-white/10 p-6 rounded-2xl bg-[#111] transition-all shadow-lg group">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors"><Building className="w-5 h-5 text-teal-400"/></div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                 </label>
              </div>
              <h4 className="font-bold text-lg mb-2">Educational Rights</h4>
              <p className="text-sm text-white/50 leading-relaxed">Allow verified universities and schools to organically request non-profit screening licenses at a discount.</p>
           </div>
           
           <div className="border border-white/5 hover:border-white/10 p-6 rounded-2xl bg-[#111] transition-all shadow-lg group">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors"><Bell className="w-5 h-5 text-teal-400"/></div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                 </label>
              </div>
              <h4 className="font-bold text-lg mb-2">Rights Expiry Alerts</h4>
              <p className="text-sm text-white/50 leading-relaxed">Automatically notify Treasury 90 days before an active license territory expires to begin renegotiation workflows.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Shield className="text-red-400" /> Security & Compliance</h2>
        <p className="text-white/50 text-sm max-w-2xl">Manage multi-factor authentication, active sessions, zero-trust policies, and compliance logging.</p>
      </div>
      
      <div className="border border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
         <div>
            <h3 className="font-bold text-lg text-red-400 mb-1 flex items-center gap-2"><Shield className="w-5 h-5"/> Required Multi-Factor Authentication (MFA)</h3>
            <p className="text-sm text-white/70 leading-relaxed max-w-xl">Enforce strict 2FA protection for all users accessing Treasury or Administrative functions to meet SOC-2 compliance.</p>
         </div>
         <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all whitespace-nowrap w-full sm:w-auto">Manage MFA Enclaves</button>
      </div>
      
      <div className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-xl max-w-4xl">
        <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-xs text-white/50">Active Sessions & Devices</h3>
        <div className="space-y-4">
           <div className="bg-black border border-white/5 p-4 md:p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-white/10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10"><Shield className="w-5 h-5 text-green-400" /></div>
                 <div>
                   <div className="font-bold text-base flex flex-wrap items-center gap-2">MacBook Pro (Chrome) <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] px-2 py-0.5 rounded uppercase tracking-widest font-bold">Current Session</span></div>
                   <div className="text-sm text-white/40 mt-1 font-mono">Cape Town, ZA • IP: 192.168.1.1</div>
                 </div>
              </div>
              <span className="text-white/30 text-xs font-medium ml-16 md:ml-0">Active Now</span>
           </div>
           <div className="bg-black border border-white/5 p-4 md:p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-white/10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10"><Shield className="w-5 h-5 text-white/30" /></div>
                 <div>
                   <div className="font-bold text-base text-white/80">iPhone 14 Pro (Eterna iOS)</div>
                   <div className="text-sm text-white/40 mt-1 font-mono">Nairobi, KE • IP: 41.90.1.42</div>
                 </div>
              </div>
              <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-4 ml-16 md:ml-0">
                 <span className="text-white/30 text-xs font-medium">Active 3 days ago</span>
                 <button className="text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-lg transition-colors">Revoke Access</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AISettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Sparkles className="text-yellow-400" /> Autonomous Agent Configuration</h2>
        <p className="text-white/50 text-sm max-w-2xl">Configure the Eterna Neural Engine's autonomous behaviors for your organization's backend workflows.</p>
      </div>
      
      <div className="space-y-4 max-w-4xl">
         {[
           { title: 'Auto-Generate Media Metadata', desc: 'Neural Engine will automatically create synopses, search tags, genre classifications, and cast lists upon raw video upload.', on: true },
           { title: 'Auto-Transcription & Dubbing', desc: 'Automatically transcribe and translate content into 12 core global languages using zero-shot AI models.', on: true },
           { title: 'Smart Licensing Counter-Offers', desc: 'Allow AI Treasury agent to automatically suggest tactical counter-offers for B2B licensing bids below trained market value.', on: true },
           { title: 'Audience Sentiment Intelligence', desc: 'Agent actively scans global social media platforms to aggregate sentiment metrics on your published portfolio.', on: false }
         ].map((setting, i) => (
           <div key={i} className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-yellow-400/30 group shadow-lg">
              <div className="max-w-2xl">
                 <h4 className="font-bold text-lg mb-1.5 text-white/90 group-hover:text-yellow-400 transition-colors">{setting.title}</h4>
                 <p className="text-sm text-white/50 leading-relaxed">{setting.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-auto sm:ml-0">
                <input type="checkbox" className="sr-only peer" defaultChecked={setting.on} />
                <div className="w-14 h-7 bg-black border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:bg-yellow-500 shadow-inner"></div>
              </label>
           </div>
         ))}
      </div>
    </div>
  );
}

function IntegrationsSettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Unplug className="text-orange-400" /> Cloud Integrations</h2>
          <p className="text-white/50 text-sm max-w-2xl">Connect Eterna directly to your existing production pipelines, asset storage, and enterprise software.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
         {[
            { name: 'Google Workspace', status: 'Connected', desc: 'Sync Drive assets and Calendar events automagically.', btn: 'Manage Auth', active: true, icon: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png' },
            { name: 'Dropbox Enterprise', status: 'Not Connected', desc: 'Two-way sync for massive raw ProRes assets.', btn: 'Connect via OAuth', active: false, icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Dropbox_logo_2017.svg', filter: 'brightness-0 invert' },
            { name: 'YouTube MCN Sync', status: 'Not Connected', desc: 'Push published content directly to YT channels.', btn: 'Connect Channel', active: false, icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
            { name: 'Slack Workspaces', status: 'Connected', desc: 'Route system notifications to specific Slack channels.', btn: 'Configure Channels', active: true, icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' }
         ].map((int, i) => (
           <div key={i} className={`border ${int.active ? 'border-orange-500/30 bg-orange-500/5' : 'border-white/5 bg-[#111]'} p-6 rounded-2xl flex flex-col justify-between hover:border-orange-400/50 transition-all shadow-lg group min-h-[160px]`}>
              <div className="flex items-start justify-between mb-4">
                 <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center p-3 border border-white/5"><img src={int.icon} className={`w-full h-full object-contain ${int.filter || ''}`} alt={int.name}/></div>
                 <div className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${int.active ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}>{int.status}</div>
              </div>
              <div>
                 <div className="font-bold text-lg mb-1">{int.name}</div>
                 <div className="text-sm text-white/50 mb-6">{int.desc}</div>
                 <button className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${int.active ? 'bg-black text-white border border-white/10 hover:bg-white/10' : 'bg-white text-black hover:bg-gray-200'}`}>{int.btn}</button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

function BrandSettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Palette className="text-pink-400" /> Brand & White Label Identity</h2>
        <p className="text-white/50 text-sm max-w-2xl">Customize your organization's visual footprint across the Eterna ecosystem, player surfaces, and custom domains.</p>
      </div>
      
      <div className="space-y-8 max-w-4xl bg-[#111] border border-white/5 rounded-2xl p-8 shadow-2xl">
         <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 bg-black border border-white/10 rounded-3xl flex items-center justify-center shrink-0 relative group cursor-pointer overflow-hidden shadow-inner flex-col">
               <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-md">
                 <Upload className="w-6 h-6 text-white mb-2" />
                 <span className="text-xs font-bold uppercase tracking-widest">Update</span>
               </div>
            </div>
            <div className="flex-1 mt-2">
               <h3 className="font-bold text-xl mb-2">Organization Logo</h3>
               <p className="text-sm text-white/50 mb-6 leading-relaxed">Upload a high-res logo (PNG or SVG, min 512x512px). This asset is centrally piped to your partner profile, OTT streaming player corner watermark, and B2B screening room headers.</p>
               <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"><Upload className="w-4 h-4"/> Browse Files...</button>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Primary Action Color</label>
               <div className="flex items-center gap-4 bg-black border border-white/10 rounded-xl p-3 shadow-inner">
                 <div className="w-10 h-10 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-white/10" style={{backgroundColor: '#E11D48'}}></div>
                 <input type="text" defaultValue="#E11D48" className="bg-transparent border-none outline-none font-mono text-white text-lg font-bold flex-1" />
               </div>
            </div>
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Custom Workspace Domain</label>
               <div className="flex items-center gap-3 bg-black border border-white/10 rounded-xl p-4 shadow-inner">
                 <span className="text-white/40 font-mono text-base tracking-tight">eterna.com/</span>
                 <input type="text" defaultValue="eternastudios" className="bg-transparent border-none outline-none font-mono font-bold text-white text-base flex-1" />
               </div>
            </div>
         </div>
         
         <div className="pt-8 border-t border-white/10">
           <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Player Theme (Dark/Light Modes)</label>
           <div className="flex gap-4">
             <div className="w-1/3 h-24 rounded-xl border-2 border-pink-500 bg-black relative overflow-hidden p-3 cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.3)]">
               <div className="w-full h-10 bg-white/10 rounded mt-auto"></div>
               <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-black"/></div>
               <span className="absolute top-3 left-3 text-xs font-bold">Midnight</span>
             </div>
             <div className="w-1/3 h-24 rounded-xl border border-white/10 bg-white relative overflow-hidden p-3 cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
               <div className="w-full h-10 bg-black/10 rounded mt-auto"></div>
               <span className="absolute top-3 left-3 text-xs font-bold text-black">Light Studio</span>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}

function AuditLogsSettings() {
  return (
    <div className="p-8 space-y-6 animate-in fade-in h-full flex flex-col">
      <div className="shrink-0">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><FileText className="text-gray-400" /> Immutable Audit & Activity Logs</h2>
        <p className="text-white/50 text-sm max-w-2xl">A cryptographically verifiable record of all structural platform actions for compliance and legal security.</p>
      </div>
      
      <div className="flex gap-4 shrink-0">
         <select className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium outline-none">
           <option>All Event Types</option>
           <option>Security & Login</option>
           <option>Treasury & Payouts</option>
           <option>Content Publication</option>
         </select>
         <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold flex items-center gap-2 transition-colors ml-auto"><Download className="w-4 h-4"/> Export CSV</button>
      </div>
      
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex-1 flex flex-col min-h-0 shadow-2xl">
         <div className="overflow-y-auto flex-1 hide-scrollbar p-2">
            <div className="space-y-1">
               {[
                 { action: 'Admin uploaded source file: Ubuntu_Rising_ProRes_4444.mov', user: 'Amara Okafor', role: 'Producer', time: '10:14 AM', date: 'June 5, 2026', type: 'content' },
                 { action: 'Authorized payout release to Standard Bank SA ($14,500)', user: 'Lusimadio Simão', role: 'Owner', time: '09:30 AM', date: 'June 5, 2026', type: 'treasury' },
                 { action: 'Updated Licensing Rules: Educational Rights Enabled', user: 'Lusimadio Simão', role: 'Owner', time: 'Yesterday', date: 'June 4, 2026', type: 'settings' },
                 { action: 'New Session Appended: iPhone 14 Pro, Nairobi (41.90.1.42)', user: 'Eterna System', role: 'System', time: '3 Days Ago', date: 'June 2, 2026', type: 'security' },
                 { action: 'Accepted broadcast counter-offer: $35,000 (TV5 Monde, Global Francophone)', user: 'David Chen', role: 'Content Mgr', time: 'May 30, 2026', date: 'May 30, 2026', type: 'legal' }
               ].map((log, i) => (
                 <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 hover:bg-white/5 rounded-xl border border-transparent transition-colors items-start sm:items-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      {log.type === 'content' && <Film className="w-4 h-4 text-purple-400" />}
                      {log.type === 'treasury' && <DollarSign className="w-4 h-4 text-green-400" />}
                      {log.type === 'settings' && <SettingsIcon className="w-4 h-4 text-blue-400" />}
                      {log.type === 'security' && <Shield className="w-4 h-4 text-red-400" />}
                      {log.type === 'legal' && <Globe className="w-4 h-4 text-teal-400" />}
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-medium text-white/90 leading-snug">{log.action}</p>
                       <div className="flex items-center gap-2 mt-1.5 text-xs">
                          <span className="font-bold text-white/70">{log.user}</span>
                          <span className="bg-white/10 px-1.5 py-0.5 rounded uppercase tracking-widest text-[9px] font-bold text-white/40">{log.role}</span>
                       </div>
                    </div>
                    <div className="shrink-0 text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-center border-t border-white/5 sm:border-transparent pt-3 sm:pt-0 mt-3 sm:mt-0">
                       <div className="text-sm font-mono text-white/60">{log.time}</div>
                       <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-0.5">{log.date}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
