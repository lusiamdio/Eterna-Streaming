import React from 'react';
import { useAppStore } from '../lib/store';
import { TopNav, BottomNav } from '../components/Navigation';
// import { CATALOG } from '../lib/data';
import { Play, Calendar, Trash2 } from 'lucide-react';

export function ScheduleScreen() {
  const { watchlist, toggleWatchlist, go, setContent, catalog } = useAppStore();

  const scheduledContent = catalog.filter(c => watchlist.includes(c.id));

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg pt-[72px]">
      <TopNav showBack title="My Schedule" />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-eterna-gold/20 flex flex-col items-center justify-center text-eterna-gold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Viewing Schedule</h1>
            <p className="text-white/60 text-sm">Your planned watchlist</p>
          </div>
        </div>

        {scheduledContent.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center">
            <Calendar className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Schedule Empty</h3>
            <p className="text-white/50 mb-6 max-w-sm mx-auto">You haven't scheduled any content yet. Add shows or movies from the Discover page.</p>
            <button onClick={() => go('search')} className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">
              Discover Content
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledContent.map(item => (
              <div key={item.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex shadow-lg hover:border-white/10 transition-colors group">
                <div className="h-32 w-24 sm:w-48 shrink-0 relative overflow-hidden bg-white/5" onClick={() => { setContent(item); go('details'); }}>
                  <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.title}</h3>
                  <div className="text-xs text-white/50 flex gap-2 items-center mb-3">
                    <span className="text-eterna-gold font-medium">{item.tag?.toUpperCase() || item.genres?.[0]}</span>
                    <span>•</span>
                    <span>Planned to watch</span>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button onClick={() => { setContent(item); go('player'); }} className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">
                      <Play className="w-3 h-3 fill-current" /> Watch Now
                    </button>
                    <button onClick={() => toggleWatchlist(item.id)} className="flex items-center justify-center bg-white/10 text-white/70 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
