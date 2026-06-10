import { useAppStore } from './lib/store';
import { LandingScreen } from './screens/Landing';
import { AuthScreen } from './screens/Auth';
import { HomeScreen } from './screens/Home';
import { DiscoveryHub } from './screens/Search';
import { DetailsScreen } from './screens/Details';
import { LiveScreen } from './screens/Live';
import { DownloadsScreen } from './screens/Downloads';
import { ProfileScreen } from './screens/Profile';
import { PlayerScreen } from './screens/Player';
import { PartnerScreen } from './screens/Partner';
import { AdminScreen } from './screens/Admin';
import { InfoScreen } from './screens/Info';
import React from 'react';
import { PaymentScreen } from './screens/Payment';
import { ScheduleScreen } from './screens/Schedule';
import { DirectorScreen } from './screens/Director';
import { AnimatePresence, motion } from 'motion/react';

const PageWrapper = ({ children, screenKey }: { children: React.ReactNode, screenKey: string }) => (
  <motion.div
    key={screenKey}
    initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="h-full w-full"
  >
    {children}
  </motion.div>
);

export default function App() {
  const { screen } = useAppStore();

  const renderScreen = () => {
    switch (screen) {
      case 'landing': return <LandingScreen />;
      case 'auth': return <AuthScreen />;
      case 'home': return <HomeScreen />;
      case 'search': return <DiscoveryHub />;
      case 'details': return <DetailsScreen />;
      case 'live': return <LiveScreen />;
      case 'dl': return <DownloadsScreen />;
      case 'profile': return <ProfileScreen />;
      case 'player': return <PlayerScreen />;
      case 'partner': return <PartnerScreen />;
      case 'admin': return <AdminScreen />;
      case 'originals': return <DiscoveryHub title="Eterna Originals" isOriginals />;
      case 'series': return <DiscoveryHub title="Global TV Series" isSeries />;
      case 'documentary': return <DiscoveryHub title="Documentaries" forceGenre="Documentary" />;
      case 'sports': return <DiscoveryHub title="Sports" forceGenre="Sports" />;
      case 'music': return <DiscoveryHub title="Music & Events" forceGenre="Music" />;
      case 'mylist': return <DiscoveryHub title="My List" isMyList />;
      case 'info': return <InfoScreen />;
      case 'payment': return <PaymentScreen />;
      case 'schedule': return <ScheduleScreen />;
      case 'director': return <DirectorScreen />;
      default: return <LandingScreen />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <PageWrapper screenKey={screen}>
        {renderScreen()}
      </PageWrapper>
    </AnimatePresence>
  );
}
