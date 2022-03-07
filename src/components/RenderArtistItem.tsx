import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, View } from './Themed';
import { Artist } from '../../types';

const styles = StyleSheet.create({
  artistContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artistName: {
    fontSize: 22,
    fontWeight: 'bold',
    flexGrow: 1,
    marginLeft: 20,
  },
  artistPhoto: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
  },
});

function RenderArtistItem({
  item,
  handlePress,
  handleLongPress,
}: {
  item: Artist;
  handlePress: (id: string) => void;
  handleLongPress: (id: string) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.artistContainer}
      onPress={() => handlePress(item._id)}
      onLongPress={() => handleLongPress(item._id)}
    >
      {item.photoUrl ? (
        <Image style={styles.artistPhoto} source={{ uri: item.photoUrl }} />
      ) : (
        <View style={styles.artistPhoto} />
      )}
      <Text style={styles.artistName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

export default RenderArtistItem;
