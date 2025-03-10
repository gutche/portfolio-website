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
