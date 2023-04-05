import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import {Todo} from '../store/atoms/todo';
import {User} from '../store/atoms/users';
import {
  fetchOne,
  fetchAll,
  createOne,
  updateOne,
  removeOne,
} from '../lib/Firebase';

export const QUERY_KEY = {
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
    useQueryUsers: (key: typeof QUERY_KEY.USERS) => {
      const {userId} = getMe();
      return useQuery<User[]>([key], {
        queryFn: () =>
          fetchOne({collection: key, docId: userId}) as Promise<User[]>,
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
