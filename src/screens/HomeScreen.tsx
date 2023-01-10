import {FlatList, ListRenderItem} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import Toast from 'react-native-simple-toast';

import {useWeatherStore} from '../store/weatherStore';
import {CityWeather} from '../types/ListOfCitiesTypes';
import WeatherListItem, {
  WeatherListItemProps,
} from '../components/WeatherListItem';

function HomeScreen() {
  const cities = useWeatherStore(state => state.cities);
  const loading = useWeatherStore(state => state.loading);
  const defaultUnits = useWeatherStore(state => state.defaultUnits);
  const fetchAllCities = useWeatherStore(state => state.fetchAllCities);

  useEffect(() => {
    try {
      fetchAllCities(defaultUnits);
    } catch (e) {
      console.log('fetch all cities error:', e);
      Toast.show('Cannot fetch data.', Toast.LONG);
    }
  }, [fetchAllCities, defaultUnits]);

  const onItemPress = useCallback<
    WeatherListItemProps['onPress']
  >(() => {}, []);

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
        />
      );
    },
    [onItemPress],
  );

  const data = useMemo(() => [...cities.values()], [cities]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={i => `${i.id}`}
      refreshing={loading}
    />
  );
}

export default HomeScreen;
