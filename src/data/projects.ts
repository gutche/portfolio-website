export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
}

export const projects: Project[] = [
	{
		id: "chirp",
		title: "Chirp",
		description: "Chat room that expires after a certain amount of time",
		image: "src/assets/no-image.png",
	},
];
