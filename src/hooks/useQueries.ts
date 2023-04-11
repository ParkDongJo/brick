import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
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
  return {
    useQueryTodos: (uid?: string) => {
      if (!uid) {
        return {isLoading: false, data: []};
      }
      return useQuery<Todo[]>(['todos'], {
        queryFn: async () => {
          try {
            const snapshot = await firestore()
              .collection('todos')
              .doc(uid)
              .collection('days')
              .doc('2023-04-10')
              .collection('ids')
              .get();

            return snapshot.docs.map(data => ({
              ...data.data(),
            })) as Todo[];
          } catch (err) {
            return [];
          }
        },
      });
    },
    useMutaionTodo: (queryClient: QueryClient, fn: MutationFunction) =>
      useMutation({
        mutationFn: fn,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({queryKey: [QUERY_KEY.TODOS]});
        },
      }),
    useQueryUsers: (key: typeof QUERY_KEY.USERS, uid?: string) => {
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
    useQueryMe: (key: typeof QUERY_KEY.ME, myUid: string) => {
      if (!myUid) {
        return {isLoading: false, data: null};
      }
      return useQuery<User>([key], {
        queryFn: () =>
          fetchOne({collection: 'users', docId: myUid}) as Promise<User>,
      });
    },
  };
};
export default useQueries;
