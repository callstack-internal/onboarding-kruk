import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import mockAxios from 'axios';

import HomeScreen, {HomeScreenProps} from './HomeScreen';

const exampleResponse = {
  cnt: 1,
  list: [
    {
      coord: {
        lon: 37.6156,
        lat: 55.7522,
      },
      sys: {
        country: 'PL',
        timezone: 10800,
        sunrise: 1673330074,
        sunset: 1673356722,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      main: {
        temp: -11.66,
        feels_like: -18.66,
        temp_min: -13.58,
        temp_max: -10.71,
        pressure: 1039,
        sea_level: 1039,
        grnd_level: 1019,
        humidity: 83,
      },
      visibility: 10000,
      wind: {
        speed: 6.22,
        deg: 153,
      },
      clouds: {
        all: 100,
      },
      dt: 1673352429,
      id: 111111,
      name: 'Test city',
    },
  ],
};

const createTestNavProps = (): any => ({
  navigation: {
    state: {params: {}},
    navigate: jest.fn(),
  },
  route: {key: '', name: 'Weather' as 'Weather'},
});

describe('HomeScreen', () => {
  let props: HomeScreenProps;
  beforeEach(() => {
    props = createTestNavProps();
    jest.useFakeTimers();
  });

  test('should render empty list', async () => {
    render(<HomeScreen {...props} />);
    await waitFor(() => {
      expect(screen.queryByTestId('no-data-element')).toBeDefined();
    });
  });
  test('press on the city should navigate to the Details screen with city id in route params', async () => {
    (mockAxios.get as jest.Mock).mockResolvedValue({
      data: exampleResponse,
      status: 200,
    });

    render(<HomeScreen {...props} />);

    await waitFor(() => {
      expect(screen.queryByTestId('Test city')).not.toBeNull();
    });
    const cityItem = screen.queryByTestId('Test city');
    if (cityItem) {
      fireEvent.press(cityItem);
      expect(props.navigation.navigate).toHaveBeenCalledWith('Details', {
        cityId: 111111,
      });
    }
  });
});
