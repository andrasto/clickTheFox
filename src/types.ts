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
