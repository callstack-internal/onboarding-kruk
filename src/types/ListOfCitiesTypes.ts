import {CITIES_LIST} from '../resources/citiesList';

export interface CityWeather {
  temp: number;
  description: string;
  name: string;
  id: number;
  iconcode: string;
}

export type CitiesList = Map<string | number, CityWeather>;
export type AvailableCities = keyof typeof CITIES_LIST;
export type AvailableCitiesCodes = string | number;
