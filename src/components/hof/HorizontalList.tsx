import React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import styled from 'styled-components';

const HorizontalList: React.FC<Props> = props => {
  const {children, onPressAll} = props;

  return (
    <Container>
      <Header>
        <Text style={styles.headerTitle}>{'나의 파트너'}</Text>
        <Pressable onPress={onPressAll}>
          <Text style={styles.textButton}>{'더보기'}</Text>
        </Pressable>
      </Header>
      <List>{React.cloneElement(children, {isHorizontal: true})}</List>
    </Container>
  );
};
export default HorizontalList;

type Props = {
  children: React.ReactElement;
  onPressAddBtn: () => void;
  onPressAll: () => void;
};

const Container = styled(View)`
  width: 100%;
  flex-direction: column;
  background-color: #ffffff;
`;
const Header = styled(View)`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;
const List = styled(View)`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: 15,
    color: 'blue',
  },
});
