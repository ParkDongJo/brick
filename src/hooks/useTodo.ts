import {UseMutationResult} from '@tanstack/react-query';
import moment from 'moment';

import {Todo} from '../store/atoms/todo';
import {FormData} from '../types';

const useTodo = (mutation?: UseMutationResult) => {
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
  const addTodo = (newTask: FormData) => {
    mutation?.mutate({
      collection: 'todos',
      doc: {
        id: 'xxx',
        userId: 'test',
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
  };
};
export default useTodo;
