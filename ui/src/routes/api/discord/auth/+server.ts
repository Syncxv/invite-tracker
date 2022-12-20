import type { RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';
dotenv.config();
const DISCORD_CLIENT_ID = process.env.CLIENT_ID;
const DISCORD_REDIRECT_URI = process.env.REDIRECT_URL!;
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
	DISCORD_REDIRECT_URI
)}&response_type=code&scope=identify%20email%20guilds`;

export const GET: RequestHandler = async () => {
	return new Response(DISCORD_ENDPOINT, { headers: { location: DISCORD_ENDPOINT }, status: 302 });
};
