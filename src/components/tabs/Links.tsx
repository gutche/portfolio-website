import { links } from "../../data/links";

const Links = () => {
	return (
		<div data-tab="socials" className="flex flex-col gap-2 tab-panel">
			View digital footprints:
			{links.map((link, index) => (
				<a
					className="relative border border-dotted w-full border-neutral-500 flex-1 px-1.5 text-start focus"
					href={link.url}
					target="_blank"
					key={index}>
					<h1 className="text-base py-1">{link.name}</h1>
				</a>
			))}
		</div>
	);
};

export default Links;
