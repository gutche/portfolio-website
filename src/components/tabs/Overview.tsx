const Overview = () => {
	const interests = ["Sports", "Video Games", "Travelling"];

	const listStyle = {
		listStyleType: "- ",
	};

	return (
		<div className="tab-panel" data-tab="overview">
			<div className="flex flex-col gap-4">
				<p>
					Gledrian is a Software Engineer based in Madrid, Spain,
					where he earned his bachelor's degree in Software
					Engineering from Rey Juan Carlos University.
				</p>
				<p>
					Beyond coding, he loves sports, video games, and traveling.
				</p>
			</div>
		</div>
	);
};

export default Overview;
