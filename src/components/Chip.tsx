import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {colorPallete} from '../resources/colors';

export interface ChipProps {
  children: JSX.Element | JSX.Element[];
}

const Chip: FC<ChipProps> = ({children}) => {
  return (
    <View style={styles.chipConatiner}>
      <Text style={styles.chipText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipConatiner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colorPallete.accent,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 12,
    color: colorPallete.light,
  },
});

export default Chip;
