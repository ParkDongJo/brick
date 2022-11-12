import React from 'react';
import moment from 'moment';
import {render, within} from '@testing-library/react-native';
import TodoList from './TodoList';
import {Todo} from '../store/atoms/todos';

describe('TodoList', () => {
  function renderTodoList(todos: Todo[]) {
    return render(<TodoList todos={todos} />);
  }

  it('when render todos', () => {
    const todos = [
      {
        userId: 'xxx',
        title: '새벽 기상하기',
        isDone: true,
        isChecked: true,
        createdAt: moment(),
        deadlineAt: moment(),
      },
      {
        userId: 'xxx',
        title: '새벽 공부하기',
        isDone: true,
        isChecked: true,
        createdAt: moment(),
        deadlineAt: moment(),
      },
    ] as Todo[];
    const {getByRole, rerender} = renderTodoList(todos);
    const list = getByRole('list');
    const {getAllByLabelText} = within(list);

    expect(getAllByLabelText('listitem')).toHaveLength(2);

    rerender(<TodoList todos={[todos[0]]} />);

    expect(getAllByLabelText('listitem')).toHaveLength(1);
  });

  it('when todos is empty', () => {
    const screen = renderTodoList([]);
    expect(screen.getByText('Todo가 없습니다.')).toBeTruthy();
  });
});
