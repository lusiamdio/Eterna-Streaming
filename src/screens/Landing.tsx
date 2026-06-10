import React, { useState, useEffect } from 'react';
import { useAppStore } from '../lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Search, Globe, ChevronRight, Star, Check, Zap, MapPin, Film, MonitorPlay, Tv, BrainCircuit, Heart, ArrowRight, ShieldCheck, DownloadCloud, PlayCircle, Users, Sparkles
} from 'lucide-react';

export function LandingScreen() {
  const { go, setInfoPage, catalog } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Movies');
  const [aiMood, setAiMood] = useState('');
  
  const originals = catalog.slice(0, 5);
  const [currentOriginalIndex, setCurrentOriginalIndex] = useState(0);
  const [showOriginalSynopsis, setShowOriginalSynopsis] = useState(false);
  const currentOriginal = originals[currentOriginalIndex];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050816] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#00D9FF] selection:text-black">
      {/* 1. Floating Cinematic Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050816]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#1E90FF] via-[#00D9FF] to-[#6C63FF] cursor-pointer" onClick={() => go('landing')}>ETERNA</h1>
            <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#A3AED0]">
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <Search className="w-5 h-5 cursor-pointer text-[#A3AED0] hover:text-white transition-colors" />
            <button onClick={() => go('partner')} className="text-sm font-medium text-[#A3AED0] hover:text-white transition-colors hidden md:block">Partner Portal</button>
            <button onClick={() => go('auth')} className="bg-[#1E90FF] hover:bg-[#00D9FF] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(30,144,255,0.4)] hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transform hover:-translate-y-0.5">15 Days Free Trial</button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Experience */}
      <section className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden">
         {/* Background Effects */}
         <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6C63FF]/20 rounded-full blur-[120px] opacity-60 mix-blend-screen mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1E90FF]/20 rounded-full blur-[100px] opacity-50 mix-blend-screen" style={{ animationDuration: '12s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm pointer-events-none mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/90 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent"></div>
         </div>

         <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Side */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
               <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.1]">
                 Infinite Stories.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E90FF] to-[#00D9FF]">One Universe.</span>
               </h1>
               <p className="text-xl md:text-2xl text-[#A3AED0] mb-8 font-light max-w-lg leading-relaxed">
                 Stream the world's most captivating movies, series, originals, and live experiences.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-20">
                 <div className="relative flex-1 max-w-md group">
                   <input type="email" placeholder="Enter your email" className="w-full bg-[#0D1324]/80 backdrop-blur border border-white/10 text-white px-6 py-4 rounded-full outline-none focus:border-[#1E90FF] transition-colors shadow-inner" />
                   <div className="absolute inset-0 rounded-full border border-[#00D9FF] opacity-0 group-hover:opacity-30 transition-opacity blur-[2px] pointer-events-none"></div>
                 </div>
                 <button onClick={() => go('auth')} className="bg-gradient-to-r from-[#1E90FF] to-[#6C63FF] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(108,99,255,0.4)] whitespace-nowrap">
                   Start Watching Free <ChevronRight className="w-5 h-5" />
                 </button>
               </div>

               <div className="flex flex-wrap items-center gap-6 text-[#A3AED0] text-sm font-medium">
                 <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00D9FF]" /> Cancel Anytime</div>
                 <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00D9FF]" /> No Contracts</div>
                 <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00D9FF]" /> Watch Anywhere</div>
               </div>
            </motion.div>

            {/* Right Side: 3D Floating Movie Cards */}
            <div className="relative h-[600px] hidden lg:block perspective-1000">
               <motion.div 
                 initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.8 }} 
                 animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }} 
                 transition={{ duration: 1.2, ease: "easeOut" }}
                 className="absolute inset-0 w-full h-full transform-style-preserve-3d"
               >
                  <div className="absolute top-[10%] left-[10%] w-[250px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transform -rotate-12 translate-z-10 hover:translate-y-[-10px] hover:border-[#1E90FF] transition-all duration-500 z-10 group">
                    <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Anikulapo" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"><PlayCircle className="w-12 h-12 text-[#00D9FF]" /></div>
                  </div>
                  <div className="absolute top-[40%] right-[5%] w-[220px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transform rotate-6 translate-z-20 hover:translate-y-[-10px] hover:border-[#6C63FF] transition-all duration-500 z-20 group">
                    <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="The Black Book" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"><PlayCircle className="w-12 h-12 text-[#00D9FF]" /></div>
                  </div>
                  <div className="absolute top-[25%] left-[50%] -translate-x-1/2 w-[320px] aspect-[2/3] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(30,144,255,0.3)] border border-[#1E90FF]/50 transform translate-z-50 hover:scale-105 hover:shadow-[0_0_80px_rgba(30,144,255,0.6)] transition-all duration-500 z-30 group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Dune" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm bg-black/30">
                       <div className="w-20 h-20 rounded-full bg-[#1E90FF]/80 flex items-center justify-center shadow-[0_0_30px_#1E90FF] backdrop-blur-md">
                          <Play className="w-8 h-8 text-white ml-2" />
                       </div>
                    </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 3. Trending Now */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Across Africa & The World</h2>
              <div className="flex gap-4">
                 {['Movies', 'Series', 'Originals', 'Live Events'].map(tab => (
                   <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-[#111827] text-[#A3AED0] hover:text-white border border-white/5'}`}>
                     {tab}
                   </button>
                 ))}
              </div>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory pr-12">
            {[
              { id: 1, title: 'Echoes of Sahara', genre: 'African Cinema • Drama', duration: '2h 15m', rating: '98%', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400&fit=crop' },
              { id: 2, title: 'Neon Nights', genre: 'Sci-Fi • Thriller', duration: '1h 50m', rating: '95%', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&fit=crop' },
              { id: 3, title: 'Lagos Hustle', genre: 'Action • Crime', duration: '2h 05m', rating: '92%', img: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=400&fit=crop' },
              { id: 4, title: 'The Silent Code', genre: 'Spy • Mystery', duration: '1h 45m', rating: '89%', img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=400&fit=crop' },
              { id: 5, title: 'Spirit Walkers', genre: 'Documentary', duration: '1h 30m', rating: '99%', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&fit=crop' },
            ].map(movie => (
               <div key={movie.id} className="relative w-[280px] shrink-0 aspect-[2/3] rounded-2xl overflow-hidden snap-start group cursor-pointer border border-white/5">
                 <img src={movie.img} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                 <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 bg-[#1E90FF] rounded-full flex items-center justify-center shadow-[0_0_20px_#1E90FF] mb-auto self-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                       <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                    <div className="flex items-center gap-2 text-[#00D9FF] font-bold text-xs mb-2">
                       <Star className="w-3 h-3 fill-current" /> {movie.rating} Match
                    </div>
                    <h3 className="font-bold text-xl leading-tight mb-1">{movie.title}</h3>
                    <p className="text-[#A3AED0] text-xs font-medium">{movie.genre} • {movie.duration}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Discovery Engine */}
      <section className="py-32 relative overflow-hidden bg-[#0D1324] border-y border-white/10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-eterna-violet/20 via-transparent to-transparent pointer-events-none mix-blend-screen"></div>
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 relative z-10">
           
           <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-black/40 border border-white/10 shadow-2xl mb-8 backdrop-blur-md">
                 <BrainCircuit className="w-10 h-10 text-eterna-rose drop-shadow-[0_0_15px_rgba(226,54,112,0.6)]" />
                 <div className="w-px h-8 bg-white/20 mx-4"></div>
                 <Sparkles className="w-8 h-8 text-eterna-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">Find Your Next Obsession</h2>
              <p className="text-[#A3AED0] text-xl max-w-2xl mx-auto font-light">Our AI analyzes your preferences and neural viewing patterns to recommend content you'll genuinely love.</p>
           </div>
           
           <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-eterna-rose/5 via-transparent to-eterna-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="text-center mb-8 relative z-10">
                <span className="text-[12px] uppercase tracking-[3px] text-eterna-gold font-bold mb-3 block">Neural Match Engine</span>
                <h3 className="font-semibold text-2xl text-white">What are you in the mood for?</h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 relative z-10 mb-8">
                 {['Mind-Bending Action', 'Heartwarming Romance', 'Authentic African Cinema', 'Deep Space Sci-Fi', 'Spiritual Journey', 'Dark Comedy'].map(mood => (
                    <button key={mood} onClick={() => setAiMood(mood)} className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${aiMood === mood ? 'bg-gradient-to-r from-eterna-rose to-eterna-violet border-transparent text-white shadow-[0_0_30px_rgba(226,54,112,0.4)] scale-105' : 'bg-[#111827] border-white/10 text-[#A3AED0] hover:border-white/30 hover:text-white hover:bg-[#1f2937]'}`}>
                      {mood}
                    </button>
                 ))}
              </div>
              
              <AnimatePresence>
                {aiMood && (
                   <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-[#111827]/80 rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start backdrop-blur-md">
                      <div className="w-full md:w-32 h-44 bg-[#050816] rounded-xl shrink-0 overflow-hidden border border-white/20 relative shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&fit=crop" className="w-full h-full object-cover opacity-80" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-0 w-full text-center text-xs font-bold text-white z-10 px-2 drop-shadow-md">Recommended Match</div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-eterna-gold/10 border border-eterna-gold/20 rounded-full text-[11px] uppercase tracking-widest text-eterna-gold font-bold mb-4">
                           <span className="w-1.5 h-1.5 rounded-full bg-eterna-gold animate-pulse"></span> Match Found — 99.4%
                         </div>
                         <h4 className="font-bold text-2xl text-white mb-3">"{aiMood}"</h4>
                         <p className="text-[#A3AED0] leading-relaxed mb-6 font-light">A perfect blend of your selected mood, localized for your region with impeccable storytelling and breathtaking visuals.</p>
                         <button className="bg-white/10 hover:bg-white text-white hover:text-black px-8 py-3 rounded-full font-bold transition-all duration-300 w-full md:w-auto">
                           Start Watching
                         </button>
                      </div>
                   </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </section>

      {/* 5. Eterna Originals */}
      <section className="py-0 relative">
        <div className="w-full h-[70vh] min-h-[500px] relative overflow-hidden group">
           <AnimatePresence mode="wait">
             <motion.img 
               key={currentOriginal?.id}
               initial={{ opacity: 0, scale: 1.05 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1 }}
               src={currentOriginal?.coverUrl || "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1920&fit=crop"} 
               className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" 
               alt="Eterna Originals" 
             />
           </AnimatePresence>
           <div className="absolute inset-0 bg-gradient-to-r from-[#050816] w-full md:w-3/4 lg:w-1/2"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent"></div>
           <div className="absolute inset-0 flex items-center max-w-[1600px] mx-auto px-6 md:px-12 pt-20">
              <div className="max-w-xl relative object-contain z-10">
                 <div className="text-[#00D9FF] font-black tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                   <Star className="w-4 h-4 fill-current" /> Exclusive Originals
                 </div>
                 <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 line-clamp-2">
                   {currentOriginal?.title || "Eterna"} <span className="text-white ring-1 ring-white/20 px-4 py-1 rounded bg-white/5 backdrop-blur-sm self-start inline-block mt-2">Originals</span>
                 </h2>
                 
                 <AnimatePresence mode="wait">
                   {showOriginalSynopsis ? (
                     <motion.p 
                       key="synopsis"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="text-xl text-white/90 mb-8 font-light leading-relaxed"
                     >
                       {currentOriginal?.desc}
                     </motion.p>
                   ) : (
                     <motion.p 
                       key="tagline"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="text-xl text-white/80 mb-8 font-light"
                     >
                       Stories produced exclusively for Eterna. World-class production. Visionary directors. Unforgettable narratives.
                     </motion.p>
                   )}
                 </AnimatePresence>

                 <div className="flex gap-4 mb-12">
                   <button onClick={() => go('auth')} className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"><Play className="w-5 h-5 fill-current" /> Play Trailer</button>
                   <button onClick={() => setShowOriginalSynopsis(!showOriginalSynopsis)} className="bg-black/50 backdrop-blur border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                     {showOriginalSynopsis ? "Hide Info" : "More Info"}
                   </button>
                 </div>
                 
                 {/* Carousel Controls */}
                 <div className="flex items-center gap-4">
                   {originals.map((_, idx) => (
                     <button 
                       key={idx} 
                       onClick={() => {
                         setCurrentOriginalIndex(idx);
                         setShowOriginalSynopsis(false);
                       }}
                       className={`h-2 rounded-full transition-all duration-300 ${currentOriginalIndex === idx ? 'w-8 bg-[#1E90FF] shadow-[0_0_10px_rgba(30,144,255,0.8)]' : 'w-2 bg-white/30 hover:bg-white/70'}`}
                     />
                   ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Why Eterna Grid */}
      <section className="py-24 max-w-[1600px] mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center mb-16">The Premier Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { icon: MonitorPlay, title: "4K Ultra HD & HDR", desc: "Crystal clear picture quality with Dolby Atmos spatial audio for cinematic immersion." },
             { icon: DownloadCloud, title: "Download Offline", desc: "Save your data. Download securely to your device and watch anywhere, anytime." },
             { icon: Users, title: "Multiple Profiles", desc: "Create up to 5 profiles for the whole family, each with personalized recommendations." },
             { icon: ShieldCheck, title: "Parental Controls", desc: "Safe, PIN-protected profiles with content rating limits for kids." },
             { icon: BrainCircuit, title: "AI Recommendations", desc: "Our proprietary engine learns what you love to serve the perfect next watch." },
             { icon: Tv, title: "Live Streaming", desc: "Watch live sports, global news, and exclusive interactive events in real-time." }
           ].map((feat, i) => (
             <div key={i} className="bg-[#111827] border border-white/5 p-8 rounded-2xl hover:bg-[#111827]/80 hover:border-[#1E90FF]/50 transition-all hover:-translate-y-1 group">
               <div className="w-14 h-14 rounded-full bg-[#1E90FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-[#1E90FF]/20 group-hover:shadow-[0_0_20px_rgba(30,144,255,0.2)]">
                 <feat.icon className="w-6 h-6 text-[#1E90FF]" />
               </div>
               <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
               <p className="text-[#A3AED0] leading-relaxed">{feat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 7. Social Proof & Map */}
      <section className="py-24 bg-[#0D1324] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center opacity-5 grayscale invert pt-20"></div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
             <div><div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-[#A3AED0] mb-2">100M+</div><div className="text-[#1E90FF] font-bold tracking-wider uppercase text-sm">Streams Generated</div></div>
             <div><div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-[#A3AED0] mb-2">50+</div><div className="text-[#1E90FF] font-bold tracking-wider uppercase text-sm">Countries Active</div></div>
             <div><div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-[#A3AED0] mb-2">10K+</div><div className="text-[#1E90FF] font-bold tracking-wider uppercase text-sm">Titles in Library</div></div>
             <div><div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-[#A3AED0] mb-2">5M+</div><div className="text-[#1E90FF] font-bold tracking-wider uppercase text-sm">Global Subscribers</div></div>
           </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-24 max-w-[1600px] mx-auto px-6 md:px-12 relative overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-16">Stories That Move You</h2>
        <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory">
          {[
            { name: "Sarah K.", country: "South Africa", review: "The collection of African cinema is unparalleled. The AI recommendations somehow always know my mood.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1b28ce?q=80&w=200&fit=crop" },
            { name: "David L.", country: "United Kingdom", review: "Worth every penny for the 4K Ultra HD quality alone. Eterna Originals are beating Hollywood right now.", img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=200&fit=crop" },
            { name: "Amara J.", country: "Nigeria", review: "The cinematic interface is gorgeous, but the content library is the real star. Cancelled my other subs.", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200&fit=crop" },
            { name: "Michael R.", country: "USA", review: "Finally, a streaming platform that gives equal weight to global cinema. The Live TV feature is a gamechanger.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&fit=crop" }
          ].map((item, i) => (
            <div key={i} className="min-w-[320px] md:min-w-[400px] bg-[#111827] border border-white/5 rounded-2xl p-8 snap-center hover:border-white/20 transition-colors">
               <div className="flex text-[#00D9FF] mb-6">
                 {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
               </div>
               <p className="text-lg text-white mb-8 border-l-2 border-[#1E90FF] pl-4 italic">"{item.review}"</p>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10"><img src={item.img} className="w-full h-full object-cover" alt="" /></div>
                 <div>
                   <div className="font-bold">{item.name}</div>
                   <div className="text-sm text-[#A3AED0]">{item.country}</div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Pricing */}
      <section className="py-24 max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Universe</h2>
          <p className="text-[#A3AED0] text-lg">No contracts. No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
           {/* Starter */}
           <div className="bg-[#111827] border border-white/5 rounded-3xl p-8">
             <h3 className="font-bold text-xl text-[#A3AED0] mb-2">Starter</h3>
             <div className="text-4xl font-bold mb-6">$4.99<span className="text-lg text-[#A3AED0] font-normal">/mo</span></div>
             <ul className="space-y-4 mb-8">
               <li className="flex items-center gap-3 text-sm"><Check className="w-5 h-5 text-[#6C63FF]" /> HD Video Quality</li>
               <li className="flex items-center gap-3 text-sm"><Check className="w-5 h-5 text-[#6C63FF]" /> 1 Profile</li>
               <li className="flex items-center gap-3 text-sm text-[#A3AED0] line-through"><Check className="w-5 h-5 text-transparent" /> Downloads</li>
             </ul>
             <button onClick={() => go('auth')} className="w-full py-3 rounded-full border border-white/20 font-bold hover:bg-white/5 transition-colors">15 Days Free Trial</button>
           </div>
           
           {/* Premium */}
           <div className="bg-[#050816] border-2 border-[#1E90FF] rounded-3xl p-10 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(30,144,255,0.2)]">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1E90FF] to-[#00D9FF] text-black font-bold uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-full">Most Popular</div>
             <h3 className="font-bold text-xl text-white mb-2">Premium</h3>
             <div className="text-5xl font-bold mb-6">$9.99<span className="text-lg text-[#A3AED0] font-normal">/mo</span></div>
             <ul className="space-y-4 mb-8">
               <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#00D9FF]" /> 4K Ultra HD + HDR</li>
               <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#00D9FF]" /> 3 Profiles</li>
               <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#00D9FF]" /> Offline Downloads</li>
               <li className="flex items-center gap-3 text-sm font-medium"><Check className="w-5 h-5 text-[#00D9FF]" /> AI Smart Recs</li>
             </ul>
             <button onClick={() => go('auth')} className="w-full py-4 rounded-full bg-[#1E90FF] hover:bg-[#00D9FF] text-white font-bold transition-colors shadow-[0_0_20px_rgba(30,144,255,0.4)] hover:shadow-[0_0_30px_rgba(0,217,255,0.6)]">15 Days Free Trial</button>
           </div>

           {/* Family */}
           <div className="bg-[#111827] border border-white/5 rounded-3xl p-8">
             <h3 className="font-bold text-xl text-[#A3AED0] mb-2">Family</h3>
             <div className="text-4xl font-bold mb-6">$14.99<span className="text-lg text-[#A3AED0] font-normal">/mo</span></div>
             <ul className="space-y-4 mb-8">
               <li className="flex items-center gap-3 text-sm"><Check className="w-5 h-5 text-[#6C63FF]" /> 4K Ultra HD + HDR</li>
               <li className="flex items-center gap-3 text-sm"><Check className="w-5 h-5 text-[#6C63FF]" /> 5 Profiles + Kids</li>
               <li className="flex items-center gap-3 text-sm"><Check className="w-5 h-5 text-[#6C63FF]" /> Unlimited Downloads</li>
             </ul>
             <button onClick={() => go('auth')} className="w-full py-3 rounded-full border border-white/20 font-bold hover:bg-white/5 transition-colors">15 Days Free Trial</button>
           </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-32 relative overflow-hidden text-center border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1920&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-[#050816]/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
           <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">Your Next Favorite <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E90FF] to-[#6C63FF]">Story Awaits.</span></h2>
           <p className="text-xl md:text-2xl text-[#A3AED0] mb-10 max-w-2xl mx-auto">Join millions discovering world-class entertainment without limits.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={() => go('auth')} className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]">15 Days Free Trial</button>
             <button onClick={() => go('dashboard')} className="bg-black/80 backdrop-blur border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">Browse Content</button>
           </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-[#050816] py-12 md:py-16 border-t border-white/10 text-[#A3AED0]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12">
           <p className="mb-8"><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Contact Us'); go('info'); }} className="hover:underline cursor-pointer">Questions? Contact us.</a></p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 text-sm">
             <ul className="space-y-4">
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Help Center'); go('info'); }} className="hover:underline">Help Center</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Account'); go('info'); }} className="hover:underline">Account</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Media Center'); go('info'); }} className="hover:underline">Media Center</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Investor Relations'); go('info'); }} className="hover:underline">Investor Relations</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Jobs'); go('info'); }} className="hover:underline">Jobs</a></li>
             </ul>
             <ul className="space-y-4">
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Redeem Gift Cards'); go('info'); }} className="hover:underline">Redeem Gift Cards</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Buy Gift Cards'); go('info'); }} className="hover:underline">Buy Gift Cards</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Ways to Watch'); go('info'); }} className="hover:underline">Ways to Watch</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Pricing Plans'); go('info'); }} className="hover:underline">Pricing Plans</a></li>
             </ul>
             <ul className="space-y-4">
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Terms of Use'); go('info'); }} className="hover:underline">Terms of Use</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Privacy'); go('info'); }} className="hover:underline">Privacy</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Cookie Preferences'); go('info'); }} className="hover:underline">Cookie Preferences</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Corporate Information'); go('info'); }} className="hover:underline">Corporate Information</a></li>
             </ul>
             <ul className="space-y-4">
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Contact Us'); go('info'); }} className="hover:underline">Contact Us</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Speed Test'); go('info'); }} className="hover:underline">Speed Test</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Legal Notices'); go('info'); }} className="hover:underline">Legal Notices</a></li>
               <li><a href="#" onClick={(e) => { e.preventDefault(); setInfoPage('Service Code'); go('info'); }} className="hover:underline border border-[#A3AED0] px-2 py-1 mt-2 inline-block hover:text-white hover:border-white transition-colors">Service Code</a></li>
             </ul>
           </div>
           
           <button className="text-sm px-4 py-2 border border-[#A3AED0] text-[#A3AED0] hover:text-white hover:border-white transition-colors mb-6 flex items-center gap-2 rounded">
             <Globe className="w-4 h-4" /> English
           </button>
           
           <p className="text-sm">© 2026 Eterna, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
