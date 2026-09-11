import { genres, songs, artists, albums, getSongById, getArtistById } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import SongCard from '@/components/SongCard';
import ArtistCard from '@/components/ArtistCard';
import AlbumCard from '@/components/AlbumCard';

export default function GenreDetail() {
  const { state, navigate } = useApp();
  const genre = genres.find(g => g.id === state.selectedGenreId);
  if (!genre) return <div className="pt-24 px-6 text-center" style={{ color: '#7c7a9e' }}>Género no encontrado</div>;

  const genreSongs = genre.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean) as typeof songs;
  const genreArtists = [...new Set(genreSongs.map(s => s.artistId))].map(id => artists.find(a => a.id === id)).filter(Boolean) as typeof artists;
  const genreAlbums = [...new Set(genreSongs.map(s => s.albumId))].map(id => albums.find(a => a.id === id)).filter(Boolean) as typeof albums;

  return (
    <div className="pb-28">
      <div className="relative h-64">
        <img src={genre.image} alt={genre.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #08080f 0%, rgba(8,8,15,0.4) 100%)' }} />
        <div className="absolute bottom-6 left-6">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: genre.color, color: '#fff' }}>Género</div>
          <h1 className="text-5xl font-black text-white" style={{ fontFamily: 'Outfit' }}>{genre.name}</h1>
          <p className="mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{genre.artistCount.toLocaleString()} artistas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <p className="mt-6 mb-8" style={{ color: '#7c7a9e' }}>{genre.description}</p>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Canciones populares</h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
            {genreSongs.map((s, i) => <SongCard key={s.id} song={s} compact rank={i + 1} />)}
          </div>
        </section>

        {genreArtists.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Artistas destacados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {genreArtists.map(a => <ArtistCard key={a.id} artist={a} />)}
            </div>
          </section>
        )}

        {genreAlbums.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Outfit' }}>Álbumes destacados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {genreAlbums.map(a => <AlbumCard key={a.id} album={a} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
