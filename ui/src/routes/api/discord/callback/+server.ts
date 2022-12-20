import type { RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';
dotenv.config();

const DISCORD_CLIENT_ID = process.env.CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.REDIRECT_URL!;

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	if (code == null) return new Response('bruh where is the code');

	const dataObj = {
		client_id: DISCORD_CLIENT_ID!,
		client_secret: DISCORD_CLIENT_SECRET!,
		grant_type: 'authorization_code',
		redirect_uri: DISCORD_REDIRECT_URI!,
		code,
		scope: 'identify email guilds'
	};

	// performing a Fetch request to Discord's token endpoint
	const request = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams(dataObj),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});
	const response = await request.json();

	return new Response(JSON.stringify(response));
};
