import type { Handle } from '@sveltejs/kit';
import type { APIUser } from 'discord-api-types/v10';

import { DISCORD_API_URL } from '$lib/discord/req';

import { user as storeUser } from './stores/user';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const accessToken = event.cookies.get('access_token');

	console.log('HANDLE');

	if (!accessToken) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	// find the user based on the session
	console.log('setting discord user via access token..');
	const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
		headers: { Authorization: `Bearer ${event.cookies.get('access_token')}` }
	});

	// returns a discord user if JWT was valid
	const response: APIUser = await request.json();

	if (response.id) {
		storeUser.set(response);
	}

	// if `user` exists set `events.local`
	// if (user) {
	//   event.locals.user = user
	// }

	// load page as normal
	return await resolve(event);
};
