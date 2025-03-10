import { useEffect, useState } from "react";
import { isMuted } from "../stores/globalStore";
import { useStore } from "@nanostores/react";

const Buttons = () => {
	const [isOverlayHidden, setIsOverlayHidden] = useState(false);
	const $isMuted = useStore(isMuted);

	useEffect(() => {
		const bgAudio = document.getElementById("bgAudio")! as HTMLAudioElement;
		if ($isMuted) {
			bgAudio.pause();
		} else {
			bgAudio.volume = 0.8;
			bgAudio.play();
		}
	}, [$isMuted]);

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-neutral-900 p-2 md:relative md:p-0 md:border-none md:bg-transparent md:mt-auto md:bottom-auto">
			<div className="absolute top-0 left-0 right-0 w-full md:hidden">
				<div className="h-px bg-white w-full opacity-10"></div>
				<div className="h-px bg-black w-full"></div>
			</div>
			<div className="relative flex gap-0.5 p-0.5 w-full">
				<div className="flex-1">
					<div className="absolute inset-0 bg-black z-0 blur-[1px] shadow-[0_1px_1px_rgba(255,255,255,0.3)] rounded-[6px]"></div>
					<a
						href="https://mail.google.com/mail/?view=cm&fs=1&to=gledrian.dev@gmail.com&su=Hey%20Gledrian!"
						target="_blank"
						rel="noopener noreferrer"
						className="z-10 relative p-2 bg-neutral-900 w-full h-14 shadow-[inset_0_-1px_4px_rgba(0,0,0,0.45),_inset_0_1px_2px_rgba(255,255,255,0.3)] rounded-[4px] focus active:shadow-[inset_0_-1px_4px_rgba(0,0,0,0.45)] active:scale-[0.99] transition-all duration-200 block">
						<div className="h-full w-full flex items-center justify-center rounded-full bg-neutral-900 blur-[2px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),_0_5px_4px_rgba(0,0,0,0.75)]"></div>
						<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base uppercase pt-1 whitespace-nowrap">
							Send an email
						</span>
					</a>
				</div>
				<div className="w-14">
					<div className="absolute inset-0 bg-black z-0 blur-[1px] shadow-[0_1px_1px_rgba(255,255,255,0.3)] rounded-[6px]"></div>
					<button
						onClick={() => isMuted.set(!$isMuted)}
						className="z-10 relative p-2 bg-neutral-900 w-full h-14 shadow-[inset_0_-1px_4px_rgba(0,0,0,0.45),_inset_0_1px_2px_rgba(255,255,255,0.3)] rounded-[4px] focus active:shadow-[inset_0_-1px_4px_rgba(0,0,0,0.45)] active:scale-[0.99] transition-all duration-200 ">
						<div className="h-full w-full flex items-center justify-center rounded-full bg-neutral-900 blur-[2px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),_0_5px_4px_rgba(0,0,0,0.75)]"></div>
						<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base uppercase pt-1 whitespace-nowrap">
							<svg
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="16"
								height="16">
								<path
									d="M11 2h2v20h-2v-2H9v-2h2V6H9V4h2V2zM7 8V6h2v2H7zm0 8H3V8h4v2H5v4h2v2zm0 0v2h2v-2H7zm10-6h-2v4h2v-4zm2-2h2v8h-2V8zm0 8v2h-4v-2h4zm0-10v2h-4V6h4z"
									fill="currentColor"></path>
							</svg>
						</span>
						<span
							className={`${
								$isMuted
									? "shadow-[0_0_10.4px_#FF0000,0_0_3.2px_#FF0000,0_0_3.2px_#FF0000]"
									: "shadow-[0_0_10.4px_#00FF0A,0_0_3.2px_#00FF0A,0_0_3.2px_#00FF0A]"
							} absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FFF9FB] rounded-full blur-[0.4px] `}></span>
					</button>
				</div>
			</div>
			<div
				className={`${
					isOverlayHidden ? "hidden" : ""
				} fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center`}>
				<div className="bg-neutral-900 p-4 rounded-lg max-w-md mx-8 border border-neutral-800 shadow-2xl">
					<h2 className="text-2xl mb-6 text-center">
						Audio Experience
					</h2>
					<p className="text-neutral-400 mb-8 text-center">
						This site features an immersive audio experience with
						retro sound effects. Would you like to enable audio?
						(Recommended)
					</p>
					<div className="flex gap-4 justify-center">
						<button
							onClick={() => {
								isMuted.set(!$isMuted);
								setIsOverlayHidden(true);
							}}
							className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors duration-200 flex items-center gap-2">
							Enable Audio
						</button>
						<button
							onClick={() => setIsOverlayHidden(true)}
							className="px-6 py-3 bg-transparent hover:bg-neutral-800 rounded-md transition-colors duration-200 border border-neutral-700">
							Continue Without Audio
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Buttons;
