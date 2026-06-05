import { Search, Bell, Home, Radio, Download, User, ArrowLeft, Plus, Users, LayoutDashboard, PlayCircle, Tv } from "lucide-react";
import { useAppStore, ScreenType } from "../lib/store";
import React, { useState } from "react";

export function TopNav({ 
  showBack=false, 
  title="Eterna", 
  showSearch=false, 
  showProfile=true, 
  customRight 
}: { 
  showBack?: boolean, 
  title?: string|React.ReactNode, 
  showSearch?: boolean, 
  showProfile?: boolean,
  customRight?: React.ReactNode 
}) {
  const { go, goBack, user, showToast } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);
  
  return (
    <>
    <nav className="hidden md:flex items-center gap-[12px] px-[20px] h-[64px] glass mx-6 mt-4 rounded-2xl sticky top-4 z-[100] transition-colors">
      {showBack && (
        <button className="flex items-center justify-center w-[34px] h-[34px] rounded-[7px] text-eterna-muted hover:text-eterna-text hover:bg-white/10 transition-all" onClick={goBack}>
          <ArrowLeft className="w-[18px] h-[18px]" />
        </button>
      )}
      
      {!showBack && typeof title === 'string' && title === 'Eterna' ? (
        <div className="flex items-center gap-8">
          <div className="font-sans text-[26px] font-bold tracking-tight text-white cursor-pointer" onClick={() => go('home')}>
            {title}
          </div>
          <div className="hidden lg:flex gap-6 text-[14px] font-semibold text-eterna-muted relative">
             <div className="text-white cursor-pointer hover:text-eterna-rose transition-colors" onClick={() => document.getElementById('discover-dropdown')?.classList.toggle('hidden')}>Discover</div>
             <div className="cursor-pointer hover:text-eterna-rose transition-colors" onClick={() => go('originals')}>Originals</div>
             <div className="cursor-pointer hover:text-eterna-rose transition-colors" onClick={() => go('search')}>Films</div>
             <div className="cursor-pointer hover:text-eterna-rose transition-colors" onClick={() => go('series')}>Series</div>
             <div className="cursor-pointer hover:text-eterna-rose transition-colors" onClick={() => go('documentary')}>Documentary</div>
             <div className="cursor-pointer hover:text-eterna-rose transition-colors" onClick={() => go('live')}>Live</div>
             <div className="cursor-pointer hover:text-eterna-rose transition-colors flex items-center gap-1" onClick={() => go('schedule')}>Schedule</div>
             
             {/* Discover Dropdown */}
             <div id="discover-dropdown" className="hidden absolute top-10 left-0 w-[400px] glass p-6 rounded-2xl shadow-2xl border border-white/10 z-[200]">
               <h3 className="text-white font-bold mb-4 font-mono">GLOBAL FILM SEARCH</h3>
               <div className="space-y-3">
                 <input type="text" placeholder="Search by title..." className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-eterna-rose text-sm font-mono" />
                 <div className="grid grid-cols-2 gap-3">
                   <select className="bg-black/50 border border-white/10 rounded-lg p-2 text-white/70 outline-none text-sm font-mono">
                     <option>Any Genre</option>
                     <option>Action</option>
                     <option>Drama</option>
                     <option>Sci-Fi</option>
                   </select>
                   <select className="bg-black/50 border border-white/10 rounded-lg p-2 text-white/70 outline-none text-sm font-mono">
                     <option>Any Location</option>
                     <option>Africa</option>
                     <option>North America</option>
                     <option>Europe</option>
                   </select>
                 </div>
                 <input type="text" placeholder="Director's name..." className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-eterna-rose text-sm font-mono" />
                 <input type="text" placeholder="Production company..." className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-eterna-rose text-sm font-mono" />
                 <button className="w-full bg-white text-black font-bold py-2 rounded-lg mt-2 hover:bg-gray-200 transition-colors uppercase tracking-wider text-sm" onClick={() => { document.getElementById('discover-dropdown')?.classList.add('hidden'); go('search'); }}>Search</button>
               </div>
             </div>
          </div>
        </div>
      ) : (
        <div className={typeof title === 'string' && title !== 'Eterna' ? "font-sans font-bold text-[18px] tracking-[1px] text-white" : ""}>
          {title}
        </div>
      )}

      <div className="flex-1" />

      {showSearch && (
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-[7px] bg-white/5 border border-white/10 rounded-full px-[16px] py-[8px] cursor-pointer text-[13px] text-eterna-muted hover:border-eterna-rose hover:bg-white/10 transition-all font-mono" onClick={() => go('search')}>
            <Search className="w-[16px] h-[16px]" /> INITIALIZE SEARCH 
          </div>

          <div className="flex items-center gap-[7px] bg-grad/20 border border-eterna-rose/50 rounded-full px-[16px] py-[8px] cursor-pointer text-[13px] text-white hover:border-eterna-rose transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]">
            <span className="w-2 h-2 rounded-full bg-eterna-rose animate-ping" /> NOVA AI
          </div>
        </div>
      )}

      {customRight}

      {showProfile && (
        <div className="relative">
          <button className="flex items-center justify-center w-[40px] h-[40px] rounded-full text-eterna-muted hover:text-eterna-text hover:bg-white/10 transition-all" onClick={() => setNotifOpen(!notifOpen)}>
            <Bell className="w-[18px] h-[18px]" />
            <div className="absolute top-[8px] right-[10px] w-[8px] h-[8px] bg-eterna-violet rounded-full border-[1.5px] border-eterna-bg shadow-[0_0_10px_rgba(0,214,143,0.8)]" />
          </button>
          
          {notifOpen && (
            <div className="absolute top-[50px] right-0 w-[300px] glass rounded-2xl z-[150] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10">
              <div className="px-[16px] py-[12px] border-b border-white/10 text-[11px] font-mono tracking-widest flex justify-between items-center text-white/50 bg-black/40">
                SYSTEM ALERTS
                <span className="text-eterna-rose cursor-pointer font-bold hover:underline" onClick={() => { setNotifOpen(false); showToast("All notifications marked as read");}}>ACKNOWLEDGE ALL</span>
              </div>
              <div className="flex flex-col bg-black/60 backdrop-blur-xl">
                <div className="p-[14px] px-[16px] border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => { setNotifOpen(false); showToast('Nebula Rising S1 Ep 4 is now available!'); go('home'); }}>
                  <div className="flex gap-[12px] items-start">
                    <div className="w-[8px] h-[8px] rounded-full bg-eterna-rose shrink-0 mt-[4px] shadow-[0_0_8px_rgba(60,174,255,0.8)]" />
                    <div className="flex-1">
                      <div className="font-bold text-[13px] text-white">Content Sync Complete</div>
                      <div className="text-eterna-muted text-[11px] font-mono mt-[4px] leading-tight text-white/60">Nebula Rising — S1E4 available on global CDN</div>
                    </div>
                    <div className="text-[10px] font-mono text-eterna-rose font-bold">2m</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showProfile && (
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] font-mono font-bold text-eterna-gold tracking-widest uppercase">Lvl 42 Viewer</span>
            <div className="w-16 h-1 mt-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-eterna-gold w-[80%] shadow-[0_0_5px_rgba(245,176,65,0.8)]" />
            </div>
          </div>
          <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-tr from-eterna-gold to-white p-[2px] flex-shrink-0 cursor-pointer hover:scale-110 transition-transform shadow-[0_0_10px_rgba(245,176,65,0.4)]" onClick={() => go('profile')}>
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[12px] font-bold text-white">
              {user ? user.initials : 'U'}
            </div>
          </div>
        </div>
      )}
    </nav>
    <MobileBottomNav />
    </>
  );
}

export function MobileBottomNav() {
  const { go } = useAppStore();
  
  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 glass-panel rounded-2xl flex items-center justify-between px-6 py-3 z-[100] border-t border-white/10 shadow-2xl">
        <button onClick={() => go('home')} className="flex flex-col items-center gap-1 text-white hover:text-eterna-rose transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => go('search')} className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium">Discover</span>
        </button>
        <button onClick={() => go('partner')} className="relative group">
            <div className="w-14 h-14 rounded-full bg-grad flex items-center justify-center -mt-8 shadow-[0_0_20px_rgba(60,174,255,0.4)] group-hover:scale-110 transition-transform border border-white/20">
                <Plus className="w-7 h-7 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white absolute -bottom-4 left-1/2 -translate-x-1/2">Create</span>
        </button>
        <button onClick={() => go('live')} className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors">
            <Tv className="w-5 h-5" />
            <span className="text-[10px] font-medium">Live</span>
        </button>
        <button onClick={() => go('profile')} className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profile</span>
        </button>
    </div>
  );
}

