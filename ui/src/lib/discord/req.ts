import { DISCORD_API_URL } from ".";

export const req = async (path: string, props: RequestInit) => {
	return await await fetch(`${DISCORD_API_URL}${path}`, { ...props });
};
