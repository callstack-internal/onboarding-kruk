import {Text, FlatList, ListRenderItem} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useWeatherStore} from '../store/weatherStore';
import {CityWeather} from '../types/ListOfCitiesTypes';

function HomeScreen() {
  const cities = useWeatherStore(state => state.cities);
  const loading = useWeatherStore(state => state.loading);
  const fetchAllCities = useWeatherStore(state => state.fetchAllCities);

  console.log('cities: ', cities);

  useEffect(() => {
    try {
      fetchAllCities();
    } catch (e) {
      console.log('fetch all cities error:', e);
    }
  }, [fetchAllCities]);

  const renderItem = useCallback<ListRenderItem<CityWeather>>(({item}) => {
    return <Text>{item.name}</Text>;
  }, []);
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
