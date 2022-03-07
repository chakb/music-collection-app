/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { SetStateAction, useEffect, useState } from 'react';

import FormikTextInput from './FormikTextInput';
import { View } from './Themed';
import { useStateValue } from '../state';

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 20,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  button: {
    padding: 20,
    margin: 10,
  },
});

const validationSchema = yup.object().shape({
  title: yup.string().required('Album title is required'),
  coverUrl: yup.string().url('Cover must be a valid URL'),
  artist: yup.string(),
  year: yup
    .number()
    .typeError('Year must be a number')
    .integer('Year must be an integer number between 1930 and 2030')
    .min(1930, 'Minimum year is 1930')
    .max(2030, 'Maximum year is 2030'),
  genre: yup.string(),
});

export type AlbumFormValues = {
  title: string;
  artistId?: string;
  coverUrl?: string;
  year?: string;
  genre?: string;
};

type AlbumFormType = {
  onSubmit: (values: AlbumFormValues) => void;
  submitButtonTitle: string;
  initialValues: AlbumFormValues;
};

export default function AlbumForm({ onSubmit, submitButtonTitle, initialValues }: AlbumFormType) {
  const [selectedArtist, setSelectedArtist] = useState<SetStateAction<string | undefined>>();
  const [{ artists }] = useStateValue();

  useEffect(() => {
    if (initialValues.artistId) {
      setSelectedArtist(initialValues.artistId);
    }
  }, [initialValues.artistId]);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, setFieldValue }) => (
        <View>
          <FormikTextInput style={styles.input} name="title" placeholder="Title" />
          <FormikTextInput style={styles.input} name="coverUrl" placeholder="Cover URL" />
          <Picker
            style={styles.input}
            selectedValue={selectedArtist}
            onValueChange={(itemValue) => {
              setFieldValue('artistId', itemValue);
              setSelectedArtist(itemValue);
            }}
          >
            {artists.find((a) => a._id === initialValues.artistId) ? null : (
              <Picker.Item label="Pick artist..." />
            )}
            {initialValues.artistId ? null : <Picker.Item label="None" value="" />}
            {artists.map((artist) => {
              return <Picker.Item label={artist.name} value={artist._id} key={artist._id} />;
            })}
          </Picker>
          <FormikTextInput
            style={styles.input}
            name="year"
            placeholder="1930"
            keyboardType="numeric"
          />
          <FormikTextInput style={styles.input} name="genre" placeholder="Genre" />
          <View style={styles.button}>
            <Button title={submitButtonTitle} onPress={handleSubmit as any} />
          </View>
        </View>
      )}
    </Formik>
  );
}
