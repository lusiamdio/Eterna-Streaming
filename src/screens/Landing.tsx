import { Play, Tv, MapPin, Film, Download, Users } from "lucide-react";
import { useAppStore } from "../lib/store";
import { BottomNav } from "../components/Navigation";

export function LandingScreen() {
  const { go } = useAppStore();

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg">
      <div className="flex-1 flex flex-col items-center pt-24 text-center p-[32px_24px] relative overflow-y-auto overflow-x-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_small.jpg" className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-transparent to-black/80" />
        </div>

        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-20">
          <div className="text-eterna-red font-bold text-4xl tracking-tighter">Eterna</div>
          <div className="flex gap-4 items-center">
            <button className="text-white hover:text-white/80 font-medium text-[15px] transition" onClick={() => go('partner')}>Partner</button>
            <button className="bg-eterna-red text-white px-4 py-1.5 rounded-[4px] font-medium text-[15px] hover:bg-eterna-rose transition" onClick={() => go('auth')}>Sign In</button>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-2xl mt-8">
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">Infinite ShowTime</h1>
          <p className="text-[20px] text-white mb-6 font-medium">Watch anywhere. Cancel anytime.</p>
          <p className="text-[18px] text-white mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <input type="email" placeholder="Email address" className="flex-1 bg-black/40 border border-white/40 text-white p-4 rounded-[4px] focus:outline-none focus:border-white transition-colors" />
            <button 
              className="bg-eterna-red text-white px-8 py-4 text-[20px] font-medium rounded-[4px] hover:bg-eterna-rose transition flex items-center justify-center gap-2 shrink-0"
              onClick={() => go('auth')}
            >
              Get Started <span className="text-[24px]">›</span>
            </button>
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="relative z-10 w-full max-w-7xl mt-16 mx-auto text-left">
          <h2 className="text-2xl font-bold text-white mb-6 px-4">Trending Now: African & Hollywood Hits</h2>
          <div className="flex overflow-x-auto gap-4 px-4 pb-8 custom-scrollbar">
            {[
              { title: "The Black Book", url: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=300&auto=format&fit=crop" },
              { title: "Dune: Part Two", url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop" },
              { title: "Anikulapo", url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=300&auto=format&fit=crop" },
              { title: "Oppenheimer", url: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=300&auto=format&fit=crop" },
              { title: "Gangs of Lagos", url: "https://images.unsplash.com/photo-1560109947-543149eceb16?q=80&w=300&auto=format&fit=crop" },
              { title: "Avatar: The Way of Water", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop" },
              { title: "A Tribe Called Judah", url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=300&auto=format&fit=crop" },
              { title: "The Batman", url: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=300&auto=format&fit=crop" },
              { title: "Battle on Buka Street", url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=300&auto=format&fit=crop" },
              { title: "Joker", url: "https://images.unsplash.com/photo-1620177088258-c837568add98?q=80&w=300&auto=format&fit=crop" },
              { title: "Jagun Jagun", url: "https://images.unsplash.com/photo-1579970966967-3363f8bb6fe3?q=80&w=300&auto=format&fit=crop" },
              { title: "Top Gun: Maverick", url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=300&auto=format&fit=crop" },
              { title: "King of Boys", url: "https://images.unsplash.com/photo-1563810145620-3b9500045233?q=80&w=300&auto=format&fit=crop" },
              { title: "Inception", url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=300&auto=format&fit=crop" },
              { title: "Sista", url: "https://images.unsplash.com/photo-1524673323-9bf0800b6564?q=80&w=300&auto=format&fit=crop" },
            ].map((film, idx) => (
              <div 
                key={idx} 
                className="relative w-[140px] md:w-[180px] shrink-0 aspect-[2/3] rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform border border-white/10"
                onClick={() => go('auth')}
              >
                <img src={film.url} alt={film.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-3">
                  <span className="text-white font-bold text-[13px] leading-tight drop-shadow-md">{film.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

// Quick fallback for radio
function RadioIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
    </svg>
  );
}
