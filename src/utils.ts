export const getById = (id: string) => document.getElementById(id);

export const modifyElementVisibility = (
	elementsToShow: HTMLElement[] = [],
	elementsToHide: HTMLElement[] = []
) => {
	elementsToShow.forEach((el) => el.classList.add('show'));
	elementsToHide.forEach((el) => el.classList.remove('show'));
};

export const wait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export const getFormattedDate = (date: Date) =>
	`${date.getFullYear()}, ${date.toLocaleDateString('en', {
		month: 'short',
	})} ${date.getDate()}`;

export const shuffleArray = <T>(arr: T[]) =>
	arr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
