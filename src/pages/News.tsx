import { useState } from 'react';
import { newsArticles, getNewsById, getArtistById } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const categories = ['Todos', 'Giras', 'Conciertos', 'Próximos Lanzamientos', 'Nuevos Álbumes', 'Festivales', 'Noticias de la Industria', 'Nuevos Artistas'];

export default function News() {
  const [cat, setCat] = useState('Todos');
  const { state, navigate } = useApp();

  if (state.selectedNewsId && state.page === 'news-detail') {
    const article = getNewsById(state.selectedNewsId);
    if (!article) return null;
    const related = newsArticles.filter(n => n.id !== article.id).slice(0, 3);
    return (
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-28">
        <button onClick={() => navigate('news')} className="flex items-center gap-2 mb-6 transition-colors hover:text-white" style={{ color: '#7c7a9e' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="m15 18-6-6 6-6"/></svg>
          Volver a Noticias
        </button>
        <div className="rounded-3xl overflow-hidden" style={{ background: '#111120' }}>
          <img src={article.image} alt={article.title} className="w-full h-72 object-cover" />
          <div className="p-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>{article.category}</span>
            <h1 className="text-3xl font-black mb-4" style={{ fontFamily: 'Outfit' }}>{article.title}</h1>
            <div className="flex items-center gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid #1e1e35' }}>
              <span className="text-sm" style={{ color: '#7c7a9e' }}>Por {article.author}</span>
              <span style={{ color: '#2a2a4a' }}>·</span>
              <span className="text-sm" style={{ color: '#7c7a9e' }}>{new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span style={{ color: '#2a2a4a' }}>·</span>
              <span className="text-sm" style={{ color: '#7c7a9e' }}>{article.readTime} min de lectura</span>
            </div>
            <p className="text-lg mb-4 leading-relaxed" style={{ color: '#c4c0e0' }}>{article.summary}</p>
            <p className="leading-relaxed" style={{ color: '#7c7a9e' }}>{article.content}</p>
            {article.artistId && (
              <div className="mt-8 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/5" style={{ background: '#1a1a2e' }} onClick={() => navigate('artist', { artistId: article.artistId! })}>
                <img src={getArtistById(article.artistId)?.image} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#7c7a9e' }}>Artista relacionado</p>
                  <p className="font-semibold">{getArtistById(article.artistId)?.name}</p>
                </div>
                <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{ color: '#7c7a9e' }}><path d="m9 18 6-6-6-6"/></svg>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Outfit' }}>También te puede interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map(n => (
              <div key={n.id} className="card-hover rounded-2xl overflow-hidden cursor-pointer" style={{ background: '#111120' }} onClick={() => navigate('news-detail', { newsId: n.id })}>
                <img src={n.image} alt={n.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <span className="text-xs" style={{ color: '#a855f7' }}>{n.category}</span>
                  <h3 className="font-semibold mt-1 text-sm line-clamp-2">{n.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filtered = cat === 'Todos' ? newsArticles : newsArticles.filter(n => n.category === cat);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-28">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'Outfit' }}>
          <span style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Noticias</span>
        </h1>
        <p style={{ color: '#7c7a9e' }}>Las últimas novedades del mundo musical.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
            style={cat === c ? { background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' } : { background: '#111120', color: '#7c7a9e' }}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: '#7c7a9e' }}>No hay noticias en esta categoría.</div>
      ) : (
        <>
          {/* Featured */}
          <div className="card-hover rounded-3xl overflow-hidden mb-8 cursor-pointer" style={{ background: '#111120' }} onClick={() => navigate('news-detail', { newsId: filtered[0].id })}>
            <div className="grid md:grid-cols-2">
              <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-64 md:h-auto object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>{filtered[0].category}</span>
                <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Outfit' }}>{filtered[0].title}</h2>
                <p className="mb-4" style={{ color: '#7c7a9e' }}>{filtered[0].summary}</p>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#4a4a6a' }}>
                  <span>{filtered[0].author}</span>
                  <span>·</span>
                  <span>{filtered[0].readTime} min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(1).map(n => (
              <div key={n.id} className="card-hover rounded-2xl overflow-hidden cursor-pointer" style={{ background: '#111120' }} onClick={() => navigate('news-detail', { newsId: n.id })}>
                <div className="relative h-48">
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(168,85,247,0.8)', color: '#fff' }}>{n.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold leading-snug line-clamp-2 mb-2" style={{ fontFamily: 'Outfit' }}>{n.title}</h3>
                  <p className="text-sm line-clamp-2 mb-4" style={{ color: '#7c7a9e' }}>{n.summary}</p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#4a4a6a' }}>
                    <span>{n.author}</span>
                    <span>·</span>
                    <span>{new Date(n.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                    <span>·</span>
                    <span>{n.readTime} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
