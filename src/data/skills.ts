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
		title: "DevOps",
		technologies: "CI/CD, Jenkins, Github Actions, Docker",
	},
	{
		id: "testing",
		title: "Testing frameworks",
		technologies: "Cypress, Jasmine",
	},
];
