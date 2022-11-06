import React from 'react';
import {FlatList, Text} from 'react-native';
import TodoRow from './TodoRow';
import {Todo} from '../store/atoms/todos';

const TodoList: React.FC<Props> = props => {
  const {todos} = props;
  const onClickItem = () => {};
  return (
    <>
      {todos.length ? (
        <FlatList
          data={todos}
          accessible={true}
          accessibilityRole={'list'}
          keyExtractor={todo => todo.id}
          renderItem={({item}: {item: Todo}) => (
            <TodoRow title={item.title} onPress={onClickItem} />
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
