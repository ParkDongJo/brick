import {useQuery, useMutation} from '@tanstack/react-query';
import {Todo} from '../store/atoms/todos';
import {fetchAll, createOne} from '../lib/Firebase';

const useTodo = () => {
  return {
    useQueryTodos: () =>
      useQuery<Todo[]>(['todos'], {
        queryFn: () => fetchAll('todos'),
      }),
    useMutaionTodo: queryClient =>
      useMutation({
        mutationFn: createOne,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({queryKey: ['todos']});
        },
      }),
  };
};
export default useTodo;
