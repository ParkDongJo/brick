import moment from 'moment';

export type FormData = {
  title: string;
  memo: string;
  tags: string;
  time: string;
  isLoop: boolean;
  isDone: boolean;
  isChecked: boolean;
};

export type Todo = {
  id: string;
  userId: string;
  managerId: string;
  title: string;
  memo: string;
  tags: string;
  time: string;
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
  rolo: string;
  managers: string[];
  runners: string[];
};
