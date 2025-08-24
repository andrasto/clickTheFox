import { fetchCatImages, fetchFoxImageUrl } from './requests';

const playerNameInput = <HTMLInputElement>getById('playerName');
const playButton = <HTMLButtonElement>getById('playButton');
const MAX = 5;
let loaded = 0;

const images = [];

playerNameInput.addEventListener('blur', onPlayerNameChange);

getById('helloPlayerName').addEventListener('click', onPlayerNameClick);
preloadImages();

function preloadImages() {
	const foxImg = new Image(200, 200);
	images.push(foxImg);
	fetchFoxImageUrl().then((v) => {
		foxImg.src = v;
		foxImg.id = 'Fox';
		foxImg.onload = () => {
			handleImageLoad();
		};
	});

	const catImages = [
		new Image(200, 200),
		new Image(200, 200),
		new Image(200, 200),
		new Image(200, 200),
	];
	fetchCatImages().then((v) => {
		console.log(v);
		catImages.forEach((img, idx) => {
			img.src = v[idx];
			img.onload = () => {
				handleImageLoad();
			};
		});
	});
	images.push(...catImages);
}

function handleImageLoad() {
	++loaded;
	if (loaded === MAX) {
		const gameBox = getById('gameBox');
		images.forEach((img) => gameBox.appendChild(img));
		loaded = 0;
	}
}

function onPlayerNameChange() {
	const playerName = playerNameInput.value;

	if (playerName) {
		playButton.disabled = false;
		getById('helloPlayerName').innerText = playerName;
		getById('helloSection').classList.add('show');
		getById('inputSection').classList.remove('show');
	} else {
		playButton.disabled = true;
	}
}

function onPlayerNameClick() {
	getById('inputSection').classList.add('show');
	getById('helloSection').classList.remove('show');
}

function getById(id: string) {
	return document.getElementById(id);
}
