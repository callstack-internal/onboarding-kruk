import Config from 'react-native-config';
import create from 'zustand';
import {CITIES_LIST} from '../resources/citiesList';
import {getGroupWeather} from '../services/weatherService';
import {CitiesList} from '../types/ListOfCitiesTypes';
import {OWAvailableUnits, OWCityWeather} from '../types/OpenWeatherTypes';
import {enumValues} from '../utilities/enumUtilities';

interface WeatherState {
  cities: CitiesList;
  cityWeather: OWCityWeather | null;
  loading: boolean;
  defaultUnits: OWAvailableUnits;
  fetchAllCities: (units?: OWAvailableUnits) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>(set => ({
  cities: new Map(),
  cityWeather: null,
  loading: false,
  defaultUnits: Config.DEFAULT_UNITS,
  fetchAllCities: async (units: OWAvailableUnits = 'metric') => {
    set({
      loading: true,
    });
    const response = await getGroupWeather(enumValues(CITIES_LIST), units);
    if (response?.status === 200) {
      set({
        cities: response.data.list.reduce((acc, weather) => {
          acc.set(weather.id, {
            description: weather.weather[0].main,
            temp: weather.main.temp,
            id: weather.id,
            name: weather.name,
            iconcode: weather.weather[0].icon,
            humidity: weather.main.humidity,
            windSpeed: weather.wind.speed,
            clouds: weather.clouds.all,
            pressure: weather.main.pressure,
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
