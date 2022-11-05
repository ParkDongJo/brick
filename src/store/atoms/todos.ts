import {atom} from 'recoil';
import moment from 'moment';

export const todosState = atom<Todo[]>({
  key: 'todos',
  default: [],
});

export type Todo = {
  id: string;
  userId: string;
  title: string;
  isDone: boolean;
  isChecked: boolean;
  createdAt: moment.Moment;
  deadlineAt: moment.Moment;
};
