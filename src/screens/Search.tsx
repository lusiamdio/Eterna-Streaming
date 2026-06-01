import { useState, useMemo, useEffect } from "react";
import { Search, Mic, Sparkles, Send } from "lucide-react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
import { CATALOG } from "../lib/data";

const GENRES = ['All', 'Action', 'Drama', 'Sci-Fi', 'Comedy', 'Horror', 'Thriller', 'Romance', 'Anime', 'Docs', 'Kids', 'Sports'];

export function SearchScreen() {
  const { searchQ, currentGenre, setSearch, setContent, go, showToast } = useAppStore();
  const [val, setVal] = useState(searchQ);
  const [aiMode, setAiMode] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [moodSearch, setMoodSearch] = useState("");

  const filtered = useMemo(() => {
    let res = CATALOG;
    
    // AI Mood Search Filtering Logic
    if (aiMode && aiResponse !== "") {
      const q = moodSearch.toLowerCase();
      if (q.includes("inspire") || q.includes("motivate") || q.includes("uplift") || q.includes("spirit")) {
        res = res.filter(c => c.genres.includes("Docs") || c.genres.includes("Drama"));
      } else if (q.includes("family") || q.includes("kid") || q.includes("fun")) {
        res = res.filter(c => c.genres.includes("Comedy") || c.genres.includes("Kids"));
      } else if (q.includes("business") || q.includes("lead")) {
        res = res.filter(c => c.genres.includes("Docs"));
      }
    } else {
      if (currentGenre && currentGenre !== 'All') {
        res = res.filter(c => c.genres.includes(currentGenre));
      }
      if (val) {
        const q = val.toLowerCase();
        res = res.filter(c => c.title.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q));
      }
    }
    return res;
  }, [val, currentGenre, aiMode, aiResponse, moodSearch]);

  const label = aiMode 
    ? (aiTyping ? "AI Concierge is thinking..." : aiResponse ? aiResponse : "Describe your mood...")
    : val ? `Results for "${val}"` : currentGenre !== 'All' ? `${currentGenre} Titles` : 'All Titles';

  const doVoiceSearch = () => {
    showToast('🎙 Voice search activated...');
    setTimeout(() => {
      if (aiMode) {
        setMoodSearch("I want something inspiring");
        handleAiSearch("I want something inspiring");
      } else {
        setVal('Action');
        setSearch('Action', 'All');
        showToast('Searching for "Action"');
      }
    }, 1200);
  };

  const handleAiSearch = (q: string = moodSearch) => {
    if (!q) return;
    setAiTyping(true);
    setAiResponse("");
    setTimeout(() => {
      setAiTyping(false);
      setAiResponse(`Based on your mood, I found these ${q.includes('inspire') ? 'uplifting' : q.includes('family') ? 'fun' : 'perfect'} titles for you:`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg pb-[50px]">
      <TopNav showBack title="Eterna" />
      
      <div className="px-[20px] pt-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-end mb-2">
          <h1 className="text-[24px] font-bold text-white tracking-tight">{aiMode ? 'AI Concierge' : 'Search'}</h1>
          <button 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${aiMode ? 'bg-[#46d369]/20 text-[#46d369] border border-[#46d369]/40' : 'bg-[#222] text-white/70 border border-white/10 hover:text-white'}`}
            onClick={() => {
              setAiMode(!aiMode);
              setAiResponse("");
              setAiTyping(false);
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Smart Mood Search
          </button>
        </div>

        {/* Search Bar */}
        {aiMode ? (
          <div className="flex items-center gap-[9px] bg-gradient-to-r from-[#031d10] to-[#011409] border-[1.5px] border-[#46d369]/60 rounded-[9px] p-[10px_14px] mb-[16px] shadow-[0_0_15px_rgba(70,211,105,0.1)]">
            <Sparkles className="w-[18px] h-[18px] text-[#46d369] shrink-0 animate-pulse" />
            <input 
              type="text" 
              value={moodSearch}
              onChange={(e) => setMoodSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
              placeholder="E.g., 'I want something inspiring for family night'" 
              className="flex-1 bg-transparent border-none text-[#e0ffe8] text-[15px] font-sans outline-none placeholder:text-[#46d369]/50"
            />
            {moodSearch && (
              <button className="flex items-center justify-center p-[6px] rounded-full bg-[#46d369]/20 text-[#46d369] hover:bg-[#46d369]/30 transition-colors" onClick={() => handleAiSearch()}>
                <Send className="w-[14px] h-[14px]" />
              </button>
            )}
            <button className="flex items-center justify-center p-[4px] rounded-[4px] text-eterna-muted hover:text-[#46d369] transition-colors" onClick={doVoiceSearch}>
              <Mic className="w-[18px] h-[18px]" />
            </button>
          </div>
        ) : (
          <div className="relative z-50">
            <div className="flex items-center gap-[9px] bg-[#222] border-[1.5px] border-white/10 rounded-[9px] p-[9px_14px] mb-[16px] focus-within:border-white/30 transition-colors relative z-20">
              <Search className="w-[18px] h-[18px] text-white/50 shrink-0" />
              <input 
                type="text" 
                value={val}
                onChange={(e) => {
                  setVal(e.target.value);
                  setSearch(e.target.value, currentGenre);
                }}
                placeholder="Search titles, genres, actors..." 
                className="flex-1 bg-transparent border-none text-white text-[15px] font-sans outline-none placeholder:text-white/40"
              />
              <button className="flex items-center justify-center p-[4px] rounded-[4px] text-white/50 hover:text-white hover:bg-white/5" onClick={doVoiceSearch}>
                <Mic className="w-[18px] h-[18px]" />
              </button>
            </div>
            
            {/* Dropdown for typing suggestions */}
            {!aiMode && val.length > 0 && val.length < 4 && (
              <div className="absolute top-[100%] left-0 right-0 bg-[#2b2b2b] border border-white/10 rounded-b-[8px] shadow-2xl overflow-hidden mt-[-16px] pt-[16px] z-10 transition-all animate-in slide-in-from-top-2">
                <div className="p-3">
                  <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">Trending Suggestions</div>
                  {['Action Movies', 'Sci-Fi Adventures', 'Award-Winning Dramas'].filter(s => s.toLowerCase().includes(val.toLowerCase())).map((suggestion, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors"
                      onClick={() => { setVal(suggestion); setSearch(suggestion, currentGenre); }}
                    >
                      <Search className="w-4 h-4 text-white/40" />
                      <span className="text-[14px] font-medium text-white/90">{suggestion}</span>
                    </div>
                  ))}
                  <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mt-4 mb-2">Top Searched Content</div>
                  {['Interstellar', 'The Dark Knight', 'Stranger Things'].filter(s => s.toLowerCase().includes(val.toLowerCase())).map((suggestion, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors"
                      onClick={() => { setVal(suggestion); setSearch(suggestion, currentGenre); }}
                    >
                      <Search className="w-4 h-4 text-[#46d369]/70" />
                      <span className="text-[14px] font-medium text-white/90">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {!aiMode && (
          <div className="flex gap-[8px] flex-wrap mb-[24px]">
            {GENRES.map(g => (
              <div 
                key={g}
                onClick={() => setSearch(val, g)}
                className={`px-[16px] py-[6px] rounded-[4px] text-[13px] cursor-pointer border transition-all ${currentGenre === g ? 'bg-white border-white text-black font-semibold' : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'}`}
              >
                {g}
              </div>
            ))}
          </div>
        )}

        <div className={`text-[14px] font-semibold mb-[14px] ${aiMode && aiResponse ? 'text-[#46d369]' : 'text-white'}`}>
          {label}
        </div>
        
        {/* Grid Results */}
        <div className={`grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[12px] transition-opacity duration-300 ${aiTyping ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          {filtered.map(c => (
             <div 
               key={c.id} 
               className="cursor-pointer group"
               onClick={() => {
                 setContent(c);
                 go('details');
               }}
             >
               <div className="aspect-[2/3] rounded-[4px] bg-[#222] flex items-center justify-center text-[42px] mb-[8px] relative overflow-hidden group-hover:ring-2 ring-white/50 transition-all">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                 <div className="absolute text-[42px] transition-transform duration-300 group-hover:scale-110 z-0">{c.emoji}</div>
                 {c.tag && (
                    <div className="absolute top-[8px] left-[8px] text-[10px] bg-eterna-red text-white px-[6px] py-[2px] rounded-sm font-bold uppercase z-20 shadow-md">
                      {c.tag === 'new' ? 'NEW' : c.tag === 'hot' ? 'HOT' : '4K'}
                    </div>
                 )}
               </div>
               <div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis text-white/90">{c.title}</div>
               <div className="text-[11px] text-white/50">{c.sub} &bull; {c.rating} IMDb</div>
             </div>
          ))}
        </div>
        {filtered.length === 0 && !aiTyping && (
          <div className="text-center text-[15px] text-white/50 mt-[60px] font-light">
            No matches found. Look for something else?
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
