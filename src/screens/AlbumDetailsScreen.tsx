import { useLayoutEffect } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { AlbumsStackScreenProps } from '../../types';
import useAlbum from '../hooks/useAlbum';
import AlbumForm, { AlbumFormValues } from '../components/AlbumForm';
import AlbumDetails from '../components/AlbumDetails';
import useEditToggle from '../hooks/useEditToggle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function AlbumDetailsScreen({
  navigation,
  route,
}: AlbumsStackScreenProps<'AlbumDetails'>) {
  const albumId = route.params?.id;
  const [album, artistName, editAlbum] = useAlbum(albumId);
  const [showEditForm, setShowEditForm] = useEditToggle();

  useLayoutEffect(() => {
    if (album) {
      navigation.setOptions({ title: `${album.title}` });
    } else {
      navigation.setOptions({ title: 'Album Details' });
    }
  }, [album, navigation]);

  if (!album) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Album does not exist</Text>
        <Button title="GO BACK" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const initialFormValues = {
    title: album.title,
    coverUrl: album.coverUrl,
    artistId: album.artistId,
    year: JSON.stringify(album.year),
    genre: album.genre,
  };

  const handleUpdateAlbum = async (values: AlbumFormValues) => {
    let parsedYear;
    if (values.year) {
      parsedYear = parseInt(values.year, 10);
    }
    const albumToUpdate = { _id: album._id, ...values, year: parsedYear };

    editAlbum(albumToUpdate);
    setShowEditForm(false);
  };

  return (
    <ScrollView>
      {showEditForm ? (
        <AlbumForm
          initialValues={initialFormValues}
          onSubmit={handleUpdateAlbum}
          submitButtonTitle="EDIT ALBUM"
        />
      ) : (
        <AlbumDetails album={album} artistName={artistName} />
      )}
    </ScrollView>
  );
}
