import { songs, artists, albums } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';

export default function Profile() {
  const { state, dispatch, navigate } = useApp();

  if (!state.user) {
    return (
      <div className="max-w-lg mx-auto px-6 pt-32 pb-28 text-center">
        <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Outfit' }}>Inicia sesión para ver tu perfil</h2>
        <button onClick={() => dispatch({ type: 'OPEN_AUTH', mode: 'login' })} className="px-6 py-3 rounded-xl font-medium" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}>
          Iniciar sesión
        </button>
      </div>
    );
  }

  const { user } = state;
  const favSongs = state.favoriteSongIds.map(id => songs.find(s => s.id === id)).filter(Boolean) as typeof songs;
  const favAlbums = state.favoriteAlbumIds.map(id => albums.find(a => a.id === id)).filter(Boolean) as typeof albums;
  const followedArtists = state.followedArtistIds.map(id => artists.find(a => a.id === id)).filter(Boolean) as typeof artists;

  const stats = [
    { label: 'Canciones guardadas', value: favSongs.length },
    { label: 'Álbumes guardados', value: favAlbums.length },
    { label: 'Artistas seguidos', value: followedArtists.length },
    { label: 'Canciones escuchadas', value: state.history.length },
    { label: 'Votos realizados', value: Object.keys(state.ratings).length },
    { label: 'Playlists', value: state.playlists.length },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-28">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden mb-8">
        <div className="h-40" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }} />
        <div className="p-6 pt-0 -mt-14" style={{ background: '#111120' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover ring-4" style={{ outline: '4px solid #111120', outlineOffset: '0px' }} />
            <div className="flex-1">
              <h1 className="text-3xl font-black" style={{ fontFamily: 'Outfit' }}>{user.name}</h1>
              <p style={{ color: '#7c7a9e' }}>@{user.username}</p>
              <p className="text-xs mt-1" style={{ color: '#4a4a6a' }}>Miembro desde {user.joinDate}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate('settings')} className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: '#1a1a2e', color: '#c4c0e0', border: '1px solid #1e1e35' }}>
                Configuración
              </button>
              <button
                onClick={() => dispatch({ type: 'LOGOUT' })}
                className="px-4 py-2 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value }) => (
          <div key={label} className="p-4 rounded-2xl text-center" style={{ background: '#111120' }}>
            <p className="text-3xl font-black mb-1" style={{ fontFamily: 'Outfit', color: '#a855f7' }}>{value}</p>
            <p className="text-xs" style={{ color: '#7c7a9e' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Favorite songs */}
      {favSongs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Canciones favoritas</h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
            {favSongs.slice(0, 5).map(s => <SongCard key={s.id} song={s} compact />)}
          </div>
          {favSongs.length > 5 && (
            <button onClick={() => navigate('my-library')} className="mt-3 text-sm" style={{ color: '#a855f7' }}>
              Ver todas ({favSongs.length}) →
            </button>
          )}
        </section>
      )}

      {/* Followed artists */}
      {followedArtists.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Artistas que sigues</h2>
          <div className="flex flex-col gap-2" style={{ background: '#111120', borderRadius: 16 }}>
            {followedArtists.map(a => (
              <div key={a.id} className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 rounded-xl" onClick={() => navigate('artist', { artistId: a.id })}>
                <img src={a.image} alt={a.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-sm" style={{ color: '#7c7a9e' }}>{a.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
