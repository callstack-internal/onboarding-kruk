import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootStackTypes';
import {useWeatherStore} from '../store/weatherStore';
import {colorPallete} from '../resources/colors';

type WeatherDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

const WeatherDetailsScreen = ({route}: WeatherDetailsScreenProps) => {
  const {cityId} = route.params;
  const city = useWeatherStore(state => state.cities.get(cityId));
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: `http://openweathermap.org/img/w/${city?.iconcode}.png`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text>{city?.name}</Text>
    </View>
  );
};

export default WeatherDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colorPallete.dark,
  },
  image: {width: 24, height: 24},
});
