import React, {useRef, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TodosStackScreensParamList} from '../lib/TodosStackScreens';
import LogoTitle from './../components/LogoTitle';
import AlertModal, {Handle as ModalHandle} from '../components/AlertModal';
import useTodo from './../hooks/useTodo';
import TodoList from './../components/TodoList';
import TodoInput from '../components/molecules/TodoInput';

const MainScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {useQueryTodos} = useTodo();
  const {isLoading, data} = useQueryTodos();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: _props => <LogoTitle />,
      headerRight: () => (
        <Button onPress={() => console.log('Test')} title="Update count" />
      ),
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text>Main Screen</Text>
      <TodoInput addTaskCallback={() => {}} />
      <TodoList todos={data || []} />
      <Button
        title={'Move to Detail'}
        onPress={() => navigation.navigate('Detail', {screenId: 1})}
      />
      <AlertModal ref={modalRef} />
    </Container>
  );
};
export default MainScreen;

type Props = {} & NativeStackScreenProps<TodosStackScreensParamList, 'Main'>;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
