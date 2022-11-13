import React, {useState} from 'react';
import {View} from 'react-native';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import {createOne} from '../../lib/Firebase';
import useTodo from '../../hooks/useTodo';
import {Todo} from './../../store/atoms/todos';
import styled from 'styled-components';
import moment from 'moment';
import BasicButton from '../atoms/BasicButton';
import BasicInput from '../atoms/BasicInput';

const TodoInput: React.FC<Props> = props => {
  const queryClient = useQueryClient();
  const {addTaskCallback} = props;
  const [task, setTask] = useState('');
  const {useMutaionTodo} = useTodo();
  const mutation = useMutaionTodo(queryClient, createOne as MutationFunction);

  const addTask = (newTask: string) => {
    mutation.mutate({
      collection: 'todos',
      doc: {
        id: 'xxx',
        userId: 'test',
        title: newTask,
        isDone: false,
        isChecked: false,
        createdAt: moment().format(),
        deadlineAt: moment().add(5, 'days'),
      } as unknown as Todo,
    });
  };
  const onPressAddTaskButton = () => {
    addTask(task);
    addTaskCallback();
  };

  return (
    <Container>
      <BasicInput
        text={task}
        setText={setTask}
        placeholderText={'할 일을 입력해주세요.'}
      />
      <BasicButton title={'추가하기'} onPress={onPressAddTaskButton} />
    </Container>
  );
};
export default TodoInput;

type Props = {
  addTaskCallback(): void;
};

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;
