import { Artist, formatFollowers } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

interface ArtistCardProps {
  artist: Artist;
  compact?: boolean;
}

export default function ArtistCard({ artist, compact }: ArtistCardProps) {
  const { state, navigate, toggleFollowArtist } = useApp();
  const isFollowing = state.followedArtistIds.includes(artist.id);

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5 cursor-pointer" onClick={() => navigate('artist', { artistId: artist.id })}>
        <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate flex items-center gap-1">
            {artist.name}
            {artist.verified && <svg className="w-3.5 h-3.5 shrink-0" fill="#a855f7" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
          </p>
          <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{artist.genre} · {formatFollowers(artist.followers)} seguidores</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card-hover rounded-2xl overflow-hidden group cursor-pointer text-center"
      style={{ background: '#111120' }}
      onClick={() => navigate('artist', { artistId: artist.id })}
    >
      <div className="relative pt-6 px-6">
        <div className="relative">
          <img src={artist.image} alt={artist.name} className="w-24 h-24 rounded-full object-cover mx-auto ring-2" style={{ outline: "2px solid #1e1e35"}} />
          {artist.verified && (
            <div className="absolute bottom-0 right-1/3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#a855f7' }}>
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="font-bold truncate" style={{ fontFamily: 'Outfit' }}>{artist.name}</p>
        <p className="text-sm mt-0.5 truncate" style={{ color: '#7c7a9e' }}>{artist.genre}</p>
        <p className="text-xs mt-1" style={{ color: '#4a4a6a' }}>{formatFollowers(artist.followers)} seguidores</p>
        <button
          onClick={e => { e.stopPropagation(); toggleFollowArtist(artist.id); }}
          className="mt-3 w-full py-1.5 rounded-lg text-sm font-medium transition-all"
          style={isFollowing
            ? { background: '#1a1a2e', color: '#a855f7', border: '1px solid #a855f7' }
            : { background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }
          }
        >
          {isFollowing ? 'Siguiendo ✓' : 'Seguir'}
        </button>
      </div>
    </div>
  );
}
