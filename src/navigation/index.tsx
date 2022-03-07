import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Fontisto, Entypo } from '@expo/vector-icons';

import { ColorSchemeName } from 'react-native';
import AlbumsScreen from '../screens/AlbumsScreen';
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import AlbumCreationScreen from '../screens/AlbumCreationScreen';
import ArtistDetailsScreen from '../screens/ArtistDetailsScreen';
import ArtistCreationScreen from '../screens/ArtistCreationScreen';
import ArtistsScreen from '../screens/ArtistsScreen';

const AlbumsStack = createNativeStackNavigator();

function AlbumsStackScreen() {
  return (
    <AlbumsStack.Navigator>
      <AlbumsStack.Screen name="Albums" component={AlbumsScreen} options={{ title: 'Albums' }} />
      <AlbumsStack.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
      <AlbumsStack.Screen
        name="AlbumCreation"
        component={AlbumCreationScreen}
        options={{ title: 'New Album' }}
      />
    </AlbumsStack.Navigator>
  );
}

const ArtistsStack = createNativeStackNavigator();

function ArtistsStackScreen() {
  return (
    <ArtistsStack.Navigator>
      <ArtistsStack.Screen
        name="Artists"
        component={ArtistsScreen}
        options={{ title: 'Artists', headerBackVisible: false }}
      />
      <ArtistsStack.Screen name="ArtistDetails" component={ArtistDetailsScreen} />
      <ArtistsStack.Screen
        name="ArtistCreation"
        component={ArtistCreationScreen}
        options={{ title: 'New Artist' }}
      />
    </ArtistsStack.Navigator>
  );
}

const albumsIcon = (color: string) => <Entypo name="folder-music" size={24} color={color} />;
const artistsIcon = (color: string) => <Fontisto name="persons" size={24} color={color} />;

const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <Tab.Navigator initialRouteName="AlbumsTab" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="AlbumsTab"
        component={AlbumsStackScreen}
        options={{
          title: 'Albums',
          tabBarIcon: ({ color }) => albumsIcon(color),
        }}
      />
      <Tab.Screen
        name="ArtistsTab"
        component={ArtistsStackScreen}
        options={{
          title: 'Artists',
          tabBarIcon: ({ color }) => artistsIcon(color),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
