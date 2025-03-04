export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
}

export const projects: Project[] = [
    {
        id: "voice-ai",
        title: "Voice AI Platform",
        description: "AI-powered voice synthesis and analysis platform",
        image: "https://picsum.photos/800/800?random=1"
    },
    {
        id: "portfolio",
        title: "Portfolio Website",
        description: "Personal portfolio with CRT effect",
        image: "https://picsum.photos/800/800?random=2"
    },
    {
        id: "ecommerce",
        title: "E-commerce Solution",
        description: "Full-stack e-commerce platform",
        image: "https://picsum.photos/800/800?random=3"
    }
]; 