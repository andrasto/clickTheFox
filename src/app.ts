import { TIMER_IN_SEC } from './configs';
import { FetchApis, PlayerStats } from './types';
import {
	getById,
	getFormattedDate,
	getRankings,
	modifyElementVisibility,
	wait,
} from './utils';

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
		getById('helloPlayerName').onclick = this.onPlayerNameClick;
		getById('toWelcomeScreen').onclick = this.toWelcomeScreen;
	};

	private startGame = () => {
		modifyElementVisibility(
			[getById('gameScreen')],
			[
				getById('helloSection'),
				getById('scoreboard'),
				getById('toWelcomeScreen'),
				this.playButton,
			]
		);
		getById('footerActions').classList.remove('spaceBetween');

		this.resetState();
		this.loaderTransition();
		this.handleImageLoad();
		this.preloadImages();

		this.setTimer();
	};

	private resetState = () => {
		this.canClick = true;
		this.playerScore = 0;
		this.timeLeft = TIMER_IN_SEC;
		getById('playerScore').innerText = this.playerScore.toString();
		getById('timeLeft').innerText = this.timeLeft.toString();
	};

	private setTimer = () => {
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
		modifyElementVisibility(
			[
				getById('scoreboard'),
				this.playButton,
				getById('toWelcomeScreen'),
			],
			[getById('gameScreen')]
		);
		getById('footerActions').classList.add('spaceBetween');
		const playerStats = {
			name: this.playerNameInput.value,
			date: getFormattedDate(new Date()),
			score: this.playerScore,
		};
		const rankings = getRankings(playerStats);
		this.renderRankings(rankings);
	};

	private toWelcomeScreen = () => {
		modifyElementVisibility(
			[getById('helloSection')],
			[getById('scoreboard'), getById('toWelcomeScreen')]
		);
		getById('footerActions').classList.remove('spaceBetween');
	};

	private renderRankings = (rankings: PlayerStats[]) => {
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

	private loaderTransition = () => {
		getById('gameBox').replaceChildren();
		getById('loader').classList.add('show');
	};

	private transferPreloadedImages = () => {
		this.imagesToRender.splice(0);
		this.imagesToRender.push(...this.preloadedImages);
	};

	private imageClick = (increment: 1 | -1) => {
		if (this.canClick) {
			this.loaderTransition();
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
			modifyElementVisibility(
				[getById('helloSection')],
				[getById('inputSection')]
			);
		} else {
			this.playButton.disabled = true;
		}
	};

	private onPlayerNameClick = () => {
		modifyElementVisibility(
			[getById('inputSection')],
			[getById('helloSection')]
		);
	};
}
