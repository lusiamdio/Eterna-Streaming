import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATALOG, DOWNLOADS_INIT } from './data';
import { Content, Download } from '../types';
import { supabase } from './supabase';

export type ScreenType = 'landing' | 'auth' | 'home' | 'search' | 'details' | 'player' | 'live' | 'dl' | 'profile' | 'partner' | 'admin' | 'originals' | 'series' | 'documentary' | 'sports' | 'music' | 'info' | 'payment' | 'schedule' | 'director';

interface User {
  name: string;
  email: string;
  plan: string;
  initials: string;
}

export interface Review {
  id: string;
  contentId: number;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  timestamp: string;
}

interface UserSettings {
  audioLang: string;
  subtitleLang: string;
}

interface AppState {
  screen: ScreenType;
  history: ScreenType[];
  user: User | null;
  settings: UserSettings;
  currentContent: Content;
  myList: number[];
  watchlist: number[];
  liked: number[];
  downloads: Download[];
  reviews: Review[];
  searchQ: string;
  currentGenre: string;
  toastMsg: string | null;
  currentInfoPage: string;
}

interface AppContextType extends AppState {
  go: (screen: ScreenType) => void;
  goBack: () => void;
  signIn: (user: User) => void;
  signOut: () => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  addReview: (review: Omit<Review, 'id' | 'timestamp'>) => void;
  setContent: (content: Content) => void;
  setInfoPage: (page: string) => void;
  setSearch: (q: string, genre: string) => void;
  toggleMyList: (id: number) => void;
  toggleWatchlist: (id: number) => void;
  toggleLiked: (id: number) => void;
  addDownload: (item: Download) => void;
  removeDownload: (id: string) => void;
  clearDownloads: () => void;
  updateDownloadBox: (id: string, prog: number, meta?: string) => void;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: 'landing',
    history: ['landing'],
    user: null, // { name: 'Alex Rivera', email: 'alex@eterna.com', plan: 'Premium', initials: 'A' },
    settings: { audioLang: 'English', subtitleLang: 'Off' },
    currentContent: CATALOG[0],
    myList: [],
    watchlist: [],
    liked: [],
    downloads: [...DOWNLOADS_INIT],
    reviews: [],
    searchQ: '',
    currentGenre: 'All',
    toastMsg: null,
    currentInfoPage: '',
  });

  const [toastTimeoutId, setToastTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // ... (supabase check will happen below, keeping existing)
  // Need to splice in methods further down, let's just do a big replace block for the provider functions


  useEffect(() => {
    if (!supabase) return;
    
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const parsedName = session.user.email?.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User';
        setState(prev => ({
          ...prev,
          user: {
            name: session.user.user_metadata?.full_name || parsedName,
            initials: (session.user.user_metadata?.full_name || parsedName)[0].toUpperCase(),
            email: session.user.email || '',
            plan: 'Premium'
          }
        }));
      }
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const parsedName = session.user.email?.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User';
        setState(prev => ({
          ...prev,
          user: {
            name: session.user.user_metadata?.full_name || parsedName,
            initials: (session.user.user_metadata?.full_name || parsedName)[0].toUpperCase(),
            email: session.user.email || '',
            plan: 'Premium'
          }
        }));
      } else {
        setState(prev => ({ ...prev, user: null }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setState(prev => ({ ...prev, toastMsg: msg }));
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    const id = setTimeout(() => {
      setState(prev => ({ ...prev, toastMsg: null }));
    }, 2400);
    setToastTimeoutId(id);
  };

  const go = (sc: ScreenType) => {
    setState(prev => {
      const hist = prev.history[prev.history.length - 1] === sc ? prev.history : [...prev.history, sc];
      return { ...prev, screen: sc, history: hist };
    });
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setState(prev => {
      if (prev.history.length > 1) {
        const newHist = [...prev.history];
        newHist.pop();
        return { ...prev, screen: newHist[newHist.length - 1], history: newHist };
      }
      return prev;
    });
  };

  const signIn = (user: User) => setState(prev => ({ ...prev, user }));
  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setState(prev => ({ 
      ...prev, 
      user: null, 
      myList: [], 
      liked: [], 
      history: ['landing'], 
      screen: 'landing' 
    }));
  };

  const updateSettings = (settings: Partial<UserSettings>) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
    showToast('Settings saved ✓');
  };

  const addReview = (review: Omit<Review, 'id' | 'timestamp'>) => {
    setState(prev => ({
      ...prev,
      reviews: [...prev.reviews, {
        ...review,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      }]
    }));
    showToast('Review submitted! ✓');
  };

  const setContent = (c: Content) => setState(prev => ({ ...prev, currentContent: c }));
  const setInfoPage = (page: string) => setState(prev => ({ ...prev, currentInfoPage: page }));
  const setSearch = (searchQ: string, currentGenre: string) => setState(prev => ({ ...prev, searchQ, currentGenre }));

  const toggleArrayItem = (arr: number[], id: number) =>
    arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];

  const toggleMyList = (id: number) => {
    setState(prev => {
      const added = !prev.myList.includes(id);
      showToast(added ? 'Added to My List ✓' : 'Removed from My List');
      return { ...prev, myList: toggleArrayItem(prev.myList, id) };
    });
  };

  const toggleWatchlist = (id: number) => {
    setState(prev => {
      const added = !prev.watchlist.includes(id);
      showToast(added ? 'Added to Schedule ❤️' : 'Removed from Schedule');
      return { ...prev, watchlist: toggleArrayItem(prev.watchlist, id) };
    });
    go('schedule');
  };

  const toggleLiked = (id: number) => {
    setState(prev => {
      const added = !prev.liked.includes(id);
      showToast(added ? 'Liked! ❤️' : 'Like removed');
      return { ...prev, liked: toggleArrayItem(prev.liked, id) };
    });
  };

  const addDownload = (d: Download) => setState(prev => ({ ...prev, downloads: [...prev.downloads, d] }));
  const removeDownload = (id: string) => setState(prev => ({ ...prev, downloads: prev.downloads.filter(x => x.id !== id) }));
  const clearDownloads = () => setState(prev => ({ ...prev, downloads: [] }));
  
  const updateDownloadBox = (id: string, prog: number, meta?: string) => {
    setState(prev => ({
      ...prev,
      downloads: prev.downloads.map(d => d.id === id ? { ...d, prog, meta: meta || d.meta } : d)
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      go,
      goBack,
      signIn,
      signOut,
      updateSettings,
      addReview,
      setContent,
      setInfoPage,
      setSearch,
      toggleMyList,
      toggleWatchlist,
      toggleLiked,
      addDownload,
      removeDownload,
      clearDownloads,
      updateDownloadBox,
      showToast,
    }}>
      {children}
      {/* Toast Overlay */}
      <div className={`fixed bottom-[72px] left-1/2 -translate-x-1/2 bg-[#1e1e32] border border-white/15 rounded-lg px-[18px] py-[9px] text-[12px] z-[9999] whitespace-nowrap pointer-events-none transition-opacity duration-300 ${state.toastMsg ? 'opacity-100' : 'opacity-0'}`}>
        {state.toastMsg}
      </div>
    </AppContext.Provider>
  );
}

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be within AppProvider');
  return ctx;
};
