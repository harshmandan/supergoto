/* eslint-disable @typescript-eslint/no-explicit-any */
import { goto } from '$app/navigation';
import * as devalue from 'devalue';

type SuperURL = string | URL;
type URLParam = 'search' | 'hash';
type SearchParams = Record<string, any> | URLSearchParams;

const paramSymbol: Record<URLParam, string> = {
	hash: '#',
	search: '?'
};

const notAllowedProtocols = ['javascript:', 'script:'];

interface SupergotoOptions {
	replaceState?: boolean;
	noScroll?: boolean;
	keepFocus?: boolean;
	state?: any;
	invalidateAll?: boolean;
	external?: boolean;
	preserveUrlForRedirection?: boolean;
	hashParams?: object;
	preserveHashParams?: boolean;
	searchParams?: SearchParams;
	preserveSearchParams?: boolean;
}

interface UpdateParamOptions {
	replace?: boolean;
}

function isExternal(url: SuperURL) {
	try {
		const u = new URL(url);
		return location.host !== u.host;
	} catch (e) {
		return false;
	}
}

function getPreservedUrl(url: SuperURL, type: URLParam) {
	if (typeof url === 'string') {
		return url + location[type];
	} else {
		url[type] = location[type];
		return url;
	}
}

function updateParams(url: SuperURL, type: URLParam, data: string) {
	if (typeof url === 'string') {
		return `${url}${paramSymbol[type]}${data}`;
	} else {
		url[type] = `${paramSymbol[type]}${location[type]}`;
		return url;
	}
}

function serializeHashData(url: SuperURL, data: object) {
	try {
		const hash = devalue.stringify(data);
		if (!hash) {
			console.warn('[Supergoto] Error while serializing hash data.');
			return url;
		}
		return updateParams(url, 'hash', hash);
	} catch (e) {
		console.warn('[Supergoto] Error while serializing hash data. More details: ', e);
		return url;
	}
}

function isProtocolSafe(url: SuperURL) {
	try {
		const u = new URL(url);
		return !notAllowedProtocols.includes(u.protocol);
	} catch (e) {
		return true;
	}
}

function serializeSearchParams(url: SuperURL, data: SearchParams) {
	try {
		const searchParams = new URLSearchParams(data).toString();
		if (!searchParams) {
			console.warn('[Supergoto] Error while adding search params.');
			return url;
		} else {
			return updateParams(url, 'search', searchParams);
		}
	} catch (e) {
		console.warn('[Supergoto] Error while adding search params. More details: ', e);
		return url;
	}
}

function addRedirectionSearchParam(url: SuperURL) {
	const redirectionParam = new URLSearchParams({
		redirectTo: `${location.origin}${location.pathname}`
	}).toString();
	return updateParams(url, 'search', redirectionParam);
}

export function supergoto(url: SuperURL, options?: SupergotoOptions) {
	try {
		if (!isProtocolSafe(url)) {
			throw new Error('Navigating to unsafe protocols is not allowed.');
		}
		if (isExternal(url) && options?.external) {
			throw new Error(
				'Navigating to an external URL is disabled by default. Use `supergoto(url, { external: true })`.'
			);
		}
		if (options?.preserveSearchParams) {
			url = getPreservedUrl(url, 'search');
		}
		if (options?.preserveHashParams) {
			url = getPreservedUrl(url, 'hash');
		}
		if (options?.searchParams) {
			url = serializeSearchParams(url, options.searchParams);
		}
		if (options?.hashParams) {
			url = serializeHashData(url, options.hashParams);
		}
		if (options?.preserveUrlForRedirection) {
			url = addRedirectionSearchParam(url);
		}
		goto(url, options);
	} catch (e) {
		console.error('[Supergoto] Something went wrong. More details: ', e);
	}
}

export function updateURLSearchParams(data: SearchParams, options?: UpdateParamOptions) {
	try {
		if (options?.replace) {
			location.search = new URLSearchParams(data).toString();
		} else {
			const existingSearchParams = getURLSearchParams();
			location.search = new URLSearchParams({
				...existingSearchParams,
				...data
			}).toString();
		}
	} catch (e) {
		console.warn('[Supergoto] Error while updating search params. More details', e);
	}
}

/**
 * @param {object} data - Javascript object to serialize
 * @param {boolean=} [options.replace] - Clear previous hash params and replace it with new data
 */
export function updateURLHashParams(data: object, options?: UpdateParamOptions) {
	try {
		const existingHashData = getParsedHashParams();
		const newHashData = devalue.stringify({
			...(!options?.replace && { ...existingHashData }),
			...data
		});
		location.hash = `#${newHashData}`;
	} catch (e) {
		console.warn('[Supergoto] Error while serializing hash data. More details', e);
	}
}

export function getParsedHashParams(): object {
	if (!location.hash) return {};
	return devalue.parse(decodeURI(location.hash.substring(1)));
}

export function getURLSearchParams(): Record<string, any> {
	if (!location.search) return {};
	return Object.fromEntries(new URLSearchParams(location.search));
}
