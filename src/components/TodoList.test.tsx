import React from 'react';
import {render, within} from '@testing-library/react-native';
import TodoList, {Todo} from './TodoList';

describe('TodoList', () => {
  function renderTodoList(todos: Todo[]) {
    return render(<TodoList todos={todos} />);
  }

  it('when render todos', () => {
    const screen = renderTodoList([
      {
        userId: 'xxx',
        title: '새벽 기상하기',
        isDone: true,
        isChecked: true,
        createdAt: new Date(),
        deadlineAt: new Date(),
      },
      {
        userId: 'xxx',
        title: '새벽 공부하기',
        isDone: true,
        isChecked: true,
        createdAt: new Date(),
        deadlineAt: new Date(),
      },
    ] as Todo[]);

    const list = screen.getByRole('list');
    const {getAllByLabelText} = within(list);
    expect(getAllByLabelText('listitem')).toHaveLength(2);
  });

  it('when todos is empty', () => {
    const screen = renderTodoList([]);
    expect(screen.getByText('Todo가 없습니다.')).toBeTruthy();
  });
});
