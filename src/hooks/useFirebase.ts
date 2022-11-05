import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export type FirestoreDocumentData =
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

const useFirebase = () => {
  const fetchAll = async (collection: string) => {
    try {
      const snapshot = await firestore().collection(collection).get();
      return snapshot.docs.map(data => ({id: data.id, ...data.data()}));
    } catch (err) {
      return [];
    }
  };

  const fetchOne = async ({
    collection,
    docId,
  }: {
    collection: string;
    docId: string;
  }) => {
    try {
      const docSnapshot = await firestore()
        .collection(collection)
        .doc(docId)
        .get();

      if (docSnapshot.exists) {
        return null;
      }
      return docSnapshot.data() || {};
    } catch (err) {
      return null;
    }
  };

  const create = async ({
    collection,
    doc,
  }: {
    collection: string;
    doc: TodoDoc;
  }) => {
    try {
      const resp = await firestore().collection(collection).add(doc);
      return resp;
    } catch (err) {
      return null;
    }
  };

  const update = async ({
    collection,
    docId,
    data,
  }: {
    collection: string;
    docId: string;
    data: {[key: string]: string | number | boolean | typeof Date};
  }) => {
    try {
      const resp = await firestore()
        .collection(collection)
        .doc(docId)
        .update(data);
      return resp;
    } catch (err) {
      return null;
    }
  };

  const remove = async ({
    collection,
    docId,
  }: {
    collection: string;
    docId: string;
  }) => {
    try {
      const resp = await firestore().collection(collection).doc(docId).delete();
      return resp;
    } catch (err) {
      return null;
    }
  };

  return {
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
  };
};
export default useFirebase;

type TodoDoc = {
  userId: string;
  title: string;
  isDone: boolean;
  isChecked: boolean;
  createdAt: Date;
  deadlineAt: Date;
};
