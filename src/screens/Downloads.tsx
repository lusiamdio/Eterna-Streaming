import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
import { Trash2, Check } from "lucide-react";
import { useState } from "react";

export function DownloadsScreen() {
  const { downloads, clearDownloads, removeDownload, showToast } = useAppStore();
  const [modalObj, setModalObj] = useState<{title:string, desc:string, dangerLabel?:string, action?:()=>void} | null>(null);

  const totalSize = downloads.reduce((acc, d) => acc + parseFloat(d.size), 0);
  const totalLimit = 18.6;
  const pct = Math.min(Math.round((totalSize / totalLimit) * 100), 100);
  const free = (totalLimit - totalSize).toFixed(1);

  const confirmClearAll = () => {
    if (downloads.length === 0) {
      showToast('No downloads to clear');
      return;
    }
    setModalObj({
      title: 'Clear All Downloads',
      desc: `Remove all ${downloads.length} downloaded titles?`,
      dangerLabel: 'Clear All',
      action: () => {
        clearDownloads();
        setModalObj(null);
        showToast('All downloads cleared');
      }
    });
  };

  const confirmRemoveDownload = (id: string) => {
    setModalObj({
      title: 'Remove Download',
      desc: 'Remove this title from your downloads?',
      dangerLabel: 'Remove',
      action: () => {
        removeDownload(id);
        setModalObj(null);
        showToast('Download removed');
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg pb-[50px]">
      <TopNav 
        showBack title="Downloads" 
        showProfile={false} 
        customRight={<button className="px-[12px] py-[6px] rounded-[8px] bg-transparent border border-white/20 text-[12px] font-semibold hover:bg-white/5" onClick={confirmClearAll}>Clear All</button>}
      />
      
      <div className="flex-1 overflow-y-auto px-[20px]">
        
        <div className="bg-eterna-card border border-eterna-border rounded-[9px] p-[14px] my-[18px]">
          <div className="flex justify-between items-center">
            <div className="text-[13px] font-medium">Storage Used</div>
            <div className="text-[12px] text-eterna-muted">{totalSize.toFixed(1)} GB / 18.6 GB</div>
          </div>
          <div className="h-[5px] bg-white/10 rounded-[3px] my-[8px]">
            <div className="h-full bg-grad rounded-[3px] transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[11px] text-eterna-muted">{downloads.length} titles · {free} GB free</div>
        </div>

        <div className="text-[10px] tracking-[2px] uppercase text-eterna-muted mb-[10px]">Downloaded Titles</div>
        
        <div className="flex flex-col">
          {downloads.map(d => (
            <div key={d.id} className="flex gap-[12px] items-center py-[12px] border-b border-eterna-border">
              <div className="w-[68px] h-[38px] rounded-[6px] bg-eterna-card flex items-center justify-center text-[20px] shrink-0 border border-eterna-border">
                {d.emoji}
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-medium">{d.title}</div>
                <div className="text-[11px] text-eterna-muted mt-[2px]">{d.meta}</div>
                {d.prog < 100 && (
                  <div className="h-[3px] bg-white/10 rounded-[2px] mt-[5px]">
                    <div className="h-full bg-grad rounded-[2px]" style={{ width: `${d.prog}%` }} />
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[11px] text-eterna-hint mb-[4px]">{d.size}</div>
                {d.prog >= 100 ? (
                  <div className="w-[26px] h-[26px] rounded-full bg-eterna-teal/10 border border-eterna-teal/35 flex items-center justify-center text-eterna-teal text-[12px] ml-auto">
                    <Check className="w-[12px] h-[12px]" />
                  </div>
                ) : (
                  <div className="w-[26px] h-[26px] rounded-full bg-eterna-rose/10 border-[2px] border-eterna-rose flex items-center justify-center text-[9px] font-bold text-eterna-rose ml-auto">
                    {d.prog}%
                  </div>
                )}
              </div>
              <button className="flex items-center justify-center p-[4px] ml-[4px] text-eterna-muted hover:text-eterna-red transition-colors" onClick={() => confirmRemoveDownload(d.id)}>
                <Trash2 className="w-[15px] h-[15px]" />
              </button>
            </div>
          ))}
          {downloads.length === 0 && (
             <div className="text-center text-eterna-muted text-[13px] py-[40px]">
               No downloaded titles yet.
             </div>
          )}
        </div>

      </div>
      <BottomNav />
      {/* Modal */}
      {modalObj && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center min-h-[400px]" onClick={() => setModalObj(null)}>
          <div className="bg-eterna-surface border border-eterna-border rounded-[14px] p-[28px] max-w-[340px] w-full m-[16px]" onClick={e => e.stopPropagation()}>
            <div className="font-serif text-[20px] mb-[8px]">{modalObj.title}</div>
            <div className="text-[13px] text-eterna-muted whitespace-pre-line leading-[1.6] mb-[20px]">{modalObj.desc}</div>
            <div className="flex gap-[8px]">
               <button className="flex-1 border border-white/20 text-eterna-text py-[8px] rounded-[8px] text-[13px] hover:bg-white/5" onClick={() => setModalObj(null)}>Cancel</button>
               {modalObj.action && (
                 <button className={`flex-1 py-[8px] rounded-[8px] text-[13px] ${modalObj.dangerLabel ? 'bg-eterna-red text-white hover:bg-eterna-red/80' : 'bg-grad text-white hover:opacity-85'}`} onClick={modalObj.action}>
                   {modalObj.dangerLabel || 'OK'}
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
