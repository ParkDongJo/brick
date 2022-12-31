import React from 'react';
import {View, Text} from 'react-native';
import {useQueryClient, MutationFunction} from '@tanstack/react-query';
import {useForm, Controller} from 'react-hook-form';
import {createOne} from '../../lib/Firebase';
import useTodo from '../../hooks/useTodo';
import {Todo} from '../../store/atoms/todo';
import styled from 'styled-components';
import moment from 'moment';
import BasicButton from '../atoms/BasicButton';
import BasicInput from '../atoms/BasicInput';

type FormData = {
  task: string;
};

const TodoInput: React.FC<Props> = props => {
  const queryClient = useQueryClient();
  const {addTaskCallback} = props;
  const {useMutaionTodo} = useTodo();
  const mutation = useMutaionTodo(queryClient, createOne as MutationFunction);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      task: '',
    },
  });

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
  const onPressAddTaskButton = (data: FormData) => {
    addTask(data.task);
    addTaskCallback();
  };

  return (
    <Container>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <BasicInput
            text={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholderText={'할 일을 입력해주세요.'}
          />
        )}
        name="task"
      />
      {errors.task && <Text>This is required.</Text>}
      <BasicButton
        title={'추가하기'}
        onPress={handleSubmit(onPressAddTaskButton)}
      />
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
