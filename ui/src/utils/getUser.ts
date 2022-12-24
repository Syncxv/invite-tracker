import { request } from '@playwright/test';
import { parse } from 'cookie';
import type { APIUser } from 'discord.js';
import { DISCORD_API_URL } from '../lib/discord';

export const getUser = async (request: Request) => {
	let user: APIUser | null = null;

	const accessToken = parse(request.headers.get('cookie') ?? '').access_token;

	const req = await fetch(`${DISCORD_API_URL}/users/@me`, {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	const resUser = await req.json();
	if (resUser.id) user = resUser;

	return user;
};
