import { socials } from "../../data/socials";

const Socials = () => {
	return (
		<div data-tab="socials" className="flex flex-col gap-2 tab-panel">
			View digital footprints:
			{socials.map((social, index) => (
				<a
					className="relative border border-dotted w-full border-neutral-500 flex-1 px-1.5 text-start focus"
					href={social.url}
					target="_blank"
					key={index}>
					<h1 className="text-base py-1">{social.name}</h1>
				</a>
			))}
		</div>
	);
};

export default Socials;
