import { useState } from 'react';
import { useApp, Page } from '@/context/AppContext';

const navItems: { label: string; page: Page }[] = [
  { label: 'Inicio', page: 'home' },
  { label: 'Explorar', page: 'explore' },
  { label: 'Noticias', page: 'news' },
  { label: 'Rankings', page: 'rankings' },
  { label: 'Géneros', page: 'genres' },
];

export default function Header() {
  const { state, dispatch, navigate } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16" style={{ background: 'rgba(8,8,15,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1e1e35' }}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => navigate('home')} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Música Hub
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: state.page === item.page ? '#a855f7' : '#c4c0e0',
                background: state.page === item.page ? 'rgba(168,85,247,0.12)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => navigate('search')}
            className="p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: state.page === 'search' ? '#a855f7' : '#7c7a9e' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Lo mío */}
          <button
            onClick={() => navigate('my-library')}
            className="hidden md:flex p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: state.page === 'my-library' ? '#a855f7' : '#7c7a9e' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>

          {/* Notifications */}
          {state.user && (
            <button
              onClick={() => dispatch({ type: 'MARK_NOTIFICATIONS_READ' })}
              className="relative p-2 rounded-lg transition-colors hover:bg-white/5"
              style={{ color: '#7c7a9e' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{ background: '#a855f7', fontSize: '10px' }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Profile */}
          {state.user ? (
            <button onClick={() => navigate('profile')} className="w-8 h-8 rounded-full overflow-hidden ring-2 transition-all hover:ring-purple-400" style={{ outline: `2px solid ${state.page === 'profile' ? '#a855f7' : 'transparent'}` }}>
              <img src={state.user.avatar} alt={state.user.name} className="w-full h-full object-cover" />
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: 'OPEN_AUTH', mode: 'login' })}
              className="hidden md:flex px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
            >
              Entrar
            </button>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/5" style={{ color: '#7c7a9e' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {mobileOpen ? <path d="M6 18L18 6M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 animate-fade-in" style={{ background: '#0d0d1a', borderBottom: '1px solid #1e1e35' }}>
          <div className="p-4 flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => { navigate(item.page); setMobileOpen(false); }}
                className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{ color: state.page === item.page ? '#a855f7' : '#c4c0e0', background: state.page === item.page ? 'rgba(168,85,247,0.1)' : 'transparent' }}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => { navigate('my-library'); setMobileOpen(false); }} className="text-left px-4 py-3 rounded-lg text-sm font-medium" style={{ color: '#c4c0e0' }}>Lo mío</button>
            {!state.user && (
              <button
                onClick={() => { dispatch({ type: 'OPEN_AUTH', mode: 'login' }); setMobileOpen(false); }}
                className="mt-2 px-4 py-3 rounded-lg text-sm font-medium text-center"
                style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
