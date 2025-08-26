export type FoxResponse = {
	image: string;
	link: string;
};

export type CatsResponse = {
	id: string;
	url: string;
	width: number;
	height: number;
}[];

export type DogsResponse = {
	message: string[];
	status: string;
};

export type PlayerStats = {
	name: string;
	date: string;
	score: number;
};

export type FetchApis = {
	cat: () => Promise<string[]>;
	dog: () => Promise<string[]>;
	fox: () => Promise<string>;
};
