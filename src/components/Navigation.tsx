import { Search, Bell, Home, Radio, Download, User, ArrowLeft } from "lucide-react";
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
    <nav className="flex items-center gap-[12px] px-[20px] h-[56px] bg-gradient-to-b from-black/80 to-transparent border-b-0 sticky top-0 z-[100] transition-colors">
      {showBack && (
        <button className="flex items-center justify-center w-[34px] h-[34px] rounded-[7px] text-eterna-muted hover:text-eterna-text hover:bg-white/5 transition-all" onClick={goBack}>
          <ArrowLeft className="w-[18px] h-[18px]" />
        </button>
      )}
      
      {!showBack && typeof title === 'string' && title === 'Eterna' ? (
        <div className="flex items-center gap-8">
          <div className="font-serif text-[30px] font-semibold tracking-tighter text-eterna-red cursor-pointer" onClick={() => go('home')}>
            {title}
          </div>
          <div className="hidden md:flex gap-6 text-[13px] font-medium text-eterna-muted">
             <div className="text-white cursor-pointer hover:text-white/80 transition-colors" onClick={() => go('home')}>Home</div>
             <div className="cursor-pointer hover:text-white/80 transition-colors" onClick={() => go('home')}>Live Shows</div>
             <div className="cursor-pointer hover:text-white/80 transition-colors" onClick={() => go('search')}>Movies</div>
             <div className="cursor-pointer hover:text-white/80 transition-colors" onClick={() => go('live')}>New & Popular</div>
             <div className="cursor-pointer hover:text-white/80 transition-colors" onClick={() => go('dl')}>My List</div>
          </div>
        </div>
      ) : (
        <div className={typeof title === 'string' && title !== 'Eterna' ? "font-serif text-[16px] tracking-[1px]" : ""}>
          {title}
        </div>
      )}

      {/* Nav Links for Home specific layout would go here, kept simpler for general use */}
      
      <div className="flex-1" />

      {showSearch && (
        <div className="hidden sm:flex items-center gap-[7px] bg-eterna-card border border-eterna-border rounded-[7px] px-[12px] py-[6px] cursor-pointer text-[12px] text-eterna-muted hover:border-white/20 transition-all" onClick={() => go('search')}>
          <Search className="w-[14px] h-[14px]" /> Search
        </div>
      )}

      {customRight}

      {showProfile && user && (
        <div className="relative">
          <button className="flex items-center justify-center w-[34px] h-[34px] rounded-[7px] text-eterna-muted hover:text-eterna-text hover:bg-white/5 transition-all" onClick={() => setNotifOpen(!notifOpen)}>
            <Bell className="w-[18px] h-[18px]" />
            <div className="absolute top-[3px] right-[5px] w-[7px] h-[7px] bg-eterna-rose rounded-full border-[1.5px] border-eterna-bg" />
          </button>
          
          {notifOpen && (
            <div className="absolute top-[45px] right-0 w-[280px] bg-eterna-surface border border-eterna-border rounded-[11px] z-[150] overflow-hidden shadow-2xl">
              <div className="px-[16px] py-[12px] border-b border-eterna-border text-[13px] font-semibold flex justify-between items-center bg-eterna-surface">
                Notifications 
                <span className="text-[11px] text-eterna-rose cursor-pointer font-normal" onClick={() => { setNotifOpen(false); showToast("All notifications marked as read");}}>Mark all read</span>
              </div>
              <div className="flex flex-col">
                <div className="p-[11px] px-[16px] border-b border-eterna-border cursor-pointer hover:bg-white/5 transition-colors" onClick={() => { setNotifOpen(false); showToast('Nebula Rising S1 Ep 4 is now available!'); go('home'); }}>
                  <div className="flex gap-[8px] items-start">
                    <div className="w-[6px] h-[6px] rounded-full bg-eterna-rose shrink-0 mt-[4px]" />
                    <div className="flex-1">
                      <div className="font-medium text-[12px]">New Episode Available</div>
                      <div className="text-eterna-muted text-[11px] mt-[1px]">Nebula Rising — S1E4 just dropped</div>
                    </div>
                    <div className="text-[10px] text-eterna-hint">2m</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showProfile && user && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-eterna-gold to-white p-[1px] flex-shrink-0 cursor-pointer" onClick={() => go('profile')}>
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">
            {user.initials}
          </div>
        </div>
      )}
    </nav>
  );
}

export function BottomNav() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const faqs = [
    { q: "What is Infinite ShowTime?", a: "Infinite ShowTime is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices." },
    { q: "How much does it cost?", a: "Watch any time, anywhere. Choose a plan that's right for you." },
    { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your account to watch instantly on the web at infiniteshorttime.com from your personal computer or on any internet-connected device." },
    { q: "How do I cancel?", a: "Infinite ShowTime is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks." }
  ];

  const links = [
    'Help Center', 'Account', 'Media Center',
    'Investor Relations', 'Jobs', 'Redeem Gift Cards', 'Buy Gift Cards',
    'Ways to Watch', 'Terms of Use', 'Privacy', 'Cookie Preferences',
    'Corporate Information', 'Contact Us', 'Speed Test', 'Legal Notices'
  ];

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
            <a key={link} href="#" className="hover:underline">{link}</a>
          ))}
        </div>
        <div className="mb-4">
          <button className="border border-[#757575] bg-transparent text-[#757575] px-4 py-2 flex items-center gap-2 hover:text-white hover:border-white transition-colors">
            <Radio className="w-4 h-4" />
            Service Code
          </button>
        </div>
        <p className="text-[12px]">© {new Date().getFullYear()} Eterna, Inc.</p>
      </div>
    </footer>
  );
}
