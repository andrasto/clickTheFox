import { URLS } from './configs';
import { CatsResponse, DogsResponse, FoxResponse } from './types';

export async function fetchFoxImageUrl() {
	try {
		const res = await fetch(URLS.fox);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}
		const data: FoxResponse = await res.json();
		return data.image;
	} catch (err) {
		console.log(
			'An error occoured during fetching the fox image url, fallback url will be used',
			err
		);
		return 'assets/fox-fallback.jpg';
	}
}

export async function fetchCatImageUrls() {
	try {
		const res = await fetch(URLS.cats);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}
		const data: CatsResponse = await res.json();
		// The endpoint doesn't support the limit query param, even though it's in their documentation
		data.splice(4);
		return data.map((img) => img.url);
	} catch (err) {
		console.log(
			'An error occoured during fetching cat image urls, fallback url will be used',
			err
		);
		return new Array<string>(4).fill('assets/cat-fallback.jpg');
	}
}

export async function fetchDogImageUrls() {
	try {
		const res = await fetch(URLS.dogs);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}
		const data: DogsResponse = await res.json();
		return data.message;
	} catch (err) {
		console.log(
			'An error occoured during fetching dog image urls, fallback url will be used',
			err
		);
		return new Array<string>(4).fill('assets/dog-fallback.jpg');
	}
}
