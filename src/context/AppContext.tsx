import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { Song, songs as allSongs, getSongById } from '@/data/mockData';

export type Page =
  | 'home' | 'explore' | 'news' | 'rankings' | 'genres' | 'search'
  | 'my-library' | 'artist' | 'album' | 'song' | 'profile' | 'auth'
  | 'contact' | 'settings' | 'history' | 'genre-detail' | 'news-detail';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  joinDate: string;
  favoriteGenres: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  coverImage?: string;
  createdAt: string;
}

export interface HistoryEntry {
  songId: string;
  playedAt: Date;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: Date;
  read: boolean;
}

interface AppState {
  page: Page;
  selectedArtistId: string | null;
  selectedAlbumId: string | null;
  selectedSongId: string | null;
  selectedGenreId: string | null;
  selectedNewsId: string | null;
  searchQuery: string;

  // Player
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  queue: Song[];
  isPlayerExpanded: boolean;
  isQueueOpen: boolean;

  // Auth
  user: User | null;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';

  // User data
  favoriteSongIds: string[];
  favoriteAlbumIds: string[];
  followedArtistIds: string[];
  playlists: Playlist[];
  history: HistoryEntry[];
  ratings: Record<string, number>;
  notifications: Notification[];

  // Dark mode
  darkMode: boolean;
}

type Action =
  | { type: 'NAVIGATE'; page: Page; payload?: Record<string, string> }
  | { type: 'SET_SONG'; song: Song }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'NEXT_SONG' }
  | { type: 'PREV_SONG' }
  | { type: 'ADD_TO_QUEUE'; song: Song }
  | { type: 'REMOVE_FROM_QUEUE'; index: number }
  | { type: 'CLEAR_QUEUE' }
  | { type: 'REORDER_QUEUE'; from: number; to: number }
  | { type: 'TOGGLE_PLAYER_EXPANDED' }
  | { type: 'TOGGLE_QUEUE' }
  | { type: 'TOGGLE_FAVORITE_SONG'; songId: string }
  | { type: 'TOGGLE_FAVORITE_ALBUM'; albumId: string }
  | { type: 'TOGGLE_FOLLOW_ARTIST'; artistId: string }
  | { type: 'SET_RATING'; id: string; rating: number }
  | { type: 'LOGIN'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'OPEN_AUTH'; mode: 'login' | 'register' }
  | { type: 'CLOSE_AUTH' }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'CREATE_PLAYLIST'; playlist: Playlist }
  | { type: 'DELETE_PLAYLIST'; id: string }
  | { type: 'ADD_SONG_TO_PLAYLIST'; playlistId: string; songId: string }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'ADD_NOTIFICATION'; notification: Notification }
  | { type: 'MARK_NOTIFICATIONS_READ' }
  | { type: 'TOGGLE_DARK_MODE' };

