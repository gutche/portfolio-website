import { career } from "../../data/career";

const Career = () => {
	return (
		<div className="tab-panel" data-tab="career">
			<div className="flex flex-col">
				<h3 className="mb-2">Career timeline:</h3>
				<div className="timeline-container relative">
					{career.map((entry, index) => (
						<div
							key={index}
							className="timeline-item relative pl-4 pb-6 border-l border-dotted border-neutral-500 ">
							<div className="timeline-dot absolute left-1 top-2 w-1 h-1 bg-white rounded-full -translate-x-1.5" />
							<div className="timeline-content">
								<div className="text-sm text-neutral-400">
									{entry.period}
								</div>
								<div className="font-medium">
									{entry.description}
								</div>
								<div className="text-sm text-neutral-400">
									{entry.institution}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Career;
