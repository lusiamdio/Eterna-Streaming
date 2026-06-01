import { Crown, Play, Info, ArrowRight, ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
import { ContentCard } from "../components/Cards";
import { CATALOG } from "../lib/data";

import { Content } from "../types";

export function HomeScreen() {
  const { go, setContent, watchlist } = useAppStore();
  const heroC = CATALOG[0];
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

  // Personalized Recommendation Logic
  const myGenres = new Set(
    watchlist
      .map(id => CATALOG.find(c => c.id === id))
      .filter(Boolean)
      .flatMap(c => c!.genres)
  );

  let recommendedContent = CATALOG.filter(c => 
    !watchlist.includes(c.id) && c.genres.some(g => myGenres.has(g))
  );

  if (recommendedContent.length === 0) {
    recommendedContent = CATALOG.slice(1, 7); // Fallback if no specific recommendations
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-eterna-bg overscroll-y-none pb-[50px]">
      <TopNav />
      <div className="absolute inset-0 atmosphere z-0 pointer-events-none"></div>

      {/* Hero Section */}
      <div className="h-[520px] relative flex flex-col justify-end p-[0_32px_28px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-[60px] text-[200px] opacity-[0.15] pointer-events-none select-none">
          {heroC.emoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-[500px]">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-0.5 border border-eterna-gold text-eterna-gold text-[9px] uppercase tracking-widest font-bold">Featured</span>
            <span className="text-[11px] opacity-60 uppercase tracking-widest">• 4K Ultra HD</span>
            <span className="text-[11px] opacity-60 uppercase tracking-widest">• {heroC.rating} IMDb</span>
          </div>
          <div className="font-sans text-5xl font-bold leading-tight text-white mb-4">
            {heroC.title}
          </div>
          <div className="text-[14px] font-medium text-white/90 mb-6 max-w-lg leading-relaxed drop-shadow-md">
            {heroC.desc}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-[15px] font-semibold rounded-[4px] hover:bg-white/80 transition-colors" onClick={doPlayHero}>
              <Play className="w-6 h-6 fill-current" /> Play
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-500/70 text-white text-[15px] font-semibold rounded-[4px] hover:bg-gray-500/50 transition-colors" onClick={doDetailHero}>
              <Info className="w-6 h-6" /> More Info
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Section title="Trending Now" data={CATALOG.slice(0, 8)} />
        <Section title="Popular on Eterna" data={CATALOG.slice(4, 9)} />
        <Section title="Continue Watching" data={CATALOG.slice(2, 6)} wide />
        <Section title="New Releases" data={CATALOG.filter(c => c.tag === 'new')} />
        <Section title="Recommended for You" data={recommendedContent} />
      </div>

      <BottomNav />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-[40px] right-[40px] w-[50px] h-[50px] rounded-full bg-eterna-red text-white flex items-center justify-center shadow-[0_4px_20px_rgba(229,9,20,0.4)] z-[200] hover:bg-eterna-rose transition-all animate-in fade-in slide-in-from-bottom-4"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

function Section({ title, badge, data, wide }: { title: string, badge?: string, data: Content[], wide?: boolean }) {
  const { go } = useAppStore();
  return (
    <div className="px-[20px] pb-[40px] relative z-20">
      <div className="flex items-center gap-[10px] mb-[12px] group cursor-pointer w-fit" onClick={() => go('search')}>
        <div className="text-[20px] font-semibold tracking-wide text-white">{title}</div>
        {badge && (
          <div className="px-1.5 py-0.5 bg-eterna-rose text-white text-[10px] font-bold rounded-sm">
            {badge}
          </div>
        )}
        <div className="text-[12px] font-semibold text-[#54b9c5] opacity-0 group-hover:opacity-100 flex items-center transition-opacity">
          Explore All <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
      <div className="flex gap-[10px] overflow-x-auto pb-[6px] hide-scrollbar">
        {data.map(item => <ContentCard key={item.id} content={item} wide={wide} />)}
      </div>
    </div>
  );
}
