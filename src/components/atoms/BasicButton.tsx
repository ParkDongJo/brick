import React from 'react';
import {Button} from 'react-native';

const BasicButton: React.FC<Props> = ({title, onPress}) => {
  const handlePress = () => {
    onPress();
  };
  return <Button title={title} onPress={handlePress} />;
};
export default BasicButton;

type Props = {
  title: string;
  onPress(): void;
};
