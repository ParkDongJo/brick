import React from 'react';
import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import {updateOne, removeOne} from '../../lib/Firebase';
import TodoRow from '../atoms/TodoRow';
import {Todo} from '../../store/atoms/todo';
import useQueries from '../../hooks/useQueries';
import moment from 'moment';

const TodoList: React.FC<Props> = props => {
  const todos = [
    {
      id: '1',
      userId: '1',
      coachId: '2',
      time: '9:00 AM',
      title: 'Finish Project',
      memo: 'Finish Project by 10:00 AM',
      category: '#work',
      isDone: false,
      isChecked: false,
      createdAt: moment(),
      deadlineAt: moment(),
    },
    {
      id: '2',
      userId: '1',
      coachId: '2',
      time: '2:00 PM',
      title: 'Go to Gym',
      memo: 'Go to Gym by 3:00 PM',
      category: '#helth',
      isDone: false,
      isChecked: false,
      createdAt: moment(),
      deadlineAt: moment(),
    },
    {
      id: '3',
      userId: '1',
      coachId: '2',
      time: '6:00 PM',
      title: 'Cook Dinner',
      memo: 'Cook Dinner by 7:00 PM',
      category: '#study',
      isDone: false,
      isChecked: false,
      createdAt: moment(),
      deadlineAt: moment(),
    },
  ];
  const queryClient = useQueryClient();
  const {useMutaionTodo} = useQueries();
  const updateMutation = useMutaionTodo(
    queryClient,
    updateOne as MutationFunction,
  );
  const removeMutation = useMutaionTodo(
    queryClient,
    removeOne as MutationFunction,
  );

  const onClickItem = (todo: Todo) => {
    updateMutation.mutate({
      collection: 'todos',
      docId: todo.id,
      data: {...todo, isChecked: true},
    });
  };
  const onClickDeleteBtn = (todoId: string) => {
    removeMutation.mutate({
      collection: 'todos',
      docId: todoId,
    });
  };
  return (
    <Container>
      {todos.length ? (
        <FlatList
          data={todos}
          accessible={true}
          accessibilityRole={'list'}
          keyExtractor={todo => todo.id}
          renderItem={({item}: {item: Todo}) => (
            <TodoRow
              datas={item}
              onPressCheck={() => onClickItem(item)}
              onPressDelete={() => onClickDeleteBtn(item.id)}
            />
          )}
        />
      ) : (
        <Text>Todo가 없습니다.</Text>
      )}
    </Container>
  );
};
export default TodoList;

type Props = {
  todos: Todo[];
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
