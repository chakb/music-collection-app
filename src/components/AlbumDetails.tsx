import { StyleSheet, Image, Platform, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from './Themed';
import { Album } from '../../types';
import useDimensions from '../hooks/useDimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  albumTextContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  photo: {
    resizeMode: 'contain',
    width: 500,
    height: 500,
  },
  albumDataContainer: {
    display: 'flex',
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artistContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  artistName: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  albumInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  year: {
    fontSize: 16,
    marginRight: 30,
    fontStyle: 'italic',
  },
  genre: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

function AlbumDetails({ album, artistName }: { album: Album; artistName: string | undefined }) {
  const navigation = useNavigation();

  const dimensions = useDimensions();
  let itemSize = dimensions.width;
  if (dimensions.width > dimensions.height) {
    itemSize = dimensions.height;
  }

  return (
    <View style={styles.container}>
      {album.coverUrl ? (
        <Image
          source={{ uri: album.coverUrl }}
          style={[
            styles.photo,
            Platform.OS !== 'web' && {
              height: itemSize,
              width: itemSize,
            },
          ]}
        />
      ) : null}
      <View style={styles.albumTextContainer}>
        <View style={styles.albumDataContainer}>
          <Text style={styles.title}>{album.title}</Text>
          <View style={styles.albumInfoContainer}>
            <Text style={styles.year}>{album.year}</Text>
            <Text style={styles.genre}>{album.genre}</Text>
          </View>
        </View>

        <View style={styles.artistContainer}>
          {album.artistId ? (
            <Pressable
              onPress={() => {
                if (album.artistId) {
                  return navigation.navigate('ArtistsTab', {
                    screen: 'ArtistDetails',
                    params: { id: album.artistId },
                  });
                }
                return null;
              }}
            >
              {artistName ? <Text style={styles.artistName}>{artistName} &#10148;</Text> : null}
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default AlbumDetails;
