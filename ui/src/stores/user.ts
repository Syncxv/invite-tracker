import { writable } from 'svelte/store';

import type { APIUser } from 'discord-api-types/v10';

export const user = writable<APIUser | null>(null);
