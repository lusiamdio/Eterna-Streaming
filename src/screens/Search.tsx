import { useState, useMemo, useEffect, useRef } from "react";
import { Sparkles, Brain, Clock, Target, Compass, Send, Mic } from "lucide-react";
import { motion } from "motion/react";
import { useAppStore } from "../lib/store";
import { TopNav, BottomNav } from "../components/Navigation";
import { ContentCard } from "../components/Cards";

const MOODS = ['Inspired', 'Curious', 'Adventurous', 'Spiritual', 'Romantic', 'Motivated', 'Family Time', 'Educational', 'Thrilled', 'Relaxed'];
const GOALS = ['Leadership', 'Entrepreneurship', 'Marriage', 'Parenting', 'Faith', 'Personal Growth', 'Wealth Creation', 'Mental Wellness', 'Innovation', 'AI & Technology'];
const TIMES = ['15 min', '30 min', '60 min', '90 min', '2 Hours', 'Weekend Marathon'];

export function DiscoveryHub({ title = "Intent-Based Discovery", isOriginals = false, isSeries = false, forceGenre }: { title?: string, isOriginals?: boolean, isSeries?: boolean, forceGenre?: string }) {
  const { setContent, go, catalog } = useAppStore();
  const [prompt, setPrompt] = useState("");
  const [activeMood, setActiveMood] = useState("");
  const [activeGoal, setActiveGoal] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const filtered = useMemo(() => {
    let res = [...catalog, ...catalog.slice(0, 5).map(c => ({...c, id: c.id + 100})), ...catalog.map(c => ({...c, id: c.id + 200}))]; // Expand catalog slightly to over 20 items
    
    if (forceGenre) {
       res = res.filter(c => c.genres && c.genres.includes(forceGenre));
       // If empty due to mock data, just fake it by renaming genres of some items or creating dynamic items
       if (res.length === 0) {
         res = catalog.slice(0, 4).map((c, i) => ({ ...c, id: c.id + 1000 + i, title: `${forceGenre}: ${c.title}`, genres: [forceGenre] }));
       }
    }

    if (isOriginals) {
       res = res.map((c, i) => ({...c, id: c.id + 500, title: `Eterna Original: ${c.title}`}));
    }
    
    if (isSeries) {
       res = res.map((c, i) => ({...c, id: c.id + 1000, title: `${c.title} Series`, eps: 13, sub: '5 Seasons • 65 Episodes'}));
    }
    
    // Simulate AI Filtering
    if (activeMood) {
      if (['Inspired', 'Motivated', 'Spiritual'].includes(activeMood)) {
        res = res.filter(c => c.genres?.includes("Drama") || c.genres?.includes("Docs") || c.rating >= '9.0');
      } else if (['Thrilled', 'Adventurous'].includes(activeMood)) {
        res = res.filter(c => c.genres?.includes("Action") || c.genres?.includes("Thriller") || c.genres?.includes("Sci-Fi"));
      } else if (['Family Time', 'Relaxed', 'Romantic'].includes(activeMood)) {
        res = res.filter(c => c.genres?.includes("Comedy") || c.genres?.includes("Kids") || c.genres?.includes("Fantasy"));
      }
    }
    
    if (activeGoal) {
      res = res.filter(c => c.rating && parseFloat(c.rating) > 8.5); // Just a mock filter
    }
    
    if (activeTime) {
      if (activeTime === '15 min' || activeTime === '30 min') {
         res = res.filter(c => c.eps); // Series maybe?
      } else {
         res = res.filter(c => !c.eps); // Movies
      }
    }

    if (aiResponse) {
       res = res.sort(() => 0.5 - Math.random()).slice(0, 6); // Randomize for AI response
    }

    return res.length > 0 ? res : catalog.slice(0, 6); // Fallback
  }, [activeMood, activeGoal, activeTime, aiResponse, isOriginals, isSeries, catalog]);

  const handleAiSearch = () => {
    if (!prompt) return;
    setAiTyping(true);
    setAiResponse("");
    setActiveMood("");
    setActiveGoal("");
    setActiveTime("");
    setTimeout(() => {
      setAiTyping(false);
      setAiResponse(`Based on your request:
• Runtime matching your preference
• Themes aligned with "${prompt}"
• Cinematic tone

Recommended carefully curated selections for you.`);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg pb-[80px]">
      <TopNav showBack title="Eterna" />
      
      <div className="px-6 pt-10 flex-1 overflow-y-auto hide-scrollbar max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center text-center mt-10 mb-12">
          <Sparkles className="w-12 h-12 text-eterna-rose mb-4 drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]" />
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-grad tracking-tight mb-2">{title}</h1>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest">Find the perfect film in less than 30 seconds</p>
        </div>

        {/* AI Discovery Hub Hero */}
        <div className="w-full max-w-3xl mx-auto mb-16">
          <div className="text-[13px] font-bold text-white/50 mb-3 uppercase tracking-wider pl-4">What would you like to experience today?</div>
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-2 pl-6 shadow-2xl focus-within:border-eterna-rose/50 focus-within:shadow-[0_0_30px_rgba(225,29,72,0.2)] transition-all">
            <button onClick={handleVoiceSearch} className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isListening ? 'bg-eterna-rose text-white animate-pulse' : 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white'}`}>
              <Mic className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
              placeholder="e.g., Show me an inspiring documentary under 90 minutes" 
              className="flex-1 bg-transparent border-none text-white text-lg font-sans outline-none placeholder:text-white/30"
            />
            <button className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]" onClick={handleAiSearch}>
              <Send className="w-4 h-4 mr-2" /> Concierge
            </button>
          </div>
          <div className="flex gap-3 mt-4 text-[11px] font-mono text-white/40 justify-center flex-wrap">
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => setPrompt('Inspire me')}>Inspire me</span> •
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => setPrompt('Make me laugh')}>Make me laugh</span> •
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => setPrompt('Teach me something new')}>Teach me something new</span> •
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => setPrompt('Show me African excellence')}>Show me African excellence</span>
          </div>
        </div>

        {/* AI Response Box */}
        {aiTyping && (
          <div className="w-full max-w-3xl mx-auto mb-16 p-6 rounded-2xl bg-black/40 border border-white/10 text-center animate-pulse">
            <div className="text-eterna-rose font-mono mb-2">SCANNING CINEMATIC UNIVERSE...</div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-eterna-rose animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-eterna-rose animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-eterna-rose animate-bounce delay-200" />
            </div>
          </div>
        )}
        {aiResponse && !aiTyping && (
           <div className="w-full max-w-3xl mx-auto mb-16 p-6 md:p-8 rounded-2xl bg-black/60 border border-eterna-rose/30 shadow-[0_0_30px_rgba(225,29,72,0.1)] relative overflow-hidden backdrop-blur-xl">
             <div className="absolute top-0 left-0 w-1 h-full bg-eterna-rose" />
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-eterna-rose/20 flex items-center justify-center shrink-0">
                 <Sparkles className="w-5 h-5 text-eterna-rose" />
               </div>
               <div>
                 <div className="font-mono text-[10px] text-eterna-rose uppercase tracking-widest mb-2 font-bold">Curator AI Response</div>
                 <pre className="font-sans text-white/80 text-[15px] whitespace-pre-wrap leading-relaxed">{aiResponse}</pre>
               </div>
             </div>
           </div>
        )}

        {/* Discovery Matrices */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mb-16">
          
          {/* Mood Wheel (Interactive Pills) */}
          <div className="col-span-1 lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-eterna-violet/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-5 h-5 text-eterna-violet" />
              <h2 className="text-xl font-bold uppercase tracking-wider">How do you feel?</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {MOODS.map(mood => (
                <div 
                  key={mood}
                  onClick={() => { setActiveMood(activeMood === mood ? "" : mood); setAiResponse(""); setPrompt(""); }}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all ${activeMood === mood ? 'bg-eterna-violet text-black shadow-[0_0_20px_rgba(0,214,143,0.4)] scale-105' : 'bg-black/50 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'}`}
                >
                  {mood}
                </div>
              ))}
            </div>

            {/* Cinematic DNA Sliders */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <Brain className="w-5 h-5 text-blue-400" />
                 <h2 className="text-[14px] font-bold uppercase tracking-wider text-white/70">Cinematic DNA Profile</h2>
              </div>
              <div className="space-y-5">
                {[
                  { label: "Story Depth", left: "Light", right: "Deep", val: 70 },
                  { label: "Emotional Impact", left: "Calm", right: "Intense", val: 40 },
                  { label: "Intellectual Level", left: "Simple", right: "Complex", val: 85 }
                ].map((slider, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-right text-[10px] font-mono text-white/40 uppercase">{slider.left}</div>
                    <div className="flex-1 h-1.5 bg-black rounded-full relative">
                       <div className="absolute top-0 left-0 h-full bg-blue-400/50 rounded-full" style={{ width: `${slider.val}%` }} />
                       <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-ew-resize hover:scale-125 transition-transform" style={{ left: `calc(${slider.val}% - 8px)` }} />
                    </div>
                    <div className="w-20 text-left text-[10px] font-mono text-white/40 uppercase">{slider.right}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Time Selector */}
            <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden flex-1">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-eterna-gold/10 rounded-full blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-eterna-gold" />
                <h2 className="text-lg font-bold uppercase tracking-wider">I Have Time For...</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {TIMES.map(time => (
                  <div 
                    key={time}
                    onClick={() => { setActiveTime(activeTime === time ? "" : time); setAiResponse(""); setPrompt(""); }}
                    className={`py-3 text-center rounded-xl text-xs font-bold cursor-pointer transition-all ${activeTime === time ? 'bg-eterna-gold text-black shadow-[0_0_15px_rgba(245,176,65,0.4)]' : 'bg-black/50 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'}`}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Goal-Based Selector */}
            <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-eterna-red/10 rounded-full blur-[50px] pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 text-eterna-rose" />
                <h2 className="text-[14px] font-bold uppercase tracking-wider text-white/70">What are you working on?</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {GOALS.slice(0, 7).map(goal => (
                  <div 
                    key={goal}
                    onClick={() => { setActiveGoal(activeGoal === goal ? "" : goal); setAiResponse(""); setPrompt(""); }}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-mono cursor-pointer transition-all ${activeGoal === goal ? 'bg-eterna-rose text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]' : 'bg-black border border-white/10 text-white/50 hover:text-white hover:border-white/30'}`}
                  >
                    {goal}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>

        {/* Results Stream */}
        <div className="mb-10">
           <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <div className="w-2 h-8 bg-grad rounded-full" />
               <h2 className="text-2xl font-bold tracking-tight">{aiResponse ? "Curated Collection" : activeMood ? `${activeMood} Cinematic Experiences` : activeGoal ? `Films for ${activeGoal}` : activeTime ? `Perfect for ${activeTime}` : "Global Galaxy Explorer"}</h2>
             </div>
             <div className="text-[11px] font-mono text-white/40 uppercase tracking-widest">{filtered.length} TITLES MATRICED</div>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filtered.map((c, i) => (
              <motion.div 
                key={c.id} 
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i % 10 * 0.05 }}
              >
                <ContentCard content={c} />
              </motion.div>
            ))}
           </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

