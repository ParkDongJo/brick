import {renderHook} from '@testing-library/react';
import {useQuery} from '@tanstack/react-query';
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

    expect(result.current.data).toHaveLength(2);
  });
});
