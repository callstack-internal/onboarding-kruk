import {
  Alert,
  FlatList,
  ListRenderItem,
  Platform,
  Text,
  ToastAndroid,
  NativeModules,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useWeatherStore} from '../store/weatherStore';
import {CityWeather} from '../types/ListOfCitiesTypes';
import WeatherListItem, {
  WeatherListItemProps,
} from '../components/WeatherListItem';
import {RootStackParamList} from '../types/RootStackTypes';
import {tempUnit} from '../utilities/unitsUtilities';

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Weather'
>;

function HomeScreen({navigation}: HomeScreenProps) {
  const cities = useWeatherStore(state => state.cities);
  const loading = useWeatherStore(state => state.loading);
  const defaultUnits = useWeatherStore(state => state.defaultUnits);
  const fetchAllCities = useWeatherStore(state => state.fetchAllCities);

  const refreshData = useCallback(async () => {
    try {
      await fetchAllCities(defaultUnits);
    } catch (e) {
      Platform.OS === 'ios'
        ? Alert.alert('Error', 'Cannot fetch data.')
        : ToastAndroid.show('Cannot fetch data.', ToastAndroid.LONG);
    }
  }, [fetchAllCities, defaultUnits]);

  useEffect(() => {
    refreshData();
  }, [fetchAllCities, defaultUnits, refreshData]);

  const onItemPress = useCallback<WeatherListItemProps['onPress']>(
    async id => {
      navigation.navigate('Details', {cityId: id});
      const pushNotification = NativeModules.PushNotificationTrigger;
      const city = cities.get(id);
      if (city) {
        console.log('city', city);
        await pushNotification.showNotification(
          city.name,
          `${city.description} ${city.temp}${tempUnit(defaultUnits)}`,
        );
      }
    },
    [navigation, cities, defaultUnits],
  );

  const renderItem = useCallback<ListRenderItem<CityWeather>>(
    ({item}) => {
      return (
        <WeatherListItem
          id={item.id}
          title={item.name}
          temp={item.temp}
          key={item.id}
          iconcode={item.iconcode}
          onPress={onItemPress}
          units={defaultUnits}
          description={item.description}
        />
      );
    },
    [onItemPress, defaultUnits],
  );

  const data = useMemo(() => [...cities.values()], [cities]);

  if (!data.length)
    return <Text testID="no-data-element">There is no data</Text>;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={i => `${i.id}`}
      refreshing={loading}
      onRefresh={refreshData}
      testID="cities-list"
    />
  );
}

export default HomeScreen;
