import React, { useState, useEffect } from 'react';
import { 
  Building, Users, DollarSign, Shield, Unplug, 
  CheckCircle2, AlertCircle, X, Download, ShieldCheck, Mail, Key, Globe, UploadCloud, Smartphone, Laptop
} from 'lucide-react';

export function WorkflowModal({ title, icon, onClose, children }: { title: string, icon: React.ReactNode, onClose: () => void, children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#111]/90 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">{icon} {title}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 p-2 rounded-full"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// 1. Organization Verification
export function OrgVerificationModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (step > 0 && step < 4) {
      const timer = setTimeout(() => setStep(s => s + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <WorkflowModal title="Organization Verification Center" icon={<Building className="text-eterna-rose" />} onClose={onClose}>
      {step === 0 && (
        <div className="space-y-6">
          <p className="text-sm text-white/70">Upload your legal entities for artificial intelligence validation and compliance review.</p>
          <div className="space-y-4">
            <div className="border border-dashed border-white/20 p-6 rounded-xl text-center hover:border-eterna-rose hover:bg-eterna-rose/5 transition-all cursor-pointer">
              <UploadCloud className="w-8 h-8 text-white/50 mx-auto mb-2" />
              <div className="font-bold text-sm">Upload Registration Documents</div>
              <div className="text-xs text-white/40">PDF, JPG, PNG</div>
            </div>
            <div className="border border-dashed border-white/20 p-6 rounded-xl text-center hover:border-eterna-rose hover:bg-eterna-rose/5 transition-all cursor-pointer">
               <UploadCloud className="w-8 h-8 text-white/50 mx-auto mb-2" />
              <div className="font-bold text-sm">Upload Tax Certificates</div>
            </div>
          </div>
          <button onClick={() => setStep(1)} className="w-full bg-eterna-rose text-white py-3 rounded-xl font-bold">Submit for Verification</button>
        </div>
      )}
      {step > 0 && (
        <div className="py-10 space-y-8">
          <div className="flex items-center gap-4">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500' : 'bg-white/10'}`}><CheckCircle2 className="w-4 h-4 text-white"/></div>
             <div className={step >= 1 ? 'text-white' : 'text-white/50'}>Document Upload Complete</div>
          </div>
          <div className="flex items-center gap-4">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500' : 'bg-white/10'} ${step === 1 ? 'animate-pulse' : ''}`}>{step >= 2 ? <CheckCircle2 className="w-4 h-4 text-white"/> : <Sparkles className="w-4 h-4 text-white/50"/>}</div>
             <div className={step >= 2 ? 'text-white' : 'text-white/50'}>AI Validation & Entity Checking</div>
          </div>
          <div className="flex items-center gap-4">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-yellow-500' : 'bg-white/10'} ${step === 2 ? 'animate-pulse' : ''}`}>{step >= 3 ? <CheckCircle2 className="w-4 h-4 text-white"/> : <Shield className="w-4 h-4 text-white/50"/>}</div>
             <div className={step >= 3 ? 'text-white' : 'text-white/50'}>Compliance Review</div>
          </div>
          {step === 4 && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center mt-8 animate-in fade-in zoom-in">
              <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <div className="font-bold text-green-400 text-lg">Verification Approved</div>
              <p className="text-sm text-green-400/70 mt-1">Your organization is now officially verified in the Eterna ecosystem.</p>
              <button onClick={onClose} className="mt-4 bg-green-500 text-black px-6 py-2 rounded-lg font-bold">Done</button>
            </div>
          )}
        </div>
      )}
    </WorkflowModal>
  );
}

// 2. Organization Save Workflow
export function OrgSaveWorkflow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    const timer3 = setTimeout(() => setStep(3), 2400);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <WorkflowModal title="System Updating" icon={<Building />} onClose={onClose}>
       <div className="py-6 space-y-6">
         <div className="flex items-center gap-4">
           {step >= 0 ? <CheckCircle2 className="w-5 h-5 text-green-400"/> : <div className="w-5 h-5 rounded-full border-2 border-white/20" />}
           <span>Validating Fields</span>
         </div>
         <div className="flex items-center gap-4">
           {step >= 1 ? <CheckCircle2 className="w-5 h-5 text-green-400"/> : <div className="w-5 h-5 rounded-full border-2 border-white/20" />}
           <span>Compliance & Duplicate Check</span>
         </div>
         <div className="flex items-center gap-4">
           {step >= 2 ? <CheckCircle2 className="w-5 h-5 text-green-400"/> : <div className="w-5 h-5 rounded-full border-2 border-white/20" />}
           <span>Generating Immutable Audit Log</span>
         </div>
         {step === 3 && (
           <div className="mt-6 pt-6 border-t border-white/10 text-center">
             <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-lg font-bold mb-4">Organization Ledger Updated</div>
             <button onClick={onClose} className="block w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg">Close</button>
           </div>
         )}
       </div>
    </WorkflowModal>
  );
}

