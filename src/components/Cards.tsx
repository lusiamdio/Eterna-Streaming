import { Play, Sparkles, Users, Info, Plus } from "lucide-react";
import { Content } from "../types";
import { useAppStore } from "../lib/store";

interface ContentCardProps {
  key?: string | number;
  content: Content;
  wide?: boolean;
}

export function ContentCard({ content, wide }: ContentCardProps) {
  const { setContent, go } = useAppStore();

  const handleSelect = () => {
    setContent(content);
    go('details');
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setContent(content);
    go('player');
  };

  const tvBadge = () => {
    if (!content.tag) return null;
    const colors = {
      new: 'bg-grad text-white',
      hot: 'bg-eterna-gold text-black',
      '4k': 'bg-eterna-violet text-white',
    };
    const labels = {
      new: 'NEW',
      hot: 'HOT',
      '4k': '4K',
    };
    return (
      <div className={`absolute top-2 left-2 text-[9px] px-2 py-0.5 rounded shadow-lg font-bold tracking-[0.5px] ${colors[content.tag as keyof typeof colors]}`}>
        {labels[content.tag as keyof typeof labels]}
      </div>
    );
  };

  const aiScore = Math.floor(Math.random() * (99 - 85) + 85);
  const primaryGenre = content.genres ? content.genres[0] : 'Drama';

  if (wide) {
    // Generate a pseudo-random progress based on ID for visual variety
    const progress = Math.round((content.id * 17) % 60 + 10);
    return (
      <div className="shrink-0 w-[240px] md:w-[280px] h-[140px] md:h-[160px] glass-panel rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-transparent hover:border-white/20" onClick={handleSelect}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 flex flex-col justify-end px-[16px] py-[14px]">
             
             <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
               <div className="flex items-center gap-2 mb-2 text-[10px] uppercase font-bold tracking-wider">
                 <span className="text-eterna-rose flex items-center gap-1"><Sparkles className="w-3 h-3"/> AI {aiScore}%</span>
               </div>
               <div className="h-[3px] bg-white/10 rounded-full mb-[6px] overflow-hidden">
                 <div className="h-full bg-grad rounded-full" style={{ width: `${progress}%` }}></div>
               </div>
               <p className="font-sans font-bold text-[15px] text-white whitespace-nowrap overflow-hidden text-ellipsis leading-tight drop-shadow-md">{content.title}</p>
               <p className="text-[11px] text-white/50">{content.sub}</p>
               
               <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform" onClick={handlePlay}>
                     <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                     <Plus className="w-4 h-4" />
                  </button>
               </div>
             </div>
        </div>
        <div className="w-full h-full flex items-center justify-center text-[60px] transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50 mt-[-20px] bg-[#1a1a2e]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay"></div>
          <span className="relative z-10 drop-shadow-2xl">{content.emoji}</span>
        </div>
        {tvBadge()}
      </div>
    );
  }

  return (
    <div className="flex-none w-[140px] md:w-[160px] h-[210px] md:h-[240px] glass-panel rounded-xl relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-transparent hover:border-eterna-rose/50" onClick={handleSelect}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 flex flex-col justify-end p-[12px] group-hover:via-black/60 transition-colors duration-500">
        
        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2 text-[9px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-eterna-rose flex items-center gap-1"><Sparkles className="w-3 h-3"/> {aiScore}</span>
            <span className="text-eterna-violet flex items-center gap-1"><Users className="w-3 h-3" /> {content.rating || '8.5'}</span>
          </div>

          <p className="font-sans font-bold text-[14px] text-white leading-tight overflow-hidden text-ellipsis whitespace-nowrap mb-1 drop-shadow-md">{content.title}</p>
          <div className="flex items-center gap-2 text-[10px] text-white/50 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="border border-white/20 px-1.5 py-0.5 rounded">{primaryGenre}</span>
            <span>{content.sub}</span>
          </div>

          <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <button className="flex-1 h-8 rounded bg-white text-black text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors" onClick={handlePlay}>
                <Play className="w-3 h-3 fill-current" /> Play
            </button>
            <button className="w-8 h-8 rounded bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full h-full flex items-center justify-center text-[70px] transition-transform duration-700 group-hover:scale-125 group-hover:-translate-y-4 group-hover:brightness-50 mt-[-20px] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale group-hover:grayscale-0 transition-all duration-700 mix-blend-overlay"></div>
        <span className="relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">{content.emoji}</span>
      </div>
      {tvBadge()}
    </div>
  );
}
