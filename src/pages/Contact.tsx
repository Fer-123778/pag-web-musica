import { useState } from 'react';

const faqs = [
  { q: '¿Música Hub es gratuito?', a: 'Sí, Música Hub es completamente gratuito. Puedes explorar toda la plataforma, escuchar música y guardar favoritos sin coste alguno.' },
  { q: '¿Cómo puedo subir mi música?', a: 'Actualmente Música Hub es una plataforma de descubrimiento. Si eres artista, puedes contactarnos para explorar opciones de colaboración.' },
  { q: '¿Puedo descargar canciones?', a: 'En este momento no ofrecemos descarga de canciones. La reproducción es únicamente en streaming dentro de la plataforma.' },
  { q: '¿Cómo funciona el sistema de rankings?', a: 'Los rankings se calculan a partir del número de reproducciones, votos de los usuarios y la actividad general en la plataforma.' },
  { q: '¿Puedo sugerir un artista o álbum?', a: 'Por supuesto. Usa el formulario de contacto para enviarnos tus sugerencias. Revisamos cada propuesta con atención.' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-28">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'Outfit' }}>
          <span style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Contacto</span>
        </h1>
        <p style={{ color: '#7c7a9e' }}>¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <div className="rounded-3xl p-6 mb-6" style={{ background: '#111120' }}>
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Sobre Música Hub</h2>
            <p className="leading-relaxed" style={{ color: '#7c7a9e' }}>
              Música Hub es una plataforma musical diseñada para conectar a fans con la música que aman. Nuestro objetivo es hacer que descubrir música nueva sea tan emocionante como escucharla.
            </p>
            <p className="leading-relaxed mt-3" style={{ color: '#7c7a9e' }}>
              Desde rankings actualizados en tiempo real hasta recomendaciones personalizadas, trabajamos constantemente para mejorar la experiencia de cada usuario.
            </p>
          </div>

          <div className="rounded-3xl p-6 mb-6" style={{ background: '#111120' }}>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit' }}>Información</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.15)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <span className="text-sm" style={{ color: '#7c7a9e' }}>hola@musicahub.io</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.15)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth={2}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </div>
                <span className="text-sm" style={{ color: '#7c7a9e' }}>@musicahubio</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-6" style={{ background: '#111120' }}>
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Preguntas frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="font-medium cursor-pointer list-none flex items-center justify-between text-sm">
                    {faq.q}
                    <svg className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{ color: '#7c7a9e' }}><path d="m6 9 6 6 6-6"/></svg>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#7c7a9e' }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl p-8" style={{ background: '#111120' }}>
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Outfit' }}>Envíanos un mensaje</h2>
          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.15)' }}>
                <svg className="w-8 h-8" fill="none" stroke="#10b981" viewBox="0 0 24 24" strokeWidth={2}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit' }}>¡Mensaje enviado!</h3>
              <p style={{ color: '#7c7a9e' }}>Nos pondremos en contacto contigo pronto.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm" style={{ color: '#a855f7' }}>Enviar otro mensaje</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                { key: 'subject', label: 'Asunto', type: 'text', placeholder: '¿De qué se trata?' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
                    onFocus={e => (e.target.style.borderColor = '#a855f7')}
                    onBlur={e => (e.target.style.borderColor = '#1e1e35')}
                    required
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: '#7c7a9e' }}>Mensaje</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Escribe tu mensaje aquí…"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: '#1a1a2e', border: '1px solid #1e1e35', color: '#f0eeff' }}
                  onFocus={e => (e.target.style.borderColor = '#a855f7')}
                  onBlur={e => (e.target.style.borderColor = '#1e1e35')}
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-semibold text-sm hover:opacity-90" style={{ background: 'linear-gradient(135deg, #a855f7, #f472b6)', color: '#fff' }}>
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
