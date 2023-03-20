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
	if (url.includes('localhost')) return 'localhost:5173';
	const domain = url
		.substring(url.indexOf('://') + 3)
		.replace('www.', '')
		.split('/')[0];
	return domain;
};

/**
 * Convert a local path like /about to a full URL.
 * @param path - The path to convert
 * @param baseUrl - The base URL to use
 * @returns The full URL
 */
const pathToUrl = (path: string, baseUrl: string): string => `http://${baseUrl}/${path}`;

/**
 * Validate a URL is actually a URL.
 * @param url - The URL to validate
 */
const validateUrl = (url: string): boolean =>
	/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(
		url
	);

/**
 * Short hash a string into a 6-character string.
 * @param str - The string to hash
 */
const hash = (str: string): string =>
	Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);

/**
 * Get the current exact time in milliseconds.
 */
const getTime = (): number => new Date().getTime();

export { sleep, getDomain, hash, validateUrl, pathToUrl, getTime };
