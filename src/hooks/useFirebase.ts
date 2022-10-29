import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export type FirestoreDocumentData =
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

const useFirebase = () => {
  const fetch = async (collection: string) => {
    try {
      const snapshot = await firestore().collection(collection).get();
      return snapshot.docs.map(data => ({id: data.id, ...data.data()}));
    } catch (err) {
      return [];
    }
  };
  const create = () => {};
  const update = () => {};
  const remove = () => {};
  return {
    fetch,
    create,
    update,
    remove,
  };
};
export default useFirebase;
