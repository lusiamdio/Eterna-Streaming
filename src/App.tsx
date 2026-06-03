import { useAppStore } from './lib/store';
import { LandingScreen } from './screens/Landing';
import { AuthScreen } from './screens/Auth';
import { HomeScreen } from './screens/Home';
import { SearchScreen } from './screens/Search';
import { DetailsScreen } from './screens/Details';
import { LiveScreen } from './screens/Live';
import { DownloadsScreen } from './screens/Downloads';
import { ProfileScreen } from './screens/Profile';
import { PlayerScreen } from './screens/Player';
import { PartnerScreen } from './screens/Partner';
import { AdminScreen } from './screens/Admin';

export default function App() {
  const { screen } = useAppStore();

  return (
    <>
      {screen === 'landing' && <LandingScreen />}
      {screen === 'auth' && <AuthScreen />}
      {screen === 'home' && <HomeScreen />}
      {screen === 'search' && <SearchScreen />}
      {screen === 'details' && <DetailsScreen />}
      {screen === 'live' && <LiveScreen />}
      {screen === 'dl' && <DownloadsScreen />}
      {screen === 'profile' && <ProfileScreen />}
      {screen === 'player' && <PlayerScreen />}
      {screen === 'partner' && <PartnerScreen />}
      {screen === 'admin' && <AdminScreen />}
    </>
  );
}
