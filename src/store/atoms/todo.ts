import {atom} from 'recoil';
import moment from 'moment';

export const todosState = atom<Todo[]>({
  key: 'todos',
  default: [],
});

export type Todo = {
  id: string;
  userId: string;
  coachId: string;
  title: string;
  memo: string;
  tags: string;
  time: string;
  isLoop: boolean;
  isDone: boolean;
  isChecked: boolean;
  createdAt: moment.Moment;
  deadlineAt: moment.Moment;
};
