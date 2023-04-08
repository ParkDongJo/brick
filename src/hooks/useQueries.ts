import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import {Todo, User} from '../types';
import useAuth from './useAuth';
import {
  fetchOne,
  fetchAll,
  fetchAllByWhere,
  WhereQuery,
  createOne,
  updateOne,
  removeOne,
} from '../lib/Firebase';

export const QUERY_KEY = {
  TODOS: 'todos',
  USERS: 'users',
  USERS_BY_WHERE: 'usersByWhere',
  ME: 'me',
};

const useQueries = () => {
  const {getUid} = useAuth();
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
      const uid = getUid();
      if (!uid) {
        return {isLoading: false, data: null};
      }
      return useQuery<User[]>([key], {
        queryFn: () =>
          fetchAllByWhere({
            collection: 'users',
            where: {
              field: 'managers',
              operation: 'array-contains',
              value: uid,
            },
          }) as Promise<User[]>,
      });
    },
    useQueryUsersByWhere: (key: typeof QUERY_KEY.USERS, where: WhereQuery) => {
      return useQuery<User[]>([key], {
        queryFn: () =>
          fetchAllByWhere({collection: key, where}) as Promise<User[]>,
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
    useQueryMe: (key: typeof QUERY_KEY.ME) => {
      const uid = getUid();
      if (!uid) {
        return {isLoading: false, data: null};
      }
      return useQuery<User>([key], {
        queryFn: () => fetchOne({collection: key, docId: uid}) as Promise<User>,
      });
    },
  };
};
export default useQueries;
