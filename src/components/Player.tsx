import { useApp } from '@/context/AppContext';
import { getArtistById, formatDuration } from '@/data/mockData';

export default function Player() {
  const { state, dispatch, navigate, toggleFavoriteSong } = useApp();
  const { currentSong, isPlaying, volume, progress, isPlayerExpanded } = state;

  if (!currentSong) return null;

  const artist = getArtistById(currentSong.artistId);
  const isFav = state.favoriteSongIds.includes(currentSong.id);
  const elapsed = Math.floor((currentSong.duration * progress) / 100);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    dispatch({ type: 'SET_PROGRESS', progress: Math.max(0, Math.min(100, pct)) });
  };

  return (
    <>
      {/* Expanded overlay */}
      {isPlayerExpanded && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#08080f' }}>
          {/* Close */}
          <div className="flex justify-between items-center p-6">
            <button onClick={() => dispatch({ type: 'TOGGLE_PLAYER_EXPANDED' })} style={{ color: '#7c7a9e' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="m19 9-7 7-7-7"/></svg>
            </button>
            <span className="text-sm font-medium" style={{ color: '#7c7a9e' }}>Reproduciendo ahora</span>
            <button onClick={() => dispatch({ type: 'TOGGLE_QUEUE' })} style={{ color: '#7c7a9e' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              className="w-72 h-72 rounded-2xl object-cover shadow-2xl"
              style={{ boxShadow: '0 24px 80px rgba(168,85,247,0.3)' }}
            />
            <div className="text-center w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Outfit' }}>{currentSong.title}</h2>
              <p style={{ color: '#7c7a9e' }}>{artist?.name}</p>
              {state.user && (
                <button onClick={() => toggleFavoriteSong(currentSong.id)} className="mt-3 star-animate">
                  <svg className="w-6 h-6" fill={isFav ? '#f472b6' : 'none'} stroke={isFav ? '#f472b6' : '#7c7a9e'} viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              )}
            </div>
            {/* Progress */}
            <div className="w-full max-w-sm">
              <div className="h-1.5 rounded-full cursor-pointer mb-2" style={{ background: '#2a2a4a' }} onClick={handleProgressClick}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #a855f7, #f472b6)' }} />
              </div>
              <div className="flex justify-between text-xs" style={{ color: '#7c7a9e' }}>
                <span>{formatDuration(elapsed)}</span>
                <span>{formatDuration(currentSong.duration)}</span>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-8">
              <button onClick={() => dispatch({ type: 'PREV_SONG' })} style={{ color: '#c4c0e0' }}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
              </button>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}
              >
                {isPlaying
                  ? <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  : <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z"/></svg>
                }
              </button>
              <button onClick={() => dispatch({ type: 'NEXT_SONG' })} style={{ color: '#c4c0e0' }}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 3.5L8 16.14V9.86zM16 6h2v12h-2z"/></svg>
              </button>
            </div>
            {/* Volume */}
            <div className="flex items-center gap-3 w-full max-w-sm">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7c7a9e' }}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={e => dispatch({ type: 'SET_VOLUME', volume: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7c7a9e' }}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            </div>
            {/* Lyrics */}
            {currentSong.lyrics && (
              <div className="w-full max-w-sm rounded-2xl p-6 text-center" style={{ background: '#111120' }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#7c7a9e' }}>Letra</p>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#c4c0e0' }}>{currentSong.lyrics}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mini player bar */}
      {!isPlayerExpanded && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 h-20"
          style={{ background: 'rgba(13,13,26,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid #1e1e35' }}
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-4">
            {/* Cover + info */}
            <button onClick={() => dispatch({ type: 'TOGGLE_PLAYER_EXPANDED' })} className="flex items-center gap-3 min-w-0 w-56 shrink-0">
              <img src={currentSong.coverImage} alt={currentSong.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold truncate">{currentSong.title}</p>
                <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{artist?.name}</p>
              </div>
            </button>

            {/* Favorite */}
            <button onClick={() => toggleFavoriteSong(currentSong.id)} className="shrink-0 star-animate hidden sm:block">
              <svg className="w-5 h-5" fill={isFav ? '#f472b6' : 'none'} stroke={isFav ? '#f472b6' : '#7c7a9e'} viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            {/* Center controls + progress */}
            <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
              <div className="flex items-center gap-4">
                <button onClick={() => dispatch({ type: 'PREV_SONG' })} style={{ color: '#c4c0e0' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
                </button>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}
                >
                  {isPlaying
                    ? <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    : <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z"/></svg>
                  }
                </button>
                <button onClick={() => dispatch({ type: 'NEXT_SONG' })} style={{ color: '#c4c0e0' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 3.5L8 16.14V9.86zM16 6h2v12h-2z"/></svg>
                </button>
              </div>
              <div className="flex items-center gap-2 w-full max-w-md">
                <span className="text-xs shrink-0" style={{ color: '#7c7a9e', width: 32, textAlign: 'right' }}>{formatDuration(elapsed)}</span>
                <div className="flex-1 h-1 rounded-full cursor-pointer" style={{ background: '#2a2a4a' }} onClick={handleProgressClick}>
                  <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #a855f7, #f472b6)' }} />
                </div>
                <span className="text-xs shrink-0" style={{ color: '#7c7a9e', width: 32 }}>{formatDuration(currentSong.duration)}</span>
              </div>
            </div>

            {/* Volume + Queue */}
            <div className="hidden lg:flex items-center gap-3 shrink-0 w-36">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7c7a9e' }}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={e => dispatch({ type: 'SET_VOLUME', volume: parseFloat(e.target.value) })}
                className="flex-1"
              />
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_QUEUE' })}
              className="shrink-0 p-2 rounded-lg transition-colors hover:bg-white/5"
              style={{ color: state.isQueueOpen ? '#a855f7' : '#7c7a9e' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
