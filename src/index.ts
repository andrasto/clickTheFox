import { TIMER_IN_SEC } from './configs';
import {
	fetchCatImageUrls,
	fetchFoxImageUrl,
	fetchDogImageUrls,
} from './requests';
import { PlayerStats } from './types';

const playerNameInput = <HTMLInputElement>getById('playerName');
const playButton = <HTMLButtonElement>getById('playButton');
const gameBox = getById('gameBox');
const MAX = 9;
let playerScore = 0;
let timeLeft = TIMER_IN_SEC;
let timer: NodeJS.Timeout;
let imagesLoading = false;
let canClick = false;

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
	canClick = true;
	playerScore = 0;
	timeLeft = TIMER_IN_SEC;
	loaderTransition();
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
	return rankings.sort((a, b) => b.score - a.score);
}

function getFormattedDate() {
	const d = new Date();
	return `${d.getFullYear()}, ${d.toLocaleDateString('en', {
		month: 'short',
	})} ${d.getDay()}`;
}

async function preloadImages() {
	while (imagesLoading) {
		await wait(100);
	}

	imagesLoading = true;
	preloadedImages.splice(0);
	const allImages = Array.from({ length: MAX }, () => new Image(150, 150));
	const allImageUrls: string[] = [];

	await fetchFoxImageUrl().then((url) => {
		allImageUrls.push(url);
	});
	await fetchDogImageUrls().then((urls) => allImageUrls.push(...urls));
	await fetchCatImageUrls().then((urls) => allImageUrls.push(...urls));

	const load = allImages.map((img, idx): Promise<HTMLImageElement> => {
		img.src = allImageUrls[idx];
		img.onclick = () => imageClick(idx === 0 ? 1 : -1);
		addToPreloadedImages(img);
		return new Promise((res) => {
			img.onload = () => res(img);
		});
	});

	const loadedImages = await Promise.all(load);
	loadedImages.forEach((img) => addToPreloadedImages(img));
	imagesLoading = false;
}

async function handleImageLoad() {
	while (imagesLoading) {
		await wait(100);
	}
	transferPreloadedImages();
	getById('loader').classList.remove('show');
	images.forEach((img) => {
		img.ondragstart = () => false;
		gameBox.appendChild(img);
	});
	canClick = true;
}

function loaderTransition() {
	gameBox.replaceChildren();
	getById('loader').classList.add('show');
}

function transferPreloadedImages() {
	images.splice(0);
	images.push(...preloadedImages);
}

function imageClick(increment: 1 | -1) {
	if (canClick) {
		loaderTransition();
		canClick = false;
		playerScore += increment;
		getById('playerScore').innerText = playerScore.toString();
		handleImageLoad();
		preloadImages();
	}
}

function addToPreloadedImages(img: HTMLImageElement) {
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

function wait(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
