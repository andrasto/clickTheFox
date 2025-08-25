import { PlayerStats } from './types';

export const getById = (id: string) => document.getElementById(id);

export const wait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export const getFormattedDate = (date: Date) => {
	return `${date.getFullYear()}, ${date.toLocaleDateString('en', {
		month: 'short',
	})} ${date.getDate()}`;
};

export const modifyElementVisibility = (
	elementsToShow: HTMLElement[] = [],
	elementsToHide: HTMLElement[] = []
) => {
	elementsToShow.forEach((el) => el.classList.add('show'));
	elementsToHide.forEach((el) => el.classList.remove('show'));
};

export const getRankings = (currentPlayerStats: PlayerStats) => {
	const rankings = <PlayerStats[] | null>(
		JSON.parse(localStorage.getItem('rankings'))
	);

	if (!rankings) {
		localStorage.setItem('rankings', JSON.stringify([currentPlayerStats]));
		return [currentPlayerStats];
	}

	rankings.push(currentPlayerStats);
	const sorted = rankings.sort((a, b) => b.score - a.score);
	sorted.splice(7);
	localStorage.setItem('rankings', JSON.stringify(sorted));
	return sorted;
};
