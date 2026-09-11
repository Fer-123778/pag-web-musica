import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function AuthModal() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  if (!state.isAuthModalOpen) return null;

  const isLogin = state.authMode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Por favor completa todos los campos.'); return; }
    if (!isLogin && password !== confirm) { setError('Las contraseñas no coinciden.'); return; }
    if (!isLogin && !name) { setError('Por favor ingresa tu nombre.'); return; }

    dispatch({
      type: 'LOGIN',
      user: {
        id: 'u1',
        name: isLogin ? 'Usuario Demo' : name,
        username: isLogin ? 'usuario_demo' : (username || email.split('@')[0]),
        email,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format`,
        joinDate: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        favoriteGenres: [],
      },
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification: {
        id: Date.now().toString(),
        message: isLogin ? '¡Bienvenido de vuelta!' : '¡Cuenta creada con éxito!',
        type: 'success',
        timestamp: new Date(),
        read: false,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-3xl p-8 animate-scale-in relative" style={{ background: '#111120', border: '1px solid #1e1e35' }}>
        <button
          onClick={() => dispatch({ type: 'CLOSE_AUTH' })}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5"
          style={{ color: '#7c7a9e' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          </div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
          <p className="text-sm mt-1" style={{ color: '#7c7a9e' }}>{isLogin ? 'Bienvenido de vuelta a Música Hub' : 'Únete a la comunidad musical'}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
                  onFocus={e => (e.target.style.borderColor = '#a855f7')}
                  onBlur={e => (e.target.style.borderColor = '#1e1e35')}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>Nombre de usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="@usuario"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
                  onFocus={e => (e.target.style.borderColor = '#a855f7')}
                  onBlur={e => (e.target.style.borderColor = '#1e1e35')}
                />
              </div>
            </>
          )}
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
              onFocus={e => (e.target.style.borderColor = '#a855f7')}
              onBlur={e => (e.target.style.borderColor = '#1e1e35')}
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
              onFocus={e => (e.target.style.borderColor = '#a855f7')}
              onBlur={e => (e.target.style.borderColor = '#1e1e35')}
            />
          </div>
          {!isLogin && (
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>Confirmar contraseña</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
                onFocus={e => (e.target.style.borderColor = '#a855f7')}
                onBlur={e => (e.target.style.borderColor = '#1e1e35')}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 mt-2"
            style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}
          >
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: '#7c7a9e' }}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => dispatch({ type: 'OPEN_AUTH', mode: isLogin ? 'register' : 'login' })}
            style={{ color: '#a855f7' }}
            className="font-medium hover:underline"
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
