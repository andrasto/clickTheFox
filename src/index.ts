import { fetchCatImages, fetchFoxImageUrl, fetchDogImages } from './requests';

const playerNameInput = <HTMLInputElement>getById('playerName');
const playButton = <HTMLButtonElement>getById('playButton');
const MAX = 9;
let loaded = 0;
let playerScore = 0;
let timeLeft = 30;

const images = [];

playerNameInput.addEventListener('blur', onPlayerNameChange);

getById('helloPlayerName').addEventListener('click', onPlayerNameClick);
preloadImages();

function preloadImages() {
	const foxImg = new Image(200, 200);
	images.push(foxImg);
	fetchFoxImageUrl().then((v) => {
		foxImg.src = v;
		foxImg.onload = () => {
			handleImageLoad();
		};
		foxImg.onclick = () => imageClick(1);
	});

	const catImages = [
		new Image(200, 200),
		new Image(200, 200),
		new Image(200, 200),
		new Image(200, 200),
	];
	fetchCatImages().then((v) => {
		catImages.forEach((img, idx) => {
			img.src = v[idx];
			img.onload = () => {
				handleImageLoad();
			};
			img.onclick = () => imageClick(-1);
			addToImages(img);
		});
	});

	const dogImages = [
		new Image(200, 200),
		new Image(200, 200),
		new Image(200, 200),
		new Image(200, 200),
	];
	fetchDogImages().then((v) => {
		dogImages.forEach((img, idx) => {
			img.src = v[idx];
			img.onload = () => {
				handleImageLoad();
			};
			img.onclick = () => imageClick(-1);

			addToImages(img);
		});
	});
}

function handleImageLoad() {
	++loaded;
	if (loaded === MAX) {
		const gameBox = getById('gameBox');
		images.forEach((img) => {
			img.ondragstart = () => false;
			gameBox.appendChild(img);
		});
		loaded = 0;
	}
}

function imageClick(increment: 1 | -1) {
	playerScore += increment;
	getById('playerScore').innerText = playerScore.toString();
}

function addToImages(img) {
	const random = Math.floor(Math.random() * 100);
	if (random < 50) {
		images.unshift(img);
	} else {
		images.push(img);
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
