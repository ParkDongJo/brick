import React, {useState} from 'react';
import {View} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import useTodo from '../../hooks/useTodo';
import styled from 'styled-components';
import moment from 'moment';
import BasicButton from '../atoms/BasicButton';
import BasicInput from '../atoms/BasicInput';

const TodoInput: React.FC<Props> = props => {
  const queryClient = useQueryClient();
  const {addTaskCallback} = props;
  const [task, setTask] = useState('');
  const {useMutaionTodo} = useTodo();
  const mutation = useMutaionTodo(queryClient);

  const addTask = (newTask: string) => {
    //
    const newTodo = {
      id: 'xxx',
      userId: 'test',
      title: newTask,
      isDone: false,
      isChecked: false,
      createdAt: moment().format(),
      deadlineAt: moment().add(5, 'days'),
    } as unknown as Todo;
    mutation.mutate({
      collection: 'todos',
      doc: newTodo,
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
