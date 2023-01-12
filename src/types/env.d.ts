import {OWAvailableUnits} from './OpenWeatherTypes';

declare module 'react-native-config' {
  export interface NativeConfig {
    WEATHER_API_URL: string;
    WEATHER_API_KEY: string;
    DEFAULT_UNITS: OWAvailableUnits;
  }
}
