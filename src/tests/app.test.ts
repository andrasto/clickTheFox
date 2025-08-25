/**
 * @jest-environment jsdom
 */

import fs = require('fs');
import path = require('path');
const html = fs.readFileSync(
	path.resolve(__dirname, '../../index.html'),
	'utf8'
);

import { ClickTheFox } from '../app';
import { getById } from '../utils';

describe('app', () => {
	beforeEach(() => {
		document.documentElement.innerHTML = html.toString();
	});

	afterEach(() => {
		jest.resetModules();
	});
	test('', () => {
		new ClickTheFox({
			cat: () => Promise.resolve(['asd']),
			dog: () => Promise.resolve(['asd']),
			fox: () => Promise.resolve('asd'),
		});

		expect(getById('playButton').textContent).toBe('PLAY!');
	});
});
