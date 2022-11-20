import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {RecoilRoot} from 'recoil';
import {act} from 'react-test-renderer';
import {toastStateAtom} from '../store/atoms/global';
import RecoilObserver from '../store/RecoilObserver';
import useToast from './useToast';
import Toast from '../components/atoms/Toast';

describe('useToast', () => {
  const mockSetToastFn = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderToast() {
    return (
      <RecoilRoot>
        <RecoilObserver node={toastStateAtom} mockFn={mockSetToastFn} />
        <Toast />
      </RecoilRoot>
    );
  }
  it('whne run show', async () => {
    const {result, waitForNextUpdate} = renderHook(useToast, {
      wrapper: renderToast,
    });

    act(async () => {
      result.current.show('테스트');
      await waitForNextUpdate();
    });

    expect(mockSetToastFn).toHaveBeenCalledTimes(1);
    // await waitFor(async () => {
    //   expect(mockSetTodosFn).toHaveBeenCalledWith([]);
    // });
  });
});
