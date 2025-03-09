export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
}

export const projects: Project[] = [
	{
		id: "portfolio",
		title: "Old portfolio website",
		description: "Minimalist personal portfolio made with Astro",
		image: "src/assets/astro-portfolio.png",
	},
	{
		id: "yappin",
		title: "Yappin",
		description: "Messaging app under development",
		image: "src/assets/no-image.png",
	},
];
