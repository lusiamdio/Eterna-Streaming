import { Crown, Play, Info, ArrowRight, ArrowUp, Plus, Sparkles, MessageCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
import { ContentCard } from "../components/Cards";
// import { CATALOG } from "../lib/data";

import { Content } from "../types";

export function HomeScreen() {
  const { go, setContent, toggleMyList, catalog, continueWatching, myList } = useAppStore();
  const heroC = catalog[0];
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const doPlayHero = () => {
    setContent(heroC);
    go('player');
  };

  const doDetailHero = () => {
    setContent(heroC);
    go('details');
  };

  const [aiRecommendedContent, setAiRecommendedContent] = useState<Content[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // If user has no history, don't ping AI yet to save tokens, just use fallback
      const history = [...new Set([...myList, ...continueWatching])];
      if (history.length === 0) {
        setAiRecommendedContent(catalog.slice(1, 7));
        return;
      }
      
      setIsAiLoading(true);
      try {
        const historyDetails = history.map(id => {
          const c = catalog.find(x => x.id === id);
          return c ? { id: c.id, title: c.title, genres: c.genres } : null;
        }).filter(Boolean);

        const response = await fetch('/api/gemini/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: historyDetails, catalog })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.recommendedIds && Array.isArray(data.recommendedIds)) {
            const recommended = data.recommendedIds.map((id: number) => catalog.find(c => c.id === id)).filter(Boolean);
            if (recommended.length > 0) {
              setAiRecommendedContent(recommended);
              return;
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch AI recommendations", err);
      } finally {
        setIsAiLoading(false);
      }
    };

    fetchRecommendations();
  }, [myList, continueWatching, catalog]);

  // Personalized Recommendation Logic Fallback
  let recommendedContent = aiRecommendedContent.length > 0 ? aiRecommendedContent : catalog.slice(1, 7);

  return (
    <div className="flex flex-col min-h-screen relative bg-eterna-bg selection:bg-eterna-gold selection:text-black">
      <TopNav />
      {/* Dynamic Cinematic Hero */}
      <div className="h-[85vh] relative flex flex-col justify-end p-[0_24px_48px] md:p-[0_48px_64px] overflow-hidden -mt-[88px]">
        {/* Cinematic background video/image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1600&auto=format&fit=crop')]" style={{ transform: 'scale(1.05)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
          {/* Ambient Lighting */}
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-eterna-rose/20 blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-eterna-violet/10 blur-[120px] mix-blend-screen" />
        </div>
        
        <div className="relative z-10 max-w-[700px] animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-[80px]">
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-eterna-rose font-mono text-[12px] md:text-[14px] uppercase tracking-[4px] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Featured Film
            </span>
            <div className="flex items-center gap-3 text-white/50 text-[12px] font-mono bg-black/40 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
              <span>Trailer Playing Softly</span>
              <span className="w-2 h-2 rounded-full bg-eterna-violet animate-pulse" />
            </div>
          </div>
          
          <div className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-white mb-6 drop-shadow-2xl">
            {heroC.title}
          </div>
          <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl font-light">
            {heroC.desc}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-white text-black hover:bg-white/90 px-8 py-3.5 rounded-full flex items-center gap-3 font-bold shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-all text-lg" onClick={doPlayHero}>
              <Play className="w-5 h-5 fill-current" /> Watch Now
            </button>
            <button className="ui-button px-8 py-3.5 rounded-full font-bold flex items-center gap-2 text-lg hover:bg-white/10" onClick={() => toggleMyList(heroC.id)}>
              <Plus className="w-5 h-5" /> Add to My List
            </button>
            <button className="px-6 py-3 font-semibold text-white/50 hover:text-white transition-colors border border-white/0 hover:border-white/10 rounded-full" onClick={() => go('director')}>
              Meet the Director
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-20 pb-12 space-y-4">
        {myList.length > 0 && (
          <Section title="My List" data={catalog.filter(c => myList.includes(c.id))} />
        )}
        <Section title="Trending Now" data={catalog.slice(0, 8)} />
        <Section title="Popular on Eterna" data={catalog.slice(4, 9)} />
        {continueWatching.length > 0 && (
          <Section title="Continue Watching" data={continueWatching.map(id => catalog.find(c => c.id === id)).filter(Boolean) as Content[]} wide />
        )}
        <Section title="New Releases" data={catalog.filter(c => c.tag === 'new')} />
        <Section title="Recommended for You" badge={isAiLoading ? "AI Thinking..." : "AI Matched"} data={recommendedContent} />
      </div>

      {/* Nova AI Companion */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[200] group">
         <div className="absolute -inset-2 bg-gradient-to-r from-eterna-rose to-eterna-violet rounded-full blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
         <button className="relative w-14 h-14 md:w-16 md:h-16 bg-[#0a0a0a] border border-white/20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer overflow-hidden backdrop-blur-xl">
             <div className="absolute inset-0 bg-grad opacity-10" />
             <div className="flex flex-col items-center justify-center">
               <span className="w-3 h-3 rounded-full bg-eterna-rose mb-1 animate-ping" />
               <span className="text-[9px] font-bold text-eterna-rose tracking-wider">NOVA AI</span>
             </div>
         </button>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-[100px] right-[24px] md:right-[40px] w-[50px] h-[50px] rounded-full glass flex items-center justify-center shadow-lg z-[150] hover:bg-white/10 transition-all animate-in fade-in slide-in-from-bottom-4"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}

      <BottomNav />
    </div>
  );
}

function Section({ title, badge, data, wide }: { title: string, badge?: string, data: Content[], wide?: boolean }) {
  const { go, setContent } = useAppStore();
  return (
    <div className="px-[24px] md:px-[48px] pb-[40px] relative z-20">
      <div className="flex items-center gap-[12px] mb-[16px] group cursor-pointer w-fit" onClick={() => go('search')}>
        <div className="text-[22px] md:text-[24px] font-bold tracking-tight text-white">{title}</div>
        {badge && (
          <div className="px-2 py-0.5 bg-grad text-white text-[11px] font-bold rounded">
            {badge}
          </div>
        )}
        <div className="text-[14px] font-semibold text-eterna-rose opacity-0 group-hover:opacity-100 flex items-center transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
          Explore All <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
      <div className="flex gap-[16px] overflow-x-auto pb-[16px] hide-scrollbar overscroll-x-contain snap-x">
        {data.map((item, i) => (
           <motion.div 
             key={item.id} 
             className="snap-start shrink-0"
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, amount: 0.1 }}
             transition={{ duration: 0.5, delay: i * 0.05 }}
           >
             <ContentCard content={item} wide={wide} />
           </motion.div>
        ))}
      </div>
    </div>
  );
}

