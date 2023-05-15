import {Text, View, SectionList} from 'react-native';
import styled from 'styled-components';
import {Todo} from '../../types';
import TodoRow from '../atoms/TodoRow';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const TodoSections: React.FC<Props> = props => {
  const {datas} = props;
  console.log('dongjo', datas);
  const navigation = useNavigation();

  const onClickItem = (todo: Todo) => {
    navigation.navigate('TodoForm', {...todo});
  };

  return (
    <Container>
      <SectionList
        sections={datas}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TodoRow datas={item} onPressCheck={() => onClickItem(item)} />
        )}
        renderSectionHeader={({section: {title, data}}) => (
          <Head>
            <Title>{`${title}`}</Title>
          </Head>
        )}
      />
    </Container>
  );
};
export default TodoSections;

type Props = {
  datas: {title: string; data: Todo[]};
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #fff;
`;
const Head = styled(View)`
  width: 100%;
  padding: 20px 20px 10px 20px;
  flex-direction: row;
  align-items: ;
  background-color: #fff;
`;
const Title = styled(Text)`
  font-size: 17px;
  font-weight: bold;
`;
