import { useState } from "react";
import { projects } from "../../data/projects";

const Projects = () => {
	const [selectedProject, setSelectedProject] = useState(0);

	return (
		<div className="tab-panel" data-tab="projects">
			<div className="flex flex-col gap-2">
				<p className="text-base">
					My projects include websites, applications, and various tech
					experiments. Here I'll showcase my best work.
				</p>

				<div className="flex flex-col gap-2 mb-4">
					{projects.map((project, index) => (
						<button
							key={index}
							className="relative border w-full border-neutral-500 flex-1 px-1.5 text-start focus cursor-pointer"
							onClick={() => setSelectedProject(index)}>
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
			</div>
		</div>
	);
};

export default Projects;
