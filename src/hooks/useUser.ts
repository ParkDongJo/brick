import {UseMutationResult} from '@tanstack/react-query';
import moment from 'moment';
import {User} from '../types';
import {fetchAllByWhere, WhereQuery} from '../lib/Firebase';

const useUser = (mutation?: UseMutationResult) => {
  const getUsers = async (where: WhereQuery) => {
    const data = (await fetchAllByWhere({
      collection: 'users',
      where,
    })) as unknown as User[];
    return data;
  };
  const addUser = (key: string, data: User) => {
    mutation?.mutate({
      collection: 'users',
      docKey: key,
      data: data,
    });
  };
  const createUser = (key: string, data: User) => {
    mutation?.mutate({
      collection: 'users',
      docKey: key,
      data: data,
    });
  };

  return {
    getUsers,
    addUser,
    createUser,
  };
};
export default useUser;
