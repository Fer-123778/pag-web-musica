import { useApp } from '@/context/AppContext';
import { getArtistById, formatDuration } from '@/data/mockData';

export default function QueuePanel() {
  const { state, dispatch, playSong } = useApp();

  if (!state.isQueueOpen) return null;

  return (
    <div
      className="fixed bottom-20 right-4 z-40 w-80 rounded-2xl overflow-hidden animate-scale-in"
      style={{ background: '#111120', border: '1px solid #1e1e35', maxHeight: '60vh', display: 'flex', flexDirection: 'column' }}
    >
      <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid #1e1e35' }}>
        <div>
          <h3 className="font-semibold" style={{ fontFamily: 'Outfit' }}>Cola de reproducción</h3>
          <p className="text-xs mt-0.5" style={{ color: '#7c7a9e' }}>{state.queue.length} canciones</p>
        </div>
        <div className="flex gap-2">
          {state.queue.length > 0 && (
            <button
              onClick={() => dispatch({ type: 'CLEAR_QUEUE' })}
              className="text-xs px-2 py-1 rounded-lg transition-colors hover:bg-white/5"
              style={{ color: '#7c7a9e' }}
            >
              Vaciar
            </button>
          )}
          <button onClick={() => dispatch({ type: 'TOGGLE_QUEUE' })} style={{ color: '#7c7a9e' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      {state.currentSong && (
        <div className="p-3" style={{ borderBottom: '1px solid #1e1e35' }}>
          <p className="text-xs mb-2" style={{ color: '#7c7a9e' }}>Reproduciendo ahora</p>
          <div className="flex items-center gap-3">
            <img src={state.currentSong.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate" style={{ color: '#a855f7' }}>{state.currentSong.title}</p>
              <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{getArtistById(state.currentSong.artistId)?.name}</p>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-4 rounded-full animate-bounce" style={{ background: '#a855f7', animationDelay: '0ms' }} />
              <div className="w-1 h-4 rounded-full animate-bounce" style={{ background: '#a855f7', animationDelay: '150ms' }} />
              <div className="w-1 h-4 rounded-full animate-bounce" style={{ background: '#a855f7', animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-y-auto flex-1">
        {state.queue.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ color: '#2a2a4a' }}>
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            </svg>
            <p className="text-sm" style={{ color: '#7c7a9e' }}>La cola está vacía</p>
            <p className="text-xs mt-1" style={{ color: '#4a4a6a' }}>Agrega canciones para reproducirlas a continuación</p>
          </div>
        ) : (
          <div className="p-2">
            {state.queue.map((song, index) => {
              const artist = getArtistById(song.artistId);
              return (
                <div
                  key={`${song.id}-${index}`}
                  className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5 group"
                >
                  <img
                    src={song.coverImage}
                    alt=""
                    className="w-9 h-9 rounded-lg object-cover cursor-pointer"
                    onClick={() => playSong(song)}
                  />
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => playSong(song)}>
                    <p className="text-sm font-medium truncate">{song.title}</p>
                    <p className="text-xs truncate" style={{ color: '#7c7a9e' }}>{artist?.name}</p>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: '#7c7a9e' }}>{formatDuration(song.duration)}</span>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_QUEUE', index })}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: '#7c7a9e' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
