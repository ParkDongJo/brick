import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TodosStackScreensParamList} from '../lib/TodosStackScreens';
import LogoTitle from './../components/LogoTitle';
import AlertModal, {
  Handle as ModalHandle,
} from '../components/modals/AlertModal';
import useFirebase from './../hooks/useFirebase';

const MainScreen: React.FC<Props> = ({navigation}) => {
  const [todos, setTodos] = useState([]);

  const modalRef = useRef<ModalHandle>(null);
  const {fetch} = useFirebase();

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
      const _todos = await fetch('todos');
      setTodos(_todos);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Text>Main Screen</Text>
      {todos &&
        todos.map(todo => {
          return (
            <View key={todo.id}>
              <Text>{todo.title}</Text>
            </View>
          );
        })}
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
