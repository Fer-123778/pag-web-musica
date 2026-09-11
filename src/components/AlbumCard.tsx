import { Album, getArtistById } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

interface AlbumCardProps {
  album: Album;
  compact?: boolean;
}

export default function AlbumCard({ album, compact }: AlbumCardProps) {
  const { state, navigate, toggleFavoriteAlbum } = useApp();
  const artist = getArtistById(album.artistId);
  const isFav = state.favoriteAlbumIds.includes(album.id);

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5 cursor-pointer group" onClick={() => navigate('album', { albumId: album.id })}>
        <img src={album.coverImage} alt={album.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{album.title}</p>
          <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{artist?.name} · {album.year}</p>
        </div>
        <button
          onClick={e => { e.stopPropagation(); toggleFavoriteAlbum(album.id); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity star-animate"
        >
          <svg className="w-4 h-4" fill={isFav ? '#f472b6' : 'none'} stroke={isFav ? '#f472b6' : '#7c7a9e'} viewBox="0 0 24 24" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className="card-hover rounded-2xl overflow-hidden group cursor-pointer"
      style={{ background: '#111120' }}
      onClick={() => navigate('album', { albumId: album.id })}
    >
      <div className="relative aspect-square">
        <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}>
          <button
            onClick={e => { e.stopPropagation(); toggleFavoriteAlbum(album.id); }}
            className="ml-auto p-2 rounded-full star-animate"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            <svg className="w-4 h-4" fill={isFav ? '#f472b6' : 'none'} stroke={isFav ? '#f472b6' : '#fff'} viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="font-semibold truncate" style={{ fontFamily: 'Outfit' }}>{album.title}</p>
        <p className="text-sm truncate mt-0.5" style={{ color: '#7c7a9e' }}>{artist?.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: '#4a4a6a' }}>{album.year} · {album.genre}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span className="text-xs" style={{ color: '#7c7a9e' }}>{album.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
