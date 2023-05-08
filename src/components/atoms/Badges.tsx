import React from 'react';
import {Badge} from '@react-native-material/core';

const Badges: React.FC<Props> = props => {
  const {labels} = props;

  return (
    <>
      {labels.map(label => (
        <Badge key={label} label={label} color={'primary'} />
      ))}
    </>
  );
};

export default Badges;

type Props = {
  labels: string[];
};
