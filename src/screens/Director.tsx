import React from 'react';
import { TopNav, BottomNav } from '../components/Navigation';
import { useAppStore } from '../lib/store';
import { Play } from 'lucide-react';

export function DirectorScreen() {
  const { go } = useAppStore();

  return (
    <div className="min-h-screen bg-eterna-bg text-eterna-text flex flex-col pt-20">
      <TopNav showBack title="About the Director" />
      
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <div className="h-64 sm:h-80 w-full relative">
            <img src="https://images.unsplash.com/photo-1549449830-4e0ab8580556?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Director" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl sm:text-5xl font-black mb-2">Elena Rostova</h1>
              <p className="text-eterna-gold font-mono uppercase tracking-widest text-sm font-bold">Award-Winning Filmmaker & Screenwriter</p>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-12">
            
            <section>
              <h2 className="text-sm uppercase tracking-widest text-white/50 font-bold mb-4">Biography</h2>
              <p className="text-white/80 leading-relaxed text-lg">
                Elena Rostova is a visionary director known for her poignant storytelling and unparalleled visual style. With a career spanning over two decades, she has redefined the boundaries of modern cinema. Her works often explore the deep connections between human emotion and the vast, unforgiving nature of the universe.
              </p>
            </section>

            <section>
              <h2 className="text-sm uppercase tracking-widest text-white/50 font-bold mb-4">Selected Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center group cursor-pointer" onClick={() => go('details')}>
                  <div className="w-16 h-24 bg-gray-800 shrink-0 rounded-md overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Work" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Cosmic Reverie</h3>
                    <p className="text-white/50 text-sm">2021 • Sci-Fi Drama</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center group cursor-pointer" onClick={() => go('details')}>
                  <div className="w-16 h-24 bg-gray-800 shrink-0 rounded-md overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Work" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Silent Echoes</h3>
                    <p className="text-white/50 text-sm">2018 • Thriller</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-sm uppercase tracking-widest text-white/50 font-bold mb-4">Contact & Representation</h2>
              <div className="bg-black/30 border border-white/5 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white/40 text-xs uppercase tracking-widest mb-1">Direct Inquiries</h4>
                    <a href="mailto:contact@elenarostova.com" className="text-eterna-rose hover:underline font-mono">contact@elenarostova.com</a>
                  </div>
                  <div>
                    <h4 className="text-white/40 text-xs uppercase tracking-widest mb-1">Literary Agent</h4>
                    <p className="text-white">William Morris Endeavor<br/><span className="text-white/50 text-sm font-mono">+1 (310) 555-0199</span></p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
