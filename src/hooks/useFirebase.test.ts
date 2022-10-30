import {renderHook} from '@testing-library/react-hooks';
import useFirebase from './useFirebase';
jest.mock('@react-native-firebase/firestore');

describe('useFirebase', () => {
  beforeEach(() => {});
  test('fetchAll firestore', async () => {
    const {result} = renderHook(() => useFirebase());

    const todos = await result.current.fetchAll('todos');
    expect(todos[0].title).toBe('test');
  });

  test('fetchOne firestore', async () => {
    const {result} = renderHook(() => useFirebase());

    const todo = await result.current.fetchOne({
      collection: 'todos',
      docId: 'xxx',
    });
    expect(todo.title).toBe('test');
  });

  test('create firestore', async () => {
    const {result} = renderHook(() => useFirebase());
    const resp = await result.current.create({
      collection: 'todos',
      doc: {
        userId: 'xx',
        title: 'xx',
        isDone: true,
        isChecked: true,
        createdAt: new Date(),
        deadlineAt: new Date(),
      },
    });
    expect(resp).not.toBeNull();
    expect(resp).not.toBeUndefined();
  });

  test('update firestore', async () => {
    const {result} = renderHook(() => useFirebase());
    const resp = await result.current.update({
      collection: 'todos',
      docId: 'xxx',
      data: {
        title: 'xxx',
      },
    });
    expect(resp).not.toBeNull();
    expect(resp).not.toBeUndefined();
  });

  test('remove firestore', async () => {
    const {result} = renderHook(() => useFirebase());

    const resp = await result.current.remove({
      collection: 'todos',
      docId: 'xxx',
    });
    expect(resp).not.toBeNull();
    expect(resp).not.toBeUndefined();
  });
});
