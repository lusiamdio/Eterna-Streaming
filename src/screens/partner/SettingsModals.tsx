import React, { useState, useEffect } from 'react';
import { 
  Building, Users, DollarSign, Shield, Unplug, 
  CheckCircle2, AlertCircle, X, Download, ShieldCheck, Mail, Key, Globe, UploadCloud, Smartphone, Laptop,
  Sparkles, FileText, Palette, Activity, Bell, Settings as SettingsIcon, Plus
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
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (submitting && step > 0 && step < 5) {
      const timer = setTimeout(() => setStep(s => s + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [step, submitting]);

  const handleStart = () => {
    setSubmitting(true);
    setStep(1);
  };

  return (
    <WorkflowModal title="Organization Verification Center" icon={<Building className="text-eterna-rose" />} onClose={onClose}>
      {step === 0 && (
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 text-sm">
             <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
             <p className="text-blue-400/90 leading-relaxed">To unlock automated global distribution and institutional licensing tools, you must provide official KYC and corporate governance documents for AI and manual review.</p>
          </div>
          
          <div className="space-y-4">
            <div className="border border-dashed border-white/20 p-6 rounded-xl text-center hover:border-eterna-rose/50 hover:bg-eterna-rose/5 transition-all cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-white/30 mx-auto mb-2 group-hover:text-eterna-rose transition-colors" />
              <div className="font-bold text-sm">Corporate Registry Extract</div>
              <div className="text-xs text-white/40 mt-1">Articles of Incorporation (PDF, JPG, PNG)</div>
            </div>
            <div className="border border-dashed border-white/20 p-6 rounded-xl text-center hover:border-eterna-rose/50 hover:bg-eterna-rose/5 transition-all cursor-pointer group">
               <ShieldCheck className="w-8 h-8 text-white/30 mx-auto mb-2 group-hover:text-eterna-rose transition-colors" />
              <div className="font-bold text-sm">Tax Identification Certificate</div>
              <div className="text-xs text-white/40 mt-1">VAT / GST / EIN Record</div>
            </div>
            <div className="border border-dashed border-white/20 p-6 rounded-xl text-center hover:border-eterna-rose/50 hover:bg-eterna-rose/5 transition-all cursor-pointer group">
               <Building className="w-8 h-8 text-white/30 mx-auto mb-2 group-hover:text-eterna-rose transition-colors" />
              <div className="font-bold text-sm">Bank Letter of Good Standing</div>
              <div className="text-xs text-white/40 mt-1">Must be issued within the last 90 days</div>
            </div>
          </div>
          <button onClick={handleStart} className="w-full bg-white text-black hover:bg-gray-200 py-3.5 rounded-xl font-bold transition-all shadow-lg">Upload Files & Initiate Verification</button>
        </div>
      )}
      {step > 0 && (
        <div className="py-8 space-y-8">
          <div className="flex items-center gap-4">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${step >= 1 ? 'bg-green-500' : 'bg-white/5 border border-white/10'}`}>{step >= 1 ? <CheckCircle2 className="w-5 h-5 text-black"/> : <div className="w-2 h-2 rounded-full bg-white/20" />}</div>
             <div>
               <div className={`font-bold text-lg ${step >= 1 ? 'text-white' : 'text-white/40'}`}>Ingesting Documents</div>
               <div className="text-sm text-white/50">Parsing PDF data into the registry.</div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${step >= 2 ? 'bg-blue-500' : 'bg-white/5 border border-white/10'} ${step === 1 ? 'animate-pulse bg-blue-500/20 border-blue-500/50 text-blue-400' : ''}`}>
               {step >= 2 ? <CheckCircle2 className="w-5 h-5 text-white"/> : <Sparkles className={`w-5 h-5 ${step === 1 ? 'text-blue-400' : 'text-white/20'}`}/>}
             </div>
             <div>
               <div className={`font-bold text-lg ${step >= 2 ? 'text-white' : step === 1 ? 'text-blue-400' : 'text-white/40'}`}>AI Fraud Analysis & Layout Check</div>
               <div className="text-sm text-white/50">Cross-referencing global sanction databases.</div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${step >= 3 ? 'bg-yellow-500' : 'bg-white/5 border border-white/10'} ${step === 2 ? 'animate-pulse bg-yellow-500/20 border-yellow-500/50 text-yellow-400' : ''}`}>
               {step >= 3 ? <CheckCircle2 className="w-5 h-5 text-black"/> : <Shield className={`w-5 h-5 ${step === 2 ? 'text-yellow-400' : 'text-white/20'}`}/>}
             </div>
             <div>
               <div className={`font-bold text-lg ${step >= 3 ? 'text-white' : step === 2 ? 'text-yellow-400' : 'text-white/40'}`}>Compliance Risk Scoring</div>
               <div className="text-sm text-white/50">Evaluating jurisdictional requirements.</div>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${step >= 4 ? 'bg-green-500' : 'bg-white/5 border border-white/10'} ${step === 3 ? 'animate-pulse bg-white/20 border-white/50 text-white' : ''}`}>
               {step >= 4 ? <CheckCircle2 className="w-5 h-5 text-black"/> : <FileText className={`w-5 h-5 ${step === 3 ? 'text-white' : 'text-white/20'}`}/>}
             </div>
             <div>
               <div className={`font-bold text-lg ${step > 3 ? 'text-white' : step === 3 ? 'text-white' : 'text-white/40'}`}>Audit Ledger Finalization</div>
               <div className="text-sm text-white/50">Writing to cryptographically secure log.</div>
             </div>
          </div>
          {step === 5 && (
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-center mt-8 animate-in fade-in zoom-in shadow-[0_0_30px_rgba(34,197,94,0.1)]">
              <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
              <div className="font-bold text-green-400 text-2xl mb-1">Organization Verified</div>
              <p className="text-sm text-green-400/70 max-w-sm mx-auto leading-relaxed">Your corporate entity has passed all critical AI and compliance checks. Institutional tools are now unlocked.</p>
              <button onClick={onClose} className="mt-6 w-full sm:w-auto bg-green-500 hover:bg-green-400 transition-colors text-black px-10 py-3 rounded-xl font-bold shadow-lg">Enter Dashboard</button>
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
  const [method, setMethod] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleSelect = (m: string) => {
    setMethod(m);
    setStep('verify');
  };

  const handleInitiate = () => {
    setVerifying(true);
    setTimeout(() => {
      setStep('done');
      setVerifying(false);
    }, 2000);
  };

  return (
    <WorkflowModal title="Treasury Wallet Center" icon={<DollarSign className="text-green-400" />} onClose={onClose}>
      {step === 'select' && (
        <div className="space-y-6">
          <p className="text-sm text-white/50">Select a payout destination. External ledgers require micro-validation for security.</p>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => handleSelect('Bank Account')} className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center group shadow-lg">
              <Building className="w-10 h-10 mb-3 text-white/30 group-hover:text-green-400 transition-colors" /><span className="font-bold">Bank Account</span>
            </button>
            <button onClick={() => handleSelect('Stripe / PayPal')} className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center group shadow-lg">
              <Globe className="w-10 h-10 mb-3 text-white/30 group-hover:text-green-400 transition-colors" /><span className="font-bold">Stripe / PayPal</span>
            </button>
            <button onClick={() => handleSelect('Mobile Money')} className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center group shadow-lg">
              <Smartphone className="w-10 h-10 mb-3 text-white/30 group-hover:text-green-400 transition-colors" /><span className="font-bold">Mobile Money</span>
            </button>
            <button onClick={() => handleSelect('Crypto Web3')} className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-green-400 hover:bg-green-400/5 transition-all flex flex-col items-center group shadow-lg">
              <Key className="w-10 h-10 mb-3 text-white/30 group-hover:text-green-400 transition-colors" /><span className="font-bold">Crypto Web3</span>
            </button>
          </div>
        </div>
      )}
      {step === 'verify' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
             <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5 text-green-400" /></div>
             <div>
               <div className="font-bold text-sm">Security Micro-Validation</div>
               <div className="text-xs text-white/50 leading-relaxed">We will deposit a random amount under $1.00 to verify ownership. Depending on your bank, this may take 1-3 days.</div>
             </div>
          </div>
          <div className="space-y-4">
            <div>
               <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5 block">Account Name</label>
               <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-green-400 outline-none" placeholder="Eterna Studios LLC" />
            </div>
            <div>
               <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5 block">{method === 'Crypto Web3' ? 'Wallet Address' : method === 'Bank Account' ? 'IBAN / Routing Number' : 'Account Email / ID'}</label>
               <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:border-green-400 outline-none font-mono" placeholder="..." />
            </div>
          </div>
          <button onClick={handleInitiate} disabled={verifying} className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2">
            {verifying ? <AlertCircle className="w-5 h-5 animate-spin" /> : <DollarSign className="w-5 h-5" />}
            {verifying ? 'Initiating Ledger Sequence...' : 'Initiate Micro-Deposit'}
          </button>
        </div>
      )}
      {step === 'done' && (
        <div className="py-8 animate-in fade-in zoom-in">
          <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl text-center shadow-[0_0_30px_rgba(34,197,94,0.1)] mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
            <h3 className="text-2xl font-bold text-green-400 mb-2">Deposit Sent</h3>
            <p className="text-sm text-green-400/80 mb-6 max-w-sm mx-auto leading-relaxed">A micro-deposit has been authorized. Check your {method} statement in 1-3 business days and enter the exact amount here to unlock payouts.</p>
            
            <div className="bg-black/50 border border-white/10 rounded-xl p-6">
               <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 block">Enter Verification Amount</label>
               <div className="flex gap-4">
                 <div className="relative flex-1">
                   <DollarSign className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                   <input type="text" className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white font-mono placeholder:text-white/20 outline-none focus:border-green-400 text-lg" placeholder="0.00" />
                 </div>
                 <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-colors shrink-0">Verify</button>
               </div>
            </div>
          </div>
          <button onClick={onClose} className="w-full text-center text-sm text-white/50 hover:text-white font-bold transition-colors">Close Manager for Now</button>
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
  const [activeTheme, setActiveTheme] = useState('midnight');
  const [primaryColor, setPrimaryColor] = useState('#EC4899');
  const [fontFamily, setFontFamily] = useState('Inter');

  return (
    <WorkflowModal title="Theme Studio" icon={<Palette className="text-pink-400" />} onClose={onClose}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 space-y-6">
           <div className="space-y-3">
             <label className="text-xs font-bold text-white/50 uppercase tracking-wider block">Palette Presets</label>
             <div className="grid grid-cols-2 gap-3">
               <button onClick={() => setActiveTheme('midnight')} className={`border ${activeTheme === 'midnight' ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 bg-black hover:border-white/30'} p-3 rounded-xl flex flex-col justify-between transition-colors text-left h-20`}>
                 <span className="font-bold text-sm">Midnight</span>
                 <div className="flex gap-1 mt-auto"><div className="w-3 h-3 rounded-full bg-pink-500"/><div className="w-3 h-3 rounded-full bg-black border border-white/20"/></div>
               </button>
               <button onClick={() => setActiveTheme('light')} className={`border ${activeTheme === 'light' ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 bg-black hover:border-white/30'} p-3 rounded-xl flex flex-col justify-between transition-colors text-left h-20`}>
                 <span className="font-bold text-sm">Light Studio</span>
                 <div className="flex gap-1 mt-auto"><div className="w-3 h-3 rounded-full bg-gray-900"/><div className="w-3 h-3 rounded-full bg-white border border-gray-200"/></div>
               </button>
               <button onClick={() => setActiveTheme('gold')} className={`border ${activeTheme === 'gold' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-black hover:border-white/30'} p-3 rounded-xl flex flex-col justify-between transition-colors text-left h-20`}>
                 <span className="font-bold text-sm">Creator Gold</span>
                 <div className="flex gap-1 mt-auto"><div className="w-3 h-3 rounded-full bg-yellow-500"/><div className="w-3 h-3 rounded-full bg-amber-900 border border-yellow-500/20"/></div>
               </button>
               <button onClick={() => setActiveTheme('aurora')} className={`border ${activeTheme === 'aurora' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-black hover:border-white/30'} p-3 rounded-xl flex flex-col justify-between transition-colors text-left h-20`}>
                 <span className="font-bold text-sm">Aurora Blue</span>
                 <div className="flex gap-1 mt-auto"><div className="w-3 h-3 rounded-full bg-blue-500"/><div className="w-3 h-3 rounded-full bg-slate-900 border border-blue-500/20"/></div>
               </button>
             </div>
           </div>
           
           <div className="space-y-4 pt-4 border-t border-white/10">
             <label className="text-xs font-bold text-white/50 uppercase tracking-wider block">Interface Variables</label>
             <div>
               <label className="text-[10px] uppercase font-bold text-white/40 block mb-2">Primary Brand Accent</label>
               <div className="flex items-center gap-3 bg-black border border-white/10 p-2 rounded-xl">
                 <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                 <span className="font-mono text-sm text-white/80">{primaryColor.toUpperCase()}</span>
               </div>
             </div>
             <div>
               <label className="text-[10px] uppercase font-bold text-white/40 block mb-2">Typography System</label>
               <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-white/30 appearance-none">
                 <option value="Inter">Inter (Default, Clean)</option>
                 <option value="Space Grotesk">Space Grotesk (Tech, Display)</option>
                 <option value="Playfair Display">Playfair Display (Editorial)</option>
                 <option value="JetBrains Mono">JetBrains Mono (Developer)</option>
               </select>
             </div>
           </div>
        </div>
        
        {/* Live Preview Area */}
        <div className="w-full md:w-1/2 bg-[#050505] border border-white/10 rounded-2xl p-6 relative overflow-hidden" style={{ fontFamily: fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily }}>
           <div className="text-[10px] font-bold text-white/30 mb-6 uppercase tracking-widest flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Live Sandbox
           </div>
           
           <div className={`space-y-6 ${activeTheme === 'light' ? 'bg-white text-black p-4 -m-4 rounded-xl' : ''}`}>
              <div className="flex justify-between items-center">
                 <div className="font-bold text-xl tracking-tight">Discover</div>
                 <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/10" style={{ backgroundColor: activeTheme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}><CheckCircle2 className="w-4 h-4" /></div>
              </div>
              <p className={`text-sm ${activeTheme === 'light' ? 'text-gray-500' : 'text-white/50'} leading-relaxed`}>
                This is a real-time preview of how your typography and color selections will render to the end user across the platform.
              </p>
              
              <button className="w-full py-3 rounded-xl text-white font-bold transition-all shadow-lg" style={{ backgroundColor: primaryColor }}>
                Primary Action
              </button>
              
              <div className="flex gap-3">
                 <div className={`h-24 flex-1 rounded-xl border p-4 flex flex-col justify-between ${activeTheme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-white/5'}`}>
                   <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: primaryColor, opacity: 0.2 }}></div>
                   <div className={`w-full h-2 rounded-full ${activeTheme === 'light' ? 'bg-gray-200' : 'bg-white/20'}`}></div>
                 </div>
                 <div className={`h-24 flex-1 rounded-xl border p-4 flex flex-col justify-between ${activeTheme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-white/5'}`}>
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: primaryColor, opacity: 0.2 }}></div>
                   <div className={`w-3/4 h-2 rounded-full ${activeTheme === 'light' ? 'bg-gray-200' : 'bg-white/20'}`}></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
         <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-white hover:bg-white/5 rounded-xl transition-colors border border-transparent">Cancel</button>
         <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold bg-white hover:bg-gray-200 text-black rounded-xl transition-colors shadow-lg">Deploy Theme</button>
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

// 11. Notification Builder Modal
export function NotificationRuleModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => {
        setStep(2);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <WorkflowModal title="Workflow Automation Builder" icon={<Bell className="text-yellow-400" />} onClose={onClose}>
      {step === 0 && (
         <div className="space-y-6">
           <div className="space-y-4">
             <div>
               <label className="text-xs font-bold text-white/50 block mb-2">IF Event Trigger</label>
               <select className="w-full bg-black border border-white/10 rounded-xl p-3 text-white appearance-none">
                 <option>Revenue.Transaction &gt;= $10,000</option>
                 <option>System.Security.MfaFailedAttempts &gt;= 5</option>
                 <option>Content.Asset.UploadCompleted</option>
                 <option>User.Subscription.Canceled</option>
               </select>
             </div>
             <div>
               <label className="text-xs font-bold text-white/50 block mb-2">THEN Perform Action(s)</label>
               <div className="space-y-2">
                 <label className="flex items-center gap-3 p-3 bg-black border border-white/10 rounded-xl cursor-pointer">
                   <input type="checkbox" defaultChecked className="accent-yellow-500" />
                   <span className="text-sm">Send Email Alert</span>
                 </label>
                 <label className="flex items-center gap-3 p-3 bg-black border border-white/10 rounded-xl cursor-pointer">
                   <input type="checkbox" className="accent-yellow-500" />
                   <span className="text-sm">Send SMS Text</span>
                 </label>
                 <label className="flex items-center gap-3 p-3 bg-black border border-white/10 rounded-xl cursor-pointer">
                   <input type="checkbox" defaultChecked className="accent-yellow-500" />
                   <span className="text-sm">In-App Notification</span>
                 </label>
               </div>
             </div>
             <div>
               <label className="text-xs font-bold text-white/50 block mb-2">Target Audience Group</label>
               <select className="w-full bg-black border border-white/10 rounded-xl p-3 text-white appearance-none">
                 <option>All Administrators</option>
                 <option>Treasury & Finance Team</option>
                 <option>Security Team Leads</option>
                 <option>Specific User Emails</option>
               </select>
             </div>
           </div>
           <button onClick={() => setStep(1)} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold mt-2 shadow-[0_0_15px_rgba(234,179,8,0.3)]">Save & Activate Rule</button>
         </div>
      )}
      {step === 1 && (
         <div className="py-10 text-center animate-pulse">
            <SettingsIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
            <p className="font-bold">Compiling automation rule...</p>
         </div>
      )}
      {step === 2 && (
         <div className="py-8 text-center text-green-400">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Rule Activated</h3>
            <p className="text-sm text-green-400/50 mb-6">The system will now monitor events globally to trigger this workflow.</p>
            <button onClick={onClose} className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors">Done</button>
         </div>
      )}
    </WorkflowModal>
  );
}

// 12. Generic Redirect Modal
export function GenericRedirectModal({ target, onClose }: { target: string, onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <WorkflowModal title={`Opening ${target}`} icon={<Globe className="text-blue-400" />} onClose={onClose}>
      {step === 0 && (
         <div className="py-10 text-center animate-pulse">
            <Activity className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Establishing Secure Connection</h3>
            <p className="text-sm text-white/50">Routing to the {target} module via Zero-Trust Proxy...</p>
         </div>
      )}
      {step === 1 && (
         <div className="py-8 text-center text-green-400">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Connected successfully</h3>
            <p className="text-sm text-green-400/50 mb-6">In a live environment, you would now be redirected to the dedicated {target} interface.</p>
            <button onClick={onClose} className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors">Return to Settings</button>
         </div>
      )}
    </WorkflowModal>
  );
}

