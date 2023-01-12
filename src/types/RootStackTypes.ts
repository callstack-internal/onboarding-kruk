import {OWCityCode} from './OpenWeatherTypes';

export type RootStackParamList = {
  Weather: undefined;
  Details: {cityId: OWCityCode};
};
