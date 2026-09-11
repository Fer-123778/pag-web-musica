import { albums, songs, artists, getSongsByAlbumId, getArtistById, formatDuration, formatPlays } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';

export default function AlbumDetail() {
  const { state, navigate, playSong, addToQueue, toggleFavoriteAlbum, dispatch } = useApp();
  const album = albums.find(a => a.id === state.selectedAlbumId);
  if (!album) return <div className="pt-24 px-6 text-center" style={{ color: '#7c7a9e' }}>Álbum no encontrado</div>;

  const artist = getArtistById(album.artistId);
  const albumSongs = getSongsByAlbumId(album.id);
  const isFav = state.favoriteAlbumIds.includes(album.id);
  const totalDuration = albumSongs.reduce((acc, s) => acc + s.duration, 0);

  const handleRate = (rating: number) => {
    if (!state.user) { dispatch({ type: 'OPEN_AUTH', mode: 'login' }); return; }
    dispatch({ type: 'SET_RATING', id: album.id, rating });
  };
  const myRating = state.ratings[album.id] ?? 0;

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: '#0d0d1a', paddingTop: 64 }}>
        <div className="absolute inset-0">
          <img src={album.coverImage} alt="" className="w-full h-full object-cover opacity-20 scale-110" style={{ filter: 'blur(40px)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-end">
          <img src={album.coverImage} alt={album.title} className="w-56 h-56 rounded-2xl object-cover shadow-2xl shrink-0" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#7c7a9e' }}>Álbum</p>
            <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: 'Outfit' }}>{album.title}</h1>
            <div
              className="flex items-center gap-2 mb-4 cursor-pointer w-fit"
              onClick={() => navigate('artist', { artistId: artist?.id ?? '' })}
            >
              <img src={artist?.image} alt="" className="w-7 h-7 rounded-full object-cover" />
              <span className="font-medium hover:underline">{artist?.name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm mb-2" style={{ color: '#7c7a9e' }}>
              <span>{album.year}</span>
              <span>·</span>
              <span>{album.genre}</span>
              <span>·</span>
              <span>{albumSongs.length} canciones</span>
              <span>·</span>
              <span>{formatDuration(totalDuration)}</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => handleRate(s)} className="star-animate">
                    <svg className="w-5 h-5" fill={s <= (myRating || Math.round(album.rating)) ? '#f59e0b' : 'none'} stroke={s <= (myRating || Math.round(album.rating)) ? '#f59e0b' : '#2a2a4a'} viewBox="0 0 24 24" strokeWidth={2}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </button>
                ))}
              </div>
              <span className="text-sm font-medium">{album.rating.toFixed(1)}</span>
              <span className="text-sm" style={{ color: '#7c7a9e' }}>({album.votes.toLocaleString()} votos)</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => albumSongs[0] && playSong(albumSongs[0])}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Reproducir
              </button>
              <button
                onClick={() => toggleFavoriteAlbum(album.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium"
                style={{ background: '#1a1a2e', color: isFav ? '#f472b6' : '#c4c0e0', border: '1px solid #1e1e35' }}
              >
                <svg className="w-4 h-4" fill={isFav ? '#f472b6' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {isFav ? 'En favoritos' : 'Añadir a favoritos'}
              </button>
              <button
                onClick={() => albumSongs.forEach(s => addToQueue(s))}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium"
                style={{ background: '#1a1a2e', color: '#c4c0e0', border: '1px solid #1e1e35' }}
              >
                + Añadir a cola
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {album.description && (
          <p className="mb-8 max-w-2xl" style={{ color: '#7c7a9e' }}>{album.description}</p>
        )}

        <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
          <div className="flex items-center px-4 py-2 text-xs uppercase tracking-widest" style={{ color: '#4a4a6a', borderBottom: '1px solid #1e1e35' }}>
            <span className="w-8 text-center">#</span>
            <span className="ml-14 flex-1">Título</span>
            <span className="hidden sm:block w-20 text-right pr-4">Duración</span>
          </div>
          {albumSongs.map((s, i) => (
            <div key={s.id} style={{ borderBottom: i < albumSongs.length - 1 ? '1px solid #1a1a2e' : 'none' }}>
              <SongCard song={s} compact rank={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
