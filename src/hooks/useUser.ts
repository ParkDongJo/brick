import {UseMutationResult, useQueries} from '@tanstack/react-query';
import moment from 'moment';
import {FormData, User} from '../types';
import useAuth from './useAuth';
import {fetchAllByWhere, WhereQuery} from '../lib/Firebase';
import {QUERY_KEY} from '../hooks/useQueries';

const useUser = (mutation?: UseMutationResult) => {
  const {getUid} = useAuth();

  const getUsers = async (where: WhereQuery) => {
    const data = (await fetchAllByWhere({
      collection: 'users',
      where,
    })) as unknown as User[];
    return data;
  };
  const addUser = (data: User) => {
    mutation?.mutate({
      collection: 'users',
      docKey: getUid(),
      data: data,
    });
  };

  return {
    getUsers,
    addUser,
  };
};
export default useUser;
