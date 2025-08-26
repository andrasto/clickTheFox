import {
	fetchCatImageUrls,
	fetchDogImageUrls,
	fetchFoxImageUrl,
} from '../requests';
import { CatsResponse, DogsResponse, FetchMock, FoxResponse } from '../types';
import { catsResponseMock, dogsResponseMock, foxResponseMock } from './mocks';

describe('Api calls', () => {
	describe('fetchFoxImageUrl', () => {
		test('should return only a single URL on request success', async () => {
			const fetchMock = mockFetchImplementation({
				ok: true,
				json: (): Promise<FoxResponse> =>
					Promise.resolve(foxResponseMock),
			});

			const res = await fetchFoxImageUrl();
			expect(res).toBe('http://very-nice-fox-pic.jpg');
			expect(fetchMock).toHaveBeenCalledWith(
				'https://randomfox.ca/floof/'
			);
		});

		test('should return a fallback image URL on failed request', async () => {
			const fetchMock = mockFetchImplementation({
				ok: false,
				json: (): Promise<FoxResponse> =>
					Promise.resolve(foxResponseMock),
			});

			const res = await fetchFoxImageUrl();
			expect(res).toBe('src/assets/fox-fallback.jpg');
			expect(fetchMock).toHaveBeenCalledWith(
				'https://randomfox.ca/floof/'
			);
		});
	});

	describe('fetchDogImageUrls', () => {
		test('should return 4 URLs on request success', async () => {
			const fetchMock = mockFetchImplementation({
				ok: true,
				json: (): Promise<DogsResponse> =>
					Promise.resolve(dogsResponseMock),
			});

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

		test('should return 4 fallback image URLs on failed request', async () => {
			const fetchMock = mockFetchImplementation({
				ok: false,
				json: (): Promise<DogsResponse> =>
					Promise.resolve(dogsResponseMock),
			});

			const res = await fetchDogImageUrls();
			expect(res).toStrictEqual([
				'src/assets/dog-fallback.jpg',
				'src/assets/dog-fallback.jpg',
				'src/assets/dog-fallback.jpg',
				'src/assets/dog-fallback.jpg',
			]);
			expect(fetchMock).toHaveBeenCalledWith(
				'https://dog.ceo/api/breeds/image/random/4'
			);
		});
	});

	describe('fetchCatImageUrls', () => {
		test('should return 4 URLs on request success', async () => {
			const fetchMock = mockFetchImplementation({
				ok: true,
				json: (): Promise<CatsResponse> =>
					Promise.resolve(catsResponseMock),
			});

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

		test('should return 4 fallback image URLs on failed request', async () => {
			const fetchMock = mockFetchImplementation({
				ok: false,
				json: (): Promise<CatsResponse> =>
					Promise.resolve(catsResponseMock),
			});

			const res = await fetchCatImageUrls();
			expect(res).toStrictEqual([
				'src/assets/cat-fallback.jpg',
				'src/assets/cat-fallback.jpg',
				'src/assets/cat-fallback.jpg',
				'src/assets/cat-fallback.jpg',
			]);
			expect(fetchMock).toHaveBeenCalledWith(
				'https://api.thecatapi.com/v1/images/search?limit=4&size=small&mime_types=jpg'
			);
		});
	});

	function mockFetchImplementation<T>(res: FetchMock<T>) {
		return jest
			.spyOn(global, 'fetch')
			.mockImplementationOnce(
				jest.fn(() => Promise.resolve(res)) as jest.Mock
			);
	}
});
