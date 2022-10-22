import React from 'react';
import {View, Text} from 'react-native';
import HeaderScrollView from '../components/HeaderScrollView';
import HeaderImage from '../components/HeaderImage';
import {HEADER_IMAGE_HEIGHT} from '../components/HeaderImage';

const DetailScreen = () => {
  const renderList = () => {
    const views = [];
    for (let i = 0; i < 100; i++) {
      views.push(
        <View key={i} style={{backgroundColor: 'white'}}>
          <Text>{'ITEM'}</Text>
        </View>,
      );
    }
    return views;
  };
  return (
    <HeaderScrollView
      header={<HeaderImage title={'TEST'} />}
      headerHeight={HEADER_IMAGE_HEIGHT}
      headerMinHeight={0}
      onScroll={() => {}}>
      {renderList()}
    </HeaderScrollView>
  );
};
export default DetailScreen;
