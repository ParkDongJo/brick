const firestore = jest.fn(() => ({
  collection: jest.fn(() => ({
    get: jest.fn(() =>
      Promise.resolve({
        docs: [
          {
            id: 1,
            data: () => {
              return {title: 'test'};
            },
          },
        ],
      }),
    ),
  })),
}));

export default firestore;
