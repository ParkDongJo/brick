import React from 'react';
import {FlatList, Text} from 'react-native';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import {updateOne, removeOne} from '../lib/Firebase';
import TodoRow from './TodoRow';
import {Todo} from '../store/atoms/todos';
import useTodo from './../hooks/useTodo';

const TodoList: React.FC<Props> = props => {
  const queryClient = useQueryClient();
  const {useMutaionTodo} = useTodo();
  const updateMutation = useMutaionTodo(
    queryClient,
    updateOne as MutationFunction,
  );
  const removeMutation = useMutaionTodo(
    queryClient,
    removeOne as MutationFunction,
  );

  const {todos} = props;
  const onClickItem = (todo: Todo) => {
    updateMutation.mutate({
      collection: 'todos',
      docId: todo.id,
      data: {...todo, isChecked: true},
    });
  };
  const onClickDeleteBtn = (todoId: number) => {
    removeMutation.mutate({
      collection: 'todos',
      docId: todoId,
    });
  };
  return (
    <>
      {todos.length ? (
        <FlatList
          data={todos}
          accessible={true}
          accessibilityRole={'list'}
          keyExtractor={todo => todo.id}
          renderItem={({item}: {item: Todo}) => (
            <TodoRow
              title={item.title}
              onPressCheck={() => onClickItem(item)}
              onPressDelete={() => onClickDeleteBtn(item.id)}
            />
          )}
        />
      ) : (
        <Text>Todo가 없습니다.</Text>
      )}
    </>
  );
};
export default TodoList;

type Props = {
  todos: Todo[];
};
