import axios from 'axios';
import { ScrollView } from 'react-native';
import { AlbumsStackScreenProps } from '../../types';
import AlbumForm, { AlbumFormValues } from '../components/AlbumForm';
import AlbumService from '../services/albums';
import showToast from '../helpers/toastHelper';
import { useStateValue, addAlbum } from '../state';

const initialValues = {
  title: '',
  coverUrl: '',
  year: '',
  genre: '',
};

export default function AlbumCreationScreen({
  navigation,
}: AlbumsStackScreenProps<'AlbumCreation'>) {
  const [, dispatch] = useStateValue();

  const onSubmit = async (values: AlbumFormValues) => {
    const { artistId, title, year, genre, coverUrl } = values;

    let parsedYear;
    if (year) {
      parsedYear = parseInt(year, 10);
    }
    let albumToCreate;
    if (artistId) {
      albumToCreate = { ...values, year: parsedYear };
    } else {
      albumToCreate = { title, year: parsedYear, genre, coverUrl };
    }

    try {
      const createdAlbum = await AlbumService.create(albumToCreate);
      dispatch(addAlbum(createdAlbum));
      showToast(`${createdAlbum.title} added!`);
      navigation.goBack();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showToast(e.response?.data.error);
      } else if (e instanceof Error) {
        showToast(e.message);
      }
    }
  };

  return (
    <ScrollView>
      <AlbumForm initialValues={initialValues} onSubmit={onSubmit} submitButtonTitle="ADD ALBUM" />
    </ScrollView>
  );
}
