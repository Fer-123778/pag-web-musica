import { useState } from 'react';
import { songs, artists, albums, genres } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';
import AlbumCard from '@/components/AlbumCard';
import ArtistCard from '@/components/ArtistCard';

type Section = 'all' | 'songs' | 'artists' | 'albums';

export default function Explore() {
  const [section, setSection] = useState<Section>('all');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState<'plays' | 'rating' | 'date'>('plays');
  const { navigate } = useApp();

  const uniqueGenres = [...new Set(songs.map(s => s.genre))];

  const filteredSongs = songs
    .filter(s => !genreFilter || s.genre === genreFilter)
    .sort((a, b) => sortBy === 'plays' ? b.plays - a.plays : sortBy === 'rating' ? b.rating - a.rating : new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  const filteredArtists = artists.filter(a => !genreFilter || a.genre.includes(genreFilter.split(' ')[0]));
  const filteredAlbums = albums.filter(al => !genreFilter || al.genre.includes(genreFilter.split(' ')[0])).sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-28">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'Outfit' }}>
          <span style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Explorar</span>
        </h1>
        <p style={{ color: '#7c7a9e' }}>Descubre toda la música disponible en la plataforma.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#111120' }}>
          {([['all', 'Todo'], ['songs', 'Canciones'], ['artists', 'Artistas'], ['albums', 'Álbumes']] as [Section, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={section === id ? { background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' } : { color: '#7c7a9e' }}
            >
              {label}
            </button>
          ))}
        </div>

        <select
          value={genreFilter}
          onChange={e => setGenreFilter(e.target.value)}
          className="px-4 py-2 rounded-xl text-sm outline-none"
          style={{ background: '#111120', color: '#c4c0e0', border: '1px solid #1e1e35' }}
        >
          <option value="">Todos los géneros</option>
          {uniqueGenres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        {(section === 'all' || section === 'songs') && (
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 rounded-xl text-sm outline-none"
            style={{ background: '#111120', color: '#c4c0e0', border: '1px solid #1e1e35' }}
          >
            <option value="plays">Más populares</option>
            <option value="rating">Mejor valoradas</option>
            <option value="date">Más recientes</option>
          </select>
        )}
      </div>

      {/* Content */}
      {(section === 'all' || section === 'songs') && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Canciones</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSongs.slice(0, section === 'songs' ? undefined : 12).map(s => <SongCard key={s.id} song={s} />)}
          </div>
        </section>
      )}

      {(section === 'all' || section === 'artists') && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Artistas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredArtists.map(a => <ArtistCard key={a.id} artist={a} />)}
          </div>
        </section>
      )}

      {(section === 'all' || section === 'albums') && (
        <section>
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Álbumes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredAlbums.map(al => <AlbumCard key={al.id} album={al} />)}
          </div>
        </section>
      )}
    </div>
  );
}
