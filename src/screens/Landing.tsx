import { Play, Tv, MapPin, Film, Download, Users } from "lucide-react";
import { useAppStore } from "../lib/store";
import { BottomNav } from "../components/Navigation";

export function LandingScreen() {
  const { go } = useAppStore();

  return (
    <div className="flex flex-col min-h-screen bg-eterna-bg">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-[32px_24px] relative overflow-hidden">
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
