import type { Handle, HandleServerError } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) {
		locale.set(lang);
	}
	return resolve(event);
};

export const handleError: HandleServerError = ({ error }) => {
	const message = 'Error caught in [server-hooks]: ' + (error as any)?.message;
	console.error(message);
	return { message };
};
