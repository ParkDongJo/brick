import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import BrickItem from './BrickItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const BrickItems = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={item => {
          console.log('dongjo item ', item);
          return <BrickItem title={item.title} />;
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
export default BrickItems;
