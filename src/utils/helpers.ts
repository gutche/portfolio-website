export const updateCrtDisplay = (
	imageUrl: string,
	title: string,
	subText: string
) => {
	const crtContainer = document.querySelector(".crt-container");
	const mobileCrtContainer = document.querySelector(".crt-container-mobile");
	if (
		(crtContainer as any).crtEffect.originalText === title.toUpperCase() ||
		(mobileCrtContainer as any).crtEffect.originalText ===
			title.toUpperCase()
	) {
		return;
	}

	if (crtContainer && (crtContainer as any).crtEffect) {
		(crtContainer as any).crtEffect.updateImage(imageUrl);
		(crtContainer as any).crtEffect.updateText(title, subText);
	}

	if (mobileCrtContainer && (mobileCrtContainer as any).crtEffect) {
		(mobileCrtContainer as any).crtEffect.updateImage(imageUrl);
		(mobileCrtContainer as any).crtEffect.updateText(title, subText);
	}
};

export const handleTabSwitch = (
	tabButtons: NodeListOf<Element>,
	tabPanels: NodeListOf<Element>,
	targetTab: string
) => {
	tabButtons.forEach((btn) => {
		btn.classList.remove("opacity-100");
		btn.classList.remove("max-md:border-gray-400");
		btn.setAttribute("aria-selected", "false");
	});

	const activeButton = document.querySelector(
		`.tab-button[data-tab="${targetTab}"]`
	);
	if (activeButton) {
		activeButton.classList.add("opacity-100");
		activeButton.classList.add("max-md:border-gray-400");
		activeButton.setAttribute("aria-selected", "true");
	}

	tabPanels.forEach((panel) => {
		panel.classList.add("hidden");
	});

	const activePanel = document.querySelector(
		`.tab-panel[data-tab="${targetTab}"]`
	);
	if (activePanel) {
		activePanel.classList.remove("hidden");
	}
};

export const playAudio = (
	audioElement: HTMLAudioElement,
	indicatorElement: HTMLElement,
	isPlaying: boolean
) => {
	if (isPlaying) {
		audioElement.pause();
		indicatorElement.classList.remove(
			"shadow-[0_0_10.4px_#00FF0A,0_0_3.2px_#00FF0A,0_0_3.2px_#00FF0A]"
		);
		indicatorElement.classList.add(
			"shadow-[0_0_10.4px_#FF0000,0_0_3.2px_#FF0000,0_0_3.2px_#FF0000]"
		);
	} else {
		audioElement.volume = 0.8;
		const playPromise = audioElement.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					indicatorElement.classList.remove(
						"shadow-[0_0_10.4px_#FF0000,0_0_3.2px_#FF0000,0_0_3.2px_#FF0000]"
					);
					indicatorElement.classList.add(
						"shadow-[0_0_10.4px_#00FF0A,0_0_3.2px_#00FF0A,0_0_3.2px_#00FF0A]"
					);
				})
				.catch((error) => {
					console.error("Error playing audio:", error);
				});
		}
	}
};
