import create from 'zustand';
import {CITIES_LIST} from '../resources/citiesList';
import {getGroupWeather} from '../services/weatherService';
import {CitiesList} from '../types/ListOfCitiesTypes';
import {OWCityWeather} from '../types/OpenWeatherTypes';
import {enumValues} from '../utilities/enumUtilities';

interface WeatherState {
  cities: CitiesList;
  cityWeather: OWCityWeather | null;
  loading: boolean;
  fetchAllCities: () => Promise<void>;
}

export const useWeatherStore = create<WeatherState>(set => ({
  cities: new Map(),
  cityWeather: null,
  loading: false,
  fetchAllCities: async () => {
    set({
      loading: true,
    });
    const response = await getGroupWeather(enumValues(CITIES_LIST));
    if (response.status === 200) {
      set({
        cities: response.data.list.reduce((acc, weather) => {
          acc.set(weather.id, {
            description: weather.weather[0].description,
            temp: weather.main.temp,
            id: weather.id,
            name: weather.name,
            iconcode: weather.weather[0].icon,
          });
          return acc;
        }, new Map() as CitiesList),
      });
    }
    set({
      loading: false,
    });
  },
}));
