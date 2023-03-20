export const ssr = false;
export const prerender = false;

export type PageData = {
	short: string;
};

export const load = ({ params }): PageData => {
	return {
		short: params.slug
	};
};
