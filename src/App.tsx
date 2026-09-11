import { AppProvider, useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Player from '@/components/Player';
import QueuePanel from '@/components/QueuePanel';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import News from '@/pages/News';
import Rankings from '@/pages/Rankings';
import Genres from '@/pages/Genres';
import GenreDetail from '@/pages/GenreDetail';
import Search from '@/pages/Search';
import MyLibrary from '@/pages/MyLibrary';
import ArtistProfile from '@/pages/ArtistProfile';
import AlbumDetail from '@/pages/AlbumDetail';
import SongDetail from '@/pages/SongDetail';
import Profile from '@/pages/Profile';
import Contact from '@/pages/Contact';
import Settings from '@/pages/Settings';

function AppContent() {
  const { state } = useApp();
  const { page } = state;

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home />;
      case 'explore': return <Explore />;
      case 'news': return <News />;
      case 'news-detail': return <News />;
      case 'rankings': return <Rankings />;
      case 'genres': return <Genres />;
      case 'genre-detail': return <GenreDetail />;
      case 'search': return <Search />;
      case 'my-library': return <MyLibrary />;
      case 'artist': return <ArtistProfile />;
      case 'album': return <AlbumDetail />;
      case 'song': return <SongDetail />;
      case 'profile': return <Profile />;
      case 'contact': return <Contact />;
      case 'settings': return <Settings />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#08080f', color: '#f0eeff' }}>
      <Header />
      <main className="animate-fade-in" key={page}>
        {renderPage()}
      </main>
      {page !== 'home' && page !== 'artist' && page !== 'album' && <Footer />}
      <Player />
      <QueuePanel />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
