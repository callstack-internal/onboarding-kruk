import axios from 'axios';
import Config from 'react-native-config';
import {
  OWAvailableUnits,
  OWCityCode,
  OWGroupResponse,
} from '../types/OpenWeatherTypes';

const weatherService = () => {
  const instance = axios.create({
    baseURL: Config.WEATHER_API_URL,
    timeout: 1000,
    params: {
      appId: Config.WEATHER_API_KEY,
    },
  });
  return instance;
};

export const getGroupWeather = (
  cityIds: OWCityCode[],
  units: OWAvailableUnits = 'metric',
) => {
  return weatherService().get<OWGroupResponse>('/group', {
    params: {
      id: cityIds.join(','),
      units,
    },
  });
};
