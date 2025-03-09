import * as THREE from "three";

export class TextRenderer {
	textCanvas: HTMLCanvasElement | null = null;
	originalText: string = "";
	originalSubText: string = "";
	currentText: string = "";
	currentSubText: string = "";
	subText: string | null = null;
	charsToReveal: Set<number> = new Set();
	subCharsToReveal: Set<number> = new Set();
	lastUpdateTime: number = 0;
	updateInterval: number = 20;
	animationStartTime: number = 0;
	animationDuration: number = 1500;

	createTextTexture(
		text: string,
		subText: string | null
	): THREE.CanvasTexture {
		// Create a canvas for text
		const canvas = document.createElement("canvas");
		canvas.width = 512;
		canvas.height = 512;
		const ctx = canvas.getContext("2d");

		if (ctx) {
			// Clear with transparent background
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Position text at bottom with padding
			const bottomPadding = 40;
			const leftPadding = 40;
			const boxWidth = canvas.width - leftPadding * 2;

			// Draw text box border with margin
			ctx.strokeStyle = "white";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.rect(
				leftPadding,
				canvas.height - bottomPadding - 80,
				boxWidth,
				70
			);
			ctx.stroke();

			// Store original text for animation
			this.originalText = text.toUpperCase();
			this.originalSubText = subText ? subText.toUpperCase() : "";
			this.currentText = Array(text.length).fill("_").join("");
			this.currentSubText = subText
				? Array(subText.length).fill("_").join("")
				: "";
			this.lastUpdateTime = 0;
			this.charsToReveal = new Set();
			this.subCharsToReveal = new Set();
			this.animationStartTime = performance.now();

			// Draw main text with VT323 font
			ctx.fillStyle = "white";
			ctx.font = "28px VT323";
			ctx.fillText(
				this.currentText,
				leftPadding + 20,
				canvas.height - bottomPadding - 45
			);

			// Draw horizontal line below main text
			ctx.beginPath();
			ctx.moveTo(leftPadding + 10, canvas.height - bottomPadding - 40);
			ctx.lineTo(
				leftPadding + boxWidth - 10,
				canvas.height - bottomPadding - 40
			);
			ctx.stroke();

			// Draw subtext if provided with VT323 font
			if (subText) {
				ctx.font = "20px VT323";
				ctx.fillText(
					this.currentSubText,
					leftPadding + 20,
					canvas.height - bottomPadding - 20
				);
			}

			// Store canvas for updates
			this.textCanvas = canvas;
			this.subText = subText;
		}

		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		return texture;
	}

	updateTextTexture() {
		if (!this.textCanvas) return;

		const now = performance.now();
		if (now - this.lastUpdateTime < this.updateInterval) return;
		this.lastUpdateTime = now;

		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let textArray = this.currentText.split("");
		let subTextArray = this.currentSubText.split("");

		// Calculate progress based on time
		const progress = Math.min(
			(now - this.animationStartTime) / this.animationDuration,
			1
		);
		const targetRevealed = Math.floor(progress * this.originalText.length);
		const targetSubRevealed = Math.floor(
			progress * this.originalSubText.length
		);

		// Reveal characters based on progress
		this.updateCharReveal(targetRevealed, targetSubRevealed);

		// Update text arrays
		this.updateTextArrays(textArray, subTextArray, chars);

		this.currentText = textArray.join("");
		this.currentSubText = subTextArray.join("");

		// Update canvas
		this.redrawCanvas();
	}

	private updateCharReveal(
		targetRevealed: number,
		targetSubRevealed: number
	) {
		// Reveal characters for main text
		while (this.charsToReveal.size < targetRevealed) {
			let availableIndices = Array.from(
				Array(this.originalText.length).keys()
			).filter((i) => !this.charsToReveal.has(i));

			if (availableIndices.length > 0) {
				let randomIndex =
					availableIndices[
						Math.floor(Math.random() * availableIndices.length)
					];
				this.charsToReveal.add(randomIndex);
			}
		}

		// Reveal characters for subtext
		while (this.subCharsToReveal.size < targetSubRevealed) {
			let availableIndices = Array.from(
				Array(this.originalSubText.length).keys()
			).filter((i) => !this.subCharsToReveal.has(i));

			if (availableIndices.length > 0) {
				let randomIndex =
					availableIndices[
						Math.floor(Math.random() * availableIndices.length)
					];
				this.subCharsToReveal.add(randomIndex);
			}
		}
	}

	private updateTextArrays(
		textArray: string[],
		subTextArray: string[],
		chars: string
	) {
		// Update main text
		for (let i = 0; i < textArray.length; i++) {
			if (this.charsToReveal.has(i)) {
				textArray[i] = this.originalText[i];
			} else if (Math.random() < 0.5) {
				textArray[i] = chars[Math.floor(Math.random() * chars.length)];
			}
		}

		// Update subtext
		for (let i = 0; i < subTextArray.length; i++) {
			if (this.subCharsToReveal.has(i)) {
				subTextArray[i] = this.originalSubText[i];
			} else if (Math.random() < 0.5) {
				subTextArray[i] =
					chars[Math.floor(Math.random() * chars.length)];
			}
		}
	}

	private redrawCanvas() {
		if (!this.textCanvas) return;

		const ctx = this.textCanvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height);

		// Redraw box and text
		const bottomPadding = 40;
		const leftPadding = 40;
		const boxWidth = this.textCanvas.width - leftPadding * 2;

		ctx.strokeStyle = "white";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.rect(
			leftPadding,
			this.textCanvas.height - bottomPadding - 80,
			boxWidth,
			70
		);
		ctx.stroke();

		ctx.fillStyle = "white";
		ctx.font = "28px VT323";
		ctx.fillText(
			this.currentText,
			leftPadding + 20,
			this.textCanvas.height - bottomPadding - 45
		);

		// Draw line and subtext
		ctx.beginPath();
		ctx.moveTo(
			leftPadding + 10,
			this.textCanvas.height - bottomPadding - 40
		);
		ctx.lineTo(
			leftPadding + boxWidth - 10,
			this.textCanvas.height - bottomPadding - 40
		);
		ctx.stroke();

		if (this.subText) {
			ctx.font = "20px VT323";
			ctx.fillText(
				this.currentSubText,
				leftPadding + 20,
				this.textCanvas.height - bottomPadding - 20
			);
		}
	}
}
