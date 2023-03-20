/**
 * Put a thread to sleep for a given amount of time.
 * @param ms - The amount of time to sleep in milliseconds
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Get the domain from a URL.
 * @param url - The URL to get the domain from
 */
const getDomain = (url: string): string => {
	const domain = new URL(url).hostname;
	return domain.startsWith('www.') ? domain.slice(4) : domain;
};

/**
 * Convert a local path like /about to a full URL.
 * @param path - The path to convert
 * @param baseUrl - The base URL to use
 * @returns The full URL
 */
const pathToUrl = (path: string, baseUrl: string): string => {
	const url = new URL(path, baseUrl);
	return url.href;
};

/**
 * Validate a URL is actually a URL.
 * @param url - The URL to validate
 */
const validateUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * Short hash a string into a 6-character string.
 * @param str - The string to hash
 */
const hash = (str: string): string =>
	Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);

/**
 * Merge two arrays without duplicates using a custom comparator.
 */
const mergeArrays = <T>(arr1: T[], arr2: T[], comparator: (a: T, b: T) => boolean): T[] => {
	const merged = [...arr1];
	for (const item of arr2) {
		if (!merged.some((i) => comparator(i, item))) {
			merged.push(item);
		}
	}
	return merged;
};

export { sleep, getDomain, hash, validateUrl, pathToUrl };
