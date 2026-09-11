import { genres } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function Genres() {
  const { navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-28">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'Outfit' }}>
          <span style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Géneros</span>
        </h1>
        <p style={{ color: '#7c7a9e' }}>Explora la música por géneros y descubre nuevos artistas.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {genres.map(g => (
          <div
            key={g.id}
            className="genre-card cursor-pointer rounded-2xl overflow-hidden"
            style={{ height: 200 }}
            onClick={() => navigate('genre-detail', { genreId: g.id })}
          >
            <img src={g.image} alt={g.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-5" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)` }}>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit' }}>{g.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{g.artistCount.toLocaleString()} artistas</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: g.color }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