// 3. Team Invite Workflow
export function TeamInviteModal({ onClose }: { onClose: () => void }) {
  const [invited, setInvited] = useState(false);
  return (
    <WorkflowModal title="Invite User" icon={<Users className="text-blue-400" />} onClose={onClose}>
      {!invited ? (
        <div className="space-y-4">
          <div><label className="text-xs font-bold text-white/50 mb-1 block">Email Address</label><input type="email" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none focus:border-blue-500" placeholder="colleague@studio.com" /></div>
          <div><label className="text-xs font-bold text-white/50 mb-1 block">Role</label>
             <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none focus:border-blue-500 appearance-none">
               <option>Administrator</option><option>Content Manager</option><option>Financial Officer</option><option>Editor</option>
             </select>
          </div>
          <div><label className="text-xs font-bold text-white/50 mb-1 block">Custom Permissions (Matrix)</label>
             <div className="grid grid-cols-2 gap-2 mt-2">
               {['Upload Content', 'Publish Assests', 'Manage Revenue', 'Licensing Deals'].map(p => (
                 <label key={p} className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="accent-blue-500" /> {p}</label>
               ))}
             </div>
          </div>
          <button onClick={() => setInvited(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold mt-4 shadow-lg flex items-center justify-center gap-2"><Mail className="w-4 h-4"/> Send Invitation via Eterna</button>
        </div>
      ) : (
        <div className="text-center py-10">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold">Invitation Dispatched</h3>
          <p className="text-white/50 mb-6 mt-2">An audit log has been created and the user will appear as "Pending" until acceptance.</p>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-bold">Done</button>
        </div>
      )}
    </WorkflowModal>
  );
}

// 4. Treasury Wallet Center
export function TreasuryWalletModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState('select');
  return (
    <WorkflowModal title="Treasury Wallet Center" icon={<DollarSign className="text-green-400" />} onClose={onClose}>
      {step === 'select' && (
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setStep('verify')} className="bg-black border border-white/10 p-6 rounded-xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center">
            <Building className="w-8 h-8 mb-2 text-white/70" /><span className="font-bold">Bank Account</span>
          </button>
          <button onClick={() => setStep('verify')} className="bg-black border border-white/10 p-6 rounded-xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center">
            <Globe className="w-8 h-8 mb-2 text-white/70" /><span className="font-bold">Stripe / Wise</span>
          </button>
          <button onClick={() => setStep('verify')} className="bg-black border border-white/10 p-6 rounded-xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center">
            <Smartphone className="w-8 h-8 mb-2 text-white/70" /><span className="font-bold">Mobile Money</span>
          </button>
          <button onClick={() => setStep('verify')} className="bg-black border border-white/10 p-6 rounded-xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center">
            <Key className="w-8 h-8 mb-2 text-white/70" /><span className="font-bold">Crypto Wallet</span>
          </button>
        </div>
      )}
      {step === 'verify' && (
        <div className="space-y-4">
          <p className="text-sm text-white/50">Enter credentials for verification. Eterna will perform a micro-validation transaction to ensure ownership.</p>
          <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3" placeholder="Account Name" />
          <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3" placeholder="Account / IBAN Number" />
          <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3" placeholder="SWIFT / Routing" />
          <button onClick={() => setStep('done')} className="w-full bg-green-500 text-black py-3 rounded-xl font-bold">Initiate Micro-Validation</button>
        </div>
      )}
      {step === 'done' && (
        <div className="text-center py-10">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold">Under Verification</h3>
          <p className="text-white/50 mb-6 mt-2">A small deposit has been sent. Enter the code once received to activate this wallet.</p>
          <button onClick={onClose} className="bg-white/10 px-6 py-2 rounded-lg font-bold">Close Manager</button>
        </div>
      )}
    </WorkflowModal>
  );
}

