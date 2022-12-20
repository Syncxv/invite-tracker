import { redirect, type RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';
import type { DiscordAuthData } from '$lib/types';
dotenv.config();

const DISCORD_CLIENT_ID = process.env.CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.REDIRECT_URL!;

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	if (code == null) throw redirect(304, '/');

	const dataObj: DiscordAuthData = {
		client_id: DISCORD_CLIENT_ID!,
		client_secret: DISCORD_CLIENT_SECRET!,
		grant_type: 'authorization_code',
		redirect_uri: DISCORD_REDIRECT_URI!,
		code
	};

	// get the access token
	const request = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams(dataObj as any),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});
	const jsonRes = await request.json();

	if (jsonRes.error) {
		console.error(jsonRes);
		throw redirect(304, '/');
	}

	cookies.set('access_token', jsonRes.access_token, {
		path: '/',
		httpOnly: true,
		maxAge: jsonRes.expires_in
	});
	cookies.set('refresh_token', jsonRes.refresh_token, {
		path: '/',
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60 * 1000
	});

	return new Response(null, {
		headers: {
			location: '/'
		},
		status: 302
	});
};
