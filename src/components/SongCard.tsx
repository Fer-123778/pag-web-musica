import { Song, getArtistById, formatDuration, formatPlays } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

interface SongCardProps {
  song: Song;
  rank?: number;
  compact?: boolean;
  showAlbum?: boolean;
}

export default function SongCard({ song, rank, compact, showAlbum }: SongCardProps) {
  const { state, dispatch, navigate, playSong, addToQueue, toggleFavoriteSong } = useApp();
  const artist = getArtistById(song.artistId);
  const isFav = state.favoriteSongIds.includes(song.id);
  const isPlaying = state.currentSong?.id === song.id && state.isPlaying;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5 group">
        {rank && <span className="w-5 text-center text-sm font-bold shrink-0" style={{ color: '#7c7a9e' }}>{rank}</span>}
        <div className="relative shrink-0">
          <img src={song.coverImage} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="flex gap-0.5">
                <div className="w-0.5 h-3 rounded-full animate-bounce" style={{ background: '#a855f7', animationDelay: '0ms' }} />
                <div className="w-0.5 h-3 rounded-full animate-bounce" style={{ background: '#a855f7', animationDelay: '150ms' }} />
                <div className="w-0.5 h-3 rounded-full animate-bounce" style={{ background: '#a855f7', animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => playSong(song)}>
          <p className="text-sm font-medium truncate" style={{ color: isPlaying ? '#a855f7' : undefined }}>{song.title}</p>
          <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{artist?.name}</p>
        </div>
        <span className="text-xs shrink-0" style={{ color: '#7c7a9e' }}>{formatDuration(song.duration)}</span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => toggleFavoriteSong(song.id)} className="p-1.5 rounded-lg hover:bg-white/10">
            <svg className="w-4 h-4" fill={isFav ? '#f472b6' : 'none'} stroke={isFav ? '#f472b6' : '#7c7a9e'} viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button onClick={() => addToQueue(song)} className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: '#7c7a9e' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-hover rounded-2xl overflow-hidden group cursor-pointer" style={{ background: '#111120' }} onClick={() => navigate('song', { songId: song.id })}>
      <div className="relative aspect-square">
        <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <button
            onClick={e => { e.stopPropagation(); playSong(song); }}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}
          >
            {isPlaying
              ? <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              : <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z"/></svg>
            }
          </button>
        </div>
        <button
          onClick={e => { e.stopPropagation(); toggleFavoriteSong(song.id); }}
          className="absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity star-animate"
          style={{ background: 'rgba(0,0,0,0.6)' }}
        >
          <svg className="w-4 h-4" fill={isFav ? '#f472b6' : 'none'} stroke={isFav ? '#f472b6' : '#fff'} viewBox="0 0 24 24" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="p-3">
        <p className="font-semibold truncate" style={{ fontFamily: 'Outfit' }}>{song.title}</p>
        <p className="text-sm truncate mt-0.5" style={{ color: '#7c7a9e' }}>{artist?.name}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: '#4a4a6a' }}>{song.genre}</span>
          <span className="text-xs" style={{ color: '#4a4a6a' }}>{formatDuration(song.duration)}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <svg className="w-3 h-3" fill="#f59e0b" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span className="text-xs" style={{ color: '#7c7a9e' }}>{song.rating.toFixed(1)}</span>
          <span className="text-xs ml-2" style={{ color: '#4a4a6a' }}>{formatPlays(song.plays)} plays</span>
        </div>
        <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={e => { e.stopPropagation(); addToQueue(song); }}
            className="flex-1 py-1 rounded-lg text-xs transition-colors hover:bg-white/10"
            style={{ color: '#7c7a9e', background: '#1a1a2e' }}
          >
            + Cola
          </button>
        </div>
      </div>
    </div>
  );
}
