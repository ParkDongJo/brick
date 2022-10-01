import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import ImageCard from './../components/ImageCard';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    subText: 'test version 3',
    imageUrl:
      'https://guidetoiceland.imgix.net/376280/x/0/3-2?ixlib=php-3.3.0&w=883',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    subText: 'test version 3',
    imageUrl:
      'https://guidetoiceland.imgix.net/4828/x/0/iiisezeeoei-i-2?ixlib=php-3.3.0&w=883',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    subText: 'test version 3',
    imageUrl:
      'https://guidetoiceland.imgix.net/351847/x/0/3-4?ixlib=php-3.3.0&w=883',
  },
];

const GridCards = () => {
  return (
    <SafeAreaView>
      <FlatList
        style={{backgroundColor: 'red'}}
        data={DATA}
        renderItem={(item: Card) => {
          return (
            <ImageCard
              title={item.title}
              subText={item.subText}
              imageUrl={item.imageUrl}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
export default GridCards;

type Card = {
  id: string;
  title: string;
  subText: string;
  imageUrl: string;
};
