import {useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {object, string} from 'yup';
import {routes} from '../navigation/AppNavigator';
import {colors, height} from '../utils';
import {TextInputField} from './TextInputField';

const validationSchema = object().shape({
  fullName: string().required('Full name is required'),
  email: string().email('Invalid email').required('Email is required'),
  address: string().required('Address is required'),
  city: string().required('City is required'),
  state: string().required('State is required'),
  zipCode: string()
    .matches(/^\d{5}(-\d{4})?$/, 'Invalid zip code')
    .required('Zip code is required'),
});

export const Details = () => {
  const route = useRoute();
  const {item} = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const onSubmit = (values) => {
    navigation.navigate(routes.SUMMARY, {item, userData: values});
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
        }}
        onSubmit={values => onSubmit(values)}
        validationSchema={validationSchema}>
        {formikProps => (
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.formikContainer}>
            <Text
              style={[styles.text, {paddingTop: insets.top + height * 0.03}]}>
              PERSONAL DETAILS
            </Text>
            <View>
              <TextInputField
                label="Full Name"
                formikProps={formikProps}
                formikKey="fullName"
                placeholder="John Doe"
              />
              <TextInputField
                label="Email"
                formikProps={formikProps}
                formikKey="email"
                placeholder="johndoe@example.com"
                keyboardType="email-address"
              />
              <TextInputField
                label="Address"
                formikProps={formikProps}
                formikKey="address"
                placeholder="123 Main St"
              />
              <TextInputField
                label="City"
                formikProps={formikProps}
                formikKey="city"
                placeholder="New York"
              />
              <TextInputField
                label="State"
                formikProps={formikProps}
                formikKey="state"
                placeholder="NY"
              />
              <TextInputField
                label="Zip Code"
                formikProps={formikProps}
                formikKey="zipCode"
                placeholder="10001"
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              disabled={!formikProps.isValid}
              onPress={formikProps.handleSubmit}
              style={[styles.button, {opacity: formikProps.isValid ? 1 : 0.5}]}>
              <Text style={styles.buttonText}>VIEW SUMMARY</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
  },
  button: {
    padding: 15,
    paddingHorizontal: 45,
    backgroundColor: colors.button,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    top: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  formikContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
