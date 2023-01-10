import {CITIES_LIST} from '../resources/citiesList';
import {OWCityCode} from './OpenWeatherTypes';

export interface CityWeather {
  temp: number;
  description: string;
  name: string;
  id: number;
  iconcode: string;
}

export type CitiesList = Map<OWCityCode, CityWeather>;
export type AvailableCities = keyof typeof CITIES_LIST;
