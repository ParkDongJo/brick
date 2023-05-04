const datas = {
  users: {
    key_user1: {
      name: 'charles',
      rolo: 'manager',
      email: 'dongjo@gmail.com',
      comment: 'he is my freind',
      profileUrl: 'https://dongjo.pro',
      runners: ['key_user2', 'key_user3'],
      managers: [],
    },
    key_user2: {
      name: 'charles',
      rolo: 'manager',
      email: 'dongjo@gmail.com',
      comment: 'he is my freind',
      profileUrl: 'https://dongjo.pro',
      runners: [],
      managers: ['key_user1'],
    },
    key_user3: {
      name: 'charles',
      rolo: 'manager',
      email: 'dongjo@gmail.com',
      comment: 'he is my freind',
      profileUrl: 'https://dongjo.pro',
      runners: [],
      managers: ['key_user1'],
    },
  },
  todos: {
    key_user1: {},
    key_user2: {
      '2023-04-06': [
        {
          id: '2023-04-06todo1',
          userId: 'key_user2',
          managerId: 'key_user1',
          title: 'test',
          memo: 'test',
          tags: '#work #study',
          time: '10:00',
          groupKey: '2023-04-06',
          rank: 1,
          routine: ['월', '화'],
          isDone: false,
          isChecked: false,
          createdAt: '2021-04-06',
          deadlineAt: '2023-04-06',
        },
        {
          id: '2023-04-06todo2',
          userId: 'key_user2',
          managerId: 'key_user1',
          title: 'test',
          memo: 'test',
          tags: '#work #study',
          time: '10:00',
          groupKey: null,
          rank: 3,
          routine: ['토', '일'],
          isDone: false,
          isChecked: false,
          createdAt: '2021-04-06',
          deadlineAt: '2023-04-06',
        },
      ],
      '2023-04-07': [
        {
          id: '2023-04-07todo1',
          userId: 'key_user2',
          managerId: 'key_user1',
          title: 'test',
          memo: 'test',
          tags: '#work #study',
          time: '10:00',
          groupKey: null,
          rank: 2,
          routine: [],
          isDone: false,
          isChecked: false,
          createdAt: '2021-04-06',
          deadlineAt: '2023-04-06',
        },
        {
          id: '2023-04-07todo2',
          userId: 'key_user2',
          managerId: 'key_user1',
          title: 'test',
          memo: 'test',
          tags: '#work #study',
          time: '10:00',
          groupKey: null,
          rank: 1,
          routine: ['월', '수', '목', '토', '일'],
          isDone: false,
          isChecked: false,
          createdAt: '2021-04-06',
          deadlineAt: '2023-04-06',
        },
      ],
    },
    key_user3: {},
  },
};
export default datas;
