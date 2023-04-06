import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Todo} from '../store/atoms/todo';

export type FirestoreDocumentData =
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

export const fetchAll = async (collection: string): Promise<any[]> => {
  try {
    const snapshot = await firestore().collection(collection).get();
    return snapshot.docs.map(data => ({
      id: data.id,
      ...data.data(),
    })) as any[];
  } catch (err) {
    return [];
  }
};

export const fetchOne = async ({
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

export const createOne = async ({
  collection,
  docKey,
  data,
}: {
  collection: string;
  docKey: string;
  data: Todo;
}) => {
  try {
    const resp = await firestore().collection(collection).doc(docKey).set(data);
    return resp;
  } catch (err) {
    return null;
  }
};

export const updateOne = async ({
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

export const removeOne = async ({
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
