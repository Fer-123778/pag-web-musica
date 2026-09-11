export interface Artist {
  id: string;
  name: string;
  genre: string;
  country: string;
  description: string;
  followers: number;
  image: string;
  coverImage: string;
  verified: boolean;
  albumIds: string[];
  songIds: string[];
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  year: number;
  genre: string;
  coverImage: string;
  rating: number;
  votes: number;
  description: string;
  songIds: string[];
  plays: number;
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  albumId: string;
  genre: string;
  duration: number;
  coverImage: string;
  rating: number;
  votes: number;
  plays: number;
  lyrics?: string;
  releaseDate: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
  artistId?: string;
}

export interface Event {
  id: string;
  artistId: string;
  city: string;
  country: string;
  venue: string;
  date: string;
  time: string;
  status: 'upcoming' | 'sold-out' | 'cancelled';
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  image: string;
  artistCount: number;
  color: string;
  songIds: string[];
}

// ── ARTISTS ──────────────────────────────────────────────────────────────────

export const artists: Artist[] = [
  {
    id: 'a1',
    name: 'Aurora Nights',
    genre: 'Indie Electrónico',
    country: 'Suecia',
    description: 'Dúo sueco que fusiona sintetizadores analógicos con voces etéreas. Sus paisajes sonoros cinematográficos los han catapultado a los festivales más importantes de Europa. Conocidos por sus directos hipnóticos llenos de luces y humo.',
    followers: 2_340_000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eaa54b3d1c3a?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al1', 'al2'],
    songIds: ['s1', 's2', 's3', 's4'],
  },
  {
    id: 'a2',
    name: 'The Crimson Waves',
    genre: 'Rock Alternativo',
    country: 'Reino Unido',
    description: 'Banda de rock alternativo de Manchester cuyo sonido poderoso y letras introspectivas los ha convertido en referentes de la nueva escena rock británica. Su último álbum debutó en el número uno en cinco países.',
    followers: 4_100_000,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al3', 'al4'],
    songIds: ['s5', 's6', 's7', 's8'],
  },
  {
    id: 'a3',
    name: 'Sofía Vega',
    genre: 'Pop Latino',
    country: 'Colombia',
    description: 'Artista colombiana que mezcla el pop contemporáneo con ritmos caribeños y fusiones latinas. Su voz inconfundible y su energía en el escenario la han posicionado como una de las voces más importantes del pop en español.',
    followers: 8_700_000,
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al5', 'al6'],
    songIds: ['s9', 's10', 's11', 's12'],
  },
  {
    id: 'a4',
    name: 'Midnight Code',
    genre: 'Hip-Hop / Rap',
    country: 'Estados Unidos',
    description: 'Colectivo de hip-hop de Atlanta que combina producción experimental con lírica afilada. Pioneros en fusionar el trap moderno con elementos de jazz y soul, creando un sonido único que ha redefinido el género.',
    followers: 5_600_000,
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al7', 'al8'],
    songIds: ['s13', 's14', 's15', 's16'],
  },
  {
    id: 'a5',
    name: 'Elara Stone',
    genre: 'Indie / Folk',
    country: 'Australia',
    description: 'Cantautora australiana de voz cristalina y guitarras acústicas que narran historias íntimas sobre el amor, la pérdida y la identidad. Sus álbumes, grabados en cabañas remotas, tienen un carácter artesanal único.',
    followers: 1_890_000,
    image: 'https://images.unsplash.com/photo-1605722625979-54e3a63e8b28?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1539375919756-98c20e4e8b5e?w=1200&h=400&fit=crop&auto=format',
    verified: false,
    albumIds: ['al9'],
    songIds: ['s17', 's18', 's19'],
  },
  {
    id: 'a6',
    name: 'The Neon Collective',
    genre: 'Electrónica / House',
    country: 'Francia',
    description: 'Supergrupo de DJ y productores parisinos que han revolucionado la escena dance europea. Sus sets de cuatro horas en festivales como Coachella y Tomorrowland son legendarios. Especialistas en house progresivo y techno melódico.',
    followers: 3_200_000,
    image: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al10', 'al11'],
    songIds: ['s20', 's21', 's22'],
  },
  {
    id: 'a7',
    name: 'Marcus Webb',
    genre: 'Jazz / Soul',
    country: 'Estados Unidos',
    description: 'Trompetista y compositor de Nueva Orleans que lleva el jazz contemporáneo a nuevas dimensiones. Su mezcla de bebop tradicional con soul moderno y electrónica lo ha convertido en un referente para la nueva generación de músicos de jazz.',
    followers: 920_000,
    image: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&h=400&fit=crop&auto=format',
    verified: false,
    albumIds: ['al12'],
    songIds: ['s23', 's24', 's25'],
  },
  {
    id: 'a8',
    name: 'Luna Espejo',
    genre: 'Pop / R&B',
    country: 'México',
    description: 'Artista mexicana de Ciudad de México que fusiona el R&B contemporáneo con elementos de la música tradicional mexicana. Sus videos, siempre narrativos y visualmente impactantes, acumulan cientos de millones de reproducciones.',
    followers: 12_500_000,
    image: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al13', 'al14'],
    songIds: ['s26', 's27', 's28', 's29'],
  },
  {
    id: 'a9',
    name: 'Black Atlas',
    genre: 'Metal Progresivo',
    country: 'Alemania',
    description: 'Quinteto de metal progresivo de Berlín que lleva el género a territorios inexplorados. Sus composiciones épicas de entre 10 y 20 minutos mezclan metal técnico con sinfonías orquestales y electrónica ambiental.',
    followers: 780_000,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop&auto=format',
    verified: false,
    albumIds: ['al15'],
    songIds: ['s30', 's31', 's32'],
  },
  {
    id: 'a10',
    name: 'Coral City',
    genre: 'Indie Pop',
    country: 'España',
    description: 'Banda indie pop de Barcelona reconocida por sus melodías pegadizas y letras poéticas. Sus referencias a la cultura mediterránea y su producción luminosa les han valido el apodo de "la banda del verano eterno".',
    followers: 2_100_000,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al16', 'al17'],
    songIds: ['s33', 's34', 's35'],
  },
  {
    id: 'a11',
    name: 'DJ Phantom',
    genre: 'Electrónica / Techno',
    country: 'Países Bajos',
    description: 'Productor y DJ holandés que se oculta siempre tras una máscara de neón. Sus sets de techno oscuro e industrial han conquistado los clubs más famosos de Berlín, Amsterdam e Ibiza. Nunca ha concedido una entrevista.',
    followers: 1_450_000,
    image: 'https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=1200&h=400&fit=crop&auto=format',
    verified: true,
    albumIds: ['al18'],
    songIds: ['s36', 's37'],
  },
  {
    id: 'a12',
    name: 'The Vintage Keys',
    genre: 'Blues / Soul',
    country: 'Estados Unidos',
    description: 'Trío de soul y blues de Chicago que recupera el sonido de los grandes estudios de grabación de los años 60 y 70. Graban en analógico, con instrumentos originales de época, y sus directos son puras experiencias catárticas.',
    followers: 560_000,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop&auto=format',
    coverImage: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1200&h=400&fit=crop&auto=format',
    verified: false,
    albumIds: ['al19', 'al20'],
    songIds: ['s38', 's39', 's40'],
  },
];

