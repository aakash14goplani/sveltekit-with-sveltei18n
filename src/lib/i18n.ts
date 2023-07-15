import { browser } from '$app/environment';
import { derived, get } from 'svelte/store';
import { init, register, locale } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./lang/en.json'));
register('hi', () => import('./lang/hi.json'));
register('fr', () => import('./lang/fr.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});

export function formatDate(date: string | number | Date, options: Intl.DateTimeFormatOptions) {
	return new Intl.DateTimeFormat(getLocaleForFormat(), options).format(new Date(date));
}

export function formatNumber(num: number) {
	return new Intl.NumberFormat(getLocaleForFormat()).format(num);
}

function getLocaleForFormat() {
	const selectedLocale = get(locale);
	switch (selectedLocale) {
		case 'en':
			return 'en-US';
		case 'fr':
			return 'fr-FR';
		case 'hi':
			return 'hi-IN';
		default:
			return 'en-US';
	}
}

export const isLocaleLoaded = derived(locale, ($locale) => typeof $locale === 'string');
