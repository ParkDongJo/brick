import React, {useState} from 'react';
import {View, Button} from 'react-native';
import styled from 'styled-components';

const RadioButtons: React.FC<Props> = ({
  defaultValue = undefined,
  datas,
  onSelect,
  onCancel,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleButtonPress = value => {
    setSelected(value === selected ? defaultValue : value);
    onSelect?.(value);
  };
  const cancel = () => {
    onCancel?.();
  };

  return (
    <>
      <Header>
        <Button title="취소" onPress={cancel} />
      </Header>
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
  onCancel?(): void;
};
type Radio = {
  title: string;
  value: string | number;
};

const Header = styled(View)`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
`;
