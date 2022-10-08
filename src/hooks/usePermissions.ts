import {
  check,
  request,
  checkMultiple,
  requestMultiple,
  Permission,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const usePermissions = () => {
  const checkPermission = async (permission: Permission) => {
    try {
      const result = await check(permission);
      return result;
    } catch (err) {
      console.warn(err);
    }
  };
  const checkPermissions = async (
    permissions: Permission[],
  ): Promise<PermissionStatus[] | undefined> => {
    try {
      const permissionsObj = await checkMultiple(permissions);
      return Object.values(permissionsObj);
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  };

  const requestPermission = async (permission: Permission) => {
    try {
      let result = await check(permission);
      if (result !== RESULTS.GRANTED) {
        result = await request(permission);
      }
      if (result !== 'granted') {
        return false;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const requestPermissions = async (
    permissions: Permission[],
  ): Promise<boolean> => {
    try {
      const permissionsObj = await requestMultiple(permissions);
      return Object.values(permissionsObj).every(permission => {
        if (permission !== 'granted') {
          return false;
        }
        return true;
      });
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const isGranted = (permissionStatus?: PermissionStatus[]): boolean =>
    !!permissionStatus?.every(status => status === 'granted');
  const isContainBlocked = (permissionStatus?: PermissionStatus[]): boolean =>
    !!permissionStatus?.some(status => status === 'blocked');

  return {
    openSettings,
    isGranted,
    isContainBlocked,
    checkPermission,
    checkPermissions,
    requestPermission,
    requestPermissions,
  };
};
export default usePermissions;

type Props = {};
export type PermissionStatus =
  | 'unavailable'
  | 'blocked'
  | 'denied'
  | 'granted'
  | 'limited';
