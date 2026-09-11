import { useState } from 'react';
import { songs, albums, artists, getSongById, getAlbumById, getArtistById, formatDuration } from '@/data/mockData';
import { useApp, Playlist } from '@/context/AppContext';
import SongCard from '@/components/SongCard';
import AlbumCard from '@/components/AlbumCard';
import ArtistCard from '@/components/ArtistCard';

type Tab = 'songs' | 'albums' | 'artists' | 'playlists' | 'history';

export default function MyLibrary() {
  const [tab, setTab] = useState<Tab>('songs');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const { state, dispatch, navigate, playSong } = useApp();

  if (!state.user) {
    return (
      <div className="max-w-lg mx-auto px-6 pt-32 pb-28 text-center">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(168,85,247,0.1)' }}>
          <svg className="w-10 h-10" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Outfit' }}>Tu biblioteca personal</h2>
        <p className="mb-8" style={{ color: '#7c7a9e' }}>Inicia sesión para acceder a tus canciones, álbumes y playlists favoritas.</p>
        <button onClick={() => dispatch({ type: 'OPEN_AUTH', mode: 'login' })} className="px-6 py-3 rounded-xl font-medium" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}>
          Iniciar sesión
        </button>
      </div>
    );
  }

  const favSongs = state.favoriteSongIds.map(id => songs.find(s => s.id === id)).filter(Boolean) as typeof songs;
  const favAlbums = state.favoriteAlbumIds.map(id => albums.find(a => a.id === id)).filter(Boolean) as typeof albums;
  const favArtists = state.followedArtistIds.map(id => artists.find(a => a.id === id)).filter(Boolean) as typeof artists;
  const historyItems = state.history.slice(0, 30);

  const createPlaylist = () => {
    if (!newPlaylistName) return;
    dispatch({
      type: 'CREATE_PLAYLIST',
      playlist: {
        id: Date.now().toString(),
        name: newPlaylistName,
        description: newPlaylistDesc,
        songIds: [],
        createdAt: new Date().toLocaleDateString(),
      },
    });
    setNewPlaylistName('');
    setNewPlaylistDesc('');
    setShowCreatePlaylist(false);
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'songs', label: 'Favoritas', count: favSongs.length },
    { id: 'albums', label: 'Álbumes', count: favAlbums.length },
    { id: 'artists', label: 'Artistas', count: favArtists.length },
    { id: 'playlists', label: 'Playlists', count: state.playlists.length },
    { id: 'history', label: 'Historial', count: historyItems.length },
  ];

  const EmptyState = ({ icon, title, message }: { icon: React.ReactNode; title: string; message: string }) => (
    <div className="py-20 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#1a1a2e' }}>{icon}</div>
      <h3 className="font-semibold mb-2" style={{ fontFamily: 'Outfit' }}>{title}</h3>
      <p className="text-sm" style={{ color: '#7c7a9e' }}>{message}</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-28">
      <div className="flex items-center gap-4 mb-8">
        <img src={state.user.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover" />
        <div>
          <h1 className="text-3xl font-black" style={{ fontFamily: 'Outfit' }}>Lo mío</h1>
          <p style={{ color: '#7c7a9e' }}>@{state.user.username}</p>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto scrollbar-hide p-1 rounded-xl mb-8 w-fit" style={{ background: '#111120' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
            style={tab === t.id ? { background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' } : { color: '#7c7a9e' }}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-xs" style={{ background: tab === t.id ? 'rgba(255,255,255,0.2)' : '#1a1a2e' }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'songs' && (
        favSongs.length === 0
          ? <EmptyState icon={<svg className="w-8 h-8" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>} title="Sin canciones favoritas" message="Pulsa el corazón en cualquier canción para guardarla aquí." />
          : <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>{favSongs.map(s => <SongCard key={s.id} song={s} compact />)}</div>
      )}

      {tab === 'albums' && (
        favAlbums.length === 0
          ? <EmptyState icon={<svg className="w-8 h-8" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>} title="Sin álbumes favoritos" message="Guarda álbumes para acceder a ellos fácilmente." />
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{favAlbums.map(al => <AlbumCard key={al.id} album={al} />)}</div>
      )}

      {tab === 'artists' && (
        favArtists.length === 0
          ? <EmptyState icon={<svg className="w-8 h-8" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} title="Sin artistas seguidos" message="Sigue a tus artistas favoritos para estar al día de sus novedades." />
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{favArtists.map(a => <ArtistCard key={a.id} artist={a} />)}</div>
      )}

      {tab === 'playlists' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowCreatePlaylist(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Nueva playlist
            </button>
          </div>

          {showCreatePlaylist && (
            <div className="p-5 rounded-2xl mb-4" style={{ background: '#111120', border: '1px solid #a855f7' }}>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Nueva playlist</h3>
              <input
                type="text"
                value={newPlaylistName}
                onChange={e => setNewPlaylistName(e.target.value)}
                placeholder="Nombre de la playlist"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-3"
                style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
              />
              <input
                type="text"
                value={newPlaylistDesc}
                onChange={e => setNewPlaylistDesc(e.target.value)}
                placeholder="Descripción (opcional)"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-4"
                style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
              />
              <div className="flex gap-2">
                <button onClick={createPlaylist} className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}>Crear</button>
                <button onClick={() => setShowCreatePlaylist(false)} className="px-4 py-2 rounded-xl text-sm" style={{ background: '#1a1a2e', color: '#7c7a9e' }}>Cancelar</button>
              </div>
            </div>
          )}

          {state.playlists.length === 0 ? (
            <EmptyState icon={<svg className="w-8 h-8" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={1.5}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>} title="Sin playlists" message="Crea tu primera playlist y añade canciones." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {state.playlists.map(pl => (
                <div key={pl.id} className="p-5 rounded-2xl flex items-start gap-4 hover:bg-white/5 transition-colors" style={{ background: '#111120' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate" style={{ fontFamily: 'Outfit' }}>{pl.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#7c7a9e' }}>{pl.description || 'Sin descripción'}</p>
                    <p className="text-xs mt-1" style={{ color: '#4a4a6a' }}>{pl.songIds.length} canciones · {pl.createdAt}</p>
                  </div>
                  <button onClick={() => dispatch({ type: 'DELETE_PLAYLIST', id: pl.id })} className="p-1.5 rounded-lg hover:bg-white/10 shrink-0" style={{ color: '#7c7a9e' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'history' && (
        <div>
          {historyItems.length > 0 && (
            <div className="flex justify-end mb-4">
              <button onClick={() => dispatch({ type: 'CLEAR_HISTORY' })} className="text-sm" style={{ color: '#7c7a9e' }}>Borrar historial</button>
            </div>
          )}
          {historyItems.length === 0 ? (
            <EmptyState icon={<svg className="w-8 h-8" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>} title="Sin historial" message="Las canciones que reproduzcas aparecerán aquí." />
          ) : (
            <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
              {historyItems.map((h, i) => {
                const s = songs.find(s => s.id === h.songId);
                if (!s) return null;
                return (
                  <div key={i} style={{ borderBottom: i < historyItems.length - 1 ? '1px solid #1a1a2e' : 'none' }}>
                    <SongCard song={s} compact />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
