import React, {useState} from 'react';
import {View} from 'react-native';
import {useRecoilState} from 'recoil';
import {todosState, Todo} from './../store/atoms/todos';
import styled from 'styled-components';
import moment from 'moment';
import BasicButton from './common/BasicButton';
import BasicInput from './common/BasicInput';

const TodoInput: React.FC<Props> = props => {
  const {addTaskCallback} = props;
  const [todos, setTodos] = useRecoilState(todosState);
  const [task, setTask] = useState('');

  const addTask = (newTaask: string) => {
    //

    const newTodo = {
      id: 'xxx',
      userId: 'test',
      title: newTaask,
      isDone: false,
      isChecked: false,
      createdAt: moment().format(),
      deadlineAt: moment().add(5, 'days'),
    } as unknown as Todo;
    setTodos([newTodo, ...todos]);
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
