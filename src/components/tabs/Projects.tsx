import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";
import { isMuted } from "../../stores/globalStore";
import { useStore } from "@nanostores/react";
import { updateDisplay } from "../../utils/DisplayUpdater";
import { displays } from "../../data/displays";

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState(0);
	const $isMuted = useStore(isMuted);
	const switchSoundRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		switchSoundRef.current = new Audio("/sfx/switch.wav");
		switchSoundRef.current.volume = 0.2;
	}, []);

	const playSwitchSound = () => {
		if (!$isMuted && switchSoundRef.current) {
			switchSoundRef.current.currentTime = 0;
			switchSoundRef.current.play();
		}
	};

	const handleClick = (index: number) => {
		if (selectedProject === index) return;
		setSelectedProject(index);
		updateDisplay(displays[index + 1]);
		playSwitchSound();
	};

	return (
		<div className="tab-panel" data-tab="projects">
			<div className="flex flex-col gap-2">
				<p className="text-base">
					Among his best works are the following:
				</p>

				<div className="flex flex-col gap-2 mb-4">
					{projects.map((project, index) => (
						<button
							key={index}
							className="relative border w-full border-neutral-500 flex-1 px-1.5 text-start focus"
							onClick={() => handleClick(index)}>
							<h1 className="text-base py-1">{project.title}</h1>
							<p className="text-sm border-t border-neutral-500 border-dotted py-1">
								{project.description}
							</p>
							{selectedProject === index && (
								<div className="absolute top-0 left-0 w-full h-full">
									<span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-white"></span>
									<span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-white"></span>
									<span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-white"></span>
									<span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-white"></span>
								</div>
							)}
						</button>
					))}
				</div>
				<p className="text-base">
					<a
						href="https:/github.com/gutche"
						target="_blank"
						className="tab-link text-primary border-b border-dotted">
						Source code
					</a>
				</p>
			</div>
		</div>
	);
};

export default Projects;
