import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  Image,
  GestureResponderEvent,
} from 'react-native';
import React, {useCallback} from 'react';
import FastImage from 'react-native-fast-image';

import {OWAvailableUnits} from '../types/OpenWeatherTypes';
import {colorPallete} from '../resources/colors';
import Chip from './Chip';

export interface WeatherListItemProps {
  title: string;
  temp: number;
  iconcode: string;
  units?: OWAvailableUnits;
  onPress: (id: string | number, event: GestureResponderEvent) => void;
  id: string | number;
}

function WeatherListItem({
  title,
  temp,
  units,
  iconcode,
  id,
  onPress,
}: WeatherListItemProps) {
  const onItemPress = useCallback<(event: GestureResponderEvent) => void>(
    (event: GestureResponderEvent) => {
      if (onPress) onPress(id, event);
    },
    [id, onPress],
  );
  return (
    <Pressable
      style={styles.container}
      onPress={onItemPress}
      accessibilityLabel={title}>
      <FastImage
        style={styles.image}
        source={{
          uri: `http://openweathermap.org/img/w/${iconcode}.png`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.mainContent}>
        <Text>{title}</Text>
        <Chip>
          <Text>{temp}</Text>
          {units === 'metric' ? <Text> &deg; C</Text> : <Text> &deg; F</Text>}
        </Chip>
      </View>
      <Text>&gt;</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colorPallete.dark,
  },
  mainContent: {
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {width: 24, height: 24},
});

export default WeatherListItem;
