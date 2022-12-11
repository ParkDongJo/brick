import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import useUser, {USER_QUERY_KEY} from './useUser';
import receivers from '../../fixtures/receivers';

jest.mock('@tanstack/react-query');

describe('useUser', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useQuery.mockReturnValue({
      data: receivers,
      isLoading: false,
      error: {},
    });
  });

  it('When run useQueryReceivers', async () => {
    const {useQueryReceivers} = useUser();
    const {result} = renderHook(() =>
      useQueryReceivers(USER_QUERY_KEY.RECEIVERS),
    );

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(2);
  });
});
