import { redirect } from '@sveltejs/kit';
import { getServers as getGuilds } from '../../lib/discord/getServers';
import { getAccessToken } from '../../utils/getAccessToken';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ parent, request }) => {
	const { user } = await parent();
	if (!user) throw redirect(300, '/');
	const accessToken = getAccessToken(request);

	const guilds = await getGuilds(user.id, accessToken);
	return {
		guilds,
		user
	};
};
