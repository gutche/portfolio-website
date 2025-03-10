import { displayParams } from "../stores/globalStore";

export const updateDisplay = (params: {
	image: string;
	title: string;
	description: string;
}) => {
	if (displayParams.get() !== params) displayParams.set(params);
};
