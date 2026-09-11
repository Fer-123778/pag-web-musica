import { artists, albums, songs, genres, newsArticles } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';
import AlbumCard from '@/components/AlbumCard';
import ArtistCard from '@/components/ArtistCard';

export default function Home() {
  const { navigate, playSong, state, dispatch } = useApp();

  const topSongs = [...songs].sort((a, b) => b.plays - a.plays).slice(0, 5);
  const topArtists = [...artists].sort((a, b) => b.followers - a.followers).slice(0, 5);
  const topAlbums = [...albums].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const newReleases = [...songs].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 8);
  const trending = [...songs].sort((a, b) => b.votes - a.votes).slice(0, 6);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501386761578-eaa54b3d1c3a?w=1400&h=600&fit=crop&auto=format"
            alt="Concierto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,8,15,0.95) 0%, rgba(8,8,15,0.7) 60%, rgba(8,8,15,0.4) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #08080f 0%, transparent 40%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#a855f7' }} />
              Descubre música ahora
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4" style={{ fontFamily: 'Outfit' }}>
              Descubre tu próxima<br />
              <span style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                canción favorita
              </span>
            </h1>
            <p className="text-lg mb-8" style={{ color: '#c4c0e0' }}>
              Millones de canciones, artistas y álbumes. Rankings en tiempo real, noticias y recomendaciones personalizadas.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('explore')}
                className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
              >
                Explorar música
              </button>
              <button
                onClick={() => navigate('rankings')}
                className="px-6 py-3 rounded-xl font-semibold transition-colors hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Ver rankings
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Genres */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Géneros populares</h2>
            <button onClick={() => navigate('genres')} className="text-sm transition-colors hover:text-white" style={{ color: '#a855f7' }}>Ver todos →</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3">
            {genres.map(g => (
              <button
                key={g.id}
                onClick={() => navigate('genre-detail', { genreId: g.id })}
                className="relative overflow-hidden rounded-xl aspect-square genre-card"
              >
                <img src={g.image} alt={g.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-10 flex items-end p-2" style={{ background: `linear-gradient(to top, ${g.color}cc 0%, transparent 70%)` }}>
                  <span className="text-xs font-bold text-white leading-tight">{g.name}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Lo nuevo</h2>
            <button onClick={() => navigate('explore')} className="text-sm" style={{ color: '#a855f7' }}>Ver más →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {newReleases.map(song => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Outfit' }}>Lo que está sonando</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {trending.map((song, i) => (
              <div key={song.id} className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-white/5 group cursor-pointer" style={{ background: '#111120' }} onClick={() => playSong(song)}>
                <span className="w-8 text-center font-black text-2xl shrink-0" style={{ fontFamily: 'Outfit', color: i < 3 ? '#a855f7' : '#2a2a4a' }}>
                  {i + 1}
                </span>
                <img src={song.coverImage} alt={song.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{song.title}</p>
                  <p className="text-sm truncate" style={{ color: '#7c7a9e' }}>{artists.find(a => a.id === song.artistId)?.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <svg className="w-3.5 h-3.5" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span className="text-sm font-medium">{song.rating.toFixed(1)}</span>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); playSong(song); }}
                    className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#a855f7' }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top 5 Rankings */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Rankings rápidos</h2>
            <button onClick={() => navigate('rankings')} className="text-sm" style={{ color: '#a855f7' }}>Ver ranking completo →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Songs */}
            <div className="rounded-2xl p-5" style={{ background: '#111120' }}>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Outfit', color: '#a855f7' }}>🎵 Top Canciones</h3>
              <div className="flex flex-col gap-1">
                {topSongs.map((s, i) => (
                  <SongCard key={s.id} song={s} compact rank={i + 1} />
                ))}
              </div>
            </div>
            {/* Top Artists */}
            <div className="rounded-2xl p-5" style={{ background: '#111120' }}>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Outfit', color: '#f472b6' }}>🎤 Top Artistas</h3>
              <div className="flex flex-col gap-1">
                {topArtists.map((a, i) => (
                  <div key={a.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer" onClick={() => navigate('artist', { artistId: a.id })}>
                    <span className="w-5 text-center text-sm font-bold shrink-0" style={{ color: '#7c7a9e' }}>{i + 1}</span>
                    <img src={a.image} alt={a.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{a.name}</p>
                      <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{a.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Top Albums */}
            <div className="rounded-2xl p-5" style={{ background: '#111120' }}>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Outfit', color: '#f59e0b' }}>💿 Top Álbumes</h3>
              <div className="flex flex-col gap-1">
                {topAlbums.map((al, i) => (
                  <AlbumCard key={al.id} album={al} compact />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artists */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Artistas populares</h2>
            <button onClick={() => navigate('explore')} className="text-sm" style={{ color: '#a855f7' }}>Ver todos →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artists.slice(0, 6).map(a => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Outfit' }}>Recomendado para ti</h2>
          {state.user ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {songs.slice(4, 10).map(s => <SongCard key={s.id} song={s} />)}
            </div>
          ) : (
            <div className="rounded-2xl p-10 text-center" style={{ background: '#111120', border: '1px dashed #2a2a4a' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(168,85,247,0.1)' }}>
                <svg className="w-8 h-8" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Outfit' }}>Descubre música personalizada</h3>
              <p className="text-sm mb-6" style={{ color: '#7c7a9e' }}>Crea una cuenta para recibir recomendaciones basadas en tus gustos, historial y favoritos.</p>
              <button
                onClick={() => dispatch({ type: 'OPEN_AUTH', mode: 'register' })}
                className="px-6 py-2.5 rounded-xl font-medium transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
              >
                Crear cuenta gratis
              </button>
            </div>
          )}
        </section>

        {/* News preview */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Últimas noticias</h2>
            <button onClick={() => navigate('news')} className="text-sm" style={{ color: '#a855f7' }}>Ver todas →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.slice(0, 3).map(n => (
              <div key={n.id} className="card-hover rounded-2xl overflow-hidden cursor-pointer" style={{ background: '#111120' }} onClick={() => navigate('news-detail', { newsId: n.id })}>
                <div className="relative h-44">
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(168,85,247,0.8)', color: '#fff' }}>{n.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold leading-snug line-clamp-2" style={{ fontFamily: 'Outfit' }}>{n.title}</h3>
                  <p className="text-sm mt-2 line-clamp-2" style={{ color: '#7c7a9e' }}>{n.summary}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs" style={{ color: '#4a4a6a' }}>{n.author}</span>
                    <span style={{ color: '#2a2a4a' }}>·</span>
                    <span className="text-xs" style={{ color: '#4a4a6a' }}>{n.readTime} min lectura</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
