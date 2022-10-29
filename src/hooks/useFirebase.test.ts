import {renderHook} from '@testing-library/react-hooks';
jest.mock('@react-native-firebase/firestore');
import useFirebase from './useFirebase';

describe('useFirebase', () => {
  beforeEach(() => {});
  test('fetch firestore', async () => {
    const {result} = renderHook(() => useFirebase());

    const todos = await result.current.fetch('todos');
    expect(todos[0].title).toBe('test');
  });
});
