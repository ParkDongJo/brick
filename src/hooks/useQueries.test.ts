import {renderHook} from '@testing-library/react';
import {useQuery} from '@tanstack/react-query';
import useQueries, {QUERY_KEY} from './useQueries';
import users from '../../fixtures/users';

jest.mock('@tanstack/react-query');

describe('useQueries', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useQuery.mockReturnValue({
      data: users,
      isLoading: false,
      error: {},
    });
    // jest.useFakeTimers();
    // useQuery.mockReturnValue({
    //   data: todos,
    //   isLoading: false,
    //   error: {},
    // });
  });

  it('When run useQueryReceivers', async () => {
    const {useQueryUsers} = useQueries();
    const {result} = renderHook(() => useQueryUsers(QUERY_KEY.USERS));

    expect(result.current.data).toHaveLength(2);
  });

  it('When run useQueryTodo', async () => {
    const {useQueryTodos} = useQueries();
    const {result} = renderHook(() => useQueryTodos());

    expect(result.current.data).toHaveLength(2);
  });
});