// 5. Revenue Distribution Engine
export function RevenueDistributionModal({ onClose }: { onClose: () => void }) {
  return (
    <WorkflowModal title="Revenue Distribution Engine" icon={<DollarSign className="text-green-400" />} onClose={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-white/50">Dynamic rule engine. Revenue received will be automatically split and pushed to designated ledgers/wallets.</p>
        <div className="space-y-3">
          <div className="flex gap-2 items-center"><input type="text" className="bg-black border border-white/10 rounded-lg p-2 w-full text-sm" defaultValue="Studio Treasury" /><input type="number" className="bg-black border border-white/10 rounded-lg p-2 w-24 text-sm text-center font-mono" defaultValue="40" />%</div>
          <div className="flex gap-2 items-center"><input type="text" className="bg-black border border-white/10 rounded-lg p-2 w-full text-sm" defaultValue="Creator / Producer Pool" /><input type="number" className="bg-black border border-white/10 rounded-lg p-2 w-24 text-sm text-center font-mono" defaultValue="40" />%</div>
          <div className="flex gap-2 items-center"><input type="text" className="bg-black border border-white/10 rounded-lg p-2 w-full text-sm" defaultValue="Marketing & Legal Fund" /><input type="number" className="bg-black border border-white/10 rounded-lg p-2 w-24 text-sm text-center font-mono" defaultValue="20" />%</div>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10">+ Add Allocation Node</button>
        <div className="pt-4 border-t border-white/10 mt-4">
           <button onClick={onClose} className="w-full bg-green-500 text-black py-3 rounded-xl font-bold">Save Automation Rules</button>
        </div>
      </div>
    </WorkflowModal>
  );
}

// 6. Security Response Center
export function SecurityResponseModal({ onClose }: { onClose: () => void }) {
  return (
    <WorkflowModal title="Security Response Center" icon={<Shield className="text-red-500" />} onClose={onClose}>
      <div className="space-y-4">
         <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
            <h3 className="text-red-400 font-bold mb-1">Target: iPhone 14 Pro (Nairobi)</h3>
            <p className="text-sm text-red-400/70">Revoking access will immediately kill all active JWT sessions on this device and blacklist the refresh token.</p>
         </div>
         <div className="space-y-2">
            <button onClick={onClose} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl border border-red-500/50">FORCE LOGOUT & REVOKE</button>
            <button onClick={onClose} className="w-full bg-black border border-white/10 hover:bg-white/5 text-white font-bold py-3 rounded-xl">Cancel</button>
         </div>
      </div>
    </WorkflowModal>
  );
}

// 7. Integration Auth Modal
export function IntegrationAuthModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <WorkflowModal title="Integration Security Console" icon={<Unplug className="text-orange-400" />} onClose={onClose}>
      {step === 0 && (
         <div className="space-y-4 text-center">
            <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20"><Globe className="w-8 h-8 text-orange-400"/></div>
            <h3 className="font-bold text-lg">Connect to Third-Party App</h3>
            <p className="text-sm text-white/50 mb-6">Authorize Eterna OS to connect via OAuth 2.0. This will redirect you to the provider.</p>
            <button onClick={() => setStep(1)} className="w-full bg-orange-500 text-black py-3 rounded-xl font-bold">Initiate OAuth Handshake</button>
         </div>
      )}
      {step === 1 && (
         <div className="py-10 text-center animate-pulse">
            <Laptop className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <p className="font-bold">Awaiting provider token...</p>
         </div>
      )}
      {step === 2 && (
         <div className="py-8 text-center text-green-400">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Connection Established</h3>
            <p className="text-sm text-green-400/50 mb-6">Security tokens acquired and encrypted successfully.</p>
            <button onClick={onClose} className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold">Close Console</button>
         </div>
      )}
    </WorkflowModal>
  );
}

