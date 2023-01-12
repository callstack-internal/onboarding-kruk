import axios from 'axios';
import Config from 'react-native-config';
import {AvailableCitiesCodes} from '../types/ListOfCitiesTypes';
import {OWAvailableUnits, OWGroupResponse} from '../types/OpenWeatherTypes';

const weatherService = () => {
  return axios.create({
    baseURL: Config.WEATHER_API_URL,
    timeout: 1000,
    params: {
      appId: Config.WEATHER_API_KEY,
    },
  });
};

export const getGroupWeather = (
  cityIds: AvailableCitiesCodes[],
  units: OWAvailableUnits = 'metric',
) => {
  return weatherService().get<OWGroupResponse>('/group', {
    params: {
      id: cityIds.join(','),
      units,
    },
  });
};
