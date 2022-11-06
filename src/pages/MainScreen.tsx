import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {todosState, Todo} from '../store/atoms/todos';
import {TodosStackScreensParamList} from '../lib/TodosStackScreens';
import LogoTitle from './../components/LogoTitle';
import AlertModal, {Handle as ModalHandle} from '../components/AlertModal';
import useFirebase from './../hooks/useFirebase';
import TodoList from './../components/TodoList';
import TodoInput from '../components/TodoInput';

const MainScreen: React.FC<Props> = ({navigation}) => {
  const modalRef = useRef<ModalHandle>(null);
  const {fetchAll} = useFirebase();
  const [todos, setTodos] = useRecoilState<Todo[]>(todosState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: _props => <LogoTitle />,
      headerRight: () => (
        <Button onPress={() => console.log('Test')} title="Update count" />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const init = async () => {
      const _todos = (await fetchAll('todos')) as Todo[];
      setTodos([...todos, ..._todos]);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Text>Main Screen</Text>
      <TodoInput addTaskCallback={() => {}} />
      <TodoList todos={todos} />
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
