import {renderHook} from '@testing-library/react';
import {useQuery} from '@tanstack/react-query';
import useTodo from './useTodo';
import todos from '../../fixtures/todos';

jest.mock('@tanstack/react-query');

describe('useTodo', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useQuery.mockReturnValue({
      data: todos,
      isLoading: false,
      error: {},
    });
  });

  it('When run useQueryTodo', async () => {
    const {useQueryTodos} = useTodo();
    const {result} = renderHook(() => useQueryTodos());

    expect(result.current.data).toHaveLength(2);
  });
});
