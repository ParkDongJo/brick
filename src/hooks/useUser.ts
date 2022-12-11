import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import {Receiver} from '../store/atoms/receiver';
import {fetchOne, createOne, updateOne, removeOne} from '../lib/Firebase';

export const USER_QUERY_KEY = {
  RECEIVERS: 'receivers',
};

const useUser = () => {
  const getMe = () => ({userId: '111'});
  return {
    useQueryReceivers: (key: typeof USER_QUERY_KEY.RECEIVERS) => {
      const {userId} = getMe();
      return useQuery<Receiver[]>([key], {
        queryFn: () =>
          fetchOne({collection: key, docId: userId}) as Promise<Receiver[]>,
      });
    },
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
