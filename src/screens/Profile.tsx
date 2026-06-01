import { useState } from "react";
import { Edit3, Crown, Globe, Play, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";

export function ProfileScreen() {
  const { user, myList, downloads, signOut, showToast } = useAppStore();
  const [modalObj, setModalObj] = useState<{title:string, desc:string, dangerLabel?:string, action?:()=>void} | null>(null);
  const [subsOn, setSubsOn] = useState(true);

  if (!user) return null;

  const dlCount = downloads.filter(d => d.prog >= 100).length;
  
  const profiles = [
    { init: user.initials, name: user.name, bg: 'var(--color-eterna-violet)', active: true },
    { init: '👶', name: 'Kids', bg: 'linear-gradient(135deg,#0f6e56,#1ac8a0)', active: false },
    { init: 'J', name: 'Jamie', bg: 'linear-gradient(135deg,#ba7517,#e8b84b)', active: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg pb-[50px]">
      <TopNav showBack title="Profile" showProfile={false} customRight={
        <button className="flex items-center justify-center w-[34px] h-[34px] rounded-[7px] text-eterna-muted hover:text-eterna-text hover:bg-white/5 transition-all" onClick={() => showToast('Edit profile options coming soon')}>
          <Edit3 className="w-[18px] h-[18px]" />
        </button>
      } />
      
      <div className="flex-1 overflow-y-auto px-[20px]">
        {/* Header */}
        <div className="text-center py-[28px] pb-[16px]">
          <div className="w-[76px] h-[76px] rounded-full bg-grad flex items-center justify-center text-[28px] font-bold mx-auto mb-[10px]">
            {user.initials}
          </div>
          <div className="font-serif text-[24px]">{user.name}</div>
          <div className="text-[12px] text-eterna-muted mt-[3px]">{user.email}</div>
          <div className="inline-block mt-[8px] mx-auto px-[14px] py-[3px] bg-eterna-gold/10 border border-eterna-gold/30 rounded-[18px] text-[11px] text-eterna-gold font-semibold tracking-[0.5px]">
            ⭐ {user.plan.toUpperCase()}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-[9px] my-[16px]">
          <div className="bg-eterna-card border border-eterna-border rounded-[9px] p-[12px] text-center">
            <div className="text-[18px] font-semibold">312</div>
            <div className="text-[10px] text-eterna-muted mt-[1px]">Hours</div>
          </div>
          <div className="bg-eterna-card border border-eterna-border rounded-[9px] p-[12px] text-center">
            <div className="text-[18px] font-semibold text-eterna-rose">{myList.length + 48}</div>
            <div className="text-[10px] text-eterna-muted mt-[1px]">My List</div>
          </div>
          <div className="bg-eterna-card border border-eterna-border rounded-[9px] p-[12px] text-center">
            <div className="text-[18px] font-semibold text-eterna-teal">{dlCount}</div>
            <div className="text-[10px] text-eterna-muted mt-[1px]">Downloads</div>
          </div>
        </div>

        {/* Additional Profiles */}
        <div className="text-[10px] tracking-[2px] uppercase text-eterna-muted mb-[10px]">Profiles</div>
        <div className="flex gap-[12px] overflow-x-auto pb-[4px] mb-[16px] hide-scrollbar">
          {profiles.map(p => (
            <div key={p.name} className="shrink-0 text-center cursor-pointer" onClick={() => showToast('Switched to '+p.name)}>
              <div 
                className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-[18px] font-semibold mx-auto mb-[5px] ${p.active ? 'border-2 border-eterna-rose' : ''}`}
                style={{ background: p.bg }}
              >
                {p.init}
              </div>
              <div className="text-[11px]">{p.name}</div>
            </div>
          ))}
          <div className="shrink-0 text-center cursor-pointer" onClick={() => showToast('Add new profile…')}>
            <div className="w-[48px] h-[48px] rounded-[24px] bg-eterna-card border-2 border-dashed border-white/15 flex items-center justify-center text-eterna-hint text-[20px] mx-auto mb-[5px]">
              +
            </div>
            <div className="text-[11px] text-eterna-muted">Add</div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-[1px]">
          <MenuItem 
            icon={<Crown className="w-[18px] h-[18px]" />} 
            title="Subscription" sub="Premium · Renews Jun 30" 
            onClick={() => setModalObj({ title:'Subscription', desc: `Plan: ${user.plan}\nStatus: Active\nRenews: Jun 30, 2026\nMonthly: $18.00`, dangerLabel: undefined, action: () => { setModalObj(null); showToast('Opening portal...'); }})}
          />
          <MenuItem 
            icon={<Globe className="w-[18px] h-[18px]" />} 
            title="Language & Region" sub="English · United States" 
            onClick={() => {
              setModalObj({ title: 'Language', desc: 'English is set as default.', action: () => { setModalObj(null); showToast('Language changed'); }});
            }}
          />
          <MenuItem 
            icon={<Play className="w-[18px] h-[18px]" />} 
            title="Playback Settings" sub="4K HDR · Auto-play On" 
            onClick={() => setModalObj({ title: 'Playback Settings', desc: `Stream quality: 4K HDR\nAuto-play: On\nDownload quality: HD\nData saver: Off`, action: () => { setModalObj(null); showToast('Autoplay toggled'); }})}
          />
          
          <div className="flex items-center gap-[11px] p-[12px_14px] rounded-[9px] cursor-pointer hover:bg-eterna-card transition-colors" onClick={() => { setSubsOn(!subsOn); showToast(`Notifications: ${!subsOn?'On':'Off'}`); }}>
            <div className="w-[34px] h-[34px] rounded-[7px] bg-eterna-card flex items-center justify-center text-eterna-muted shrink-0">
              <Bell className="w-[18px] h-[18px]" />
            </div>
            <div className="flex-1">
              <div className="text-[13px]">Notifications</div>
              <div className="text-[11px] text-eterna-muted mt-[1px]">New releases, updates</div>
            </div>
            <div className={`w-[38px] h-[21px] rounded-[11px] relative transition-colors ${subsOn ? 'bg-eterna-rose' : 'bg-white/15'}`}>
              <div className={`w-[17px] h-[17px] rounded-full bg-white absolute top-[2px] transition-all ${subsOn ? 'left-[19px]' : 'left-[2px]'}`} />
            </div>
          </div>

          <MenuItem 
            icon={<Shield className="w-[18px] h-[18px]" />} 
            title="Parental Controls" sub="PIN enabled · 12+ limit" 
            onClick={() => showToast("Enter current PIN…")}
          />
          <MenuItem 
            icon={<HelpCircle className="w-[18px] h-[18px]" />} 
            title="Help & Support" sub="FAQs, contact us" 
            onClick={() => showToast("Opening support chat…")}
          />
          <MenuItem 
            icon={<LogOut className="w-[18px] h-[18px]" />} 
            title="Sign Out" danger
            onClick={() => setModalObj({ title: 'Sign Out', desc: 'Sign out of your Eterna account?', dangerLabel: 'Sign Out', action: signOut })}
          />
        </div>
      </div>

      <BottomNav />

      {/* Modal */}
      {modalObj && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center min-h-[400px]" onClick={() => setModalObj(null)}>
          <div className="bg-eterna-surface border border-eterna-border rounded-[14px] p-[28px] max-w-[340px] w-full m-[16px]" onClick={e => e.stopPropagation()}>
            <div className="font-serif text-[20px] mb-[8px]">{modalObj.title}</div>
            <div className="text-[13px] text-eterna-muted whitespace-pre-line leading-[1.6] mb-[20px]">{modalObj.desc}</div>
            <div className="flex gap-[8px]">
               <button className="flex-1 border border-white/20 text-eterna-text py-[8px] rounded-[8px] text-[13px] hover:bg-white/5" onClick={() => setModalObj(null)}>Cancel</button>
               {modalObj.action && modalObj.title !== 'Language' && (
                 <button className={`flex-1 py-[8px] rounded-[8px] text-[13px] ${modalObj.dangerLabel ? 'bg-eterna-red text-white hover:bg-eterna-red/80' : 'bg-grad text-white hover:opacity-85'}`} onClick={modalObj.action}>
                   {modalObj.dangerLabel || 'OK'}
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, title, sub, danger, onClick }: any) {
  return (
    <div className="flex items-center gap-[11px] p-[12px_14px] rounded-[9px] cursor-pointer hover:bg-eterna-card transition-colors" onClick={onClick}>
      <div className={`w-[34px] h-[34px] rounded-[7px] bg-eterna-card flex items-center justify-center shrink-0 ${danger ? 'text-eterna-red' : 'text-eterna-muted'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className={`text-[13px] ${danger ? 'text-eterna-red' : ''}`}>{title}</div>
        {sub && <div className="text-[11px] text-eterna-muted mt-[1px]">{sub}</div>}
      </div>
      {!danger && <ChevronRight className="w-[16px] h-[16px] text-eterna-hint" />}
    </div>
  );
}
