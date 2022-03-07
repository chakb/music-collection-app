import { useLayoutEffect } from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

import { View, Text } from '../components/Themed';
import { ArtistsStackScreenProps } from '../../types';
import { updateArtist, useStateValue } from '../state';
import ArtistDetails from '../components/ArtistDetails';
import useEditToggle from '../hooks/useEditToggle';
import ArtistForm, { ArtistFormValues } from '../components/ArtistForm';
import showToast from '../helpers/toastHelper';
import artistService from '../services/artists';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function ArtistDetailsScreen({
  navigation,
  route,
}: ArtistsStackScreenProps<'ArtistDetails'>) {
  const artistId = route.params?.id;
  const [showEditForm, setShowEditForm] = useEditToggle();
  const [{ albums, artists }, dispatch] = useStateValue();

  const artist = artists.find((a) => a._id === artistId);

  let discography;
  if (artist?._id) {
    discography = albums.filter((a) => a.artistId === artistId);
  }

  useLayoutEffect(() => {
    if (artist) {
      navigation.setOptions({ title: `${artist.name}` });
    } else {
      navigation.setOptions({ title: 'Artist Details' });
    }
  }, [artist, navigation]);

  if (!artist) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Artist does not exist</Text>
        <Button title="GO BACK" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const initialFormValues = {
    name: artist.name,
    photoUrl: artist.photoUrl,
    birthdate: artist.birthdate,
    deathDate: artist.deathDate,
  };

  const handleUpdateAlbum = async (values: ArtistFormValues) => {
    const artistToUpdate = { ...artist, ...values };

    try {
      const updatedArtist = await artistService.update(artistToUpdate._id, artistToUpdate);
      dispatch(updateArtist(updatedArtist));
      showToast(`${updatedArtist.title} updated!`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showToast(e.response?.data.error);
      } else if (e instanceof Error) {
        showToast(e.message);
      }
    }

    setShowEditForm(false);
  };

  return (
    <ScrollView>
      {showEditForm ? (
        <ArtistForm
          initialValues={initialFormValues}
          onSubmit={handleUpdateAlbum}
          submitButtonTitle="EDIT ARTIST"
        />
      ) : (
        <ArtistDetails artist={artist} discography={discography} />
      )}
    </ScrollView>
  );
}
