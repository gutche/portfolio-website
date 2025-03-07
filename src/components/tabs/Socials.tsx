import { useState } from "react";
import { socials, type Social } from "../../data/socials";
import { playAudio, updateCrtDisplay } from "../../utils/helpers";
import { isMuted } from "../../stores/audioStore";

const Socials = () => {
	const [selectedSocials, setSelectedSocials] = useState(socials[0]);

	const handleSocialsClick = (social: Social) => {
		setSelectedSocials(social);
		updateCrtDisplay("", social.name, social.url);

		const switchSound = document.getElementById(
			"switch-sound"
		) as HTMLAudioElement;
		const audioIndicator = document.getElementById("audioIndicator");

		playAudio(switchSound, audioIndicator!, isMuted.value);
	};

	return (
		<div data-tab="socials" className="flex flex-col gap-2 tab-panel">
			{socials.map((social, index) => (
				<a
					className={`${
						selectedSocials.id === social.id ? "selected" : ""
					} bg-neutral-900 p-3 text-left hover:bg-neutral-800/50 duration-200 cursor-pointer`}
					href={social.url}
					target="_blank"
					key={index}>
					<span className="font-medium">{social.name}</span>
				</a>
			))}
		</div>
	);
};

export default Socials;
