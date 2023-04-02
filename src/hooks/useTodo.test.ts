import {renderHook} from '@testing-library/react';
import {useQuery} from '@tanstack/react-query';
import useQueries from './useQueries';
import todos from '../../fixtures/todos';

jest.mock('@tanstack/react-query');

describe('useQueries', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useQuery.mockReturnValue({
      data: todos,
      isLoading: false,
      error: {},
    });
  });

  it('When run useQueryTodo', async () => {
    const {useQueryTodos} = useQueries();
    const {result} = renderHook(() => useQueryTodos());

    expect(result.current.data).toHaveLength(2);
  });
});
