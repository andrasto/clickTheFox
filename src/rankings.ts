import { PlayerStats } from './types';
import { getById } from './utils';

export const getRankings = (currentPlayerStats: PlayerStats) => {
	try {
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
		const sorted = rankings.sort((a, b) => b.score - a.score);
		sorted.splice(7);
		localStorage.setItem('rankings', JSON.stringify(sorted));
		return sorted;
	} catch (err) {
		console.log(
			'Something went wrong while getting the rankings, returning fallback data',
			err
		);
		return [currentPlayerStats];
	}
};

export const renderRankings = (rankings: PlayerStats[]) => {
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
