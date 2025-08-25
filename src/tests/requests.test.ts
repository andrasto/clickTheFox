import {
	fetchCatImageUrls,
	fetchDogImageUrls,
	fetchFoxImageUrl,
} from '../requests';
import { CatsResponse, DogsResponse, FoxResponse } from '../types';
import { catsResponseMock, dogsResponseMock, foxResponseMock } from './mocks';

describe('Api calls', () => {
	test('fetchFoxImageUrl should return only a single URL', async () => {
		const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(
			jest.fn(() =>
				Promise.resolve({
					ok: true,
					json: (): Promise<FoxResponse> =>
						Promise.resolve(foxResponseMock),
				})
			) as jest.Mock
		);

		const res = await fetchFoxImageUrl();
		expect(res).toBe('http://very-nice-fox-pic.jpg');
		expect(fetchMock).toHaveBeenCalledWith('https://randomfox.ca/floof/');
	});

	test('fetchDogImageUrls should return 4 URLs', async () => {
		const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(
			jest.fn(() =>
				Promise.resolve({
					ok: true,
					json: (): Promise<DogsResponse> =>
						Promise.resolve(dogsResponseMock),
				})
			) as jest.Mock
		);

		const res = await fetchDogImageUrls();
		expect(res).toStrictEqual([
			'http://very-nice-dog-pic-1.jpg',
			'http://very-nice-dog-pic-2.jpg',
			'http://very-nice-dog-pic-3.jpg',
			'http://very-nice-dog-pic-4.jpg',
		]);
		expect(fetchMock).toHaveBeenCalledWith(
			'https://dog.ceo/api/breeds/image/random/4'
		);
	});

	test('fetchCatImageUrls should return 4 URLs', async () => {
		const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(
			jest.fn(() =>
				Promise.resolve({
					ok: true,
					json: (): Promise<CatsResponse> =>
						Promise.resolve(catsResponseMock),
				})
			) as jest.Mock
		);

		const res = await fetchCatImageUrls();
		expect(res).toStrictEqual([
			'http://very-nice-cat-pic-1.jpg',
			'http://very-nice-cat-pic-2.jpg',
			'http://very-nice-cat-pic-3.jpg',
			'http://very-nice-cat-pic-4.jpg',
		]);
		expect(fetchMock).toHaveBeenCalledWith(
			'https://api.thecatapi.com/v1/images/search?limit=4&size=small&mime_types=jpg'
		);
	});
});
