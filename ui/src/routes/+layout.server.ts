import type { LayoutServerLoad } from './$types';
import { getUser } from '../utils/getUser';
export const load: LayoutServerLoad = async ({ request, setHeaders, locals }) => {
	return {
		user: locals.user
	};
};
