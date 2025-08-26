import { TIMER_IN_SEC } from './configs';
import {
	showGameScreen,
	showLoader,
	showNameInputScreen,
	showScoreboard,
	showWelcomeScreen,
} from './navigations';
import { getRankings, renderRankings } from './rankings';
import { FetchApis } from './types';
import { getById, getFormattedDate, wait } from './utils';

export class ClickTheFox {
	public constructor(fetchApis: FetchApis) {
		this.fetchApis = fetchApis;
		this.init();
	}
	private timeLeft = TIMER_IN_SEC;
	private playerScore = 0;
	private timer: NodeJS.Timeout;
	private fetchApis: FetchApis;
	private imagesLoading = false;
	private canClick = false;

	private readonly imagesToRender: HTMLImageElement[] = [];
	private readonly preloadedImages: HTMLImageElement[] = [];

	private readonly playerNameInput = <HTMLInputElement>getById('playerName');
	private readonly playButton = <HTMLButtonElement>getById('playButton');

	private init = () => {
		this.preloadImages();
		this.playButton.onclick = this.startGame;
		this.playerNameInput.onblur = this.onPlayerNameChange;
		getById('helloPlayerName').onclick = showNameInputScreen;
		getById('toWelcomeScreen').onclick = showWelcomeScreen;
	};

	private startGame = () => {
		showGameScreen();

		this.resetState();
		showLoader();
		this.handleImageLoad();
		this.preloadImages();

		this.setGameTimer();
	};

	private resetState = () => {
		this.canClick = true;
		this.playerScore = 0;
		this.timeLeft = TIMER_IN_SEC;
		getById('playerScore').innerText = this.playerScore.toString();
		getById('timeLeft').innerText = this.timeLeft.toString();
	};

	private setGameTimer = () => {
		this.timer = setInterval(() => {
			this.timeLeft -= 1;
			getById('timeLeft').innerText = this.timeLeft.toString();
			if (this.timeLeft === 0) {
				clearInterval(this.timer);
				this.endGame();
			}
		}, 1000);
	};

	private endGame = () => {
		showScoreboard();
		const playerStats = {
			name: this.playerNameInput.value,
			date: getFormattedDate(new Date()),
			score: this.playerScore,
		};
		const rankings = getRankings(playerStats);
		renderRankings(rankings);
	};

	private preloadImages = async () => {
		while (this.imagesLoading) {
			await wait(100);
		}

		this.imagesLoading = true;
		this.preloadedImages.splice(0);
		const allImages = Array.from({ length: 9 }, () => new Image(150, 150));
		const allImageUrls: string[] = [];

		await this.fetchApis.fox().then((url) => {
			allImageUrls.push(url);
		});
		await this.fetchApis.dog().then((urls) => allImageUrls.push(...urls));
		await this.fetchApis.cat().then((urls) => allImageUrls.push(...urls));

		const load = allImages.map((img, idx): Promise<HTMLImageElement> => {
			img.src = allImageUrls[idx];
			img.onclick = () => this.imageClick(idx === 0 ? 1 : -1);
			return new Promise((res) => {
				img.onload = () => res(img);
			});
		});

		const loadedImages = await Promise.all(load);
		loadedImages.forEach((img) => this.addToPreloadedImages(img));
		this.imagesLoading = false;
	};

	private handleImageLoad = async () => {
		while (this.imagesLoading) {
			await wait(100);
		}
		this.transferPreloadedImages();
		getById('loader').classList.remove('show');
		this.imagesToRender.forEach((img) => {
			img.ondragstart = () => false;
			getById('gameBox').appendChild(img);
		});
		this.canClick = true;
	};

	private transferPreloadedImages = () => {
		this.imagesToRender.splice(0);
		this.imagesToRender.push(...this.preloadedImages);
	};

	private imageClick = (increment: 1 | -1) => {
		if (this.canClick) {
			showLoader();
			this.canClick = false;
			this.playerScore += increment;
			getById('playerScore').innerText = this.playerScore.toString();
			this.handleImageLoad();
			this.preloadImages();
		}
	};

	private addToPreloadedImages = (img: HTMLImageElement) => {
		const random = Math.floor(Math.random() * 100);
		if (random < 50) {
			this.preloadedImages.unshift(img);
		} else {
			this.preloadedImages.push(img);
		}
	};

	private onPlayerNameChange = () => {
		const playerName = this.playerNameInput.value;

		if (playerName) {
			this.playButton.disabled = false;
			getById('helloPlayerName').innerText = playerName;
			showWelcomeScreen();
		} else {
			this.playButton.disabled = true;
		}
	};
}
