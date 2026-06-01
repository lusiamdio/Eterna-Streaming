import { Play } from "lucide-react";
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

  const tvBadge = () => {
    if (!content.tag) return null;
    const colors = {
      new: 'bg-eterna-rose text-white',
      hot: 'bg-eterna-gold text-black',
      '4k': 'bg-eterna-violet text-white',
    };
    const labels = {
      new: 'NEW',
      hot: 'HOT',
      '4k': '4K',
    };
    return (
      <div className={`absolute top-[7px] left-[7px] text-[9px] px-[6px] py-[2px] rounded-[3px] font-bold tracking-[0.5px] ${colors[content.tag as keyof typeof colors]}`}>
        {labels[content.tag as keyof typeof labels]}
      </div>
    );
  };

  if (wide) {
    // Generate a pseudo-random progress based on ID for visual variety
    const progress = Math.round((content.id * 17) % 60 + 10);
    return (
      <div className="shrink-0 w-[260px] h-[148px] glass rounded-sm relative overflow-hidden group cursor-pointer" onClick={handleSelect}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 flex items-end px-[12px] py-[10px]">
             <div className="flex-1">
             <div className="h-[3px] bg-white/15 rounded-[2px] mb-[4px]">
               <div className="h-full rounded-[2px] bg-eterna-red" style={{ width: `${progress}%` }}></div>
             </div>
             <p className="font-sans font-medium text-[14px] text-white whitespace-nowrap overflow-hidden text-ellipsis leading-tight">{content.title}</p>
             <p className="text-[10px] text-white/50">{content.sub}</p>
           </div>
        </div>
        <div className="w-full h-full flex items-center justify-center text-[42px] transition-transform duration-250 group-hover:scale-105 opacity-80 mt-[-10px] bg-[#222]">
          {content.emoji}
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>
        {tvBadge()}
      </div>
    );
  }

  return (
    <div className="flex-none w-[148px] h-[218px] bg-[#222] rounded-sm relative overflow-hidden group cursor-pointer" onClick={handleSelect}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 flex items-end p-[10px]">
        <div className="w-full">
          <p className="font-sans font-medium text-[13px] text-white leading-tight overflow-hidden text-ellipsis whitespace-nowrap mb-1">{content.title}</p>
          <p className="text-[10px] text-white/50 overflow-hidden text-ellipsis whitespace-nowrap">
            {content.sub}{content.rating ? ` \u2022 \u2B50${content.rating}` : ''}
          </p>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center text-[52px] transition-transform duration-250 group-hover:scale-105 opacity-80 mt-[-20px]">
        {content.emoji}
      </div>
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>
      {tvBadge()}
    </div>
  );
}
