import { fetchCatImages, fetchFoxImageUrl, fetchDogImages } from './requests';
import { PlayerStats } from './types';

const playerNameInput = <HTMLInputElement>getById('playerName');
const playButton = <HTMLButtonElement>getById('playButton');
const MAX = 9;
let loaded = 0;
let playerScore = 0;
let timeLeft = 5;
let timer;

const images = [];
const preloadedImages = [];

playerNameInput.addEventListener('blur', onPlayerNameChange);

getById('helloPlayerName').addEventListener('click', onPlayerNameClick);
preloadImages();

playButton.onclick = startGame;

function startGame() {
	getById('helloSection').classList.remove('show');
	getById('inputSection').classList.remove('show');
	getById('scoreboard').classList.remove('show');
	getById('gameScreen').classList.add('show');
	playerScore = 0;
	timeLeft = 5;
	handleImageLoad();
	preloadImages();
	getById('playerScore').innerText = playerScore.toString();
	getById('timeLeft').innerText = timeLeft.toString();
	timer = setInterval(() => {
		timeLeft -= 1;
		getById('timeLeft').innerText = timeLeft.toString();
		if (timeLeft === 0) {
			clearInterval(timer);
			endGame();
		}
	}, 1000);
}

function endGame() {
	getById('helloSection').classList.remove('show');
	getById('inputSection').classList.remove('show');
	getById('gameScreen').classList.remove('show');
	getById('scoreboard').classList.add('show');
	const playerStats = {
		name: playerNameInput.value,
		date: getFormattedDate(),
		score: playerScore,
	};
	const rankings = getRankings(playerStats);
	renderRankings(rankings);
}

function renderRankings(rankings: PlayerStats[]) {
	const scoreboard = getById('scoreboardBody');
	scoreboard.replaceChildren();

	const rowsToInsert = rankings
		.map((r, idx) => {
			return `
				<tr>
					<td>${idx + 1}</td>
					<td>${r.name}</td>
					<td>${r.date}</td>
					<td>${r.score}</td>
				</tr>`;
		})
		.join('');
	scoreboard.innerHTML = rowsToInsert;
}

function getRankings(currentPlayerStats: PlayerStats) {
	const rankings = <PlayerStats[] | null>(
		JSON.parse(localStorage.getItem('rankings'))
	);

	if (!rankings) {
		localStorage.setItem('rankings', JSON.stringify([currentPlayerStats]));
		return [currentPlayerStats];
	}

	rankings.push(currentPlayerStats);
	localStorage.setItem('rankings', JSON.stringify(rankings));
	return rankings.sort((a, b) => a.score - b.score);
}

function getFormattedDate() {
	const d = new Date();
	return `${d.getFullYear()}, ${d.toLocaleDateString('en', {
		month: 'short',
	})} ${d.getDay()}`;
}

function preloadImages() {
	const foxImg = new Image(150, 150);
	preloadedImages.push(foxImg);
	fetchFoxImageUrl().then((v) => {
		foxImg.src = v;
		foxImg.onload = () => {
			++loaded;
		};
		foxImg.onclick = () => imageClick(1);
	});

	const catImages = [
		new Image(150, 150),
		new Image(150, 150),
		new Image(150, 150),
		new Image(150, 150),
	];
	fetchCatImages().then((v) => {
		catImages.forEach((img, idx) => {
			img.src = v[idx];
			img.onload = () => {
				++loaded;
			};
			img.onclick = () => imageClick(-1);
			img.loading = 'eager';
			addToPreloadedImages(img);
		});
	});

	const dogImages = [
		new Image(150, 150),
		new Image(150, 150),
		new Image(150, 150),
		new Image(150, 150),
	];
	fetchDogImages().then((v) => {
		dogImages.forEach((img, idx) => {
			img.src = v[idx];
			img.onload = () => {
				++loaded;
			};
			img.onclick = () => imageClick(-1);
			img.loading = 'eager';
			addToPreloadedImages(img);
		});
	});
}

function handleImageLoad() {
	const gameBox = getById('gameBox');
	transferPreloadedImages();
	gameBox.replaceChildren();
	images.forEach((img) => {
		img.ondragstart = () => false;
		gameBox.appendChild(img);
	});
	loaded = 0;
}

function transferPreloadedImages() {
	images.splice(0);
	images.push(...preloadedImages);
	preloadedImages.splice(0);
}

function imageClick(increment: 1 | -1) {
	playerScore += increment;
	getById('playerScore').innerText = playerScore.toString();
	handleImageLoad();
	preloadImages();
}

function addToPreloadedImages(img) {
	const random = Math.floor(Math.random() * 100);
	if (random < 50) {
		preloadedImages.unshift(img);
	} else {
		preloadedImages.push(img);
	}
}

function onPlayerNameChange() {
	const playerName = playerNameInput.value;

	if (playerName) {
		playButton.disabled = false;
		getById('helloPlayerName').innerText = playerName;
		getById('helloSection').classList.add('show');
		getById('inputSection').classList.remove('show');
		getById('gameScreen').classList.remove('show');
		getById('scoreboard').classList.remove('show');
	} else {
		playButton.disabled = true;
	}
}

function onPlayerNameClick() {
	getById('inputSection').classList.add('show');
	getById('helloSection').classList.remove('show');
	getById('gameScreen').classList.remove('show');
	getById('scoreboard').classList.remove('show');
}

function getById(id: string) {
	return document.getElementById(id);
}