// ── ALBUMS ───────────────────────────────────────────────────────────────────

export const albums: Album[] = [
  { id: 'al1', title: 'Neon Tides', artistId: 'a1', year: 2024, genre: 'Indie Electrónico', coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop&auto=format', rating: 4.7, votes: 12340, description: 'El debut de Aurora Nights que captura la esencia de las noches de verano escandinavas.', songIds: ['s1', 's2'], plays: 4_200_000 },
  { id: 'al2', title: 'Eclipse Memory', artistId: 'a1', year: 2023, genre: 'Indie Electrónico', coverImage: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400&h=400&fit=crop&auto=format', rating: 4.5, votes: 8920, description: 'Un viaje introspectivo a través de texturas sonoras únicas.', songIds: ['s3', 's4'], plays: 2_800_000 },
  { id: 'al3', title: 'Crimson Sky', artistId: 'a2', year: 2024, genre: 'Rock Alternativo', coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format', rating: 4.8, votes: 23100, description: 'El álbum definitivo de The Crimson Waves, cargado de himnos y momentos íntimos.', songIds: ['s5', 's6'], plays: 8_900_000 },
  { id: 'al4', title: 'Dark Horizons', artistId: 'a2', year: 2022, genre: 'Rock Alternativo', coverImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop&auto=format', rating: 4.4, votes: 15600, description: 'Un álbum más oscuro e introspectivo que explora el límite entre el caos y el orden.', songIds: ['s7', 's8'], plays: 5_600_000 },
  { id: 'al5', title: 'Trópico', artistId: 'a3', year: 2024, genre: 'Pop Latino', coverImage: 'https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=400&h=400&fit=crop&auto=format', rating: 4.9, votes: 45230, description: 'Una celebración de los ritmos y colores del Caribe con producción de última generación.', songIds: ['s9', 's10', 's11'], plays: 22_000_000 },
  { id: 'al6', title: 'Corazón Digital', artistId: 'a3', year: 2022, genre: 'Pop Latino', coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop&auto=format', rating: 4.6, votes: 31000, description: 'La fusión entre el pop moderno y las raíces culturales de Colombia.', songIds: ['s12'], plays: 15_000_000 },
  { id: 'al7', title: 'After Midnight', artistId: 'a4', year: 2024, genre: 'Hip-Hop', coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format', rating: 4.6, votes: 18900, description: 'El proyecto más ambicioso de Midnight Code, fusionando jazz y trap en 16 cortes.', songIds: ['s13', 's14', 's15'], plays: 9_800_000 },
  { id: 'al8', title: 'Street Philosophy', artistId: 'a4', year: 2022, genre: 'Hip-Hop', coverImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop&auto=format', rating: 4.3, votes: 11200, description: 'Un manifiesto sonoro sobre la vida urbana y sus contradicciones.', songIds: ['s16'], plays: 6_200_000 },
  { id: 'al9', title: 'Wilderness Songs', artistId: 'a5', year: 2024, genre: 'Indie Folk', coverImage: 'https://images.unsplash.com/photo-1539375919756-98c20e4e8b5e?w=400&h=400&fit=crop&auto=format', rating: 4.4, votes: 7600, description: 'Grabado en una cabaña en los Alpes australianos, un álbum de una intimidad devastadora.', songIds: ['s17', 's18', 's19'], plays: 3_100_000 },
  { id: 'al10', title: 'Ultraviolet Dreams', artistId: 'a6', year: 2024, genre: 'House', coverImage: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400&h=400&fit=crop&auto=format', rating: 4.7, votes: 14500, description: 'Doce cortes de house melódico que llevan de la oscuridad a la euforia.', songIds: ['s20', 's21'], plays: 7_800_000 },
  { id: 'al11', title: 'Paris After Dark', artistId: 'a6', year: 2022, genre: 'House', coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop&auto=format', rating: 4.5, votes: 9800, description: 'Una noche de baile interminable capturada en vinilo electrónico.', songIds: ['s22'], plays: 5_400_000 },
  { id: 'al12', title: 'Brass & Blue', artistId: 'a7', year: 2023, genre: 'Jazz', coverImage: 'https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=400&h=400&fit=crop&auto=format', rating: 4.8, votes: 5600, description: 'Un álbum de jazz contemporáneo que desafía los límites del género con influencias de soul y electrónica.', songIds: ['s23', 's24', 's25'], plays: 1_900_000 },
  { id: 'al13', title: 'Reflejo', artistId: 'a8', year: 2024, genre: 'Pop R&B', coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format', rating: 4.9, votes: 67800, description: 'El álbum más personal de Luna Espejo, explorando el amor propio y la identidad.', songIds: ['s26', 's27', 's28'], plays: 35_000_000 },
  { id: 'al14', title: 'Mariposa', artistId: 'a8', year: 2022, genre: 'Pop R&B', coverImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop&auto=format', rating: 4.7, votes: 48200, description: 'El álbum debut que lanzó a la fama a Luna Espejo en toda Latinoamérica.', songIds: ['s29'], plays: 28_000_000 },
  { id: 'al15', title: 'Void Architecture', artistId: 'a9', year: 2024, genre: 'Metal Progresivo', coverImage: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400&h=400&fit=crop&auto=format', rating: 4.6, votes: 4300, description: 'Una obra colosal de metal progresivo con composiciones que superan los 15 minutos.', songIds: ['s30', 's31', 's32'], plays: 1_200_000 },
  { id: 'al16', title: 'Mar de Fondo', artistId: 'a10', year: 2024, genre: 'Indie Pop', coverImage: 'https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=400&h=400&fit=crop&auto=format', rating: 4.5, votes: 9100, description: 'Un álbum que captura la energía del Mediterráneo con guitarras luminosas y coros exuberantes.', songIds: ['s33', 's34'], plays: 4_600_000 },
  { id: 'al17', title: 'Verano Eterno', artistId: 'a10', year: 2022, genre: 'Indie Pop', coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop&auto=format', rating: 4.3, votes: 6700, description: 'El debut de Coral City que los catapultó a los festivales de toda Europa.', songIds: ['s35'], plays: 3_200_000 },
  { id: 'al18', title: 'Phantom Signal', artistId: 'a11', year: 2024, genre: 'Techno', coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format', rating: 4.4, votes: 3900, description: 'Techno industrial y oscuro que se adentra en territorios sonoros inexplorados.', songIds: ['s36', 's37'], plays: 2_100_000 },
  { id: 'al19', title: 'Deep South Sessions', artistId: 'a12', year: 2023, genre: 'Blues', coverImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop&auto=format', rating: 4.7, votes: 3400, description: 'Grabado en cinta magnética en Chicago, captura el alma del blues de raíces americanas.', songIds: ['s38', 's39'], plays: 890_000 },
  { id: 'al20', title: 'Midnight Revival', artistId: 'a12', year: 2021, genre: 'Soul', coverImage: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=400&h=400&fit=crop&auto=format', rating: 4.5, votes: 2800, description: 'Soul clásico con un toque contemporáneo que rinde homenaje a las leyendas de Motown.', songIds: ['s40'], plays: 620_000 },
];

// ── SONGS ─────────────────────────────────────────────────────────────────────

export const songs: Song[] = [
  { id: 's1', title: 'Northern Lights', artistId: 'a1', albumId: 'al1', genre: 'Indie Electrónico', duration: 214, coverImage: albums[0].coverImage, rating: 4.8, votes: 8900, plays: 2_800_000, releaseDate: '2024-03-15', lyrics: 'Under the northern lights we dance\nForever lost in your trance\nSynths and stars align tonight\nIn the glow of electric light...' },
  { id: 's2', title: 'Tidal Echo', artistId: 'a1', albumId: 'al1', genre: 'Indie Electrónico', duration: 187, coverImage: albums[0].coverImage, rating: 4.6, votes: 5400, plays: 1_900_000, releaseDate: '2024-03-15' },
  { id: 's3', title: 'Velvet Static', artistId: 'a1', albumId: 'al2', genre: 'Indie Electrónico', duration: 241, coverImage: albums[1].coverImage, rating: 4.5, votes: 4300, plays: 1_500_000, releaseDate: '2023-07-20' },
  { id: 's4', title: 'Midnight Bloom', artistId: 'a1', albumId: 'al2', genre: 'Indie Electrónico', duration: 195, coverImage: albums[1].coverImage, rating: 4.4, votes: 3800, plays: 1_200_000, releaseDate: '2023-07-20' },
  { id: 's5', title: 'Storm Front', artistId: 'a2', albumId: 'al3', genre: 'Rock Alternativo', duration: 228, coverImage: albums[2].coverImage, rating: 4.9, votes: 18700, plays: 6_200_000, releaseDate: '2024-01-20', lyrics: 'The storm is coming to the shore\nWe cannot hide anymore\nCrimson waves crash on the wall\nRise together or we fall...' },
  { id: 's6', title: 'Burning Chrome', artistId: 'a2', albumId: 'al3', genre: 'Rock Alternativo', duration: 203, coverImage: albums[2].coverImage, rating: 4.7, votes: 14200, plays: 5_100_000, releaseDate: '2024-01-20' },
  { id: 's7', title: 'End of the Line', artistId: 'a2', albumId: 'al4', genre: 'Rock Alternativo', duration: 265, coverImage: albums[3].coverImage, rating: 4.5, votes: 9800, plays: 3_400_000, releaseDate: '2022-09-10' },
  { id: 's8', title: 'Glass Horizon', artistId: 'a2', albumId: 'al4', genre: 'Rock Alternativo', duration: 238, coverImage: albums[3].coverImage, rating: 4.3, votes: 7600, plays: 2_700_000, releaseDate: '2022-09-10' },
  { id: 's9', title: 'Mambo Futuro', artistId: 'a3', albumId: 'al5', genre: 'Pop Latino', duration: 198, coverImage: albums[4].coverImage, rating: 4.9, votes: 38000, plays: 15_000_000, releaseDate: '2024-02-14', lyrics: 'Baila conmigo hasta el amanecer\nEl mambo del futuro es nuestro ayer\nMi corazón late al ritmo del mar\nSofía canta, no podemos parar...' },
  { id: 's10', title: 'Brisa Caribeña', artistId: 'a3', albumId: 'al5', genre: 'Pop Latino', duration: 212, coverImage: albums[4].coverImage, rating: 4.8, votes: 28600, plays: 11_000_000, releaseDate: '2024-02-14' },
  { id: 's11', title: 'Noche de Colores', artistId: 'a3', albumId: 'al5', genre: 'Pop Latino', duration: 189, coverImage: albums[4].coverImage, rating: 4.7, votes: 22400, plays: 9_500_000, releaseDate: '2024-02-14' },
  { id: 's12', title: 'Latidos', artistId: 'a3', albumId: 'al6', genre: 'Pop Latino', duration: 225, coverImage: albums[5].coverImage, rating: 4.6, votes: 18900, plays: 8_000_000, releaseDate: '2022-06-01' },
  { id: 's13', title: 'Neon Phantoms', artistId: 'a4', albumId: 'al7', genre: 'Hip-Hop', duration: 243, coverImage: albums[6].coverImage, rating: 4.7, votes: 14300, plays: 6_800_000, releaseDate: '2024-04-05', lyrics: 'Neon phantoms in the city night\nMidnight code we keep it tight\nAtlanta streets under purple sky\nTrap beats soar and jazz notes fly...' },
  { id: 's14', title: 'Jazz Trap', artistId: 'a4', albumId: 'al7', genre: 'Hip-Hop', duration: 201, coverImage: albums[6].coverImage, rating: 4.6, votes: 11200, plays: 5_400_000, releaseDate: '2024-04-05' },
  { id: 's15', title: 'Blue Frequency', artistId: 'a4', albumId: 'al7', genre: 'Hip-Hop', duration: 218, coverImage: albums[6].coverImage, rating: 4.5, votes: 9700, plays: 4_600_000, releaseDate: '2024-04-05' },
  { id: 's16', title: 'Concrete Dreams', artistId: 'a4', albumId: 'al8', genre: 'Hip-Hop', duration: 256, coverImage: albums[7].coverImage, rating: 4.3, votes: 8100, plays: 3_800_000, releaseDate: '2022-11-18' },
  { id: 's17', title: 'Mountain Rain', artistId: 'a5', albumId: 'al9', genre: 'Indie Folk', duration: 284, coverImage: albums[8].coverImage, rating: 4.5, votes: 5600, plays: 1_400_000, releaseDate: '2024-05-22', lyrics: 'Mountain rain, wash away the dust\nIn the wilderness I trust\nElara sings to empty halls\nHer voice echoes through the falls...' },
  { id: 's18', title: 'Hollow Wind', artistId: 'a5', albumId: 'al9', genre: 'Indie Folk', duration: 312, coverImage: albums[8].coverImage, rating: 4.4, votes: 4200, plays: 1_100_000, releaseDate: '2024-05-22' },
  { id: 's19', title: 'Silver Thread', artistId: 'a5', albumId: 'al9', genre: 'Indie Folk', duration: 267, coverImage: albums[8].coverImage, rating: 4.3, votes: 3700, plays: 890_000, releaseDate: '2024-05-22' },
  { id: 's20', title: 'Ultraviolet', artistId: 'a6', albumId: 'al10', genre: 'House', duration: 428, coverImage: albums[9].coverImage, rating: 4.8, votes: 11300, plays: 5_200_000, releaseDate: '2024-01-10' },
  { id: 's21', title: 'Nuit Blanche', artistId: 'a6', albumId: 'al10', genre: 'House', duration: 392, coverImage: albums[9].coverImage, rating: 4.6, votes: 8900, plays: 4_100_000, releaseDate: '2024-01-10' },
  { id: 's22', title: 'Seine Nights', artistId: 'a6', albumId: 'al11', genre: 'House', duration: 445, coverImage: albums[10].coverImage, rating: 4.5, votes: 7200, plays: 3_300_000, releaseDate: '2022-08-15' },
  { id: 's23', title: 'Brass Horizon', artistId: 'a7', albumId: 'al12', genre: 'Jazz', duration: 368, coverImage: albums[11].coverImage, rating: 4.9, votes: 4100, plays: 780_000, releaseDate: '2023-10-30' },
  { id: 's24', title: 'Blue Note Revival', artistId: 'a7', albumId: 'al12', genre: 'Jazz', duration: 421, coverImage: albums[11].coverImage, rating: 4.8, votes: 3600, plays: 620_000, releaseDate: '2023-10-30' },
  { id: 's25', title: 'Delta Flow', artistId: 'a7', albumId: 'al12', genre: 'Jazz', duration: 394, coverImage: albums[11].coverImage, rating: 4.7, votes: 2900, plays: 540_000, releaseDate: '2023-10-30' },
  { id: 's26', title: 'Espejo Roto', artistId: 'a8', albumId: 'al13', genre: 'Pop R&B', duration: 234, coverImage: albums[12].coverImage, rating: 4.9, votes: 52000, plays: 18_000_000, releaseDate: '2024-03-08', lyrics: 'Me miro en el espejo roto\nY veo a alguien que no controlo\nLuna llena, Luna real\nAprendí a quererme sin igual...' },
  { id: 's27', title: 'Piel de Seda', artistId: 'a8', albumId: 'al13', genre: 'Pop R&B', duration: 221, coverImage: albums[12].coverImage, rating: 4.8, votes: 41000, plays: 14_000_000, releaseDate: '2024-03-08' },
  { id: 's28', title: 'Ciudad de Cristal', artistId: 'a8', albumId: 'al13', genre: 'Pop R&B', duration: 248, coverImage: albums[12].coverImage, rating: 4.7, votes: 33000, plays: 12_000_000, releaseDate: '2024-03-08' },
  { id: 's29', title: 'Mariposa Libre', artistId: 'a8', albumId: 'al14', genre: 'Pop R&B', duration: 209, coverImage: albums[13].coverImage, rating: 4.7, votes: 38000, plays: 16_000_000, releaseDate: '2022-04-22' },
  { id: 's30', title: 'Void Walker', artistId: 'a9', albumId: 'al15', genre: 'Metal Progresivo', duration: 934, coverImage: albums[14].coverImage, rating: 4.7, votes: 3200, plays: 560_000, releaseDate: '2024-06-01' },
  { id: 's31', title: 'Architecture of Silence', artistId: 'a9', albumId: 'al15', genre: 'Metal Progresivo', duration: 847, coverImage: albums[14].coverImage, rating: 4.6, votes: 2800, plays: 430_000, releaseDate: '2024-06-01' },
  { id: 's32', title: 'Fracture Lines', artistId: 'a9', albumId: 'al15', genre: 'Metal Progresivo', duration: 1024, coverImage: albums[14].coverImage, rating: 4.5, votes: 2400, plays: 380_000, releaseDate: '2024-06-01' },
  { id: 's33', title: 'Verano Infinito', artistId: 'a10', albumId: 'al16', genre: 'Indie Pop', duration: 193, coverImage: albums[15].coverImage, rating: 4.6, votes: 7400, plays: 3_200_000, releaseDate: '2024-05-01', lyrics: 'Queremos bailar hasta el mar\nNuestro verano no va a acabar\nBarcelona brilla en la noche\nCoral City lleva el derroche...' },
  { id: 's34', title: 'Luz de Costa', artistId: 'a10', albumId: 'al16', genre: 'Indie Pop', duration: 208, coverImage: albums[15].coverImage, rating: 4.4, votes: 5900, plays: 2_400_000, releaseDate: '2024-05-01' },
  { id: 's35', title: 'Postales del Sol', artistId: 'a10', albumId: 'al17', genre: 'Indie Pop', duration: 187, coverImage: albums[16].coverImage, rating: 4.3, votes: 4800, plays: 1_900_000, releaseDate: '2022-07-15' },
  { id: 's36', title: 'Signal Lost', artistId: 'a11', albumId: 'al18', genre: 'Techno', duration: 512, coverImage: albums[17].coverImage, rating: 4.5, votes: 2900, plays: 1_300_000, releaseDate: '2024-02-28' },
  { id: 's37', title: 'Dark Matter', artistId: 'a11', albumId: 'al18', genre: 'Techno', duration: 486, coverImage: albums[17].coverImage, rating: 4.4, votes: 2400, plays: 980_000, releaseDate: '2024-02-28' },
  { id: 's38', title: 'Mississippi Fire', artistId: 'a12', albumId: 'al19', genre: 'Blues', duration: 298, coverImage: albums[18].coverImage, rating: 4.8, votes: 2600, plays: 560_000, releaseDate: '2023-03-15' },
  { id: 's39', title: 'Whiskey & Regret', artistId: 'a12', albumId: 'al19', genre: 'Blues', duration: 342, coverImage: albums[18].coverImage, rating: 4.7, votes: 2200, plays: 440_000, releaseDate: '2023-03-15' },
  { id: 's40', title: 'Motown Revival', artistId: 'a12', albumId: 'al20', genre: 'Soul', duration: 276, coverImage: albums[19].coverImage, rating: 4.6, votes: 1800, plays: 350_000, releaseDate: '2021-11-05' },
];

// ── GENRES ───────────────────────────────────────────────────────────────────

export const genres: Genre[] = [
  { id: 'g1', name: 'Rock', description: 'Guitarras eléctricas, baterías contundentes y actitud. Del clásico al alternativo.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop&auto=format', artistCount: 1240, color: '#ef4444', songIds: ['s5', 's6', 's7', 's8'] },
  { id: 'g2', name: 'Pop', description: 'Melodías pegadizas y producción brillante. La música que une al mundo.', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop&auto=format', artistCount: 3450, color: '#ec4899', songIds: ['s9', 's10', 's11', 's12'] },
  { id: 'g3', name: 'Electrónica', description: 'Sintetizadores, samplers y ritmos que hacen mover los cuerpos.', image: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=600&h=400&fit=crop&auto=format', artistCount: 890, color: '#a855f7', songIds: ['s20', 's21', 's22', 's36', 's37'] },
  { id: 'g4', name: 'Hip-Hop', description: 'Ritmo, rima y cultura. La voz de las calles con producción de vanguardia.', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop&auto=format', artistCount: 1870, color: '#f59e0b', songIds: ['s13', 's14', 's15', 's16'] },
  { id: 'g5', name: 'Indie', description: 'Creatividad sin límites, fuera del sistema. La música que sigue su propio camino.', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop&auto=format', artistCount: 2300, color: '#10b981', songIds: ['s1', 's2', 's33', 's34'] },
  { id: 'g6', name: 'Jazz', description: 'Improvisación, swing y alma. La música más sofisticada del mundo.', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&h=400&fit=crop&auto=format', artistCount: 650, color: '#3b82f6', songIds: ['s23', 's24', 's25'] },
  { id: 'g7', name: 'Metal', description: 'Potencia extrema, virtuosismo técnico y una comunidad apasionada.', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop&auto=format', artistCount: 780, color: '#6b7280', songIds: ['s30', 's31', 's32'] },
  { id: 'g8', name: 'Blues', description: 'El origen de todo. Emoción cruda, guitarras con alma y letras que duelen.', image: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=600&h=400&fit=crop&auto=format', artistCount: 420, color: '#1d4ed8', songIds: ['s38', 's39'] },
  { id: 'g9', name: 'Folk', description: 'Canciones que cuentan historias. Guitarra acústica y voces cercanas.', image: 'https://images.unsplash.com/photo-1539375919756-98c20e4e8b5e?w=600&h=400&fit=crop&auto=format', artistCount: 560, color: '#92400e', songIds: ['s17', 's18', 's19'] },
  { id: 'g10', name: 'Urbano', description: 'Reggaeton, trap latino y los ritmos que dominan las listas mundiales.', image: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=600&h=400&fit=crop&auto=format', artistCount: 2100, color: '#dc2626', songIds: ['s26', 's27', 's28', 's29'] },
];

// ── NEWS ──────────────────────────────────────────────────────────────────────

export const newsArticles: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Luna Espejo anuncia su gira mundial "Reflejo Tour 2025"',
    summary: 'La artista mexicana visitará más de 40 ciudades en Europa y América Latina con su nuevo show de producción épica.',
    content: 'Luna Espejo ha confirmado que su esperada gira mundial comenzará en marzo de 2025 en Ciudad de México y recorrerá más de 40 ciudades. El show contará con pantallas de 360 grados, drones de luz y una banda de 12 músicos en directo...',
    category: 'Giras',
    image: 'https://images.unsplash.com/photo-1501386761578-eaa54b3d1c3a?w=800&h=450&fit=crop&auto=format',
    author: 'Carlos Medina',
    date: '2024-12-01',
    readTime: 4,
    artistId: 'a8',
  },
  {
    id: 'n2',
    title: 'The Crimson Waves debuta en el número 1 en 12 países con "Crimson Sky"',
    summary: 'El tercer álbum de la banda británica ha roto todos los récords de streaming en su primera semana de lanzamiento.',
    content: 'Con más de 200 millones de reproducciones en su primera semana, "Crimson Sky" ha superado todas las expectativas. La banda de Manchester celebra el hito con un directodestreaming gratuito...',
    category: 'Nuevos Álbumes',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=450&fit=crop&auto=format',
    author: 'Sarah Mitchell',
    date: '2024-11-28',
    readTime: 3,
    artistId: 'a2',
  },
  {
    id: 'n3',
    title: 'Festival SoundWave 2025 anuncia su cartel completo',
    summary: 'Aurora Nights, Sofía Vega, The Neon Collective y 40 artistas más formarán el cartel del mayor festival de Europa.',
    content: 'El festival SoundWave, que se celebra cada verano en las afueras de Lisboa, ha desvelado su cartel para 2025. Con más de 50 actuaciones distribuidas en 5 escenarios durante tres días...',
    category: 'Festivales',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop&auto=format',
    author: 'Elena Fuentes',
    date: '2024-11-25',
    readTime: 5,
  },
  {
    id: 'n4',
    title: 'Midnight Code revela detalles de su próximo álbum "Quantum"',
    summary: 'El colectivo de Atlanta promete su trabajo más experimental hasta la fecha, con colaboraciones de artistas de jazz y música clásica.',
    content: 'En una entrevista exclusiva con Música Hub, Midnight Code ha revelado que su próximo álbum "Quantum" contará con la participación de cuartetos de cuerdas, pianistas de jazz y productores de música electrónica europea...',
    category: 'Próximos Lanzamientos',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=450&fit=crop&auto=format',
    author: 'James Carter',
    date: '2024-11-20',
    readTime: 4,
    artistId: 'a4',
  },
  {
    id: 'n5',
    title: 'Marcus Webb gana el Grammy al Mejor Álbum de Jazz con "Brass & Blue"',
    summary: 'El trompetista de Nueva Orleans se llevó el galardón más importante del jazz tras una actuación en directo que dejó sin palabras al público.',
    content: 'En una noche histórica para el jazz contemporáneo, Marcus Webb recibió el Grammy al Mejor Álbum de Jazz entre aplausos de toda la industria musical. Su discurso de agradecimiento fue tan emotivo como su música...',
    category: 'Noticias de la Industria',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=450&fit=crop&auto=format',
    author: 'Patricia Holmes',
    date: '2024-11-15',
    readTime: 3,
    artistId: 'a7',
  },
  {
    id: 'n6',
    title: 'Coral City lanza "Mar de Fondo": el sonido del verano mediterráneo',
    summary: 'La banda barcelonesa vuelve con su cuarto álbum más ambicioso, grabado entre Barcelona, Ibiza y Nápoles.',
    content: 'Coral City ha regresado con un álbum que suena exactamente a lo que su título promete: la profundidad del mar Mediterráneo bajo el sol de verano. Grabado en tres ciudades diferentes...',
    category: 'Nuevos Álbumes',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop&auto=format',
    author: 'Marta López',
    date: '2024-11-10',
    readTime: 4,
    artistId: 'a10',
  },
  {
    id: 'n7',
    title: 'DJ Phantom desvelará su identidad en el concierto de Año Nuevo en Berlín',
    summary: 'El misterioso DJ holandés ha anunciado que revelará su rostro por primera vez en un show histórico en el Berliner Philharmonie.',
    content: 'Después de más de diez años ocultando su identidad tras una máscara de neón, DJ Phantom ha anunciado el fin del misterio. El 31 de diciembre, en un show histórico transmitido en directo...',
    category: 'Conciertos',
    image: 'https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?w=800&h=450&fit=crop&auto=format',
    author: 'Klaus Werner',
    date: '2024-11-05',
    readTime: 3,
    artistId: 'a11',
  },
  {
    id: 'n8',
    title: 'Elara Stone lanza su primer single en español: "Lluvia de Montaña"',
    summary: 'La cantautora australiana sorprende con una versión en español de "Mountain Rain", grabada junto a músicos andaluces.',
    content: 'Elara Stone ha sorprendido a sus fans con el lanzamiento de "Lluvia de Montaña", una reinterpretación en español de su canción más famosa, grabada con músicos de flamenco en Granada...',
    category: 'Nuevos Artistas',
    image: 'https://images.unsplash.com/photo-1605722625979-54e3a63e8b28?w=800&h=450&fit=crop&auto=format',
    author: 'Ana García',
    date: '2024-10-30',
    readTime: 3,
    artistId: 'a5',
  },
  {
    id: 'n9',
    title: 'The Neon Collective cerrará el escenario principal de Coachella 2025',
    summary: 'El supergrupo francés confirmó su actuación como cabeza de cartel del festival más famoso del mundo.',
    content: 'En lo que se espera sea una de las actuaciones más espectaculares de la historia de Coachella, The Neon Collective llevará su show "Ultraviolet" al festival californiano con más de 200 luces láser...',
    category: 'Festivales',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop&auto=format',
    author: 'Mike Thompson',
    date: '2024-10-25',
    readTime: 4,
    artistId: 'a6',
  },
  {
    id: 'n10',
    title: 'Black Atlas anuncia álbum doble de metal sinfónico para 2025',
    summary: 'El quinteto alemán grabó más de 140 minutos de música con la Orquesta Filarmónica de Berlín para su próximo trabajo.',
    content: 'Black Atlas ha confirmado que su próximo álbum será un doble disco de metal sinfónico grabado en colaboración con la Orquesta Filarmónica de Berlín. Con más de 140 minutos de música...',
    category: 'Próximos Lanzamientos',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=450&fit=crop&auto=format',
    author: 'Franz Müller',
    date: '2024-10-20',
    readTime: 5,
    artistId: 'a9',
  },
];

// ── EVENTS ────────────────────────────────────────────────────────────────────

export const events: Event[] = [
  { id: 'ev1', artistId: 'a8', city: 'Ciudad de México', country: 'México', venue: 'Foro Sol', date: '2025-03-15', time: '20:00', status: 'upcoming' },
  { id: 'ev2', artistId: 'a8', city: 'Madrid', country: 'España', venue: 'WiZink Center', date: '2025-04-12', time: '21:00', status: 'upcoming' },
  { id: 'ev3', artistId: 'a8', city: 'Buenos Aires', country: 'Argentina', venue: 'Movistar Arena', date: '2025-05-20', time: '20:30', status: 'upcoming' },
  { id: 'ev4', artistId: 'a2', city: 'Londres', country: 'Reino Unido', venue: 'O2 Arena', date: '2025-02-28', time: '19:30', status: 'sold-out' },
  { id: 'ev5', artistId: 'a2', city: 'París', country: 'Francia', venue: 'AccorHotels Arena', date: '2025-03-05', time: '20:00', status: 'upcoming' },
  { id: 'ev6', artistId: 'a6', city: 'Indio', country: 'Estados Unidos', venue: 'Empire Polo Club (Coachella)', date: '2025-04-18', time: '22:00', status: 'upcoming' },
  { id: 'ev7', artistId: 'a1', city: 'Estocolmo', country: 'Suecia', venue: 'Avicii Arena', date: '2025-06-14', time: '20:00', status: 'upcoming' },
  { id: 'ev8', artistId: 'a11', city: 'Berlín', country: 'Alemania', venue: 'Berliner Philharmonie', date: '2024-12-31', time: '23:00', status: 'sold-out' },
  { id: 'ev9', artistId: 'a3', city: 'Bogotá', country: 'Colombia', venue: 'El Campín', date: '2025-07-05', time: '20:00', status: 'upcoming' },
  { id: 'ev10', artistId: 'a10', city: 'Barcelona', country: 'España', venue: 'Palau Sant Jordi', date: '2025-08-10', time: '21:00', status: 'upcoming' },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

export const getArtistById = (id: string) => artists.find(a => a.id === id);
export const getAlbumById = (id: string) => albums.find(a => a.id === id);
export const getSongById = (id: string) => songs.find(s => s.id === id);
export const getGenreById = (id: string) => genres.find(g => g.id === id);
export const getNewsById = (id: string) => newsArticles.find(n => n.id === id);
export const getEventsByArtistId = (artistId: string) => events.filter(e => e.artistId === artistId);
export const getSongsByArtistId = (artistId: string) => songs.filter(s => s.artistId === artistId);
export const getAlbumsByArtistId = (artistId: string) => albums.filter(a => a.artistId === artistId);
export const getSongsByAlbumId = (albumId: string) => songs.filter(s => s.albumId === albumId);

export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const formatPlays = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
};

export const formatFollowers = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
};
