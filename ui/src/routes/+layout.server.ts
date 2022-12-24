import type { LayoutServerLoad } from './$types';
import { parse } from 'cookie';
import { DISCORD_API_URL } from '../lib/discord/req';
import type { APIUser } from '../lib/types';
export const load: LayoutServerLoad = async ({ request, setHeaders }) => {
	let user: APIUser | null = null;

	const accessToken = parse(request.headers.get('cookie') ?? '').access_token;

	const req = await fetch(`${DISCORD_API_URL}/users/@me`, {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	const resUser = await req.json();
	if (resUser.id) user = resUser;

	return {
		user
	};
};
