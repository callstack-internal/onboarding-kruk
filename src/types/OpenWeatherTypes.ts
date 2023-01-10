export interface OWCoord {
  lon: number;
  lat: number;
}

export interface OWSys {
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface OWWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OWMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
}

export interface OWWind {
  speed: number;
  deg: number;
}

export interface OWCloud {
  all: number;
}

export interface OWCityWeather {
  coord: OWCoord;
  sys: OWSys;
  weather: OWWeather[];
  main: OWMain;
  visibility: number;
  wind: OWWind;
  clouds: OWCloud;
  dt: number;
  id: number;
  name: string;
}

export interface OWGroupResponse {
  cnt: number;
  list: OWCityWeather[];
}

export type OWAvailableUnits = 'metric' | 'imperial';
