import { goto } from '$app/navigation';

interface SupergotoOptions {
	replaceState?: boolean;
	noScroll?: boolean;
	keepFocus?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state?: any;
	invalidateAll?: boolean;
	external?: boolean;
	hashParams?: object;
	searchParams?: object | URLSearchParams;
}

export default function (url: string | URL, options?: SupergotoOptions) {
	goto(url, options);
}

export function updateURLSearchParams(data: SupergotoOptions['searchParams']) {
	console.log(data);
}

export function updateURLHashParams(data: SupergotoOptions['hashParams']) {
	console.log(data);
}

export function getHashParams() {
	//
}
