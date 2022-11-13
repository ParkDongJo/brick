import {fireEvent, render} from '@testing-library/react-native';
import TodoRow from './TodoRow';
import TestIds from '../lib/TestIds';

describe('TodoRow', () => {
  const mockClickRowHandler = jest.fn();
  const mockClickDeleteHandler = jest.fn();

  function renderTodoRow({title}: {title: string}) {
    return render(
      <TodoRow
        title={title}
        onPressCheck={mockClickRowHandler}
        onPressDelete={mockClickDeleteHandler}
      />,
    );
  }

  it('when checked the todo row', () => {
    const {queryByTestId, getByTestId} = renderTodoRow({title: 'TDD 하기'});

    const iconEl = queryByTestId(TestIds.TODOROW_SHOW_CHECKICON);
    const touchAbleEl = getByTestId(TestIds.TODOROW_TOUCH_ROW);
    expect(iconEl).not.toBeTruthy();

    fireEvent.press(touchAbleEl);

    expect(mockClickRowHandler).toBeCalled();
    expect(getByTestId(TestIds.TODOROW_SHOW_CHECKICON)).toBeTruthy();

    fireEvent.press(touchAbleEl);

    expect(mockClickRowHandler).toBeCalled();
    expect(queryByTestId(TestIds.TODOROW_SHOW_CHECKICON)).not.toBeTruthy();
  });

  it('when deleted the todo row', () => {
    const {getByText} = renderTodoRow({title: 'TDD 하기'});
    const button = getByText('삭제');
    fireEvent.press(button);

    expect(mockClickDeleteHandler).toBeCalled();
  });
});
