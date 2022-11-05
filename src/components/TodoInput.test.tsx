import React from 'react';
import {RecoilRoot} from 'recoil';
import RecoilObserver from './../store/RecoilObserver';
import {todosState, Todo} from './../store/atoms/todos';
import {fireEvent, render} from '@testing-library/react-native';
import TodoInput from './TodoInput';
import moment from 'moment';

jest.mock('moment', () => {
  const oMoment = jest.requireActual('moment');
  const mm = {
    format: jest.fn(),
    add: jest.fn(),
  };
  const mMoment = jest.fn(() => mm);
  for (let prop in oMoment) {
    mMoment[prop] = oMoment[prop];
  }
  return mMoment;
});

describe('TodoInput', () => {
  const today = 20110101;
  const RealDate = Date.now;
  const mockAddTaskCallback = jest.fn();
  const mockAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Date.now = () => today;
  });

  afterAll(() => {
    Date.now = RealDate;
  });

  function renderTodoInput() {
    return render(
      <RecoilRoot>
        <RecoilObserver node={todosState} mockFn={mockAddTask} />
        <TodoInput addTaskCallback={mockAddTaskCallback} />
      </RecoilRoot>,
    );
  }

  it('when render TodoInput', async () => {
    const screen = renderTodoInput();
    expect(screen.getByPlaceholderText('할 일을 입력해주세요.')).toBeTruthy();

    expect(screen.getByText('추가하기')).toBeTruthy();
  });

  it('when click "추가하기" button', () => {
    const screen = renderTodoInput();
    const button = screen.getByText('추가하기');
    fireEvent.press(button);

    expect(mockAddTaskCallback).toBeCalledTimes(1);
  });

  it('when add task', () => {
    (moment().format as jest.Mock).mockReturnValue(today);
    (moment().add as jest.Mock).mockReturnValue(20110101 + 5);
    const screen = renderTodoInput();
    const button = screen.getByText('추가하기');
    fireEvent.press(button);

    expect(mockAddTask).toHaveBeenCalledTimes(2);
    expect(mockAddTask).toHaveBeenCalledWith([]);
    expect(mockAddTask).toHaveBeenCalledWith([
      {
        id: 'xxx',
        userId: 'test',
        title: '',
        isDone: false,
        isChecked: false,
        createdAt: moment().format(),
        deadlineAt: moment().add(5, 'days'),
      },
    ]);
  });
});