// 8. Brand Identity Center Modal
export function BrandIdentityModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step > 0 && step < 4) {
      const t = setTimeout(() => setStep(s => s + 1), 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <WorkflowModal title="Brand Identity Center" icon={<Building className="text-pink-400" />} onClose={onClose}>
       {step === 0 && (
         <div className="space-y-6">
           <div className="border-2 border-dashed border-white/20 p-10 rounded-2xl flex flex-col items-center justify-center hover:border-pink-500 transition-colors cursor-pointer text-center group">
             <UploadCloud className="w-10 h-10 text-white/50 mb-3 group-hover:text-pink-400 transition-colors" />
             <div className="font-bold mb-1">Drag high-res logo here</div>
             <p className="text-xs text-white/50">PNG, SVG (Min 512x512px)</p>
           </div>
           <button onClick={() => setStep(1)} className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-xl font-bold transition-all">Simulate Upload</button>
         </div>
       )}
       {step > 0 && (
        <div className="py-6 space-y-8">
          <div className="flex items-center gap-4">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500' : 'bg-white/10'}`}><CheckCircle2 className="w-4 h-4 text-white"/></div>
             <div className={step >= 1 ? 'text-white font-bold' : 'text-white/50'}>Validating Resolution & Format</div>
          </div>
          <div className="flex items-center gap-4">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500' : 'bg-white/10'} ${step === 1 ? 'animate-pulse' : ''}`}>{step >= 2 ? <CheckCircle2 className="w-4 h-4 text-white"/> : <Sparkles className="w-4 h-4 text-white/50"/>}</div>
             <div className={step >= 2 ? 'text-white font-bold' : 'text-white/50'}>AI Brand Quality Check & Padding</div>
          </div>
          <div className="flex items-center gap-4">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-pink-500' : 'bg-white/10'} ${step === 2 ? 'animate-pulse' : ''}`}>{step >= 3 ? <CheckCircle2 className="w-4 h-4 text-white"/> : <Globe className="w-4 h-4 text-white/50"/>}</div>
             <div className={step >= 3 ? 'text-white font-bold' : 'text-white/50'}>Generating Omni-Channel Variants</div>
          </div>
          {step === 4 && (
            <div className="bg-pink-500/10 border border-pink-500/20 p-4 rounded-xl text-center mt-8 animate-in fade-in zoom-in">
              <CheckCircle2 className="w-12 h-12 text-pink-400 mx-auto mb-2" />
              <div className="font-bold text-pink-400 text-lg">Identity Published</div>
              <p className="text-sm text-pink-400/70 mt-1">Logo variants have been distributed to Web, Mobile, TV, and Social endpoints.</p>
              <button onClick={onClose} className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-500">Done</button>
            </div>
          )}
        </div>
      )}
    </WorkflowModal>
  );
}

