import React from 'react';
// import {renderHook} from '@testing-library/react-hooks';
// import {renderHook} from '@testing-library/react-native';
import {renderHook, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useTodo from './useTodo';

describe('useTodo', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    return ({children}) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  it('When run useQueryTodo', async () => {
    const {useQueryTodos} = useTodo();
    const {result} = renderHook(() => useQueryTodos(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(2);
  });
});
