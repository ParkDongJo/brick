import moment from 'moment';
import {Gender, Role} from './constants';

export type FormData = {
  title: string;
  memo: string;
  tags: string;
  time: string;
  isLoop: boolean;
  isDone: boolean;
  isChecked: boolean;
};

export type Target = {
  id: string;
  title: string;
};

export type Todo = {
  id: string;
  userId: string;
  managerId: string;
  target: Target;
  title: string;
  memo: string;
  tags: string;
  time: string;
  rank: number;
  groupKey: string; // 반복이면 해당 값이 들어감
  isDone: boolean;
  isChecked: boolean;
  createdAt: moment.Moment;
  deadlineAt: moment.Moment;
};

export type User = {
  uid: string;
  name: string;
  email: string;
  comment: string;
  profileUrl: string;
  avatar: string;
  role: Role;
  gender: Gender;
  managers: string[];
  runners: string[];
};
