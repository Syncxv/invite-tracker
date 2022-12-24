import { DISCORD_API_URL } from '../../lib/discord';
import { redirect } from '@sveltejs/kit';
import type { APIGuild, Guild } from 'discord.js';
import { getServers as getGuilds } from '../../lib/discord/getServers';
import { getAccessToken } from '../../utils/getAccessToken';
import type { PageServerLoad } from './$types';

export interface Server {
	id: string,
	name: string,
	icon: string | null,
	accronym: string,
	has_bot: boolean
}

export const load: PageServerLoad = async ({ parent, request }) => {
	const { user } = await parent();
	if (!user) throw redirect(300, '/api/discord/auth');
	const accessToken = getAccessToken(request);


	//TODO: bruh what is this clean this shit up
	const guildsWithBot = await getGuilds(user.id, accessToken);
	const normalGuilds: APIGuild[] = (await (await fetch(`${DISCORD_API_URL}/users/@me/guilds`, { headers: { authorization: `Bearer ${accessToken}` } })).json())
		.filter((server: APIGuild) => {
			if (server.owner) return true;
			return 20n & BigInt(server.permissions!)
		});

	console.log(normalGuilds);
	let mappedBruhs = guildsWithBot.map(({ id, name, icon, nameAcronym }): Server => ({ id, name, icon, accronym: nameAcronym as string, has_bot: true }))

	let mappedBruhs2 = normalGuilds.map(({ id, name, icon }): Server => ({ id, name, icon, accronym: ":|", has_bot: false }))


	return {
		guilds: [...mappedBruhs, ...mappedBruhs2].filter((m, i, self) => i === self.findIndex((t) => t.id === m.id)),
		user
	}
};
