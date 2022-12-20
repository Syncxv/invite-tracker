import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (data) => {
	return new Response(JSON.stringify(data));
};
