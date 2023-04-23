import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Todo} from '../types';

export type FirestoreDocumentData =
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

export type WhereQuery = {
  field: string;
  operation: WhereFilterOp;
  value: string | number | boolean;
};
type WhereFilterOp =
  | '<'
  | '<='
  | '=='
  | '>'
  | '>='
  | '!='
  | 'array-contains'
  | 'array-contains-any'
  | 'in'
  | 'not-in';

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

    return docSnapshot.data() || {};
  } catch (err) {
    return null;
  }
};

export const fetchAllByWhere = async ({
  collection,
  where: {field, operation, value},
}: {
  collection: string;
  where: WhereQuery;
}) => {
  try {
    const snapshot = await firestore()
      .collection(collection)
      .where(field, operation, value)
      .get();

    return snapshot.docs.map(data => data.data());
  } catch (err) {
    return [];
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
