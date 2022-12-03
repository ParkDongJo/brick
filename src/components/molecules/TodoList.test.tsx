import React from 'react';
import {fireEvent, render, within} from '@testing-library/react-native';
jest.mock('@tanstack/react-query');
import {useMutation} from '@tanstack/react-query';
import TodoList from './TodoList';
import {Todo} from '../../store/atoms/todo';
import todos from '../../../fixtures/todos';
import TestIds from '../../lib/TestIds';

describe('TodoList', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    useMutation.mockImplementation(() => ({
      mutate: mockMutate,
    }));
  });

  function renderTodoList(todos: Todo[]) {
    return render(<TodoList todos={todos} />);
  }

  it('when render todos', () => {
    const {getByRole, rerender} = renderTodoList(todos as unknown as Todo[]);
    const list = getByRole('list');
    const {getAllByLabelText} = within(list);

    expect(getAllByLabelText('listitem')).toHaveLength(2);

    rerender(<TodoList todos={[todos[0] as unknown as Todo]} />);

    expect(getAllByLabelText('listitem')).toHaveLength(1);
    expect(useMutation).toBeCalled();
  });

  it('when todos is empty', () => {
    const screen = renderTodoList([]);
    expect(screen.getByText('Todo가 없습니다.')).toBeTruthy();
  });

  it('when touched the todo row', () => {
    const {getByRole} = renderTodoList([todos[0] as unknown as Todo]);
    const list = getByRole('list');
    const {getByTestId} = within(list);

    fireEvent.press(getByTestId(TestIds.TODOROW_TOUCH_ROW));

    expect(mockMutate).toBeCalled();
  });

  it('when clicked the delete button on todo row', () => {
    const {getByRole} = renderTodoList([todos[0] as unknown as Todo]);
    const list = getByRole('list');
    const {getByText} = within(list);

    fireEvent.press(getByText('삭제'));

    expect(mockMutate).toBeCalled();
  });
});
