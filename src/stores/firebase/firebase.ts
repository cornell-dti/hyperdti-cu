// Import Svelte store functions to hold Firebase context
import { readable, writable, type Subscriber } from 'svelte/store';

// Import Firebase Config
import firebaseConfig from '$lib/configs/firebase';
import { initializeApp } from 'firebase/app';
import { collection, doc, setDoc } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import {
	getDocs,
	getFirestore,
	query,
	QueryDocumentSnapshot,
	where,
	type DocumentData
} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { firebaseRef, type LinkDoc } from './types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// The Firebase SDK
const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// ========== Functions ==========

// Interact with the Firebase SDK
const linksRef = firebaseRef<LinkDoc>('links', db);

/**
 * Adds a link to the links collection, and returns the shortened version of the link.
 * @param link The link to add to the links collection.
 */
const addLink = async (link: string): Promise<string> => {
	const short: string =
		Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5); // TODO: replace this with a call to a Firebase Function
	await setDoc(doc(linksRef, short), {
		url: link,
		short: short
	});
	return short;
};

/**
 * Get the shortened version of a link from the links collection.
 * @param link The link which you want to find the shortened version of.
 */
const getShortFromLink = async (link: string): Promise<string> => {
	const q = query(linksRef, where('link', '==', link));
	const querySnapshot = await getDocs(q);

	return new Promise((resolve, reject) => {
		if (querySnapshot.empty) {
			reject(new Error(`Link ${link} not found.`));
		}
		resolve(querySnapshot.docs[0].data().short);
	});
};

/**
 * Get the link of a shortened link from the links collection.
 * @param short The shortened ID which you want to find the link of.
 */
const getLinkFromShort = async (short: string): Promise<string> => {
	const q = query(linksRef, where('short', '==', short));
	const querySnapshot = await getDocs(q);

	return new Promise((resolve, reject) => {
		if (querySnapshot.empty) {
			reject(new Error(`Link ${short} not found.`));
		}
		if (querySnapshot.size > 1) {
			reject(new Error(`Multiple links found for ${short}.`));
		}

		resolve(querySnapshot.docs[0].data().url);
	});
};

export { addLink, getShortFromLink, getLinkFromShort };