export function BottomNav() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const { go, setInfoPage } = useAppStore();

  const faqs = [
    { q: "What is Infinite ShowTime?", a: "Infinite ShowTime is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices." },
    { q: "How much does it cost?", a: "Watch any time, anywhere. Choose a plan that's right for you." },
    { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your account to watch instantly on the web at infiniteshorttime.com from your personal computer or on any internet-connected device." },
    { q: "How do I cancel?", a: "Infinite ShowTime is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks." }
  ];

  const links = [
    'Help Center', 'Account', 'Media Center',
    'Investor Relations', 'Jobs', 'Redeem Gift Cards', 'Buy Gift Cards',
    'Ways to Watch', 'Pricing Plans', 'Terms of Use', 'Privacy', 'Cookie Preferences',
    'Corporate Information', 'Contact Us', 'Speed Test', 'Legal Notices'
  ];

  const handleLink = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    setInfoPage(link);
    go('info');
  };

  return (
    <footer className="bg-[#141414] text-[#757575] py-16 px-6 md:px-12 w-full mt-auto border-t border-white/10 text-[13px] relative z-[100]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-[24px] font-bold mb-6">Frequently Asked Questions</h2>
        <div className="mb-12 space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#2d2d2d] rounded-[4px] overflow-hidden">
              <button 
                className="w-full text-left px-6 py-4 flex justify-between items-center text-white text-[18px] hover:bg-[#3d3d3d] transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.q}
                <span className="text-[24px]">{openFaq === idx ? '×' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 py-4 bg-[#2d2d2d] text-white/90 text-[16px] border-t border-black/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mb-8 text-[15px]">Questions? Call <a href="tel:0800100046" className="hover:underline">0800 100 046</a></p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4 mb-8">
          {links.map(link => (
            <a key={link} href="#" className="hover:underline" onClick={(e) => handleLink(e, link)}>{link}</a>
          ))}
        </div>
        <div className="mb-4">
          <button 
            className="border border-[#757575] bg-transparent text-[#757575] px-4 py-2 flex items-center gap-2 hover:text-white hover:border-white transition-colors"
            onClick={(e) => handleLink(e, 'Service Code')}
          >
            <Radio className="w-4 h-4" />
            Service Code
          </button>
        </div>
        <p className="text-[12px]">© {new Date().getFullYear()} Eterna, Inc.</p>
      </div>
    </footer>
  );
}
