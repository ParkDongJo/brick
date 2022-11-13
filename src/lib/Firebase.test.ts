import moment from 'moment';
import {fetchAll, fetchOne, createOne, updateOne, removeOne} from './Firebase';
jest.mock('@react-native-firebase/firestore');

describe('useFirebase', () => {
  beforeEach(() => {});
  test('fetchAll firestore', async () => {
    const todos = await fetchAll('todos');
    expect(todos[0].title).toBe('test');
  });

  test('fetchOne firestore', async () => {
    const todo = await fetchOne({
      collection: 'todos',
      docId: 'xxx',
    });
    expect(todo.title).toBe('test');
  });

  test('create firestore', async () => {
    const resp = await createOne({
      collection: 'todos',
      doc: {
        userId: 'xx',
        title: 'xx',
        isDone: true,
        isChecked: true,
        createdAt: moment(),
        deadlineAt: moment(),
      },
    });
    expect(resp).not.toBeNull();
    expect(resp).not.toBeUndefined();
  });

  test('update firestore', async () => {
    const resp = await updateOne({
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
    const resp = await removeOne({
      collection: 'todos',
      docId: 'xxx',
    });
    expect(resp).not.toBeNull();
    expect(resp).not.toBeUndefined();
  });
});
