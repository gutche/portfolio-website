export interface Skill {
    id: string;
    title: string;
    description: string;
    technologies: string;
    icon: string;
}

export const skills: Skill[] = [
    {
        id: "frontend",
        title: "Frontend Development",
        description: "Expertise in modern frontend frameworks and responsive design",
        technologies: "React, Vue, Angular",
        icon: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png"
    },
    {
        id: "backend",
        title: "Backend Development",
        description: "Building scalable server-side applications and APIs",
        technologies: "Node.js, Python",
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png"
    },
    {
        id: "cloud",
        title: "Cloud Infrastructure",
        description: "Designing and managing cloud-based solutions",
        technologies: "AWS, GCP",
        icon: "https://cdn-icons-png.flaticon.com/512/4727/4727496.png"
    }
]; 