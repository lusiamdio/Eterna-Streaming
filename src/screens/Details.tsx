import { Play, Download, Plus, Heart, Share2, ArrowDownUp, Volume2, VolumeX, ChevronDown, ChevronUp, Users, Globe, Star } from "lucide-react";
import { useAppStore, Review } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
// import { CATALOG } from "../lib/data";
import { ContentCard } from "../components/Cards";
import React, { useState, useEffect } from "react";

import { fetchMainActors, fetchActorNews } from "../lib/api";

function CommunityReviews({ contentId }: { contentId: number }) {
  const { reviews, addReview, user, showToast } = useAppStore();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const contentReviews = reviews.filter(r => r.contentId === contentId);
  const avgRating = contentReviews.length > 0 
    ? (contentReviews.reduce((a, b) => a + b.rating, 0) / contentReviews.length).toFixed(1) 
    : "No Ratings Yet";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("Please sign in or create a profile to leave a review.");
      return;
    }
    if (!text.trim()) {
      showToast("Please enter a review text.");
      return;
    }
    addReview({
      contentId,
      userId: user.email, // using email as ID for local mock
      userName: user.name,
      rating,
      text
    });
    setRating(5);
    setText("");
  };

  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-white/5 mb-[32px]">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <h2 className="font-bold text-lg uppercase tracking-wider flex items-center gap-2">
          <Star className="text-eterna-gold w-5 h-5 fill-current" />
          Community Reviews
        </h2>
        <div className="text-right">
          <div className="text-2xl font-black text-eterna-gold">{avgRating}</div>
          <div className="text-xs text-white/50">{contentReviews.length} Reviews</div>
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8 border border-white/10 p-4 rounded-xl bg-black/40">
        <h3 className="text-sm font-bold mb-3 text-white/80">Rate & Review</h3>
        <div className="flex gap-2 mb-4">
          {[1,2,3,4,5].map(star => (
            <button 
              key={star} 
              type="button" 
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star className={`w-8 h-8 ${rating >= star ? 'text-eterna-gold fill-current drop-shadow-[0_0_10px_rgba(245,176,65,0.6)]' : 'text-white/20'}`} />
            </button>
          ))}
        </div>
        <textarea 
          placeholder="Share your thoughts about this title..." 
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white mb-3 outline-none focus:border-eterna-gold transition-colors resize-none h-[80px]"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-white/40 italic">Note: Reviews are synced globally.</p>
          <button type="submit" className="bg-eterna-gold text-black font-bold px-6 py-2 rounded-full text-sm hover:shadow-[0_0_15px_rgba(245,176,65,0.4)] transition-all">
            Post Review
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {contentReviews.slice().reverse().map(r => (
          <div key={r.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eterna-gold to-eterna-rose flex items-center justify-center font-bold text-sm shrink-0">
              {r.userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <div className="font-bold text-sm">{r.userName}</div>
                  <div className="text-xs text-white/40">{new Date(r.timestamp).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'text-eterna-gold fill-current' : 'text-white/20'}`} />
                   ))}
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-light">{r.text}</p>
            </div>
          </div>
        ))}
        {contentReviews.length === 0 && (
          <div className="text-center p-6 text-white/40 italic text-sm">
            Be the first to review this title.
          </div>
        )}
      </div>
    </div>
  );
}

function IMDbIntelligence() {
  const [movieId, setMovieId] = useState('tt0000002');
  const [actors, setActors] = useState<any[]>([]);
  const [loadingActors, setLoadingActors] = useState(false);
  const [selectedActor, setSelectedActor] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  const handleFetchActors = async () => {
    setLoadingActors(true);
    setActors([]);
    setSelectedActor(null);
    setNews([]);
    try {
      const results = await fetchMainActors(movieId);
      if (results.length > 0) {
        setActors(results);
      } else {
        alert("No actors found or API error.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch actors.");
    } finally {
      setLoadingActors(false);
    }
  };

  const handleFetchNews = async (actorId: string, actorName: string) => {
    setLoadingNews(true);
    setSelectedActor(actorName);
    setNews([]);
    try {
      const newsResults = await fetchActorNews(actorId);
      if (newsResults.length > 0) {
        setNews(newsResults);
      } else {
        alert("No news found for this actor.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch news.");
    } finally {
      setLoadingNews(false);
    }
  };

  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-white/5 mb-[32px]">
      <h2 className="font-bold text-lg mb-4 uppercase tracking-wider flex items-center gap-2">
         <Globe className="text-eterna-rose w-5 h-5" /> 
         Global Talent & News
      </h2>
      <p className="text-sm text-white/50 mb-6">Explore the real-time casting and news linked to this world.</p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
         <input 
           type="text" 
           value={movieId} 
           onChange={e => setMovieId(e.target.value)} 
           placeholder="Enter IMDb Title ID (e.g. tt0000002)" 
           className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 font-mono text-sm w-full text-white outline-none focus:border-eterna-rose transition-colors"
         />
         <button 
           onClick={handleFetchActors} 
           disabled={loadingActors}
           className="bg-white/10 hover:bg-white/20 whitespace-nowrap px-6 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
         >
           {loadingActors ? "Scanning..." : "Fetch Lead Actors"}
         </button>
      </div>

      {loadingActors && (
         <div className="mb-8">
            <h3 className="font-bold text-xs text-white/40 uppercase tracking-widest mb-4">Scanning Network...</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
               {[1, 2, 3, 4].map(idx => (
                 <div key={idx} className="shrink-0 rounded-xl p-3 flex flex-col items-center gap-2 w-[100px] animate-pulse bg-white/5">
                    <div className="w-12 h-12 rounded-full bg-white/10" />
                    <div className="h-3 bg-white/10 w-16 rounded mt-1" />
                    <div className="h-2 bg-white/10 w-10 rounded mt-0.5" />
                 </div>
               ))}
            </div>
         </div>
      )}

      {!loadingActors && actors.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-xs text-white/70 uppercase tracking-widest mb-4">Identified Talent Profiles</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
             {actors.map((actor: any, idx: number) => {
                const actorId = actor.name.id;
                const actorName = actor.name.nameText?.text;
                const primaryImg = actor.name.primaryImage?.url;
                return (
                  <button 
                    key={idx} 
                    onClick={() => handleFetchNews(actorId, actorName)}
                    className="shrink-0 bg-black/40 hover:bg-white/10 border border-white/5 hover:border-eterna-rose rounded-xl p-3 flex flex-col items-center gap-2 transition-all w-[100px] text-center"
                  >
                     {primaryImg ? (
                        <img src={primaryImg} alt={actorName} className="w-12 h-12 rounded-full object-cover" />
                     ) : (
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-white/40" />
                        </div>
                     )}
                     <div>
                       <div className="font-bold text-xs line-clamp-1">{actorName}</div>
                       <div className="text-[10px] text-white/40 font-mono mt-0.5">{actorId}</div>
                     </div>
                  </button>
                )
             })}
          </div>
        </div>
      )}

      {loadingNews && (
         <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
            <h3 className="font-bold text-sm mb-4 animate-pulse text-white/50">Live Intelligence: {selectedActor}...</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 snap-x">
               {[1, 2, 3].map(idx => (
                 <div key={idx} className="w-[240px] shrink-0 snap-center rounded-xl bg-white/5 h-[200px] animate-pulse" />
               ))}
            </div>
         </div>
      )}

      {!loadingNews && news.length > 0 && (
         <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
            <h3 className="font-bold text-sm mb-4 text-eterna-rose">
               Live Intelligence: {selectedActor}
            </h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 snap-x">
               {news.slice(0, 6).map((item: any, i: number) => (
                  <a key={i} href={item.url} target="_blank" rel="noreferrer" className="block w-[240px] shrink-0 snap-center group">
                     <div className="overflow-hidden rounded-xl border border-white/5 bg-[#111] h-[200px] flex flex-col hover:border-eterna-violet transition-colors">
                        {item.image && <img src={item.image.url} alt={item.itemTitle} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500" />}
                        <div className="p-3 flex-1 flex flex-col overflow-hidden">
                           <div className="text-[10px] text-eterna-violet font-bold mb-1">{item.source?.text}</div>
                           <h4 className="font-bold text-xs mb-1 group-hover:underline text-white/90 line-clamp-3 leading-snug">{item.itemTitle}</h4>
                           <div className="mt-auto text-[9px] text-white/40 font-mono">
                             {new Date(item.date).toLocaleDateString()}
                           </div>
                        </div>
                     </div>
                  </a>
               ))}
            </div>
         </div>
      )}
    </div>
  );
}

export function DetailsScreen() {
  const { currentContent: c, toggleWatchlist, watchlist, showToast, addDownload, downloads, go, catalog } = useAppStore();
  const [epSortDesc, setEpSortDesc] = useState(false);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [heroMuted, setHeroMuted] = useState(true);
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  const [expandedEp, setExpandedEp] = useState<number | null>(null);
  const [isPip, setIsPip] = useState(false);

  useEffect(() => {
    setTrailerPlaying(false);
    const t = setTimeout(() => setTrailerPlaying(true), 800);
    return () => clearTimeout(t);
  }, [c?.id]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop > 350) {
        setIsPip(true);
      } else {
        setIsPip(false);
      }
    };
    const scroller = document.getElementById('details-scroll-container');
    scroller?.addEventListener('scroll', handleScroll);
    return () => scroller?.removeEventListener('scroll', handleScroll);
  }, []);

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
  
  const similar = catalog.filter(item => 
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
      
      <div id="details-scroll-container" className="flex-1 overflow-y-auto">
        {/* Details Hero */}
        <div className="h-[400px] sm:h-[500px] lg:h-[600px] relative flex flex-col justify-end p-[20px_28px] overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 atmosphere z-0 pointer-events-none"></div>
          
          <div className={`absolute inset-0 pointer-events-none overflow-hidden pb-4 ${isPip ? 'visible z-[100]' : 'z-0'}`}>
            {trailerPlaying ? (
              <video 
                autoPlay 
                loop 
                muted={heroMuted}
                playsInline
                className={`object-cover transition-all duration-300 pointer-events-auto shadow-2xl ${isPip ? 'fixed bottom-[80px] right-[24px] w-[240px] h-[135px] rounded-xl border border-white/20' : 'w-full h-full opacity-60 scale-105'}`}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" 
                onClick={isPip ? doPlayFromDetails : undefined}
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
              <CommunityReviews contentId={c.id} />
              <IMDbIntelligence />
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
