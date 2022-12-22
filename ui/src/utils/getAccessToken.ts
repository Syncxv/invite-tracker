import { parse } from 'cookie';

export const getAccessToken = (request: Request) =>
	parse(request.headers.get('cookie') ?? '').access_token;
