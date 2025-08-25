import { CatsResponse, FoxResponse } from '../types';

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
