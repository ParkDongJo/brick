import React from 'react';
jest.mock('@tanstack/react-query');
import {useMutation} from '@tanstack/react-query';
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
  // const mockAddTask = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Date.now = () => today;
    (moment().format as jest.Mock).mockReturnValue(today);
    (moment().add as jest.Mock).mockReturnValue(today + 5);
    useMutation.mockImplementation(() => ({
      mutate: mockMutate,
    }));
  });

  afterAll(() => {
    Date.now = RealDate;
  });

  // function renderTodoInput() {
  //   return render(
  //     <RecoilRoot>
  //       <RecoilObserver node={todosState} mockFn={mockAddTask} />
  //       <TodoInput addTaskCallback={mockAddTaskCallback} />
  //     </RecoilRoot>,
  //   );
  // }

  function renderTodoInput() {
    return render(<TodoInput addTaskCallback={mockAddTaskCallback} />);
  }

  it('when render TodoInput', async () => {
    const screen = renderTodoInput();
    expect(screen.getByPlaceholderText('할 일을 입력해주세요.')).toBeTruthy();

    expect(screen.getByText('추가하기')).toBeTruthy();
    expect(useMutation).toBeCalled();
  });

  it('when click "추가하기" button', () => {
    const screen = renderTodoInput();
    const button = screen.getByText('추가하기');
    fireEvent.press(button);

    expect(mockAddTaskCallback).toBeCalledTimes(1);
  });

  // it('when add task', () => {
  //   const screen = renderTodoInput();
  //   const button = screen.getByText('추가하기');
  //   fireEvent.press(button);

  //   expect(mockAddTask).toHaveBeenCalledTimes(2);
  //   expect(mockAddTask).toHaveBeenCalledWith([]);
  //   expect(mockAddTask).toHaveBeenCalledWith([
  //     {
  //       id: 'xxx',
  //       userId: 'test',
  //       title: '',
  //       isDone: false,
  //       isChecked: false,
  //       createdAt: moment().format(),
  //       deadlineAt: moment().add(5, 'days'),
  //     },
  //   ]);
  // });

  it('when add task', () => {
    const screen = renderTodoInput();
    const button = screen.getByText('추가하기');

    fireEvent.press(button);

    expect(mockMutate).toBeCalledWith({
      collection: 'todos',
      doc: {
        id: 'xxx',
        userId: 'test',
        title: '',
        isDone: false,
        isChecked: false,
        createdAt: moment().format(),
        deadlineAt: moment().add(5, 'days'),
      },
    });
  });
});