// 9. Theme Studio Modal
export function ThemeStudioModal({ onClose }: { onClose: () => void }) {
  return (
    <WorkflowModal title="Theme Studio" icon={<Palette className="text-pink-400" />} onClose={onClose}>
      <div className="space-y-6">
         <p className="text-sm text-white/50">Apply a comprehensive design language across the player engine and public profiles.</p>
         <div className="grid grid-cols-2 gap-4">
            <div className="border border-pink-500 bg-pink-500/10 p-4 rounded-xl text-center relative shadow-[0_0_15px_rgba(236,72,153,0.3)]">
               <div className="absolute top-2 right-2 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-black" /></div>
               <div className="w-full h-20 bg-black rounded-lg mb-3 border border-white/20"></div>
               <div className="font-bold text-sm">Midnight</div>
               <div className="text-[10px] text-white/50 mt-1 uppercase tracking-widest">Active</div>
            </div>
            <div className="border border-white/10 bg-[#111] hover:bg-white/5 p-4 rounded-xl text-center transition-colors cursor-pointer">
               <div className="w-full h-20 bg-white rounded-lg mb-3 shadow-inner"></div>
               <div className="font-bold text-sm">Light Studio</div>
            </div>
            <div className="border border-white/10 bg-[#111] hover:bg-yellow-500/10 p-4 rounded-xl text-center transition-colors cursor-pointer">
               <div className="w-full h-20 bg-gradient-to-br from-black to-yellow-900/50 rounded-lg mb-3 border border-yellow-500/20"></div>
               <div className="font-bold text-sm">Creator Gold</div>
            </div>
            <div className="border border-white/10 bg-[#111] hover:bg-blue-500/10 p-4 rounded-xl text-center transition-colors cursor-pointer">
               <div className="w-full h-20 bg-gradient-to-br from-slate-900 to-blue-900/50 rounded-lg mb-3 border border-blue-500/20"></div>
               <div className="font-bold text-sm">Aurora Blue</div>
            </div>
         </div>
         <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl mt-4">Save Theme Configuration</button>
      </div>
    </WorkflowModal>
  );
}

// 10. Data Export Modal
export function DataExportModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 2500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <WorkflowModal title="Data Export Center" icon={<Download className="text-gray-400" />} onClose={onClose}>
      {step === 0 && (
         <div className="space-y-6">
            <div>
               <label className="text-xs font-bold text-white/50 block mb-2">Export Payload</label>
               <select className="w-full bg-black border border-white/10 rounded-xl p-3 text-white appearance-none">
                 <option>Audit & Activity Logs</option>
                 <option>Treasury & Revenue Data</option>
                 <option>Team & Access Roster</option>
                 <option>Content Metadata Dump</option>
               </select>
            </div>
            <div>
               <label className="text-xs font-bold text-white/50 block mb-2">Output Format</label>
               <div className="flex gap-2">
                 {['CSV File', 'XLSX (Excel)', 'Encrypted PDF'].map(f => (
                    <label key={f} className="flex-1 text-center bg-black border border-white/10 hover:border-gray-500 rounded-lg py-2 cursor-pointer transition-colors relative">
                       <input type="radio" name="format" className="absolute opacity-0" defaultChecked={f === 'CSV File'} />
                       <span className="text-sm font-bold">{f}</span>
                    </label>
                 ))}
               </div>
            </div>
            <button onClick={() => setStep(1)} className="w-full bg-white text-black py-3 rounded-xl font-bold mt-2">Generate Export Package</button>
         </div>
      )}
      {step === 1 && (
         <div className="py-10 text-center animate-pulse">
            <Activity className="w-12 h-12 text-white/50 mx-auto mb-4" />
            <p className="font-bold">Compiling thousands of records...</p>
         </div>
      )}
      {step === 2 && (
         <div className="py-8 text-center text-green-400">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Export Ready</h3>
            <p className="text-sm text-green-400/50 mb-6">Your data package has been generated and your download will begin shortly.</p>
            <button onClick={onClose} className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold">Done</button>
         </div>
      )}
    </WorkflowModal>
  );
}
