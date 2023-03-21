import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, width} from '../utils';

export const Part = ({data}) => {
  return (
    <View style={styles.partContainer}>
      <Image
        source={{uri: data?.part?.part_img_url}}
        style={styles.partImage}
      />
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={styles.smallText}>
          {data?.part?.name}
        </Text>
        <Text style={styles.goldText}>{data?.part?.part_num}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  partContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '80%',
    marginBottom: 5,
  },
  partImage: {
    height: width * 0.15,
    width: width * 0.15,
  },
  smallText: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  goldText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.gold,
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
  },
});
