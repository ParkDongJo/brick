import {atom} from 'recoil';
import {Todo} from '../../types';

export const todosState = atom<Todo[]>({
  key: 'todos',
  default: [],
});
