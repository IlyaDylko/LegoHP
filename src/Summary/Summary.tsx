import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {routes} from '../navigation/AppNavigator';
import {colors, width} from '../utils';
import {CloseButton} from './CloseButton';
import {Part} from './Part';

export const Summary = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const {item, userData} = route.params;

  const onSubmit = () => {
    // Submit item data(id) and user data to a fake api
    // then navigate to Main
    navigation.navigate(routes.MAIN);
  };
  const onClose = () => {
    navigation.navigate(routes.MAIN);
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://rebrickable.com/api/v3/lego/minifigs/${item?.set_num}/parts/?in_theme_id=246`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'key 8cf348fde7fd727fecde5c36966a407a',
          },
        },
      )
        .then(response => response.json())
        .then(json => {
          setData(json.results);
        })
        .catch(error => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top + 20, paddingBottom: insets.bottom},
      ]}>
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        style={styles.card}>
        <CloseButton onPress={onClose} />
        <Text style={styles.text}>SUMMARY</Text>
        <Image source={{uri: item?.set_img_url}} style={styles.image} />
        <Text style={styles.itemDescription}>{item?.name}</Text>
        <Text style={styles.smallText}>
          There are {item.num_parts} parts in this minifig:
        </Text>
        {data.length > 0 && data?.map(partData => <Part data={partData} />)}
        <TouchableOpacity
          containerStyle={styles.buttonContainer}
          style={styles.button}
          onPress={onSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 30,
  },
  button: {
    padding: 15,
    paddingHorizontal: 45,
    backgroundColor: colors.button,
    borderRadius: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
  },
  cardContainer: {
    alignItems: 'center',
    height: '100%',
  },
  image: {
    height: width * 0.3,
    width: width * 0.3,
  },
  smallText: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingTop: 20,
    paddingBottom: 7,
    textAlign: 'center',
  },
});
