import { URLS } from './configs';
import { CatsResponse, DogsResponse, FoxResponse } from './types';

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

export async function fetchDogImages() {
	const res = await fetch(URLS.dogs);
	const data: DogsResponse = await res.json();
	return data.message;
}
