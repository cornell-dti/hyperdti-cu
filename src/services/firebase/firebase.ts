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
import { hash, validateUrl } from '$lib/util';

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
 * Checks if the link is already in the links collection.
 * @param link The link to check.
 */
const linkExists = async (link: string): Promise<boolean> => {
	const q = query(linksRef, where('url', '==', link));
	const querySnapshot = await getDocs(q);
	return !querySnapshot.empty;
};

/**
 * Checks if the short ID is already in the links collection.
 * @param short The short ID to check.
 */
const shortExists = async (short: string): Promise<boolean> => {
	const q = query(linksRef, where('short', '==', short));
	const querySnapshot = await getDocs(q);
	return !querySnapshot.empty;
};

/**
 * Adds a link to the links collection, and returns the shortened version of the link.
 * @param link The link to add to the links collection.
 */
const addLink = async (link: string): Promise<string> => {
	// if the link isn't valid, throw an error
	if (!validateUrl(link)) {
		throw new Error(`INVALID_LINK`);
	}

	// if the link already exists, return the shortened version of the link
	if (await linkExists(link)) {
		return await getShortFromLink(link);
	}

	// if the short ID already exists, generate a new one
	let short = '';
	do {
		short = hash(link);
	} while (await shortExists(short));

	// add the link to the links collection
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
	const q = query(linksRef, where('url', '==', link));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		throw new Error(`Link ${link} not found.`);
	}

	return querySnapshot.docs[0].data().short;
};

/**
 * Get the link of a shortened link from the links collection.
 * @param short The shortened ID which you want to find the link of.
 */
const getLinkFromShort = async (short: string): Promise<string> => {
	const q = query(linksRef, where('short', '==', short));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		throw new Error(`Link ${short} not found.`);
	}
	if (querySnapshot.size > 1) {
		throw new Error(`Multiple links found for ${short}.`);
	}

	return querySnapshot.docs[0].data().url;
};

export { addLink, getLinkFromShort };
