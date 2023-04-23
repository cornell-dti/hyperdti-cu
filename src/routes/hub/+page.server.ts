import { PASSWORD } from '$env/static/private';

export const load = () => {
	return {
		pass: PASSWORD
	};
};
