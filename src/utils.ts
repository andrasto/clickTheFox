export const getById = (id: string) => document.getElementById(id);

export const wait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export const getFormattedDate = (date: Date) => {
	return `${date.getFullYear()}, ${date.toLocaleDateString('en', {
		month: 'short',
	})} ${date.getDay()}`;
};
