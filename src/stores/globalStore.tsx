import { atom } from "nanostores";

export const isMuted = atom(false);
export const displayParams = atom({
	image: "/images/profile.png",
	title: "Gledrian Gutierrez",
	description: "Software Engineer",
});
