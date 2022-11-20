import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const useAuth = () => {
  const signInEmail = async (
    email: string,
    password: string,
  ): Promise<ResponseSignIn> => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        return {isSuccess: true, msg: 'success', data: user};
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          return {
            isSuccess: false,
            msg: 'already used the auth',
            data: undefined,
          };
        }
        if (error.code === 'auth/invalid-email') {
          return {isSuccess: false, msg: 'invalid email', data: undefined};
        }
        return {isSuccess: false, msg: 'error', data: undefined};
      });
  };
  const signInPhone = async (phone: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phone);
  };
  const signOut = () => {};

  return {
    signInEmail,
    signOut,
    signInPhone,
  };
};
export default useAuth;
export type ResponseSignIn = {
  isSuccess: boolean;
  msg: string;
  data?: FirebaseAuthTypes.User;
};
