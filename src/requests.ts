import { URLS } from './configs';
import { CatsResponse, FoxResponse } from './types';

export async function fetchFoxImageUrl() {
	const res = await fetch(URLS.fox);
	const data: FoxResponse = await res.json();
	return data.image;
}

export async function fetchCatImages() {
	const res = await fetch(URLS.cats);
	const data: CatsResponse = await res.json();
	return data.map((img) => img.url);
}
