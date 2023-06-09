// Import Firebase Config
import firebaseConfig from '$lib/configs/firebase';
import { initializeApp } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { hash, validateUrl } from '$lib/util';
import { getDocs, getFirestore, query, where } from 'firebase/firestore';
import { firebaseRef, type LinkDoc } from './types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// The Firebase SDK
const db = getFirestore(app);

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
const addLink = async (link: string, customShort?: string): Promise<string> => {
	// 1. if the link isn't valid, throw an error
	if (!validateUrl(link)) {
		throw new Error(`INVALID_LINK`);
	}

	// 3. if the link already exists, return the shortened version of the link instead of adding it again
	const existsAlr = await linkExists(link);
	const isShort = customShort ? true : false;
	if (existsAlr && !isShort) {
		return await getShortFromLink(link);
	} else if (existsAlr && isShort) {
		throw new Error(`ALREADY_ALIASED`);
	}

	// 2. generate a short for the link, or throw an error if the custom one they provided already exists
	let short = '';
	if (customShort) {
		// if a custom short ID is provided, use that
		if (await shortExists(customShort)) {
			// as long as it doesn't already exist
			throw new Error(`CUSTOM_SHORT_EXISTS`);
		}
		short = customShort;
	} else {
		// otherwise, generate a new one
		do {
			short = hash(link);
		} while (await shortExists(short)); // as long as it doesn't already exist
	}

	// 4. add the link to the links collection
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

/**
 * Get all links from the links collection
 * @returns An array of all links in the links collection, sorted by timestamp
 * 					(oldest first).
 */
const getAllLinks = async (): Promise<LinkDoc[]> => {
	const querySnapshot = await getDocs(linksRef);
	const docList = querySnapshot.docs.map((doc) => doc.data());
	const sortedDocList = docList.sort((a, b) =>
		a.timestamp && b.timestamp ? a.timestamp - b.timestamp : 0
	);
	return sortedDocList;
};

export { addLink, getLinkFromShort, getAllLinks };
