import {CITIES_LIST} from '../resources/citiesList';
import {OWCityCode} from './OpenWeatherTypes';

export interface CityWeather {
  temp: number;
  description: string;
  name: string;
  id: number;
  iconcode: string;
  humidity: number;
  windSpeed: number;
  clouds: number;
  pressure: number;
}

export type CitiesList = Map<OWCityCode, CityWeather>;
export type AvailableCities = keyof typeof CITIES_LIST;
