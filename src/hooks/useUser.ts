import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import {Receiver} from '../store/atoms/receiver';
import {fetchAll, createOne, updateOne, removeOne} from '../lib/Firebase';

export const USER_QUERY_KEY = {
  RECEIVERS: 'receivers',
};

const useUser = () => {
  return {
    useQueryUsers: (key: typeof USER_QUERY_KEY.RECEIVERS) =>
      useQuery<Receiver[]>([key], {
        queryFn: () => fetchAll(key) as Promise<Receiver[]>,
      }),
    useMutaionUser: (queryClient: QueryClient, fn: MutationFunction) =>
      useMutation({
        mutationFn: fn,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({queryKey: ['users']});
        },
      }),
  };
};
export default useUser;

type MutationFn = typeof createOne | typeof updateOne | typeof removeOne;
