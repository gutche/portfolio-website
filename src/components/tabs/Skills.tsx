import { skills } from "../../data/skills";

const Skills = () => {
	return (
		<div className="tab-panel" data-tab="skills">
			<div className="flex flex-col gap-2">
				{skills.map((skill) => (
					<button className="relative border w-full border-neutral-500 flex-1 px-1.5 text-start focus">
						<h1 className="text-base py-1">{skill.title}</h1>
						<p className="text-sm border-t border-neutral-500 border-dotted py-1">
							{skill.technologies}
						</p>
					</button>
				))}
			</div>
		</div>
	);
};

export default Skills;
