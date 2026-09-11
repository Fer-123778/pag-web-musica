import { songs, albums, artists, getArtistById, getAlbumById, getSongsByArtistId, formatDuration, formatPlays } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';

export default function SongDetail() {
  const { state, navigate, playSong, addToQueue, toggleFavoriteSong, dispatch } = useApp();
  const song = songs.find(s => s.id === state.selectedSongId);
  if (!song) return <div className="pt-24 px-6 text-center" style={{ color: '#7c7a9e' }}>Canción no encontrada</div>;

  const artist = getArtistById(song.artistId);
  const album = getAlbumById(song.albumId);
  const isFav = state.favoriteSongIds.includes(song.id);
  const isPlaying = state.currentSong?.id === song.id && state.isPlaying;
  const otherSongs = getSongsByArtistId(song.artistId).filter(s => s.id !== song.id).slice(0, 6);

  const handleRate = (rating: number) => {
    if (!state.user) { dispatch({ type: 'OPEN_AUTH', mode: 'login' }); return; }
    dispatch({ type: 'SET_RATING', id: song.id, rating });
  };
  const myRating = state.ratings[song.id] ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl overflow-hidden mb-6" style={{ background: '#111120' }}>
            <div className="relative h-64">
              <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,32,1) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-4">
                <button
                  onClick={() => playSong(song)}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}
                >
                  {isPlaying
                    ? <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    : <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z"/></svg>
                  }
                </button>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#7c7a9e' }}>Canción</p>
                  <h1 className="text-3xl font-black leading-tight" style={{ fontFamily: 'Outfit' }}>{song.title}</h1>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Artist + Album */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('artist', { artistId: artist?.id ?? '' })}>
                  <img src={artist?.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-xs" style={{ color: '#7c7a9e' }}>Artista</p>
                    <p className="font-semibold hover:underline">{artist?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('album', { albumId: album?.id ?? '' })}>
                  <img src={album?.coverImage} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="text-xs" style={{ color: '#7c7a9e' }}>Álbum</p>
                    <p className="font-semibold hover:underline">{album?.title}</p>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 rounded-2xl" style={{ background: '#1a1a2e' }}>
                {[
                  { label: 'Género', value: song.genre },
                  { label: 'Año', value: new Date(song.releaseDate).getFullYear() },
                  { label: 'Duración', value: formatDuration(song.duration) },
                  { label: 'Reproducciones', value: formatPlays(song.plays) },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-xs mb-1" style={{ color: '#7c7a9e' }}>{label}</p>
                    <p className="font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'Outfit' }}>Valoración</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => handleRate(s)} className="star-animate">
                        <svg className="w-7 h-7" fill={s <= (myRating || Math.round(song.rating)) ? '#f59e0b' : 'none'} stroke={s <= (myRating || Math.round(song.rating)) ? '#f59e0b' : '#2a2a4a'} viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                  <span className="text-xl font-black" style={{ fontFamily: 'Outfit' }}>{song.rating.toFixed(1)}</span>
                  <span className="text-sm" style={{ color: '#7c7a9e' }}>({song.votes.toLocaleString()} votos)</span>
                </div>
                {!state.user && (
                  <p className="text-xs mt-2" style={{ color: '#4a4a6a' }}>
                    <button onClick={() => dispatch({ type: 'OPEN_AUTH', mode: 'register' })} className="hover:underline" style={{ color: '#a855f7' }}>Regístrate</button> para votar y guardar esta canción.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => toggleFavoriteSong(song.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: '#1a1a2e', color: isFav ? '#f472b6' : '#c4c0e0', border: '1px solid #1e1e35' }}>
                  <svg className="w-4 h-4" fill={isFav ? '#f472b6' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {isFav ? 'En favoritos' : 'Favorito'}
                </button>
                <button onClick={() => addToQueue(song)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: '#1a1a2e', color: '#c4c0e0', border: '1px solid #1e1e35' }}>
                  + Añadir a cola
                </button>
              </div>
            </div>
          </div>

          {/* Lyrics */}
          {song.lyrics && (
            <div className="rounded-3xl p-6" style={{ background: '#111120' }}>
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Letra</h2>
              <p className="leading-relaxed whitespace-pre-line" style={{ color: '#c4c0e0' }}>{song.lyrics}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
            <div className="p-4" style={{ borderBottom: '1px solid #1e1e35' }}>
              <h3 className="font-semibold" style={{ fontFamily: 'Outfit' }}>Otras canciones de {artist?.name}</h3>
            </div>
            {otherSongs.length === 0 ? (
              <div className="p-6 text-center text-sm" style={{ color: '#7c7a9e' }}>Sin más canciones</div>
            ) : (
              otherSongs.map(s => <SongCard key={s.id} song={s} compact />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
