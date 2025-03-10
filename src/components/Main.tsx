import { useState, useEffect, useRef } from "react";
import Buttons from "./Buttons";
import CrtEffect from "./crt/CrtEffect";
import Header from "./Header";
import Career from "./tabs/Career";
import Overview from "./tabs/Overview";
import Projects from "./tabs/Projects";
import Skills from "./tabs/Skills";
import Links from "./tabs/Links";
import { useStore } from "@nanostores/react";
import { isMuted } from "../stores/globalStore";
import { updateDisplay } from "../utils/DisplayUpdater";
import { displays } from "../data/displays";

const tabs = [
	{ id: "overview", label: "Overview", component: <Overview /> },
	{ id: "skills", label: "Skills", component: <Skills /> },
	{ id: "projects", label: "Projects", component: <Projects /> },
	{ id: "career", label: "Career", component: <Career /> },
	{ id: "links", label: "Links", component: <Links /> },
];

const Main = () => {
	const [activeTab, setActiveTab] = useState("overview");
	const clickSoundRef = useRef<HTMLAudioElement | null>(null);
	const $isMuted = useStore(isMuted);

	useEffect(() => {
		clickSoundRef.current = new Audio("src/assets/click.wav");
		clickSoundRef.current.volume = 0.2;
	}, []);

	const playClickSound = () => {
		if (clickSoundRef.current && !$isMuted) {
			clickSoundRef.current.currentTime = 0;
			clickSoundRef.current.play();
		}
	};

	const handleTabClick = (tabId: string) => {
		if (tabId === activeTab) return;
		playClickSound();
		updateDisplay(tabId !== "projects" ? displays[0] : displays[1]);
		setActiveTab(tabId);
	};

	return (
		<div className="flex-1 w-full md:max-w-[500px]">
			<div className="p-3 pb-24 md:p-4 flex flex-col h-full">
				<Header />
				<div className="flex flex-col gap-2 flex-1 overflow-hidden">
					<p className="text-base hidden md:block">INFORMATION</p>
					<div className="min-h-4 md:min-h-8 w-full lines mb-1"></div>
					<div className="flex flex-col gap-3 md:flex-row md:gap-8 min-h-0">
						<div className="flex md:flex-col gap-2">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									className={`tab-button relative text-left text-uppercase whitespace-nowrap uppercase text-sm opacity-50 focus ${
										activeTab === tab.id
											? "opacity-100"
											: ""
									}`}
									onClick={() => handleTabClick(tab.id)}>
									{tab.label}
								</button>
							))}
						</div>
						<div className="w-full z-0 md:hidden">
							<div className="relative w-full aspect-square max-w-xs mx-auto">
								<img
									alt="monitor"
									loading="eager"
									decoding="async"
									className="absolute inset-0 w-full h-full z-10"
									src="/images/crt.png"
								/>
								<div className="absolute inset-[5%] rounded-2xl overflow-hidden z-5">
									<CrtEffect />
								</div>
							</div>
						</div>
						<div id="tab-content" className="w-full">
							{
								tabs.find((tab) => tab.id === activeTab)
									?.component
							}
						</div>
					</div>
				</div>
				<Buttons />
			</div>
		</div>
	);
};

export default Main;
