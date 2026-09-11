import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function Settings() {
  const { state, dispatch, navigate } = useApp();
  const [section, setSection] = useState('perfil');

  if (!state.user) {
    return (
      <div className="max-w-lg mx-auto px-6 pt-32 pb-28 text-center">
        <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Outfit' }}>Inicia sesión para acceder a la configuración</h2>
        <button onClick={() => dispatch({ type: 'OPEN_AUTH', mode: 'login' })} className="px-6 py-3 rounded-xl font-medium" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}>
          Iniciar sesión
        </button>
      </div>
    );
  }

  const sections = [
    { id: 'perfil', label: 'Datos personales', icon: '👤' },
    { id: 'contrasena', label: 'Contraseña', icon: '🔒' },
    { id: 'musica', label: 'Preferencias musicales', icon: '🎵' },
    { id: 'notificaciones', label: 'Notificaciones', icon: '🔔' },
    { id: 'reproduccion', label: 'Reproducción', icon: '▶️' },
    { id: 'privacidad', label: 'Privacidad', icon: '🛡️' },
    { id: 'tema', label: 'Tema visual', icon: '🎨' },
    { id: 'idioma', label: 'Idioma', icon: '🌐' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-28">
      <h1 className="text-3xl font-black mb-8" style={{ fontFamily: 'Outfit' }}>Configuración</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="rounded-2xl overflow-hidden" style={{ background: '#111120' }}>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors text-sm"
                style={{
                  background: section === s.id ? 'rgba(168,85,247,0.1)' : 'transparent',
                  color: section === s.id ? '#a855f7' : '#c4c0e0',
                  borderLeft: section === s.id ? '2px solid #a855f7' : '2px solid transparent',
                }}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #1e1e35' }}>
              <button
                onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('home'); }}
                className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-colors hover:bg-white/5"
                style={{ color: '#ef4444' }}
              >
                <span>🚪</span>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="rounded-2xl p-6" style={{ background: '#111120' }}>
            {section === 'perfil' && (
              <div>
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Outfit' }}>Datos personales</h2>
                <div className="flex items-center gap-4 mb-8">
                  <img src={state.user.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover" />
                  <button className="px-4 py-2 rounded-xl text-sm" style={{ background: '#1a1a2e', color: '#c4c0e0', border: '1px solid #1e1e35' }}>Cambiar foto</button>
                </div>
                {[
                  { label: 'Nombre completo', value: state.user.name, type: 'text' },
                  { label: 'Nombre de usuario', value: state.user.username, type: 'text' },
                  { label: 'Email', value: state.user.email, type: 'email' },
                ].map(({ label, value, type }) => (
                  <div key={label} className="mb-4">
                    <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>{label}</label>
                    <input type={type} defaultValue={value} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }} />
                  </div>
                ))}
                <button className="px-5 py-2.5 rounded-xl text-sm font-medium mt-2" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}>
                  Guardar cambios
                </button>
              </div>
            )}

            {section === 'tema' && (
              <div>
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Outfit' }}>Tema visual</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'dark', label: 'Oscuro', bg: '#08080f', preview: '#111120', active: state.darkMode },
                    { id: 'light', label: 'Claro', bg: '#f8f8ff', preview: '#ffffff', active: !state.darkMode },
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => theme.id === 'light' && dispatch({ type: 'TOGGLE_DARK_MODE' })}
                      className="p-4 rounded-2xl border-2 transition-all text-left"
                      style={{ background: '#1a1a2e', borderColor: theme.active ? '#a855f7' : '#1e1e35' }}
                    >
                      <div className="h-20 rounded-xl mb-3 overflow-hidden" style={{ background: theme.bg }}>
                        <div className="h-4 rounded-t-xl" style={{ background: theme.bg === '#08080f' ? '#111120' : '#ebebff' }} />
                        <div className="p-2 flex gap-1 mt-2">
                          <div className="h-2 rounded flex-1" style={{ background: theme.preview }} />
                          <div className="h-2 rounded" style={{ width: '30%', background: theme.preview }} />
                        </div>
                      </div>
                      <p className="font-medium text-sm">{theme.label}</p>
                      {theme.active && <p className="text-xs mt-0.5" style={{ color: '#a855f7' }}>Activo</p>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {section !== 'perfil' && section !== 'tema' && (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">{sections.find(s => s.id === section)?.icon}</p>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit' }}>{sections.find(s => s.id === section)?.label}</h2>
                <p style={{ color: '#7c7a9e' }}>Esta sección estará disponible próximamente.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
