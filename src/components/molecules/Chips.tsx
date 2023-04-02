import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from '@react-native-material/core';

const Chips: React.FC<Props> = props => {
  const {selected, onChange} = props;

  const handleChipPress = (value: Rank) => {
    onChange(value);
  };

  return (
    <View style={styles.container}>
      {chips.map(chip => (
        <Chip
          key={chip.value}
          color={selected === chip.value ? 'primary' : 'black'}
          label={chip.label}
          onPress={() => handleChipPress(chip.value)}
        />
      ))}
    </View>
  );
};
export default Chips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  chip: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  selectedChip: {
    backgroundColor: 'green',
  },
});

type Props = {
  selected: number;
  onChange(value: number): void;
};

export enum Rank {
  HIGH = 1,
  MIDDLE = 2,
  LOW = 3,
}
const chips = [
  {label: '높음', value: Rank.HIGH},
  {label: '중간', value: Rank.MIDDLE},
  {label: '낮음', value: Rank.LOW},
];
