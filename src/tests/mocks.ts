import { CatsResponse, FoxResponse, PlayerStats } from '../types';

export const foxResponseMock: FoxResponse = {
	image: 'http://very-nice-fox-pic.jpg',
	link: 'http://link.com',
};

export const catsResponseMock: CatsResponse = [
	{
		id: '1',
		url: 'http://very-nice-cat-pic-1.jpg',
		width: 200,
		height: 200,
	},
	{
		id: '2',
		url: 'http://very-nice-cat-pic-2.jpg',
		width: 200,
		height: 200,
	},
	{
		id: '3',
		url: 'http://very-nice-cat-pic-3.jpg',
		width: 200,
		height: 200,
	},
	{
		id: '4',
		url: 'http://very-nice-cat-pic-4.jpg',
		width: 200,
		height: 200,
	},
	{
		id: '5',
		url: 'http://very-nice-cat-pic-5.jpg',
		width: 200,
		height: 200,
	},
];

export const dogsResponseMock = {
	status: 'success',
	message: [
		'http://very-nice-dog-pic-1.jpg',
		'http://very-nice-dog-pic-2.jpg',
		'http://very-nice-dog-pic-3.jpg',
		'http://very-nice-dog-pic-4.jpg',
	],
};

export const playerStatsMock: PlayerStats = {
	date: '2025, Jan, 1',
	name: 'Joe',
	score: 9,
};

export const rankingsMock: PlayerStats[] = [
	{
		date: '2025, Jan, 1',
		name: 'Bob1',
		score: 6,
	},
	{
		date: '2025, Jan, 2',
		name: 'Bob2',
		score: 7,
	},
	{
		date: '2025, Jan, 3',
		name: 'Bob3',
		score: 8,
	},
	{
		date: '2025, Jan, 4',
		name: 'Bob4',
		score: 10,
	},
	{
		date: '2025, Jan, 5',
		name: 'Bob5',
		score: 11,
	},
	{
		date: '2025, Jan, 6',
		name: 'Bob6',
		score: 12,
	},
	{
		date: '2025, Jan, 7',
		name: 'Bob7',
		score: 13,
	},
	{
		date: '2025, Jan, 8',
		name: 'Bob8',
		score: 14,
	},
];
