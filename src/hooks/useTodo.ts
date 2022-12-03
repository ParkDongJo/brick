import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import {Todo} from '../store/atoms/todo';
import {fetchAll, createOne, updateOne, removeOne} from '../lib/Firebase';

const useTodo = () => {
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
          queryClient.invalidateQueries({queryKey: ['todos']});
        },
      }),
  };
};
export default useTodo;

type MutationFn = typeof createOne | typeof updateOne | typeof removeOne;
