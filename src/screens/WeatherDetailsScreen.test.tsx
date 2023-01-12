import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';

import {WeatherState} from '../store/weatherStore';
import WeatherDetailsScreen, {
  WeatherDetailsScreenProps,
} from './WeatherDetailsScreen';

const createTestNavProps = (): any => ({
  navigation: {
    state: {params: {}},
    navigate: jest.fn(),
  },
  route: {key: '', name: 'Details' as 'Details'},
});

describe('WeatherDetailsScreen', () => {
  let props: WeatherDetailsScreenProps;
  beforeEach(() => {
    props = createTestNavProps();
    jest.useFakeTimers();
  });
  test('should show fallback if there is no data by city id', () => {
    jest.mock(
      '../store/weatherStore',
      () =>
        ({
          cities: new Map().set(111111, {
            description: 'test',
            temp: 2,
            id: 111111,
            name: 'test',
            iconcode: 'test city name',
            humidity: 45,
            windSpeed: 12,
            clouds: 98,
            pressure: 1013,
          }),
        } as WeatherState),
    );
    render(
      <WeatherDetailsScreen
        {...props}
        route={{
          key: '',
          name: 'Details' as 'Details',
          params: {cityId: 2},
        }}
      />,
    );
    waitFor(() => {
      expect(screen.queryByTestId('fallback-message')).not.toBeNull();
    });
  });
  test('should show weather details for selected city from route params', () => {
    jest.mock(
      '../store/weatherStore',
      () =>
        ({
          cities: new Map().set(111111, {
            description: 'test',
            temp: 2,
            id: 111111,
            name: 'test',
            iconcode: 'test city name',
            humidity: 45,
            windSpeed: 12,
            clouds: 98,
            pressure: 1013,
          }),
        } as WeatherState),
    );
    render(
      <WeatherDetailsScreen
        {...props}
        route={{
          key: '',
          name: 'Details' as 'Details',
          params: {cityId: 111111},
        }}
      />,
    );
    waitFor(() => {
      expect(screen.queryByText('test city name')).not.toBeNull();
    });
  });
});
