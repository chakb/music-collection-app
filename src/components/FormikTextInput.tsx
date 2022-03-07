import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import { Text, TextInput, TextInputProps } from './Themed';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    marginLeft: 20,
    color: 'red',
  },
});

interface InputNameProp {
  name: string;
}
export type FormikTextInput = InputNameProp & TextInputProps;

function FormikTextInput({ name, ...props }: FormikTextInput) {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
}

export default FormikTextInput;
