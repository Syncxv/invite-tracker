export const DISCORD_API_URL = 'https://discord.com/api/v9';
export const req = async (path: string, props: RequestInit) => {
	return await await fetch(`${DISCORD_API_URL}${path}`, { ...props });
};
