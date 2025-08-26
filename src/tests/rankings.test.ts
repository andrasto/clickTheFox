/**
 * @jest-environment jsdom
 */

import { getRankings } from '../rankings';
import { playerStatsMock, rankingsMock } from './mocks';

describe('rankings', () => {
	describe('getRankings', () => {
		test("should return parameter in an array if key haven't been set yet", () => {
			mockLocalStorageGetItem(null);
			const res = getRankings(playerStatsMock);
			expect(res).toStrictEqual([
				{
					date: '2025, Jan, 1',
					name: 'Joe',
					score: 9,
				},
			]);
		});

		test('should return fallback if an error occours', () => {
			mockLocalStorageGetItem('"""');
			const res = getRankings(playerStatsMock);
			expect(res).toStrictEqual([
				{
					date: '2025, Jan, 1',
					name: 'Joe',
					score: 9,
				},
			]);
		});

		test('should return max 7 rankings, in descending order', () => {
			mockLocalStorageGetItem(JSON.stringify(rankingsMock));
			const expected = [
				{
					date: '2025, Jan, 8',
					name: 'Bob8',
					score: 14,
				},
				{
					date: '2025, Jan, 7',
					name: 'Bob7',
					score: 13,
				},
				{
					date: '2025, Jan, 6',
					name: 'Bob6',
					score: 12,
				},
				{
					date: '2025, Jan, 5',
					name: 'Bob5',
					score: 11,
				},
				{
					date: '2025, Jan, 4',
					name: 'Bob4',
					score: 10,
				},
				{
					date: '2025, Jan, 1',
					name: 'Joe',
					score: 9,
				},
				{
					date: '2025, Jan, 3',
					name: 'Bob3',
					score: 8,
				},
			];
			const res = getRankings(playerStatsMock);
			expect(res).toStrictEqual(expected);
		});

		function mockLocalStorageGetItem(res: null | string) {
			jest.spyOn(
				Object.getPrototypeOf(localStorage),
				'getItem'
			).mockImplementationOnce((_s: string) => res);
		}
	});
});
