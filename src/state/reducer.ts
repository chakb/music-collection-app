import { State } from './state';
import { Album, Artist } from '../../types';

export type Action =
  | {
      type: 'INITIALIZE_ALBUMS';
      payload: Album[];
    }
  | {
      type: 'ADD_ALBUM';
      payload: Album;
    }
  | {
      type: 'UPDATE_ALBUM';
      payload: Album;
    }
  | {
      type: 'DELETE_ALBUM';
      payload: string;
    }
  | {
      type: 'INITIALIZE_ARTISTS';
      payload: Artist[];
    }
  | {
      type: 'ADD_ARTIST';
      payload: Artist;
    }
  | {
      type: 'UPDATE_ARTIST';
      payload: Artist;
    }
  | {
      type: 'DELETE_ARTIST';
      payload: string;
    };

export const initializeAlbums = (albums: Album[]): Action => {
  return {
    type: 'INITIALIZE_ALBUMS',
    payload: albums,
  };
};
export const addAlbum = (album: Album): Action => {
  return {
    type: 'ADD_ALBUM',
    payload: album,
  };
};
export const updateAlbum = (album: Album): Action => {
  return {
    type: 'UPDATE_ALBUM',
    payload: album,
  };
};
export const deleteAlbum = (id: string): Action => {
  return {
    type: 'DELETE_ALBUM',
    payload: id,
  };
};
export const initializeArtists = (artist: Artist[]): Action => {
  return {
    type: 'INITIALIZE_ARTISTS',
    payload: artist,
  };
};
export const addArtist = (artist: Artist): Action => {
  return {
    type: 'ADD_ARTIST',
    payload: artist,
  };
};
export const updateArtist = (artist: Artist): Action => {
  return {
    type: 'UPDATE_ARTIST',
    payload: artist,
  };
};
export const deleteArtist = (id: string): Action => {
  return {
    type: 'DELETE_ARTIST',
    payload: id,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIALIZE_ALBUMS':
      return {
        ...state,
        albums: action.payload,
      };
    case 'ADD_ALBUM':
      return {
        ...state,
        albums: state.albums.concat(action.payload),
      };
    case 'UPDATE_ALBUM':
      return {
        ...state,
        albums: state.albums.map((album) =>
          album._id === action.payload._id ? action.payload : album,
        ),
      };
    case 'DELETE_ALBUM':
      return {
        ...state,
        albums: state.albums.filter((album) => album._id !== action.payload),
      };
    case 'INITIALIZE_ARTISTS':
      return {
        ...state,
        artists: action.payload,
      };
    case 'ADD_ARTIST':
      return {
        ...state,
        artists: state.artists.concat(action.payload),
      };
    case 'UPDATE_ARTIST':
      return {
        ...state,
        artists: state.artists.map((artist) =>
          artist._id === action.payload._id ? action.payload : artist,
        ),
      };
    case 'DELETE_ARTIST':
      return {
        ...state,
        artists: state.artists.filter(({ _id }) => _id !== action.payload),
      };

    default:
      return state;
  }
};
