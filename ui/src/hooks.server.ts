import { redirect, type Handle } from '@sveltejs/kit';
import { getUser as authenticateUser } from './utils/getUser';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event.request);

	if (event.url.pathname.startsWith('/dashboard') || event.url.pathname.startsWith('/servers')) {
		if (!event.locals.user) throw redirect(303, '/api/discord/auth');
	}

	const response = await resolve(event);

	return response;
};
