import { artists, albums, songs, events, newsArticles, getAlbumsByArtistId, getSongsByArtistId, getEventsByArtistId, formatFollowers, formatDuration } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';
import AlbumCard from '@/components/AlbumCard';

export default function ArtistProfile() {
  const { state, navigate, playSong, toggleFollowArtist } = useApp();
  const artist = artists.find(a => a.id === state.selectedArtistId);
  if (!artist) return <div className="pt-24 px-6 text-center" style={{ color: '#7c7a9e' }}>Artista no encontrado</div>;

  const artistAlbums = getAlbumsByArtistId(artist.id).sort((a, b) => b.year - a.year);
  const artistSongs = getSongsByArtistId(artist.id).sort((a, b) => b.plays - a.plays);
  const artistEvents = getEventsByArtistId(artist.id);
  const artistNews = newsArticles.filter(n => n.artistId === artist.id);
  const similarArtists = artists.filter(a => a.id !== artist.id && a.genre.split(' ')[0] === artist.genre.split(' ')[0]).slice(0, 4);
  const isFollowing = state.followedArtistIds.includes(artist.id);

  return (
    <div className="pb-28">
      {/* Header with cover */}
      <div className="relative h-80">
        <img src={artist.coverImage} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #08080f 0%, rgba(8,8,15,0.3) 100%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Artist info */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8 relative z-10">
          <div className="relative shrink-0">
            <img src={artist.image} alt={artist.name} className="w-32 h-32 rounded-2xl object-cover ring-4" style={{ outline: '4px solid #08080f', outlineOffset: '0px' }} />
            {artist.verified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#a855f7' }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#7c7a9e' }}>{artist.genre}</p>
                <h1 className="text-4xl font-black" style={{ fontFamily: 'Outfit' }}>{artist.name}</h1>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-sm" style={{ color: '#7c7a9e' }}>{formatFollowers(artist.followers)} seguidores</span>
                  <span style={{ color: '#2a2a4a' }}>·</span>
                  <span className="text-sm" style={{ color: '#7c7a9e' }}>{artist.country}</span>
                  <span style={{ color: '#2a2a4a' }}>·</span>
                  <span className="text-sm" style={{ color: '#7c7a9e' }}>{artistAlbums.length} álbumes</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => artistSongs[0] && playSong(artistSongs[0])}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Reproducir
                </button>
                <button
                  onClick={() => toggleFollowArtist(artist.id)}
                  className="px-5 py-2.5 rounded-xl font-medium transition-all"
                  style={isFollowing
                    ? { background: '#1a1a2e', color: '#a855f7', border: '1px solid #a855f7' }
                    : { background: '#1a1a2e', color: '#c4c0e0', border: '1px solid #1e1e35' }
                  }
                >
                  {isFollowing ? 'Siguiendo ✓' : 'Seguir'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="mb-10 max-w-3xl" style={{ color: '#7c7a9e' }}>{artist.description}</p>

        {/* Popular songs */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Canciones populares</h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
            {artistSongs.map((s, i) => <SongCard key={s.id} song={s} compact rank={i + 1} />)}
          </div>
        </section>

        {/* Albums */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Discografía</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {artistAlbums.map(al => <AlbumCard key={al.id} album={al} />)}
          </div>
        </section>

        {/* Events */}
        {artistEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Próximos conciertos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artistEvents.map(ev => (
                <div key={ev.id} className="p-5 rounded-2xl flex items-center gap-4" style={{ background: '#111120' }}>
                  <div className="text-center shrink-0 w-14">
                    <p className="text-xs font-bold uppercase" style={{ color: '#7c7a9e' }}>{new Date(ev.date).toLocaleDateString('es-ES', { month: 'short' })}</p>
                    <p className="text-3xl font-black leading-none" style={{ fontFamily: 'Outfit' }}>{new Date(ev.date).getDate()}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{ev.venue}</p>
                    <p className="text-sm" style={{ color: '#7c7a9e' }}>{ev.city}, {ev.country}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#4a4a6a' }}>{ev.time}</p>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full text-xs font-medium" style={{
                    background: ev.status === 'upcoming' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                    color: ev.status === 'upcoming' ? '#10b981' : '#ef4444',
                  }}>
                    {ev.status === 'upcoming' ? 'Disponible' : ev.status === 'sold-out' ? 'Agotado' : 'Cancelado'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* News */}
        {artistNews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Noticias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artistNews.map(n => (
                <div key={n.id} className="flex gap-4 p-4 rounded-2xl cursor-pointer hover:bg-white/5" style={{ background: '#111120' }} onClick={() => navigate('news-detail', { newsId: n.id })}>
                  <img src={n.image} alt="" className="w-20 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs" style={{ color: '#a855f7' }}>{n.category}</span>
                    <p className="font-medium text-sm mt-0.5 line-clamp-2">{n.title}</p>
                    <p className="text-xs mt-1" style={{ color: '#4a4a6a' }}>{n.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar artists */}
        {similarArtists.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Artistas similares</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarArtists.map(a => (
                <div key={a.id} className="card-hover rounded-2xl overflow-hidden cursor-pointer text-center p-4" style={{ background: '#111120' }} onClick={() => navigate('artist', { artistId: a.id })}>
                  <img src={a.image} alt={a.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
                  <p className="font-semibold truncate" style={{ fontFamily: 'Outfit' }}>{a.name}</p>
                  <p className="text-xs" style={{ color: '#7c7a9e' }}>{a.genre}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
