import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  AlbumsTab: NavigatorScreenParams<AlbumsStackParamList>;
  ArtistsTab: NavigatorScreenParams<ArtistsStackParamList>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = BottomTabScreenProps<
  RootTabParamList,
  Screen
>;

export type AlbumsStackParamList = {
  Albums: undefined;
  AlbumDetails: { id: string } | undefined;
  AlbumCreation: undefined;
};

export type ArtistsStackParamList = {
  Artists: undefined;
  ArtistDetails: { id: string } | undefined;
  ArtistCreation: undefined;
};

export type AlbumsStackScreenProps<Screen extends keyof AlbumsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AlbumsStackParamList, Screen>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

export type ArtistsStackScreenProps<Screen extends keyof ArtistsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ArtistsStackParamList, Screen>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootTabParamList {}
  }
}

export type Album = {
  _id: string;
  title: string;
  artistId?: string;
  coverUrl?: string;
  year?: number;
  genre?: string;
};

export type Artist = {
  _id: string;
  name: string;
  photoUrl?: string;
  birthdate?: string;
  deathDate?: string;
};
