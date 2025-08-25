import { TIMER_IN_SEC } from './configs';
import { PlayerStats } from './types';
import { getById, getFormattedDate, wait } from './utils';

interface FetchApis {
	cat: () => Promise<string[]>;
	dog: () => Promise<string[]>;
	fox: () => Promise<string>;
}

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

	private imagesToRender: HTMLImageElement[] = [];
	private preloadedImages: HTMLImageElement[] = [];

	private playerNameInput = <HTMLInputElement>getById('playerName');
	private playButton = <HTMLButtonElement>getById('playButton');
	private gameBox = getById('gameBox');

	private init = () => {
		this.preloadImages();
		this.playerNameInput.onblur = this.onPlayerNameChange;
		getById('helloPlayerName').onclick = this.onPlayerNameClick;
		this.playButton.onclick = this.startGame;
	};

	private startGame = () => {
		getById('helloSection').classList.remove('show');
		getById('inputSection').classList.remove('show');
		getById('scoreboard').classList.remove('show');
		getById('gameScreen').classList.add('show');
		this.canClick = true;
		this.playerScore = 0;
		this.timeLeft = TIMER_IN_SEC;
		this.loaderTransition();
		this.handleImageLoad();
		this.preloadImages();
		getById('playerScore').innerText = this.playerScore.toString();
		getById('timeLeft').innerText = this.timeLeft.toString();
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
		getById('helloSection').classList.remove('show');
		getById('inputSection').classList.remove('show');
		getById('gameScreen').classList.remove('show');
		getById('scoreboard').classList.add('show');
		const playerStats = {
			name: this.playerNameInput.value,
			date: getFormattedDate(new Date()),
			score: this.playerScore,
		};
		const rankings = this.getRankings(playerStats);
		this.renderRankings(rankings);
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
			this.gameBox.appendChild(img);
		});
		this.canClick = true;
	};

	private loaderTransition = () => {
		this.gameBox.replaceChildren();
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

	private getRankings = (currentPlayerStats: PlayerStats) => {
		const rankings = <PlayerStats[] | null>(
			JSON.parse(localStorage.getItem('rankings'))
		);

		if (!rankings) {
			localStorage.setItem(
				'rankings',
				JSON.stringify([currentPlayerStats])
			);
			return [currentPlayerStats];
		}

		rankings.push(currentPlayerStats);
		localStorage.setItem('rankings', JSON.stringify(rankings));
		return rankings.sort((a, b) => b.score - a.score);
	};

	private onPlayerNameChange = () => {
		const playerName = this.playerNameInput.value;

		if (playerName) {
			this.playButton.disabled = false;
			getById('helloPlayerName').innerText = playerName;
			getById('helloSection').classList.add('show');
			getById('inputSection').classList.remove('show');
			getById('gameScreen').classList.remove('show');
			getById('scoreboard').classList.remove('show');
		} else {
			this.playButton.disabled = true;
		}
	};

	private onPlayerNameClick = () => {
		getById('inputSection').classList.add('show');
		getById('helloSection').classList.remove('show');
		getById('gameScreen').classList.remove('show');
		getById('scoreboard').classList.remove('show');
	};
}
