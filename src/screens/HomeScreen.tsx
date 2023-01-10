import {FlatList, ListRenderItem} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';

import {useWeatherStore} from '../store/weatherStore';
import {CityWeather} from '../types/ListOfCitiesTypes';
import WeatherListItem, {
  WeatherListItemProps,
} from '../components/WeatherListItem';

function HomeScreen() {
  const cities = useWeatherStore(state => state.cities);
  const loading = useWeatherStore(state => state.loading);
  const fetchAllCities = useWeatherStore(state => state.fetchAllCities);

  useEffect(() => {
    try {
      fetchAllCities();
    } catch (e) {
      // TODO: replace with UI info element
      console.log('fetch all cities error:', e);
    }
  }, [fetchAllCities]);

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
