import {
	collection,
	Firestore,
	type DocumentData,
	type QueryDocumentSnapshot
} from 'firebase/firestore';

/**
 * The type of each document in the links collection.
 */
type LinkDoc = {
	url: string;
	short: string;
};

/**
 * Ensures types are cast to generic type T when inputting and outputting data from Firebase.
 */
const firebaseTypeEnforcer = <T>() => ({
	toFirestore: (data: T) => data,
	fromFirestore: (snap: QueryDocumentSnapshot<DocumentData>) => snap.data() as T
});

/**
 * Gets a reference to a collection in Firebase that's strongly typed with generic type T.
 * @param collectionPath The path to the collection in Firebase.
 * @returns The strongly-typed collection reference.
 */
const firebaseRef = <T extends DocumentData>(collectionPath: string, db: Firestore) =>
	collection(db, collectionPath).withConverter(firebaseTypeEnforcer<T>());

export { firebaseRef, type LinkDoc };
