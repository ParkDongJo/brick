import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import {Todo} from '../store/atoms/todo';
import {Receiver} from '../store/atoms/receiver';
import {
  fetchOne,
  fetchAll,
  createOne,
  updateOne,
  removeOne,
} from '../lib/Firebase';

export const QUERY_KEY = {
  RECEIVERS: 'receivers',
  TODOS: 'todos',
  USERS: 'users',
};

const useQueries = () => {
  const getMe = () => ({userId: '111'});

  return {
    useQueryTodos: () =>
      useQuery<Todo[]>(['todos'], {
        queryFn: () => fetchAll('todos'),
      }),
    useMutaionTodo: (queryClient: QueryClient, fn: MutationFunction) =>
      useMutation({
        mutationFn: fn,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({queryKey: [QUERY_KEY.TODOS]});
        },
      }),
    useQueryReceivers: (key: typeof QUERY_KEY.RECEIVERS) => {
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
          queryClient.invalidateQueries({queryKey: [QUERY_KEY.USERS]});
        },
      }),
  };
};
export default useQueries;
