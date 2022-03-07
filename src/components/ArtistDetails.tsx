import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import { View, Text } from './Themed';
import { Album, Artist } from '../../types';
import useDimensions from '../hooks/useDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  artistDataContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  photo: {
    resizeMode: 'contain',
    width: 500,
    height: 500,
    backgroundColor: 'lightgray',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  discography: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  album: {
    fontSize: 20,
    marginBottom: 5,
    marginHorizontal: 10,
  },
});

export default function ArtistDetails({
  artist,
  discography,
}: {
  artist: Artist;
  discography: Album[] | undefined;
}) {
  const navigation = useNavigation();

  const dimensions = useDimensions();
  let itemSize = dimensions.width;
  if (dimensions.width > dimensions.height) {
    itemSize = dimensions.height;
  }

  const dateIsLaterThanToday = (date: string) => {
    const today = new Date();
    const dateObject = new Date(date);

    if (today <= dateObject) {
      return 'Present';
    }
    return format(dateObject, 'yyyy');
  };

  return (
    <View style={styles.container}>
      {artist.photoUrl ? (
        <Image
          source={{ uri: artist.photoUrl }}
          style={[
            styles.photo,
            Platform.OS !== 'web' && {
              height: itemSize,
              width: itemSize,
            },
          ]}
        />
      ) : null}
      <View style={styles.artistDataContainer}>
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.date}>
          {artist.birthdate ? format(new Date(artist.birthdate), 'yyyy') : 'Unknown'} -{' '}
          {artist.deathDate ? dateIsLaterThanToday(artist.deathDate) : 'Unknown'}
        </Text>
        <Text style={styles.discography}>Discography</Text>
        {discography?.map((album) => {
          return (
            <TouchableOpacity
              key={album._id}
              onPress={() =>
                navigation.navigate('AlbumsTab', {
                  screen: 'AlbumDetails',
                  params: { id: album._id },
                })
              }
            >
              <Text style={styles.album}>{album.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
