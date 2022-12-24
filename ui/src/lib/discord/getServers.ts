import { BOT_API } from '.';
import type { Guild } from 'discord.js/typings';
export const getServers = async (userId: string, accessToken: string): Promise<Guild[]> =>
	await (
		await fetch(`${BOT_API}/api/v1/guilds/getConnectedGuilds/${userId}`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
	).json();
