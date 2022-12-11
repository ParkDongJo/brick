import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useQuery} from '@tanstack/react-query';
import useUser, {USER_QUERY_KEY} from './useUser';
import receivers from '../../fixtures/receivers';

describe('useUser', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useQuery.mockReturnValue({
      data: receivers,
      isLoading: false,
      error: {},
    });
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

  it('When run useQueryReceivers', async () => {
    const {useQueryReceivers} = useUser();
    const {result} = renderHook(
      () => useQueryReceivers(USER_QUERY_KEY.RECEIVERS),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(2);
  });
});
