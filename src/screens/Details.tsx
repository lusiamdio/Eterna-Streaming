import { Play, Download, Plus, Heart, Share2, ArrowDownUp, Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
import { CATALOG } from "../lib/data";
import { ContentCard } from "../components/Cards";
import React, { useState, useEffect } from "react";

export function DetailsScreen() {
  const { currentContent: c, toggleWatchlist, watchlist, showToast, addDownload, downloads, go } = useAppStore();
  const [epSortDesc, setEpSortDesc] = useState(false);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [heroMuted, setHeroMuted] = useState(true);
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  const [expandedEp, setExpandedEp] = useState<number | null>(null);

  useEffect(() => {
    setTrailerPlaying(false);
    const t = setTimeout(() => setTrailerPlaying(true), 800);
    return () => clearTimeout(t);
  }, [c?.id]);

  if (!c) return null;

  const inWL = watchlist.includes(c.id);

  const doDownload = () => {
    const exists = downloads.find(d => d.id === 'dl_' + c.id);
    if(exists) { showToast('Already downloaded: '+c.title); return; }
    addDownload({ emoji: c.emoji, title: c.title+(c.eps?' S1:E1':''), meta: c.sub+' · Downloading…', size: '2.1 GB', prog: 0, id: 'dl_'+c.id });
    showToast('Downloading: ' + c.title + '…');
  };

  const doPlayFromDetails = () => {
    go('player');
  };

  const playEpisode = (n: number) => {
    go('player');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://eterna.tv/title/${c.id}`).then(() => {
      showToast('Link copied to clipboard!');
    }).catch(() => {
      showToast('Failed to copy link');
    });
  };

  const displayedEpisodes = c.episodes ? [...c.episodes].sort((a, b) => epSortDesc ? b.n - a.n : a.n - b.n) : [];
  
  const similar = CATALOG.filter(item => 
    item.id !== c.id && 
    (filterGenre ? item.genres.includes(filterGenre) : item.genres.some(g => c.genres.includes(g)))
  ).slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg pb-[50px]">
      <TopNav 
        showBack 
        title=""
        showProfile={false}
        customRight={
          <>
            <button className={`w-[34px] h-[34px] rounded-[7px] flex items-center justify-center transition-colors ${inWL ? 'text-eterna-rose' : 'text-eterna-muted hover:text-white hover:bg-white/5'}`} onClick={() => toggleWatchlist(c.id)}>
              <Heart className="w-[18px] h-[18px]" fill={inWL ? 'currentColor' : 'none'} />
            </button>
            <button className="w-[34px] h-[34px] rounded-[7px] flex items-center justify-center text-eterna-muted hover:text-white hover:bg-white/5 transition-colors" onClick={handleCopyLink}>
              <Share2 className="w-[18px] h-[18px]" />
            </button>
          </>
        }
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Details Hero */}
        <div className="h-[400px] sm:h-[500px] lg:h-[600px] relative flex flex-col justify-end p-[20px_28px] overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 atmosphere z-0 pointer-events-none"></div>
          
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {trailerPlaying ? (
              <video 
                autoPlay 
                loop 
                muted={heroMuted}
                playsInline
                className="w-full h-full object-cover opacity-60 scale-105"
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[210px] opacity-10">
                {c.emoji}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-eterna-bg via-transparent to-black/30"></div>
          </div>
          
          {trailerPlaying && (
            <button 
              className="absolute top-[80px] right-[28px] z-20 w-[40px] h-[40px] rounded-full border border-white/30 bg-black/40 flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto"
              onClick={() => setHeroMuted(!heroMuted)}
            >
              {heroMuted ? <VolumeX className="w-[18px] h-[18px]" /> : <Volume2 className="w-[18px] h-[18px]" />}
            </button>
          )}

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-eterna-bg via-eterna-bg/50 to-transparent z-0" />
          
          <div className="relative z-10 transition-all duration-700 transform translate-y-0 opacity-100">
            <div className="flex gap-[6px] mb-[8px] flex-wrap">
              {c.genres.map(g => (
                <div key={g} className="text-[11px] px-[9px] py-[2px] rounded-[4px] border border-white/20 text-eterna-muted">
                  {g}
                </div>
              ))}
            </div>
            <div className="font-sans text-[48px] font-bold leading-none mb-[6px] text-white overflow-hidden text-ellipsis">{c.title}</div>
            <div className="flex gap-[9px] items-center flex-wrap opacity-80 mt-3">
              <span className="text-[12px] font-semibold text-[#46d369]">98% Match</span>
              <span className="text-[12px]">{c.year}</span>
              <span className="px-1 py-0.5 border border-white/40 text-[10px] rounded-sm text-white/90">12+</span>
              <span className="text-[12px]">{c.eps ? c.eps + ' Episodes' : 'Movie'}</span>
              <span className="px-1 py-0.5 border border-white/40 text-[10px] rounded-sm text-white/90">4K Ultra HD</span>
            </div>
          </div>
        </div>

        <div className="p-[20px_28px] relative z-10 bg-eterna-bg">
          <div className="flex gap-[9px] mb-[18px]">
            <button className="flex-1 flex items-center justify-center gap-[7px] bg-white text-black font-semibold rounded-[4px] text-[15px] py-[10px] hover:bg-white/80 transition-colors" onClick={doPlayFromDetails}>
              <Play className="w-[20px] h-[20px] fill-current" /> Play
            </button>
            <button className="w-[48px] h-[48px] shrink-0 bg-[#2b2b2b] rounded-[4px] flex items-center justify-center hover:bg-[#3f3f3f] transition-colors" onClick={doDownload}>
              <Download className="w-[20px] h-[20px] text-white" />
            </button>
            <button className="w-[48px] h-[48px] shrink-0 bg-[#2b2b2b] rounded-[4px] flex items-center justify-center hover:bg-[#3f3f3f] transition-colors" onClick={() => toggleWatchlist(c.id)}>
              <Plus className="w-[24px] h-[24px] text-white" />
            </button>
          </div>

          <p className="text-[15px] leading-[1.6] text-white mb-[18px] max-w-2xl font-light">
            {c.desc}
          </p>

          {c.cast && c.cast.length > 0 && (
            <>
              <div className="text-[14px] font-semibold text-white mb-[10px]">Cast</div>
              <div className="flex gap-[12px] overflow-x-auto pb-[4px] mb-[22px] hide-scrollbar">
                {c.cast.map(p => (
                  <div key={p.name} className="shrink-0 text-center cursor-pointer">
                    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center text-[18px] mx-auto mb-[6px]" style={{ background: p.bg }}>
                      {p.emoji}
                    </div>
                    <div className="text-[11px] font-medium">{p.name}</div>
                    <div className="text-[10px] text-eterna-muted mt-[1px]">{p.role}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {displayedEpisodes.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-[10px]">
                <div className="text-[14px] font-semibold text-white">Episodes</div>
                <button 
                  className="text-[12px] text-eterna-muted hover:text-white transition-colors flex items-center gap-1" 
                  onClick={() => setEpSortDesc(!epSortDesc)}
                >
                  <ArrowDownUp className="w-[12px] h-[12px]" /> Sort: {epSortDesc ? 'Newest First' : 'Oldest First'}
                </button>
              </div>
              <div className="flex flex-col gap-[12px] mb-[32px]">
                {displayedEpisodes.map(e => (
                  <div key={e.n} className="flex flex-col bg-[#2b2b2b] rounded-[4px] cursor-pointer hover:bg-[#3f3f3f] transition-colors" onClick={() => playEpisode(e.n)}>
                    <div className="flex gap-[12px] items-center p-[11px_14px]">
                      <div className="font-sans text-[20px] text-eterna-hint min-w-[24px] font-bold">{e.n}</div>
                      <div className="w-[74px] h-[42px] rounded-[2px] bg-eterna-surface flex items-center justify-center text-[20px] shrink-0">
                        {e.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-medium">{e.title}</div>
                        <div className="text-[11px] text-eterna-muted mt-[2px]">{e.meta}</div>
                      </div>
                      <div className="text-[11px] text-eterna-hint">{e.dur}</div>
                      <button className="flex items-center justify-center text-eterna-text ml-2 hover:text-white" onClick={(ev) => { ev.stopPropagation(); setExpandedEp(expandedEp === e.n ? null : e.n); }}>
                        {expandedEp === e.n ? <ChevronUp className="w-[18px] h-[18px]" /> : <ChevronDown className="w-[18px] h-[18px]" />}
                      </button>
                    </div>
                    {expandedEp === e.n && (
                      <div className="px-[14px] pb-[14px] text-[13px] text-white/70 pl-[48px] border-t border-white/5 pt-2">
                        This is a brief synopsis of the episode. It describes what happens without revealing too many spoilers. Enjoy the journey as the characters overcome obstacles.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {similar.length > 0 && (
            <div className="mb-[20px]">
              <div className="flex items-center justify-between mb-[10px]">
                <div className="text-[14px] font-semibold text-white">More Like This</div>
              </div>
              <div className="flex gap-[8px] flex-wrap mb-[16px]">
                <div 
                  className={`px-[12px] py-[4px] rounded-full text-[12px] cursor-pointer transition-all border ${filterGenre === null ? 'bg-white text-black border-white font-medium' : 'bg-transparent text-white/70 border-white/20 hover:border-white/50'}`}
                  onClick={() => setFilterGenre(null)}
                >
                  All
                </div>
                {c.genres.map(g => (
                  <div 
                    key={g} 
                    className={`px-[12px] py-[4px] rounded-full text-[12px] cursor-pointer transition-all border ${filterGenre === g ? 'bg-white text-black border-white font-medium' : 'bg-transparent text-white/70 border-white/20 hover:border-white/50'}`}
                    onClick={() => setFilterGenre(g)}
                  >
                    {g}
                  </div>
                ))}
              </div>
              <div className="flex gap-[10px] flex-wrap">
                {similar.map(item => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
