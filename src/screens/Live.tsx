import { useState, useEffect } from "react";
import { Calendar, Play, Disc } from "lucide-react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
import { CHANNELS } from "../lib/data";

export function LiveScreen() {
  const { go, showToast } = useAppStore();
  const [min, setMin] = useState(74);

  useEffect(() => {
    const timer = setInterval(() => {
      setMin(m => m + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const progress = Math.min(60 + (min - 74) * 0.5, 90);

  const watchLive = () => {
    go('player');
  };

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg pb-[50px]">
      <TopNav title={<div className="flex items-center"><span className="font-serif text-[20px] tracking-[1px] text-grad pr-1 cursor-pointer" onClick={() => go('home')}>Eterna</span> <span className="text-[13px] text-eterna-red font-semibold ml-[2px]">LIVE</span></div>} showProfile={true} customRight={
        <button className="flex items-center justify-center w-[34px] h-[34px] rounded-[7px] text-eterna-muted hover:text-eterna-text hover:bg-white/5 transition-all" onClick={() => showToast('📅 TV Guide: Loading schedule…')}>
          <Calendar className="w-[18px] h-[18px]" />
        </button>
      } />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-[20px_20px_0]" style={{ background: 'linear-gradient(135deg,#0a1a2e 0%,#1a0a2e 100%)' }}>
          <div className="text-[10px] text-eterna-muted tracking-[2px] uppercase mb-[11px]">Featured Live</div>
          <div className="bg-eterna-card border border-eterna-border rounded-[11px] overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-[240px] h-[135px] shrink-0 relative flex items-center justify-center text-[44px]" style={{ background: 'linear-gradient(135deg,#1a0832 0%,#0a1830 100%)'}}>
              <span>🏆</span>
              <div className="absolute top-[8px] left-[8px] bg-eterna-red text-white text-[9px] font-bold px-[7px] py-[3px] rounded-[4px] tracking-[1px] flex items-center gap-[3px]">
                <div className="w-[5px] h-[5px] rounded-full bg-white animate-pulse" /> LIVE
              </div>
            </div>
            <div className="p-[14px_16px] flex-1">
              <div className="text-[11px] text-eterna-muted uppercase tracking-[1px]">Eterna Sports HD</div>
              <div className="font-serif text-[18px] m-[5px_0_3px]">UEFA Champions League Final</div>
              <div className="text-[11px] text-eterna-muted">Real Madrid vs Man City · {min}'</div>
              <div className="h-[3px] bg-white/10 rounded-[2px] my-[10px]">
                <div className="h-full bg-eterna-red rounded-[2px] transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex gap-[8px] mt-[10px]">
                <button className="bg-grad text-white px-[14px] py-[7px] rounded-[8px] text-[12px] font-semibold flex items-center gap-[7px] hover:opacity-85" onClick={watchLive}>
                  <Play className="w-[12px] h-[12px] fill-current" /> Watch Live
                </button>
                <button className="border border-white/20 bg-transparent text-eterna-text px-[14px] py-[7px] rounded-[8px] text-[12px] font-semibold flex items-center gap-[7px] hover:bg-white/5" onClick={() => showToast('🔴 Recording set for UEFA Champions League Final')}>
                  <Disc className="w-[12px] h-[12px]" /> Record
                </button>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-eterna-muted tracking-[2px] uppercase mt-[14px]">All Channels</div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-[9px] p-[18px_20px]">
          {CHANNELS.map(ch => (
            <div key={ch.name} className="bg-eterna-card border border-eterna-border rounded-[9px] p-[13px] text-center cursor-pointer hover:border-white/20 hover:-translate-y-[2px] transition-all" onClick={() => { showToast(`Tuning to ${ch.name}…`); setTimeout(() => go('player'), 500); }}>
              <div className="text-[26px] mb-[7px]">{ch.emoji}</div>
              <div className="text-[12px] font-medium">{ch.name}</div>
              <div className="text-[10px] text-eterna-muted mt-[2px]">{ch.cat}</div>
              {ch.live && (
                <div className="inline-block text-[9px] bg-eterna-red/20 border border-eterna-red/35 text-eterna-red px-[6px] py-[2px] rounded-[3px] tracking-[0.5px] mt-[5px]">
                  LIVE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
