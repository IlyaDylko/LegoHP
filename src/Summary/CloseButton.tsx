import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const CloseButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} containerStyle={styles.container}>
      <Text style={styles.x}>X</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  x: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
