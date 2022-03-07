import axios from 'axios';
import { ScrollView } from 'react-native';

import { ArtistsStackScreenProps } from '../../types';
import ArtistService from '../services/artists';
import showToast from '../helpers/toastHelper';
import { useStateValue, addArtist } from '../state';
import ArtistForm, { ArtistFormValues } from '../components/ArtistForm';

const initialValues = {
  name: '',
  birthdate: '',
  deathDate: '',
  photoUrl: '',
};

export default function ArtistCreationScreen({
  navigation,
}: ArtistsStackScreenProps<'ArtistCreation'>) {
  const [, dispatch] = useStateValue();

  const onSubmit = async (values: ArtistFormValues) => {
    const { birthdate, deathDate } = values;

    const artistToCreate = {
      ...values,
      birthdate: new Date(birthdate as string).toJSON(),
      deathDate: new Date(deathDate as string).toJSON(),
    };

    try {
      const createdArtist = await ArtistService.create(artistToCreate);
      dispatch(addArtist(createdArtist));
      showToast(`${createdArtist.title} added!`);
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
      <ArtistForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitButtonTitle="ADD ARTIST"
      />
    </ScrollView>
  );
}
