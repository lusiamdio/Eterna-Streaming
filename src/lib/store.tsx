import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATALOG, DOWNLOADS_INIT } from './data';
import { Content, Download } from '../types';
import { supabase } from './supabase';
import { Toast } from '../components/Toast';

export type ScreenType = 'landing' | 'auth' | 'home' | 'search' | 'details' | 'player' | 'live' | 'dl' | 'profile' | 'partner' | 'admin' | 'originals' | 'series' | 'documentary' | 'sports' | 'music' | 'info' | 'payment' | 'schedule' | 'director' | 'mylist';

interface User {
  id?: string;
  name: string;
  email: string;
  plan: string;
  initials: string;
  role?: string;
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
  myList: (number | string)[];
  watchlist: (number | string)[];
  liked: (number | string)[];
  continueWatching: (number | string)[];
  downloads: Download[];
  reviews: Review[];
  searchQ: string;
  currentGenre: string;
  toastMsg: string | null;
  currentInfoPage: string;
  catalog: Content[];
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
  toggleMyList: (id: number | string) => void;
  toggleWatchlist: (id: number | string) => void;
  toggleLiked: (id: number | string) => void;
  addContinueWatching: (id: number | string) => void;
  addDownload: (item: Download) => void;
  removeDownload: (id: string) => void;
  clearDownloads: () => void;
  updateDownloadBox: (id: string, prog: number, meta?: string) => void;
  showToast: (msg: string) => void;
  publishContent: (c: Content) => void;
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
    continueWatching: [],
    downloads: [...DOWNLOADS_INIT],
    reviews: [],
    searchQ: '',
    currentGenre: 'All',
    toastMsg: null,
    currentInfoPage: '',
    catalog: [...CATALOG],
  });

  const [toastTimeoutId, setToastTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const publishContent = async (c: Content) => {
    if (supabase && state.user) {
      const { data, error } = await supabase.from('content').insert([{
        title: c.title,
        description: c.desc,
        cover_url: c.coverUrl,
        content_type: 'movie', 
        status: 'published',
        release_year: c.year,
        rating: c.rating,
        genres: c.genres,
        creator_id: state.user.id
      }]).select('*');
      if (!error && data && data.length > 0) {
        const item = data[0];
        const newC: Content = { ...c, id: item.id };
        setState(prev => ({ ...prev, catalog: [newC, ...prev.catalog] }));
        showToast(`Published: ${c.title} ✓`);
      } else {
        console.error('Failed to publish', error);
        showToast('Error publishing.');
      }
    } else {
      setState(prev => ({ ...prev, catalog: [c, ...prev.catalog] }));
      showToast(`Published: ${c.title} ✓`);
    }
  };

  // ... (supabase check will happen below, keeping existing)
  // Need to splice in methods further down, let's just do a big replace block for the provider functions


  useEffect(() => {
    const fetchCatalog = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('content').select('*').eq('status', 'published');
        if (!error && data && data.length > 0) {
          const mappedCatalog: Content[] = data.map(item => ({
            id: item.id,
            emoji: '🎬',
            coverUrl: item.cover_url || 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=300&auto=format&fit=crop',
            title: item.title,
            sub: item.genres && item.genres.length > 0 ? item.genres.join(' ') : 'Original Content',
            tag: 'new',
            rating: item.rating || '8.0',
            year: item.release_year || new Date().getFullYear(),
            eps: item.content_type === 'series' ? 1 : null,
            genres: item.genres || ['Drama'],
            desc: item.description || '',
            cast: [],
            episodes: []
          }));
          setState(prev => ({ ...prev, catalog: [...mappedCatalog, ...CATALOG] }));
        }
      } catch (err) {
        console.error("Error fetching catalog", err);
      }
    };
    fetchCatalog();
  }, []);

  useEffect(() => {
    if (!supabase) return;

    
    const fetchProfile = async (sessionUser: any) => {
      const parsedName = sessionUser.email?.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'User';
      let role = 'normal';
      
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', sessionUser.id).single();
      if (profile && ['normal', 'pending_partner', 'partner', 'super_admin'].includes(profile.role)) {
        role = profile.role;
      }
      
      const { data: watchData } = await supabase.from('watchlist').select('content_id').eq('user_id', sessionUser.id);
      const userWatchlist = watchData ? watchData.map(w => w.content_id) : [];
      
      setState(prev => ({
        ...prev,
        watchlist: [...new Set([...prev.watchlist, ...userWatchlist])],
        user: {
          id: sessionUser.id,
          name: sessionUser.user_metadata?.full_name || parsedName,
          initials: (sessionUser.user_metadata?.full_name || parsedName)[0].toUpperCase(),
          email: sessionUser.email || '',
          plan: 'Premium',
          role
        }
      }));
    };

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      }
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
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

  const toggleArrayItem = (arr: (number|string)[], id: number|string) =>
    arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];

  const toggleMyList = (id: number|string) => {
    setState(prev => {
      const added = !prev.myList.includes(id);
      showToast(added ? 'Added to My List ✓' : 'Removed from My List');
      return { ...prev, myList: toggleArrayItem(prev.myList, id) };
    });
  };

  const toggleWatchlist = async (id: number|string) => {
    setState(prev => {
      const added = !prev.watchlist.includes(id);
      showToast(added ? 'Added to Schedule ❤️' : 'Removed from Schedule');
      return { ...prev, watchlist: toggleArrayItem(prev.watchlist, id) };
    });
    
    // Attempt sync to supabase
    if (supabase && state.user && typeof id === 'string') {
      const added = !state.watchlist.includes(id);
      if (added) {
        await supabase.from('watchlist').insert([{ content_id: id, user_id: state.user.id }]);
      } else {
        await supabase.from('watchlist').delete().eq('content_id', id).eq('user_id', state.user.id);
      }
    }
    
    go('schedule');
  };

  const addContinueWatching = (id: number|string) => {
    setState(prev => {
      // Remove it if it exists so we can move it to the front
      const list = prev.continueWatching.filter(x => x !== id);
      return { ...prev, continueWatching: [id, ...list] };
    });
  };

  const toggleLiked = (id: number|string) => {
    setState(prev => {
      const added = !prev.liked.includes(id);
      showToast(added ? 'Liked! ❤️' : 'Like removed');
      return { ...prev, liked: toggleArrayItem(prev.liked, id) };
    });
  };

  const addDownload = (d: Download) => {
    setState(prev => ({ ...prev, downloads: [...prev.downloads, d] }));
    showToast('Adding to downloads ⬇️');
  };
  const removeDownload = (id: string) => {
    setState(prev => ({ ...prev, downloads: prev.downloads.filter(x => x.id !== id) }));
    showToast('Removed from downloads');
  };
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
      addContinueWatching,
      addDownload,
      removeDownload,
      clearDownloads,
      updateDownloadBox,
      showToast,
      publishContent,
    }}>
      {children}
      <Toast message={state.toastMsg} visible={!!state.toastMsg} />
    </AppContext.Provider>
  );
}

