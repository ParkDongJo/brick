import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import HeaderScrollView from '../components/HeaderScrollView';
import HeaderImage from '../components/HeaderImage';

const ProfileScreen = () => {
  const renderList = () => {
    const views = [];
    for (let i = 0; i < 100; i++) {
      views.push(
        <View style={{backgroundColor: 'white'}}>
          <Text>{'테스트'}</Text>
        </View>,
      );
    }
    return views;
  };
  return (
    <HeaderScrollView
      header={<HeaderImage title={'테스트'} />}
      headerMinHeight={200}
      onScroll={() => {}}>
      {renderList()}
    </HeaderScrollView>
  );
};
export default ProfileScreen;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
