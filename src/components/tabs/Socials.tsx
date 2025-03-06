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
		<div className="flex flex-col gap-2">
			{socials.map((social, index) => (
				<button
					className={`${
						selectedSocials.id === social.id ? "selected" : ""
					} social-item p-3 text-left hover:bg-neutral-800/50 transition-colors duration-200`}
					onClick={() => handleSocialsClick(social)}
					key={index}>
					<span className="font-medium">{social.name}</span>
				</button>
			))}
		</div>
	);
};

export default Socials;
