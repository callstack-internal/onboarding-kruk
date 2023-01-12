import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootStackTypes';
import {useWeatherStore} from '../store/weatherStore';
import {colorPallete} from '../resources/colors';
import Chip from '../components/Chip';
import WeatherCondListItem from '../components/WeatherCondListItem';

type WeatherDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

const WeatherDetailsScreen = ({route}: WeatherDetailsScreenProps) => {
  const {cityId} = route.params;
  const city = useWeatherStore(state => state.cities.get(cityId));
  const units = useWeatherStore(state => state.defaultUnits);
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.innerHeaderContainer}>
          <FastImage
            style={styles.image}
            source={{
              uri: `http://openweathermap.org/img/w/${city?.iconcode}.png`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View>
            <Text style={styles.title}>{city?.name}</Text>
            <Text>{city?.description}</Text>
          </View>
        </View>
        <Chip>
          <Text>{city?.temp}</Text>
          {units === 'metric' ? <Text> &deg; C</Text> : <Text> &deg; F</Text>}
        </Chip>
      </View>
      <WeatherCondListItem
        title="Humidity"
        value={<Text>{city?.humidity} %</Text>}
      />
      <WeatherCondListItem
        title="Pressure"
        value={<Text>{city?.pressure} hPa</Text>}
      />
      <WeatherCondListItem
        title="Wind speed"
        value={
          <>
            <Text>{city?.windSpeed} </Text>
            <Text>{units === 'metric' ? 'kph' : 'mph'}</Text>
          </>
        }
      />
      <WeatherCondListItem
        title="Cloud cover"
        value={<Text>{city?.clouds} %</Text>}
      />
    </View>
  );
};

export default WeatherDetailsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colorPallete.dark,
    justifyContent: 'space-between',
  },
  innerHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  image: {width: 48, height: 48, marginRight: 16},
});
