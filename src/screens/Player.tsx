import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Cast, Settings, Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Volume2, VolumeX, Maximize, Subtitles, Plus, ThumbsUp, Share2, Download, Info, Check, Users } from "lucide-react";
import { useAppStore } from "../lib/store";
import { BottomNav } from "../components/Navigation";

export function PlayerScreen() {
  const { currentContent: c, goBack, showToast, toggleMyList, toggleLiked, myList, liked, addDownload, downloads, go, addContinueWatching } = useAppStore();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [subs, setSubs] = useState(false);
  const [watchParty, setWatchParty] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const inMyList = myList.includes(c?.id ?? -1);
  const inLiked = liked.includes(c?.id ?? -1);

  useEffect(() => {
    if (c) {
      addContinueWatching(c.id);
    }
  }, [c?.id]);

  useEffect(() => {
    if (playing) {
      playTimerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setPlaying(false);
            showToast('⏹ Episode ended');
            return 0;
          }
          return Math.min(p + 0.3, 100);
        });
      }, 300);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => { if (playTimerRef.current) clearInterval(playTimerRef.current); };
  }, [playing]);

  if (!c) return null;

  const togglePlay = () => setPlaying(!playing);

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.min(Math.max(pct, 0), 100));
    showToast('Jumped to ' + Math.round(pct) + '%');
  };

  const setVol = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const v = Math.min(Math.max(pct, 0), 100);
    setVolume(v);
    if (muted && v > 0) setMuted(false);
    showToast('Volume: ' + Math.round(v) + '%');
  };

  const toggleMute = () => {
    setMuted(!muted);
    showToast(!muted ? '🔇 Muted' : '🔊 Unmuted');
  };

  const rewind = () => { setProgress(p => Math.max(0, p - 2.8)); showToast('⏪ -10s'); };
  const forward = () => { setProgress(p => Math.min(100, p + 2.8)); showToast('⏩ +10s'); };

  const totalSecs = 58 * 60 + 30; // ~58m 30s Mock duration for everything
  const curSecs = Math.round(totalSecs * progress / 100);
  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, '0')}`;

  const doDownload = () => {
    const exists = downloads.find(d => d.id === 'dl_' + c.id);
    if(exists) { showToast('Already downloaded: '+c.title); return; }
    addDownload({ emoji: c.emoji, title: c.title+(c.eps?' S1:E1':''), meta: c.sub+' · Downloading…', size: '2.1 GB', prog: 0, id: 'dl_'+c.id });
    showToast('Downloading: '+c.title+'…');
  };

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMsg.trim()) {
      showToast(`Sent: ${chatMsg}`);
      setChatMsg("");
    }
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen bg-[#141414] ${watchParty ? '' : 'justify-start'}`}>
      
      {/* Left side: Player & Details */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${watchParty ? 'md:w-[calc(100%-320px)] border-r border-[#333]' : 'w-full'}`}>
        {/* Player Stage */}
        <div className="aspect-video bg-black flex items-center justify-center relative w-full overflow-hidden group">
          <div className="w-full h-full flex items-center justify-center text-[190px] select-none opacity-40">
            {c.emoji}
          </div>
          
          {/* Top Controls Overlay */}
          <div className="absolute top-0 left-0 right-0 p-[14px_24px] flex items-center gap-[14px] bg-gradient-to-b from-black/90 via-black/40 to-transparent z-20">
            <button className="w-[38px] h-[38px] flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-all" onClick={goBack}>
              <ArrowLeft className="w-[24px] h-[24px]" />
            </button>
            <div>
              <div className="text-[18px] font-bold text-white drop-shadow-md">{c.title}</div>
              <div className="text-[13px] text-white/70 drop-shadow-md">{c.eps ? 'Season 1 : Episode 3' : 'Film'}</div>
            </div>
            <div className="ml-auto flex gap-[10px]">
              <button 
                className={`flex items-center gap-2 px-3 h-[38px] rounded-[4px] font-semibold text-[13px] transition-colors ${watchParty ? 'bg-eterna-red text-white' : 'bg-[#333]/80 hover:bg-[#444]/80 text-white'}`}
                onClick={() => setWatchParty(!watchParty)}
              >
                <Users className="w-4 h-4" /> {watchParty ? 'In Party' : 'Watch Together'}
              </button>
              <button className="w-[38px] h-[38px] flex items-center justify-center rounded-full hover:bg-white/20 transition-colors bg-black/40">
                <Cast className="w-[20px] h-[20px] text-white" />
              </button>
            </div>
          </div>

          {/* Center Play (Optional) */}
          {!playing && (
            <div className="absolute w-[80px] h-[80px] rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-105 transition-all z-20 text-white shadow-xl shadow-black/20" onClick={togglePlay}>
              <Play className="w-[32px] h-[32px] fill-current text-white ml-[4px]" />
            </div>
          )}

          {/* Bottom Progress & Controls Panel */}
          <div className="absolute bottom-0 left-0 right-0 p-[20px_24px] bg-gradient-to-t from-black via-black/60 to-transparent z-20 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
            {/* Progress bar */}
            <div className="h-[5px] bg-white/30 cursor-pointer relative mb-[16px] group/bar rounded-full" onClick={seekTo}>
              <div className="h-full bg-eterna-red rounded-full relative" style={{ width: `${progress}%` }}>
                <div className="w-[16px] h-[16px] bg-eterna-red rounded-full absolute -right-[8px] -top-[5.5px] shadow-sm transform scale-0 group-hover/bar:scale-100 transition-transform" />
              </div>
            </div>
            
            <div className="flex items-center gap-[16px]">
              <button className="text-white hover:text-white/80 transition-colors" onClick={togglePlay}>
                {playing ? <Pause className="w-[28px] h-[28px] fill-current" /> : <Play className="w-[28px] h-[28px] fill-current" />}
              </button>
              <button className="text-white hover:text-white/80 transition-colors" onClick={rewind}>
                <Rewind className="w-[24px] h-[24px] fill-current" />
              </button>
              <button className="text-white hover:text-white/80 transition-colors" onClick={forward}>
                <FastForward className="w-[24px] h-[24px] fill-current" />
              </button>
              <div className="flex items-center gap-[8px] group/vol cursor-pointer">
                <button className="text-white hover:text-white/80 transition-colors" onClick={toggleMute}>
                  {muted || volume === 0 ? <VolumeX className="w-[24px] h-[24px]" /> : <Volume2 className="w-[24px] h-[24px]" />}
                </button>
                <div className="w-0 overflow-hidden group-hover/vol:w-[80px] transition-all duration-300 flex items-center h-full">
                  <div className="w-full h-[4px] bg-white/30 rounded-full cursor-pointer ml-2" onClick={setVol}>
                    <div className="h-full bg-eterna-red rounded-full" style={{ width: `${muted ? 0 : volume}%` }} />
                  </div>
                </div>
              </div>
              
              <div className="text-[14px] font-medium text-white ml-2">
                {formatTime(curSecs)} <span className="text-white/50 mx-1">/</span> <span className="text-white/70">{formatTime(totalSecs)}</span>
              </div>
              
              <div className="flex-1" />

              <div className="text-[13px] font-medium text-white px-2 py-0.5 rounded border border-white/40 cursor-default uppercase mr-2">4K</div>
              <button className="w-[32px] h-[32px] flex items-center justify-center text-white hover:text-white/80 transition-colors" onClick={() => { setSubs(!subs); showToast(subs ? 'Subtitles: Off' : 'Subtitles: On'); }}>
                 <Subtitles className={`w-[24px] h-[24px] ${subs ? 'text-eterna-red' : ''}`} />
              </button>
              <button className="w-[32px] h-[32px] flex items-center justify-center text-white hover:text-white/80 transition-colors ml-2">
                <Maximize className="w-[24px] h-[24px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel Below Player */}
        <div className="p-[24px_32px] flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-sans font-bold text-3xl text-white mb-2">{c.title}</h1>
            <div className="flex items-center gap-[12px] text-[15px] text-white/60 mb-6 font-medium">
              <span className="text-[#46d369]">98% Match</span>
              <span>{c.year}</span>
              <span className="px-1.5 py-0.5 border border-white/30 rounded text-[12px] text-white/90">12+</span>
              <span>{c.eps ? '12 Episodes' : 'Film'}</span>
              <span className="px-1.5 py-0.5 border border-white/30 rounded text-[12px] text-white/90">HD</span>
            </div>
            
            <p className="text-[16px] leading-[1.6] text-white/90 mb-8 max-w-3xl">
              {c.desc} This is a randomly expanded description text to simulate a full platform experience for the Details/Player view. {c.title} engages viewers across the globe.
            </p>

            <div className="flex gap-[12px] flex-wrap mb-10">
              <button className="flex items-center justify-center gap-2 p-[10px_24px] bg-[#333] hover:bg-[#444] rounded-[4px] text-white font-semibold transition-colors" onClick={() => toggleMyList(c.id)}>
                 {inMyList ? <Check className="w-[20px] h-[20px]" /> : <Plus className="w-[20px] h-[20px]" />} 
                 <span>{inMyList ? 'Remove from List' : 'My List'}</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-[10px_24px] bg-[#333] hover:bg-[#444] rounded-[4px] text-white font-semibold transition-colors" onClick={() => toggleLiked(c.id)}>
                 <ThumbsUp className="w-[20px] h-[20px]" fill={inLiked ? "currentColor" : "none" } /> 
                 <span>{inLiked ? 'Liked' : 'Rate'}</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-[10px_24px] bg-[#333] hover:bg-[#444] rounded-[4px] text-white font-semibold transition-colors" onClick={() => showToast('Link copied: https://eterna.tv/watch/'+c.id)}>
                <Share2 className="w-[20px] h-[20px]" /> Share
              </button>
              <button className="flex items-center justify-center gap-2 p-[10px_24px] bg-[#333] hover:bg-[#444] rounded-[4px] text-white font-semibold transition-colors" onClick={doDownload}>
                <Download className="w-[20px] h-[20px]" /> Download
              </button>
            </div>
            
            {/* Cast & Info block */}
            <div className="grid md:grid-cols-2 gap-8 text-[14px]">
               <div>
                  <div className="mb-2"><span className="text-white/50">Cast: </span> <span className="text-white hover:underline cursor-pointer">Actor Name 1</span>, <span className="text-white hover:underline cursor-pointer">Another Star</span>...</div>
                  <div className="mb-2"><span className="text-white/50">Genres: </span> <span className="text-white">{c.genres.join(', ')}</span></div>
                  <div><span className="text-white/50">This show is: </span> <span className="text-white">Suspenseful, Exciting</span></div>
               </div>
               <div>
                 <div className="mb-2">
                   <div className="flex items-center gap-2 text-white/50">
                     <span className="text-eterna-red border border-eterna-red px-1 rounded-sm text-[12px] font-bold">TOP 10</span>
                     <span>#4 in Movies Today</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <BottomNav />
        </div>
      </div>

      {/* Right Side: Watch Party Chat Sidebar */}
      {watchParty && (
        <div className="w-full md:w-[320px] bg-[#181818] flex flex-col border-l border-[#333] h-[600px] md:h-screen sticky top-0">
          <div className="p-4 border-b border-[#333] flex items-center justify-between">
            <h3 className="font-bold text-white text-[16px] flex items-center gap-2">
              <Users className="w-5 h-5 text-eterna-red" /> Watch Party
            </h3>
            <span className="text-[12px] text-[#46d369] font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#46d369] animate-pulse"></span> 4 Online</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <div className="bg-[#333]/50 text-white/60 text-[12px] text-center py-2 rounded-md font-medium">
              You joined the watch party.
            </div>
            
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[11px] text-white/50 font-semibold ml-1">Emma</span>
              <div className="bg-[#333] px-3 py-2 rounded-[8px] rounded-tl-none text-[13px] text-white">
                Whoa, this quality is insane! 4K looks so good on here.
              </div>
            </div>
            
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[11px] text-white/50 font-semibold ml-1">David</span>
              <div className="bg-[#333] px-3 py-2 rounded-[8px] rounded-tl-none text-[13px] text-white">
                Wait until the next scene... no spoilers! 🤫
              </div>
            </div>
            
            <div className="flex flex-col gap-1 items-end self-end">
              <span className="text-[11px] text-eterna-red/80 font-semibold mr-1">You</span>
              <div className="bg-eterna-red px-3 py-2 rounded-[8px] rounded-tr-none text-[13px] text-white">
                Haha can't wait!
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#141414] border-t border-[#333]">
            <form onSubmit={sendChat} className="flex gap-2">
              <input 
                type="text" 
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                placeholder="Say something..." 
                className="flex-1 bg-[#2b2b2b] text-white text-[14px] rounded-full px-4 py-2 outline-none focus:bg-[#383838] transition-colors placeholder:text-white/40"
              />
              <button 
                type="submit" 
                disabled={!chatMsg.trim()}
                className="w-[36px] h-[36px] rounded-full bg-eterna-red flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-eterna-rose transition-colors shrink-0"
              >
                <div className="w-[14px] h-[14px] bg-white rounded-sm transform rotate-45 ml-[-2px]"></div>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* <BottomNav /> -> Mobile bottom nav in player is often hidden, let's omit it for immersiveness */}
    </div>
  );
}