const initialState: AppState = {
  page: 'home',
  selectedArtistId: null,
  selectedAlbumId: null,
  selectedSongId: null,
  selectedGenreId: null,
  selectedNewsId: null,
  searchQuery: '',
  currentSong: null,
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  queue: [],
  isPlayerExpanded: false,
  isQueueOpen: false,
  user: null,
  isAuthModalOpen: false,
  authMode: 'login',
  favoriteSongIds: [],
  favoriteAlbumIds: [],
  followedArtistIds: [],
  playlists: [
    { id: 'pl1', name: 'Mis Favoritas', description: 'Las mejores canciones de mi biblioteca', songIds: [], coverImage: undefined, createdAt: '2024-01-01' },
    { id: 'pl2', name: 'Para Entrenar', description: 'Energía pura para el gym', songIds: [], coverImage: undefined, createdAt: '2024-01-15' },
  ],
  history: [],
  ratings: {},
  notifications: [],
  darkMode: true,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        ...state,
        page: action.page,
        selectedArtistId: action.payload?.artistId ?? state.selectedArtistId,
        selectedAlbumId: action.payload?.albumId ?? state.selectedAlbumId,
        selectedSongId: action.payload?.songId ?? state.selectedSongId,
        selectedGenreId: action.payload?.genreId ?? state.selectedGenreId,
        selectedNewsId: action.payload?.newsId ?? state.selectedNewsId,
        isQueueOpen: false,
      };
    case 'SET_SONG': {
      const newHistory: HistoryEntry[] = [
        { songId: action.song.id, playedAt: new Date() },
        ...state.history.filter(h => h.songId !== action.song.id).slice(0, 49),
      ];
      return { ...state, currentSong: action.song, isPlaying: true, progress: 0, history: newHistory };
    }
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_VOLUME':
      return { ...state, volume: action.volume };
    case 'SET_PROGRESS':
      return { ...state, progress: action.progress };
    case 'NEXT_SONG': {
      if (state.queue.length > 0) {
        const [next, ...rest] = state.queue;
        return { ...state, currentSong: next, isPlaying: true, progress: 0, queue: rest };
      }
      const currentIndex = allSongs.findIndex(s => s.id === state.currentSong?.id);
      const nextSong = allSongs[(currentIndex + 1) % allSongs.length];
      return { ...state, currentSong: nextSong, progress: 0, isPlaying: true };
    }
    case 'PREV_SONG': {
      if (state.progress > 10) return { ...state, progress: 0 };
      const currentIndex = allSongs.findIndex(s => s.id === state.currentSong?.id);
      const prevSong = allSongs[(currentIndex - 1 + allSongs.length) % allSongs.length];
      return { ...state, currentSong: prevSong, progress: 0, isPlaying: true };
    }
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.song] };
    case 'REMOVE_FROM_QUEUE':
      return { ...state, queue: state.queue.filter((_, i) => i !== action.index) };
    case 'CLEAR_QUEUE':
      return { ...state, queue: [] };
    case 'REORDER_QUEUE': {
      const q = [...state.queue];
      const [item] = q.splice(action.from, 1);
      q.splice(action.to, 0, item);
      return { ...state, queue: q };
    }
    case 'TOGGLE_PLAYER_EXPANDED':
      return { ...state, isPlayerExpanded: !state.isPlayerExpanded };
    case 'TOGGLE_QUEUE':
      return { ...state, isQueueOpen: !state.isQueueOpen };
    case 'TOGGLE_FAVORITE_SONG':
      return {
        ...state,
        favoriteSongIds: state.favoriteSongIds.includes(action.songId)
          ? state.favoriteSongIds.filter(id => id !== action.songId)
          : [...state.favoriteSongIds, action.songId],
      };
    case 'TOGGLE_FAVORITE_ALBUM':
      return {
        ...state,
        favoriteAlbumIds: state.favoriteAlbumIds.includes(action.albumId)
          ? state.favoriteAlbumIds.filter(id => id !== action.albumId)
          : [...state.favoriteAlbumIds, action.albumId],
      };
    case 'TOGGLE_FOLLOW_ARTIST':
      return {
        ...state,
        followedArtistIds: state.followedArtistIds.includes(action.artistId)
          ? state.followedArtistIds.filter(id => id !== action.artistId)
          : [...state.followedArtistIds, action.artistId],
      };
    case 'SET_RATING':
      return { ...state, ratings: { ...state.ratings, [action.id]: action.rating } };
    case 'LOGIN':
      return { ...state, user: action.user, isAuthModalOpen: false };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'OPEN_AUTH':
      return { ...state, isAuthModalOpen: true, authMode: action.mode };
    case 'CLOSE_AUTH':
      return { ...state, isAuthModalOpen: false };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query };
    case 'CREATE_PLAYLIST':
      return { ...state, playlists: [...state.playlists, action.playlist] };
    case 'DELETE_PLAYLIST':
      return { ...state, playlists: state.playlists.filter(p => p.id !== action.id) };
    case 'ADD_SONG_TO_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(p =>
          p.id === action.playlistId && !p.songIds.includes(action.songId)
            ? { ...p, songIds: [...p.songIds, action.songId] }
            : p
        ),
      };
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.notification, ...state.notifications.slice(0, 19)] };
    case 'MARK_NOTIFICATIONS_READ':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  navigate: (page: Page, payload?: Record<string, string>) => void;
  playSong: (song: Song) => void;
  addToQueue: (song: Song) => void;
  toggleFavoriteSong: (songId: string) => void;
  toggleFavoriteAlbum: (albumId: string) => void;
  toggleFollowArtist: (artistId: string) => void;
  requireAuth: (callback: () => void) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.isPlaying && state.currentSong) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'SET_PROGRESS', progress: state.progress >= 100 ? 0 : state.progress + (100 / state.currentSong!.duration) });
        if (state.progress >= 100) {
          dispatch({ type: 'NEXT_SONG' });
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state.isPlaying, state.currentSong, state.progress]);

  const navigate = (page: Page, payload?: Record<string, string>) => {
    dispatch({ type: 'NAVIGATE', page, payload });
    window.scrollTo(0, 0);
  };

  const playSong = (song: Song) => {
    dispatch({ type: 'SET_SONG', song });
  };

  const addToQueue = (song: Song) => {
    dispatch({ type: 'ADD_TO_QUEUE', song });
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification: {
        id: Date.now().toString(),
        message: `"${song.title}" añadida a la cola`,
        type: 'success',
        timestamp: new Date(),
        read: false,
      },
    });
  };

  const toggleFavoriteSong = (songId: string) => {
    if (!state.user) {
      dispatch({ type: 'OPEN_AUTH', mode: 'login' });
      return;
    }
    dispatch({ type: 'TOGGLE_FAVORITE_SONG', songId });
    const isFav = state.favoriteSongIds.includes(songId);
    const song = getSongById(songId);
    if (song) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        notification: {
          id: Date.now().toString(),
          message: isFav ? `"${song.title}" eliminada de favoritos` : `"${song.title}" guardada en favoritos`,
          type: 'success',
          timestamp: new Date(),
          read: false,
        },
      });
    }
  };

  const toggleFavoriteAlbum = (albumId: string) => {
    if (!state.user) {
      dispatch({ type: 'OPEN_AUTH', mode: 'login' });
      return;
    }
    dispatch({ type: 'TOGGLE_FAVORITE_ALBUM', albumId });
  };

  const toggleFollowArtist = (artistId: string) => {
    if (!state.user) {
      dispatch({ type: 'OPEN_AUTH', mode: 'login' });
      return;
    }
    dispatch({ type: 'TOGGLE_FOLLOW_ARTIST', artistId });
  };

  const requireAuth = (callback: () => void) => {
    if (!state.user) {
      dispatch({ type: 'OPEN_AUTH', mode: 'login' });
    } else {
      callback();
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, navigate, playSong, addToQueue, toggleFavoriteSong, toggleFavoriteAlbum, toggleFollowArtist, requireAuth }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
