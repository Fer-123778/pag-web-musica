import { useState } from 'react';
import { songs, artists, albums, formatDuration, formatPlays, getArtistById } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

type Tab = 'songs' | 'artists' | 'albums';

export default function Rankings() {
  const [tab, setTab] = useState<Tab>('songs');
  const { navigate, playSong, state, dispatch } = useApp();

  const topSongs = [...songs].sort((a, b) => b.plays - a.plays);
  const topArtists = [...artists].sort((a, b) => b.followers - a.followers);
  const topAlbums = [...albums].sort((a, b) => b.rating - a.rating);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'songs', label: 'Canciones' },
    { id: 'artists', label: 'Artistas' },
    { id: 'albums', label: 'Álbumes' },
  ];

  const handleRate = (id: string, rating: number) => {
    if (!state.user) { dispatch({ type: 'OPEN_AUTH', mode: 'login' }); return; }
    dispatch({ type: 'SET_RATING', id, rating });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-28">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'Outfit' }}>
          <span style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rankings</span>
        </h1>
        <p style={{ color: '#7c7a9e' }}>Las canciones, artistas y álbumes más populares de la plataforma.</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl mb-8 w-fit" style={{ background: '#111120' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={tab === t.id ? { background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' } : { color: '#7c7a9e' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'songs' && (
        <div className="flex flex-col gap-2">
          {topSongs.map((song, i) => {
            const artist = getArtistById(song.artistId);
            const myRating = state.ratings[song.id];
            const isPlaying = state.currentSong?.id === song.id && state.isPlaying;
            return (
              <div key={song.id} className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-white/5 group" style={{ background: '#111120' }}>
                <div className="w-8 text-center shrink-0">
                  <span className="font-black text-xl" style={{ fontFamily: 'Outfit', color: i < 3 ? '#a855f7' : '#2a2a4a' }}>{i + 1}</span>
                </div>
                <div className="relative shrink-0">
                  <img src={song.coverImage} alt={song.title} className="w-14 h-14 rounded-xl object-cover" />
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{ background: 'rgba(0,0,0,0.6)' }}>
                      <div className="flex gap-0.5">
                        {[0, 150, 300].map(d => <div key={d} className="w-1 h-4 rounded-full animate-bounce" style={{ background: '#a855f7', animationDelay: `${d}ms` }} />)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => playSong(song)}>
                  <p className="font-semibold truncate" style={{ color: isPlaying ? '#a855f7' : undefined }}>{song.title}</p>
                  <p className="text-sm truncate" style={{ color: '#7c7a9e' }}>{artist?.name}</p>
                </div>
                <div className="hidden md:flex items-center gap-1 shrink-0">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => handleRate(song.id, star)} className="star-animate">
                      <svg className="w-4 h-4" fill={star <= (myRating ?? 0) ? '#f59e0b' : 'none'} stroke={star <= (myRating ?? 0) ? '#f59e0b' : '#2a2a4a'} viewBox="0 0 24 24" strokeWidth={2}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  ))}
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-sm font-medium">{song.rating.toFixed(1)}</p>
                  <p className="text-xs" style={{ color: '#7c7a9e' }}>{formatPlays(song.plays)}</p>
                </div>
                <span className="text-sm shrink-0 hidden md:block" style={{ color: '#7c7a9e' }}>{formatDuration(song.duration)}</span>
                <button onClick={() => playSong(song)} className="shrink-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10" style={{ color: '#a855f7' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'artists' && (
        <div className="flex flex-col gap-2">
          {topArtists.map((artist, i) => (
            <div
              key={artist.id}
              className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-white/5 cursor-pointer"
              style={{ background: '#111120' }}
              onClick={() => navigate('artist', { artistId: artist.id })}
            >
              <span className="w-8 text-center font-black text-xl shrink-0" style={{ fontFamily: 'Outfit', color: i < 3 ? '#a855f7' : '#2a2a4a' }}>{i + 1}</span>
              <img src={artist.image} alt={artist.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold truncate">{artist.name}</p>
                  {artist.verified && <svg className="w-4 h-4 shrink-0" fill="#a855f7" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                </div>
                <p className="text-sm truncate" style={{ color: '#7c7a9e' }}>{artist.genre} · {artist.country}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium">{(artist.followers / 1_000_000).toFixed(1)}M</p>
                <p className="text-xs" style={{ color: '#7c7a9e' }}>seguidores</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'albums' && (
        <div className="flex flex-col gap-2">
          {topAlbums.map((album, i) => {
            const artist = getArtistById(album.artistId);
            return (
              <div
                key={album.id}
                className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-white/5 cursor-pointer"
                style={{ background: '#111120' }}
                onClick={() => navigate('album', { albumId: album.id })}
              >
                <span className="w-8 text-center font-black text-xl shrink-0" style={{ fontFamily: 'Outfit', color: i < 3 ? '#a855f7' : '#2a2a4a' }}>{i + 1}</span>
                <img src={album.coverImage} alt={album.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{album.title}</p>
                  <p className="text-sm truncate" style={{ color: '#7c7a9e' }}>{artist?.name} · {album.year}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <svg className="w-4 h-4" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span className="font-medium">{album.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#7c7a9e' }}>{album.votes.toLocaleString()} votos</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
