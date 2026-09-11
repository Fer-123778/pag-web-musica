import { useState, useEffect } from 'react';
import { songs, artists, albums, genres, newsArticles } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';

export default function Search() {
  const { state, dispatch, navigate } = useApp();
  const [query, setQuery] = useState(state.searchQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Luna Espejo', 'Rock Alternativo', 'Neon Tides']);

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', query });
  }, [query]);

  const q = query.toLowerCase().trim();

  const matchedSongs = q ? songs.filter(s => s.title.toLowerCase().includes(q) || artists.find(a => a.id === s.artistId)?.name.toLowerCase().includes(q)) : [];
  const matchedArtists = q ? artists.filter(a => a.name.toLowerCase().includes(q) || a.genre.toLowerCase().includes(q)) : [];
  const matchedAlbums = q ? albums.filter(al => al.title.toLowerCase().includes(q) || artists.find(a => a.id === al.artistId)?.name.toLowerCase().includes(q)) : [];
  const matchedGenres = q ? genres.filter(g => g.name.toLowerCase().includes(q)) : [];
  const matchedNews = q ? newsArticles.filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)) : [];

  const hasResults = matchedSongs.length > 0 || matchedArtists.length > 0 || matchedAlbums.length > 0 || matchedGenres.length > 0;

  const handleSearch = (term: string) => {
    setQuery(term);
    setRecentSearches(prev => [term, ...prev.filter(s => s !== term)].slice(0, 6));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-28">
      <h1 className="text-3xl font-black mb-6" style={{ fontFamily: 'Outfit' }}>Buscador</h1>

      {/* Search input */}
      <div className="relative mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{ color: '#7c7a9e' }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar canciones, artistas, álbumes o géneros…"
          className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm outline-none"
          style={{ background: '#111120', border: '1px solid #1e1e35', color: '#f0eeff' }}
          onFocus={e => (e.target.style.borderColor = '#a855f7')}
          onBlur={e => (e.target.style.borderColor = '#1e1e35')}
          autoFocus
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#7c7a9e' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        )}
      </div>

      {/* No query: show recent + popular */}
      {!q && (
        <div className="space-y-8">
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold" style={{ fontFamily: 'Outfit' }}>Búsquedas recientes</h2>
                <button onClick={() => setRecentSearches([])} className="text-sm" style={{ color: '#7c7a9e' }}>Limpiar</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(s => (
                  <button key={s} onClick={() => handleSearch(s)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors hover:bg-white/10" style={{ background: '#111120', color: '#c4c0e0' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{ color: '#7c7a9e' }}><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Géneros populares</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {genres.slice(0, 8).map(g => (
                <button key={g.id} onClick={() => navigate('genre-detail', { genreId: g.id })} className="relative overflow-hidden rounded-xl h-20 genre-card">
                  <img src={g.image} alt={g.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${g.color}aa, ${g.color}66)` }}>
                    <span className="font-bold text-white">{g.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {q && (
        <div className="space-y-10">
          {!hasResults && (
            <div className="text-center py-16">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ color: '#2a2a4a' }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <p className="font-semibold text-lg mb-1" style={{ fontFamily: 'Outfit' }}>Sin resultados para "{q}"</p>
              <p className="text-sm" style={{ color: '#7c7a9e' }}>Prueba con otro término de búsqueda.</p>
            </div>
          )}

          {matchedSongs.length > 0 && (
            <div>
              <h2 className="font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Canciones ({matchedSongs.length})</h2>
              <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
                {matchedSongs.map(s => <SongCard key={s.id} song={s} compact />)}
              </div>
            </div>
          )}

          {matchedArtists.length > 0 && (
            <div>
              <h2 className="font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Artistas ({matchedArtists.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {matchedArtists.map(a => <ArtistCard key={a.id} artist={a} />)}
              </div>
            </div>
          )}

          {matchedAlbums.length > 0 && (
            <div>
              <h2 className="font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Álbumes ({matchedAlbums.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {matchedAlbums.map(al => <AlbumCard key={al.id} album={al} />)}
              </div>
            </div>
          )}

          {matchedGenres.length > 0 && (
            <div>
              <h2 className="font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Géneros</h2>
              <div className="flex flex-wrap gap-3">
                {matchedGenres.map(g => (
                  <button key={g.id} onClick={() => navigate('genre-detail', { genreId: g.id })} className="px-5 py-2.5 rounded-xl font-medium text-sm" style={{ background: g.color + '33', color: g.color, border: `1px solid ${g.color}44` }}>
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedNews.length > 0 && (
            <div>
              <h2 className="font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>Noticias</h2>
              <div className="flex flex-col gap-3">
                {matchedNews.map(n => (
                  <div key={n.id} className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-white/5" style={{ background: '#111120' }} onClick={() => navigate('news-detail', { newsId: n.id })}>
                    <img src={n.image} alt="" className="w-16 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{n.title}</p>
                      <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{n.category} · {n.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
