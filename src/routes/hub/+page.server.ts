import { PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	throw redirect(302, '/'); // TEMP: redirect to home page
	return {
		pass: PASSWORD
	};
};
