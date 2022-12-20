import type { RequestHandler } from '@sveltejs/kit';

import { CLIENT_ID, REDIRECT_URL } from '$env/static/private';
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
	REDIRECT_URL
)}&response_type=code&scope=identify%20email%20guilds`;

export const GET: RequestHandler = async () => {
	return new Response(DISCORD_ENDPOINT, { headers: { location: DISCORD_ENDPOINT }, status: 302 });
};
