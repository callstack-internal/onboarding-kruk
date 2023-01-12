import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorPallete} from '../resources/colors';

export interface WeatherCondListItemProps {
  title: string;
  value: JSX.Element | JSX.Element[];
}

const WeatherCondListItem = ({title, value}: WeatherCondListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default WeatherCondListItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colorPallete.dark,
  },
  title: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
    color: colorPallete.dark,
  },
});
