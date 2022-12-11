import {Todo} from './todo';

export type Receiver = {
  id: string;
  name: string;
  email: string;
  comment: string;
  profileUrl: string;
  todos: Todo[];
};
