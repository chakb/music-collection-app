import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import {
  Image,
  Platform,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { AlbumsStackScreenProps } from '../../types';
import albumService from '../services/albums';
import artistService from '../services/artists';
import showToast from '../helpers/toastHelper';
import { useStateValue, deleteAlbum, initializeAlbums, initializeArtists } from '../state';
import useDimensions from '../hooks/useDimensions';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        display: 'grid' as 'none',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      },
      item: {
        width: '100%',
      },
    },
    default: {
      content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
  }),
  cover: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: '100%',
  },
  noCover: {
    flex: 1,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderWidth: 3,
  },
});

export default function AlbumsScreen({ navigation }: AlbumsStackScreenProps<'Albums'>) {
  const [{ albums }, dispatch] = useStateValue();
  const colorScheme = useColorScheme();

  const dimensions = useDimensions();
  const itemSize = dimensions.width / Math.floor(dimensions.width / 150);

  const ref = useRef<ScrollView>(null);
  useScrollToTop(ref);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const albumList = await albumService.getAll();
        dispatch(initializeAlbums(albumList));
        const artistList = await artistService.getAll();
        dispatch(initializeArtists(artistList));
      } catch (e) {
        if (e instanceof Error) {
          showToast(e.message);
        }
      }
    };
    initializeData();
  }, [dispatch]);

  useLayoutEffect(() => {
    const editButton = () => (
      <Pressable
        onPress={() => navigation.navigate('AlbumCreation')}
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

  const removeAlbum = async (id: string) => {
    try {
      const deletedAlbum = await albumService.remove(id);
      dispatch(deleteAlbum(deletedAlbum._id));
      showToast(`${deletedAlbum.title} deleted!`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showToast(e.response?.data.error);
      } else if (e instanceof Error) {
        showToast(e.message);
      }
    }
  };

  const handleLongPress = (id: string) => {
    Alert.alert('Delete Album', `Delete ${albums?.find((album) => album._id === id)?.title}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => removeAlbum(id) },
    ]);
  };

  return (
    <ScrollView ref={ref} contentContainerStyle={styles.content}>
      {albums.map((album) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AlbumDetails', { id: album._id })}
          onLongPress={() => handleLongPress(album._id)}
          key={album._id}
          style={[
            styles.item,
            Platform.OS !== 'web' && {
              height: itemSize,
              width: itemSize,
            },
          ]}
        >
          {album.coverUrl ? (
            <Image source={{ uri: album.coverUrl }} style={styles.cover} />
          ) : (
            <View
              style={[
                styles.noCover,
                Platform.OS !== 'web' && {
                  height: itemSize,
                  width: itemSize,
                },
              ]}
            >
              <Text style={{ textAlign: 'center' }}>{album.title}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
