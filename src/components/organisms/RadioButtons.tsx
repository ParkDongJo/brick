import React, {useState} from 'react';
import {View, Button} from 'react-native';
import styled from 'styled-components';

const RadioButtons: React.FC<Props> = ({
  defaultValue = undefined,
  datas,
  onSelect,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleButtonPress = value => {
    setSelected(value === selected ? defaultValue : value);
    onSelect?.(value);
  };

  return (
    <>
      {datas.map((data, index) => {
        const {title, value} = data;
        return (
          <Button
            key={index}
            title={title}
            onPress={() => handleButtonPress(value)}
            color={value === selected ? 'blue' : 'gray'}
          />
        );
      })}
    </>
  );
};

export default RadioButtons;

type Props = {
  defaultValue?: string | number;
  datas: Radio[];
  onSelect?(value: string | number): void;
};
type Radio = {
  title: string;
  value: string | number;
};
