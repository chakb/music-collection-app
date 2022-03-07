import { FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';

import { View } from '../components/Themed';
import { ArtistsStackScreenProps } from '../../types';
import { deleteArtist, useStateValue } from '../state';
import artistService from '../services/artists';
import showToast from '../helpers/toastHelper';
import RenderArtistItem from '../components/RenderArtistItem';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'lightgray',
    height: 5,
  },
  container: {
    flex: 1,
  },
});

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export default function ArtistsScreen({ navigation }: ArtistsStackScreenProps<'Artists'>) {
  const [{ artists }, dispatch] = useStateValue();
  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    const editButton = () => (
      <Pressable
        onPress={() => navigation.navigate('ArtistCreation')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Entypo name="add-to-list" size={24} color={Colors[colorScheme].text} />
      </Pressable>
    );

    navigation.setOptions({
      headerRight: editButton,
    });
  }, [colorScheme, navigation]);

  const removeArtist = async (id: string) => {
    try {
      const deletedArtist = await artistService.remove(id);
      dispatch(deleteArtist(deletedArtist._id));
      showToast(`${deletedArtist.name} deleted!`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showToast(e.response?.data.error);
      } else if (e instanceof Error) {
        showToast(e.message);
      }
    }
  };

  const handlePress = (id: string) => navigation.navigate('ArtistDetails', { id });

  const handleLongPress = (id: string) => {
    Alert.alert('Delete Artist', `Delete ${artists?.find((artist) => artist._id === id)?.name}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => removeArtist(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        renderItem={({ item }) => (
          <RenderArtistItem
            item={item}
            handlePress={handlePress}
            handleLongPress={handleLongPress}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
