import { useApp, Page } from '@/context/AppContext';

export default function Footer() {
  const { navigate } = useApp();

  const link = (label: string, page: Page) => (
    <button onClick={() => navigate(page)} className="text-left text-sm transition-colors hover:text-white" style={{ color: '#7c7a9e' }}>
      {label}
    </button>
  );

  return (
    <footer className="mt-20" style={{ background: '#0d0d1a', borderTop: '1px solid #1e1e35' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              </div>
              <span className="font-bold" style={{ fontFamily: 'Outfit', background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Música Hub
              </span>
            </div>
            <p className="text-sm" style={{ color: '#7c7a9e' }}>La plataforma musical que conecta a fans con sus artistas favoritos.</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm" style={{ fontFamily: 'Outfit' }}>Música Hub</p>
            {link('Sobre nosotros', 'contact')}
            {link('Contacto', 'contact')}
            {link('Ayuda', 'contact')}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm" style={{ fontFamily: 'Outfit' }}>Explorar</p>
            {link('Música nueva', 'explore')}
            {link('Géneros', 'genres')}
            {link('Rankings', 'rankings')}
            {link('Artistas', 'explore')}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm" style={{ fontFamily: 'Outfit' }}>Comunidad</p>
            {link('Mi perfil', 'profile')}
            {link('Favoritos', 'my-library')}
            {link('Playlists', 'my-library')}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm" style={{ fontFamily: 'Outfit' }}>Legal</p>
            <span className="text-sm" style={{ color: '#7c7a9e' }}>Términos</span>
            <span className="text-sm" style={{ color: '#7c7a9e' }}>Privacidad</span>
            <span className="text-sm" style={{ color: '#7c7a9e' }}>Cookies</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid #1e1e35' }}>
          <p className="text-sm" style={{ color: '#4a4a6a' }}>© 2025 Música Hub. Todos los derechos reservados.</p>
          <div className="flex gap-3">
            {['twitter', 'instagram', 'youtube', 'spotify'].map(sn => (
              <div key={sn} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer" style={{ background: '#1e1e35' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#7c7a9e' }}>
                  {sn === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>}
                  {sn === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}
                  {sn === 'youtube' && <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>}
                  {sn === 'spotify' && <circle cx="12" cy="12" r="10"/>}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
