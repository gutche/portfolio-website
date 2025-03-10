const Overview = () => {
	return (
		<div className="tab-panel" data-tab="overview">
			<div className="flex flex-col gap-4">
				<p className="text-base">
					Gledrian is a Software Engineer with an unhealthy obession
					for tech and sports.
				</p>
				<p className="text-base">
					<a
						href="https:/github.com/gutche"
						target="_blank"
						className="tab-link text-primary border-b border-dotted">
						Read full CV
					</a>
				</p>
			</div>
		</div>
	);
};

export default Overview;
