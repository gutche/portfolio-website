import CrtEffect from "./crt/CrtEffect";

const DeskTopCrt = () => {
	const outerDivStyles: React.CSSProperties = {
		position: "relative",
		width: "85%",
		paddingBottom: "85%",
		margin: "0 auto",
	};

	const innerDivStyles: React.CSSProperties = {
		position: "absolute",
		top: "0",
		right: "0",
		bottom: "0",
		left: "0",
	};

	return (
		<div className="hidden flex-1 md:flex items-center">
			<div style={outerDivStyles}>
				<div style={innerDivStyles}>
					<div className="relative h-full w-full">
						<img
							alt="monitor"
							loading="eager"
							decoding="async"
							className="absolute inset-0 w-full h-full z-10"
							sizes="100vw"
							src="/images/crt.png"
						/>

						<div className="absolute inset-[5%] rounded-3xl overflow-hidden z-5">
							<CrtEffect />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeskTopCrt;
