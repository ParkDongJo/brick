import {fireEvent, render, act, waitFor} from '@testing-library/react-native';
import TodoRow from './TodoRow';
import TestIds from '../lib/TestIds';

describe('TodoRow', () => {
  const clickHandler = jest.fn();

  function renderTodoRow({title}: {title: string}) {
    return render(<TodoRow title={title} onPress={clickHandler} />);
  }

  it('click todo row', async () => {
    const screen = renderTodoRow({title: 'TDD 하기'});

    const iconEl = screen.queryByTestId(TestIds.TODOROW_SHOW_CHECKICON);
    const touchAbleEl = screen.getByTestId(TestIds.TODOROW_CLICK_ROW);
    expect(iconEl).not.toBeTruthy();

    fireEvent.press(touchAbleEl);

    await waitFor(() => {
      expect(clickHandler).toBeCalledTimes(1);
      expect(screen.getByTestId(TestIds.TODOROW_SHOW_CHECKICON)).toBeTruthy();
    });
  });
});
