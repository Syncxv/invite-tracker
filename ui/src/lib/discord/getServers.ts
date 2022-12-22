import { BOT_API } from '.';
import type { APIUser } from '../types';
import type { APIGuild } from 'discord-api-types/v10';
export const getServers = async (userId: string, accessToken: string): Promise<APIGuild[]> =>
	await (
		await fetch(`${BOT_API}/api/v1/guilds/getConnectedGuilds/${userId}`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
	).json();
