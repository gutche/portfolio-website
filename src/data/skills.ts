export interface Skill {
	id: string;
	title: string;
	technologies: string;
}

export const skills: Skill[] = [
	{
		id: "frontend",
		title: "Frontend Development",
		technologies: "React, Vue, Angular, Astro",
	},
	{
		id: "backend",
		title: "Backend Development",
		technologies: "ExpressJS, Java Spring Boot, Django",
	},
	{
		id: "database",
		title: "Database",
		technologies: "MySQL, PostgreSQL, MongoDB, Redis",
	},
	{
		id: "devops",
		title: "CI/CD",
		technologies: "Jenkins, Github Actions",
	},
];
