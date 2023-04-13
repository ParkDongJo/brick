import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const useAuth = () => {
  const signInEmail = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
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
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const signUpEmail = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        user.sendEmailVerification();
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

  const getUid = () => {
    return auth().currentUser?.uid;
  };

  return {
    getUid,
    signInEmail,
    signOut,
    signInPhone,
    signUpEmail,
  };
};
export default useAuth;
export type AuthResponse = {
  isSuccess: boolean;
  msg: string;
  data?: FirebaseAuthTypes.User;
};
