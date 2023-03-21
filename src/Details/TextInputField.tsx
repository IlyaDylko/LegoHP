import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {width} from '../utils';

export const TextInputField = ({label, formikProps, formikKey, ...rest}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      value={formikProps.values[formikKey]}
      {...rest}
    />
    {formikProps.touched[formikKey] && formikProps.errors[formikKey] ? (
      <Text style={styles.error}>{formikProps.errors[formikKey]}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    color: 'white',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: width * 0.8,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
  },
});
