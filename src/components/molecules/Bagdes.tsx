import React from 'react';
import {Badge} from '@react-native-material/core';

const Bagdes: React.FC<Props> = props => {
  const {labels} = props;

  return (
    <>
      {labels.map(label => (
        <Badge key={label} label={label} color={'primary'} />
      ))}
    </>
  );
};

export default Bagdes;

type Props = {
  labels: string[];
};
