import {renderHook, act} from '@testing-library/react-hooks';
import useLoginForm from './useLoginForm';
import {FORM_TYPE} from '../components/molecules/LoginForm';

describe('useLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('when run validateEmail', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setEmail('dongjo@zigbang.com');
      await waitForNextUpdate();
    });
    expect(result.current.validateEmail()).toBe(true);

    await act(async () => {
      result.current.setEmail('dongjo.com');
      await waitForNextUpdate();
    });
    expect(result.current.validateEmail()).toBe(false);
  });

  it('when run validatePassword', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setPassword('aaa112@$');
      await waitForNextUpdate();
    });
    expect(result.current.validatePassword()).toBe(true);

    await act(async () => {
      result.current.setPassword('aa11');
      await waitForNextUpdate();
    });
    expect(result.current.validatePassword()).toBe(false);
  });

  it('when run validatePhone', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setPhone('010-2222-3333');
      await waitForNextUpdate();
    });
    expect(result.current.validatePhone()).toBe(true);

    await act(async () => {
      result.current.setPhone('010-2222-44');
      await waitForNextUpdate();
    });
    expect(result.current.validatePhone()).toBe(false);
  });

  it('when run validate', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setEmail('dongjo@zigbang.com');
      result.current.setPassword('aaa112@$');
      await waitForNextUpdate();
    });
    expect(result.current.validate(FORM_TYPE.email)).toBe(true);

    await act(async () => {
      result.current.setEmail('dongjo.com');
      await waitForNextUpdate();
    });

    expect(() => {
      result.current.validate(FORM_TYPE.email);
    }).toThrow();
  });
});
