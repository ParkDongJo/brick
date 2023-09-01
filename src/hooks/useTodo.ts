import {UseMutationResult} from '@tanstack/react-query';
import moment from 'moment';
import {FormData, Todo} from '../types';
import useAuth from './useAuth';

const useTodo = (mutation?: UseMutationResult) => {
  const {getUid} = useAuth();
  //A tag is a string of characters like "#study #work".
  // It extracts the words after # and turns them into an array of strings.
  //It returns the result.
  const convertTags = (tags: string): string[] => {
    const result = tags.match(/#[a-zA-Z0-9가-힣]+/g);
    if (!result) {
      return [];
    }
    return result.map(tag => tag.replace('#', ''));
  };
  const mergeTodoByTitle = (todos: Todo[]) => {
    return todos.reduce((acc, cur) => {
      const target = acc.find(item => item.title === cur.target.title);
      if (target) {
        target.data.push(cur);
      } else {
        acc.push({title: cur.target.title, data: [cur]});
      }
      return acc;
    }, [] as {title: string; data: Todo[]}[]);
  };
  const addTodo = (newTodo: FormData) => {
    const {} = newTodo;
    mutation?.mutate({
      collection: 'todos',
      docKey: getUid(),
      data: {
        id: 'xxx',
        userId: getUid(),
        managerId: getUid(),
        title: newTask,
        isDone: false,
        isChecked: false,
        createdAt: moment().format(),
        deadlineAt: moment().add(5, 'days'),
      } as unknown as Todo,
    });
  };
  return {
    addTodo,
    convertTags,
    mergeTodoByTitle,
  };
};
export default useTodo;
