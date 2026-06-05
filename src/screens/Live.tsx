import { useState, useEffect } from "react";
import { Calendar, Play, Disc, ChevronRight } from "lucide-react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";

const HUBS = [
  {
    name: "⚽ Sports Arena",
    channels: [
      { name: "SuperSport", desc: "Premier League, UEFA", emoji: "🏅", isLive: true },
      { name: "beIN Sports", desc: "Football, Tennis, F1", emoji: "🏎️", isLive: true },
      { name: "ESPN", desc: "NFL, NBA, MLB", emoji: "🏈", isLive: false },
      { name: "Sky Sports", desc: "Football, Golf, Cricket", emoji: "🏏", isLive: true },
      { name: "Fox Sports", desc: "Football, Baseball", emoji: "⚾", isLive: false },
    ]
  },
  {
    name: "🎬 Movies & Entertainment",
    channels: [
      { name: "Netflix live", desc: "Movies, Series", emoji: "🍿", isLive: false },
      { name: "HBO", desc: "Premium Series", emoji: "✨", isLive: false },
      { name: "Mzansi Magic", desc: "Local Drama", emoji: "🎭", isLive: true },
      { name: "BET", desc: "Entertainment", emoji: "📺", isLive: false },
      { name: "E! Entertainment", desc: "Celebrity & Lifestyle", emoji: "📸", isLive: false },
    ]
  },
  {
    name: "🌍 Documentary Universe",
    channels: [
      { name: "Nat Geo", desc: "Nature, Science", emoji: "🐘", isLive: true },
      { name: "Discovery", desc: "Science, Reality", emoji: "🔬", isLive: false },
      { name: "History", desc: "History, Culture", emoji: "📜", isLive: false },
      { name: "Animal Planet", desc: "Wildlife", emoji: "🦁", isLive: true },
      { name: "BBC Earth", desc: "Environment", emoji: "🌱", isLive: false },
    ]
  },
  {
    name: "🎵 Music & Culture",
    channels: [
      { name: "MTV Base", desc: "Afrobeats, Hip Hop", emoji: "🎧", isLive: true },
      { name: "Channel O", desc: "African Music", emoji: "🎹", isLive: true },
      { name: "TRACE Africa", desc: "Contemporary", emoji: "🎤", isLive: false },
      { name: "MTV", desc: "Youth Culture", emoji: "🎸", isLive: false },
      { name: "VH1", desc: "Pop Culture", emoji: "💿", isLive: false },
    ]
  },
  {
    name: "📰 Global News Centre",
    channels: [
      { name: "CNN", desc: "Breaking News", emoji: "📰", isLive: true },
      { name: "BBC News", desc: "International News", emoji: "🌐", isLive: true },
      { name: "Al Jazeera", desc: "Int. Affairs", emoji: "🗣️", isLive: true },
      { name: "Sky News", desc: "Current Affairs", emoji: "📡", isLive: true },
      { name: "Africa News", desc: "Pan-African", emoji: "🌍", isLive: true },
    ]
  },
  {
    name: "🕊️ Faith & Spirituality",
    channels: [
      { name: "TBN Africa", desc: "Inspiration", emoji: "🙏", isLive: true },
      { name: "Daystar", desc: "Spiritual Growth", emoji: "🌅", isLive: false }
    ]
  },
  {
    name: "📈 Business & Leadership",
    channels: [
      { name: "Bloomberg TV", desc: "Financial News", emoji: "📉", isLive: true },
      { name: "CNBC Africa", desc: "Business Updates", emoji: "👔", isLive: false }
    ]
  },
  {
    name: "📚 Education & Learning",
    channels: [
      { name: "EDUTV", desc: "Curriculum Content", emoji: "🏫", isLive: false },
      { name: "TED TV", desc: "Ideas Worth Spreading", emoji: "💡", isLive: false }
    ]
  },
  {
    name: "🧸 Kids & Family",
    channels: [
      { name: "Cartoon Network", desc: "Animated Series", emoji: "🎨", isLive: false },
      { name: "Nickelodeon", desc: "Kids Entertainment", emoji: "🎈", isLive: false },
      { name: "Disney Ch.", desc: "Family TV", emoji: "🏰", isLive: false }
    ]
  },
  {
    name: "🌟 African Originals",
    channels: [
      { name: "Africa Magic", desc: "Nollywood Hits", emoji: "🎥", isLive: true },
      { name: "ROK", desc: "African Cinema", emoji: "📽️", isLive: false }
    ]
  }
];

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
      <TopNav title={<div className="flex items-center"><span className="font-serif text-[20px] tracking-[1px] text-white pr-1 cursor-pointer" onClick={() => go('home')}>Eterna</span> <span className="text-[13px] text-eterna-red font-semibold ml-[2px]">LIVE</span></div>} showProfile={true} customRight={
        <button className="flex items-center justify-center w-[34px] h-[34px] rounded-[7px] text-eterna-muted hover:text-eterna-text hover:bg-white/5 transition-all" onClick={() => showToast('📅 TV Guide: Loading schedule…')}>
          <Calendar className="w-[18px] h-[18px]" />
        </button>
      } />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-[20px_20px_0]" style={{ background: 'linear-gradient(135deg,#0a1a2e 0%,#1a0a2e 100%)' }}>
          <div className="text-[10px] text-eterna-muted tracking-[2px] uppercase mb-[11px]">Featured Live</div>
          <div className="bg-eterna-card border border-eterna-border rounded-[11px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-[240px] h-[135px] shrink-0 relative flex items-center justify-center text-[44px]" style={{ background: 'linear-gradient(135deg,#1a0832 0%,#0a1830 100%)'}}>
              <span>🏆</span>
              <div className="absolute top-[8px] left-[8px] bg-eterna-red text-white text-[9px] font-bold px-[7px] py-[3px] rounded-[4px] tracking-[1px] flex items-center gap-[3px]">
                <div className="w-[5px] h-[5px] rounded-full bg-white animate-pulse" /> LIVE
              </div>
            </div>
            <div className="p-[14px_16px] flex-1">
              <div className="text-[11px] text-eterna-muted uppercase tracking-[1px]">SuperSport Hub</div>
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
        </div>

        <div className="p-5 space-y-8 mt-4 pb-20">
          {HUBS.map((hub, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-serif font-bold tracking-wide text-white/90">{hub.name}</h3>
                <div className="text-[11px] text-eterna-rose flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  View All <ChevronRight className="w-3 h-3" />
                </div>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 snap-x">
                {hub.channels.map((ch, idx) => (
                  <div key={idx} className="shrink-0 w-[140px] snap-start bg-eterna-card border border-eterna-border rounded-[12px] p-[16px] flex flex-col items-center text-center cursor-pointer hover:border-white/20 hover:-translate-y-[2px] transition-all group" onClick={() => { showToast(`Tuning to ${ch.name}…`); setTimeout(() => go('player'), 500); }}>
                    <div className="w-[50px] h-[50px] rounded-full bg-white/5 flex items-center justify-center text-[24px] mb-3 group-hover:bg-white/10 transition-colors shadow-inner">
                      {ch.emoji}
                    </div>
                    <div className="text-[13px] font-semibold text-white/90 leading-tight mb-1">{ch.name}</div>
                    <div className="text-[10px] text-eterna-muted line-clamp-1">{ch.desc}</div>
                    {ch.isLive ? (
                       <div className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-eterna-red bg-eterna-red/10 px-2 py-1 rounded">
                         <div className="w-1.5 h-1.5 rounded-full bg-eterna-red animate-pulse"></div> LIVE
                       </div>
                    ) : (
                       <div className="mt-3 inline-flex text-[9px] font-medium tracking-wide text-white/40 bg-white/5 px-2 py-1 rounded">
                         CATCH UP
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
