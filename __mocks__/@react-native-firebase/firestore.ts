const firestore = jest.fn(() => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          id: 1,
          data: () => {
            return {title: 'test'};
          },
        }),
      ),
      update: jest.fn(() =>
        Promise.resolve({
          status: 200,
        }),
      ),
      delete: jest.fn(() => {
        return Promise.resolve({
          status: 200,
        });
      }),
    })),
    get: jest.fn(() =>
      Promise.resolve({
        docs: [
          {
            id: 1,
            data: () => {
              return {title: 'test'};
            },
          },
          {
            id: 2,
            data: () => {
              return {title: 'test2'};
            },
          },
        ],
      }),
    ),
    add: jest.fn(() =>
      Promise.resolve({
        status: 200,
      }),
    ),
    update: jest.fn(() =>
      Promise.resolve({
        status: 200,
      }),
    ),
    delete: jest.fn(() => {
      return Promise.resolve({
        status: 200,
      });
    }),
  })),
}));

export default firestore;
