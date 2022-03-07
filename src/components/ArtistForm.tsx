/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, StyleSheet, Platform, Pressable } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import FormikTextInput from './FormikTextInput';
import { View, Text } from './Themed';

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
  errorText: {
    marginTop: 5,
    marginLeft: 20,
    color: 'red',
  },
});

const validationSchema = yup.object().shape({
  name: yup.string().required('Artist name is required'),
  photoUrl: yup.string().url('Photo must be a valid URL'),
  birthdate: yup
    .date()
    .min('1909-01-01T00:00:00.000Z', 'Date must be later than 1909')
    .max('2030-12-31T00:00:00.000Z', 'Date must be before 2030'),
  deathDate: yup
    .date()
    .min('1909-01-01T00:00:00.000Z', 'Date must be later than 1909')
    .max('2030-12-31T00:00:00.000Z', 'Date must be before 2030')
    .when(
      'birthdate',
      (birthdate, schema) =>
        birthdate && schema.min(birthdate, 'Death date must be later than birth date'),
    ),
});

export type ArtistFormValues = {
  name: string;
  photoUrl?: string;
  birthdate?: string;
  deathDate?: string;
};

type ArtistFormType = {
  onSubmit: (values: ArtistFormValues) => void;
  submitButtonTitle: string;
  initialValues: ArtistFormValues;
};

export default function ArtistForm({ onSubmit, submitButtonTitle, initialValues }: ArtistFormType) {
  const [birthdate, setBirthdate] = useState(new Date('1909-01-01T00:00:00.000Z'));
  const [deathDate, setDeathDate] = useState(new Date('2030-12-31T00:00:00.000Z'));
  const [showBirth, setShowBirth] = useState(false);
  const [showDeath, setShowDeath] = useState(false);

  useEffect(() => {
    if (initialValues.birthdate) {
      setBirthdate(new Date(initialValues.birthdate));
    }
    if (initialValues.deathDate) {
      setDeathDate(new Date(initialValues.deathDate));
    }
  }, [initialValues]);

  const showBirthPicker = () => {
    setShowBirth(true);
  };
  const showDeathPicker = () => {
    setShowDeath(true);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, setFieldValue, errors }) => (
        <View>
          <FormikTextInput style={styles.input} name="name" placeholder="Name" />
          <FormikTextInput style={styles.input} name="photoUrl" placeholder="Photo URL" />
          <View>
            <Text style={styles.input} onPress={showBirthPicker}>
              Birth date: {format(new Date(birthdate), 'dd-MM-yyyy')}
            </Text>
            {showBirth && (
              <DateTimePicker
                value={birthdate}
                mode="date"
                display="default"
                onChange={(event: Event, date: Date | undefined) => {
                  const currentDate = date || birthdate;
                  setShowBirth(Platform.OS === 'ios');
                  setBirthdate(currentDate);
                  setFieldValue('birthdate', currentDate.toJSON());
                }}
                minimumDate={new Date('1909-01-01T00:00:00.000Z')}
                maximumDate={new Date('2030-12-31T00:00:00.000Z')}
              />
            )}
          </View>
          <View>
            <Pressable onPress={showDeathPicker}>
              <Text style={styles.input}>
                Death date: {format(new Date(deathDate), 'dd-MM-yyyy')}
              </Text>
            </Pressable>
            {errors.deathDate && (
              <Text style={styles.errorText}>
                <ErrorMessage name="deathDate" />
              </Text>
            )}
            {showDeath && (
              <DateTimePicker
                value={deathDate}
                mode="date"
                display="default"
                onChange={(event: Event, date: Date | undefined) => {
                  const currentDate = date || birthdate;
                  setShowDeath(Platform.OS === 'ios');
                  setDeathDate(currentDate);
                  setFieldValue('deathDate', currentDate.toJSON());
                }}
                minimumDate={new Date('1909-01-01T00:00:00.000Z')}
                maximumDate={new Date('2030-12-31T00:00:00.000Z')}
              />
            )}
          </View>
          <View style={styles.button}>
            <Button title={submitButtonTitle} onPress={handleSubmit as any} />
          </View>
        </View>
      )}
    </Formik>
  );
}
