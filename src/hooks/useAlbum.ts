import axios from 'axios';
import { Album } from '../../types';
import albumService from '../services/albums';
import showToast from '../helpers/toastHelper';
import { useStateValue, updateAlbum } from '../state';

const useAlbum = (albumId: string | undefined) => {
  const [{ albums, artists }, dispatch] = useStateValue();

  const album = albums.find((a) => a._id === albumId);

  let artistName;
  if (album?.artistId) {
    artistName = artists.find((a) => a._id === album.artistId)?.name;
  }

  async function editAlbum(albumToEdit: Album) {
    let updatedAlbum;
    try {
      updatedAlbum = await albumService.update(albumToEdit._id, albumToEdit);
      dispatch(updateAlbum(updatedAlbum));
      showToast(`${updatedAlbum.title} updated!`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showToast(e.response?.data.error);
      } else if (e instanceof Error) {
        showToast(e.message);
      }
    }
    return updatedAlbum;
  }

  return [album, artistName, editAlbum] as const;
};

export default useAlbum;