export const useProfileSync = () => {
  const verifyProfileSync = async (userId: string, targetRole: string) => {
    if (!supabase) return;
    const validRoles = ['normal', 'pending_partner', 'partner', 'super_admin'];
    const safeRole = validRoles.includes(targetRole) ? targetRole : 'normal';
    console.log(`[ProfileSync] Verifying synchronization for user ${userId} with assigned role '${safeRole}'...`);
    try {
      const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();
      if (error) {
        console.warn(`[ProfileSync] Profile not found for ${userId}. Attempting creation... Error: ${error.message}`);
        const { error: insertError } = await supabase.from('profiles').insert([{ id: userId, role: safeRole }]);
        if (insertError) {
          console.error(`[ProfileSync] Failed to create profile: ${insertError.message}`);
        } else {
          console.log(`[ProfileSync] Recovery successful. Profile created for ${userId} with role '${safeRole}'.`);
        }
      } else {
        console.log(`[ProfileSync] Profile found. Existing role: ${data.role}. Matching against intended role '${safeRole}'.`);
        if (data.role !== safeRole) {
           console.log(`[ProfileSync] Role mismatch. Updating role from '${data.role}' to '${safeRole}'...`);
           await supabase.from('profiles').update({ role: safeRole }).eq('id', userId);
        } else {
           console.log(`[ProfileSync] Sync verified successfully. Roles match.`);
        }
      }
    } catch (e: any) {
      console.error(`[ProfileSync] Unexpected error during verification: ${e.message}`);
    }
  };

  return { verifyProfileSync };
};

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be within AppProvider');
  return ctx;
};
