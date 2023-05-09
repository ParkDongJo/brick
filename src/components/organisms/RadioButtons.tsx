import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import styled from 'styled-components';

const RadioButtons: React.FC<Props> = ({
  direct = 'column',
  defaultValue = undefined,
  datas,
  itemStyle,
  onSelect,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleButtonPress = value => {
    setSelected(value === selected ? defaultValue : value);
    onSelect?.(value);
  };

  const defaultStyle = {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
  };

  return (
    <Container direct={direct}>
      {datas.map((data, index) => {
        const {title, value} = data;
        return (
          <Pressable
            key={index}
            style={itemStyle || defaultStyle}
            onPress={() => handleButtonPress(value)}>
            <Text
              style={{
                fontSize: itemStyle ? 16 : 18,
                color: value === selected ? 'blue' : 'gray',
              }}>
              {title}
            </Text>
          </Pressable>
        );
      })}
    </Container>
  );
};

export default RadioButtons;

type Props = {
  direct?: 'row' | 'column';
  defaultValue?: string | number;
  datas: Radio[];
  itemStyle: {[key: string]: any};
  onSelect?(value: string | number): void;
};
type Radio = {
  title: string;
  value: string | number;
};

const Container = styled(View)<{direct: 'row' | 'column'}>`
  flex-direction: ${props => props.direct};
`;
