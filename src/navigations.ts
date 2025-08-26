import { getById, modifyElementVisibility } from './utils';

export const showGameScreen = () => {
	modifyElementVisibility(
		[getById('gameScreen')],
		[
			getById('helloSection'),
			getById('scoreboard'),
			getById('toWelcomeScreen'),
			getById('playButton'),
		]
	);
	getById('footerActions').classList.remove('spaceBetween');
};

export const showScoreboard = () => {
	modifyElementVisibility(
		[
			getById('scoreboard'),
			getById('playButton'),
			getById('toWelcomeScreen'),
		],
		[getById('gameScreen')]
	);
	getById('footerActions').classList.add('spaceBetween');
};

export const showWelcomeScreen = () => {
	modifyElementVisibility(
		[getById('helloSection')],
		[
			getById('scoreboard'),
			getById('toWelcomeScreen'),
			getById('inputSection'),
		]
	);
	getById('footerActions').classList.remove('spaceBetween');
};

export const showLoader = () => {
	getById('gameBox').replaceChildren();
	getById('loader').classList.add('show');
};

export const showNameInputScreen = () => {
	modifyElementVisibility(
		[getById('inputSection')],
		[getById('helloSection')]
	);
};
