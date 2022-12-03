import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {waitFor} from '@testing-library/react';
jest.mock('@tanstack/react-query');
import {useQuery} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';
import TodosScreen, {Props} from './TodosScreen';
import RecoilObserver from '../../store/RecoilObserver';
import {todosState} from '../../store/atoms/todo';
import todos from '../../../fixtures/todos';

const createTestProps = (props: Object) => ({
  navigation: {
    state: {params: {}},
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn(),
    setOptions: jest.fn(),
  },
  ...props,
});

describe('TodosScreen render', () => {
  let props = {};
  const mockSetTodosFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useQuery.mockReturnValue({
      data: todos,
      isLoading: false,
      error: {},
    });
  });

  function renderMainScreen(temprops: Props) {
    return (
      <RecoilRoot>
        <RecoilObserver node={todosState} mockFn={mockSetTodosFn} />
        <TodosScreen {...temprops} />
      </RecoilRoot>
    );
  }

  beforeEach(() => {
    props = createTestProps({});
    jest.useFakeTimers();
  });

  it('should render title Main Screen', async () => {
    const screen = render(renderMainScreen(props));
    const title = screen.getByText('Main Screen');
    await waitFor(async () => {
      expect(title).not.toBeNull();
    });
  });

  it('should render title Move to Detail', async () => {
    const screen = render(renderMainScreen(props));
    const title = screen.getByText('Move to Detail');
    await waitFor(async () => {
      expect(title).toBeTruthy();
    });
  });

  it('should render list', async () => {
    const screen = render(renderMainScreen(props));
    const title1 = screen.getByText('새벽 기상하기');
    const title2 = screen.getByText('새벽 공부하기');
    await waitFor(async () => {
      expect(title1).toBeTruthy();
      expect(title2).toBeTruthy();
    });
  });

  // it('At the time of the first mount', async () => {
  //   render(renderMainScreen(props));
  //   await waitFor(async () => {
  //     expect(mockSetTodosFn).toHaveBeenCalledTimes(2);
  //     expect(mockSetTodosFn).toHaveBeenCalledWith([]);
  //   });
  // });
});
