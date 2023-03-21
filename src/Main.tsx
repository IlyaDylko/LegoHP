import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Shadow} from 'react-native-shadow-2';
import {routes} from './navigation/AppNavigator';
import {colors, height, width} from './utils';

const itemSize = width * 0.6;

export const Main = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        'https://rebrickable.com/api/v3/lego/minifigs/?in_theme_id=246&page=1&page_size=5',
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

  const onChoose = () => {
    navigation.navigate(routes.DETAILS, {item: data[selectedItem]});
  };

  const onShowDetails = url => {
    navigation.navigate(routes.WEB_VIEW, {url});
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text style={[styles.text, {paddingTop: insets.top + height * 0.1}]}>
        CHOOSE YOUR MINIFIG
      </Text>
      <Carousel
        loop
        width={itemSize + 50}
        height={itemSize + 50}
        style={styles.carousel}
        data={data}
        onSnapToItem={index => setSelectedItem(index)}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemContainer}>
              <Shadow
                startColor={
                  index === selectedItem ? colors.gold : colors.background
                }
                style={styles.item}>
                <Image source={{uri: item?.set_img_url}} style={styles.image} />
                <Text numberOfLines={1} style={styles.itemDescription}>
                  {item?.name}
                </Text>
                <TouchableOpacity onPress={() => onShowDetails(item?.set_url)}>
                  <Text style={styles.itemButtonText}>Show details</Text>
                </TouchableOpacity>
              </Shadow>
            </View>
          );
        }}
      />
      <TouchableOpacity
        containerStyle={[styles.buttonContainer, {bottom: insets.bottom + 20}]}
        style={styles.button}
        onPress={onChoose}>
        <Text style={styles.buttonText}>CHOOSE FIGURE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'column',
  },
  text: {
    position: 'absolute',
    top: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  buttonContainer: {
    position: 'absolute',
  },
  button: {
    padding: 15,
    paddingHorizontal: 45,
    backgroundColor: colors.button,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  carousel: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemContainer: {
    width: itemSize,
    height: itemSize,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  item: {
    width: itemSize,
    height: itemSize,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: colors.gold,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingTop: 20,
    paddingBottom: 7,
    textAlign: 'center',
    width: '80%',
  },
  itemButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.gold,
  },
  image: {
    height: width * 0.3,
    width: width * 0.3,
  },
});
