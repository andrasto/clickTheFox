import { getFormattedDate } from '../utils';

describe('utils', () => {
	describe('getFormattedDate', () => {
		test('should correctly format dates', () => {
			expect(getFormattedDate(new Date('2025-11-22'))).toBe(
				'2025, Nov 22'
			);
			expect(getFormattedDate(new Date('2039-1-1'))).toBe('2039, Jan 1');
			expect(getFormattedDate(new Date('2024-12-31'))).toBe(
				'2024, Dec 31'
			);
		});
	});
});
