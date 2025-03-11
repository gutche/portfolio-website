import * as THREE from "three";
import { TextRenderer } from "./TextRenderer";
import { vertexShader, fragmentShader } from "./shaders";

interface DisplayParams {
	image?: string;
	title: string;
	description: string | null;
}

export class CRTEffectClass {
	container: HTMLElement;
	width: number;
	height: number;
	scene: THREE.Scene = new THREE.Scene();
	camera: THREE.OrthographicCamera = new THREE.OrthographicCamera();
	renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
	material: THREE.ShaderMaterial = new THREE.ShaderMaterial();
	textRenderer: TextRenderer = new TextRenderer();
	animationFrameId: number | null = null;
	disposed: boolean = false;

	constructor(container: HTMLElement, displayParams: DisplayParams) {
		this.container = container;
		this.width = Math.max(container.clientWidth, 1);
		this.height = Math.max(container.clientHeight, 1);

		this.setupScene();
		this.loadImage(displayParams);
		this.setupResizeListener();
	}

	loadImage(displayParams: DisplayParams) {
		const { image, title, description } = displayParams;

		// Stop existing animation if any
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		// Recreate textRenderer instead of reusing
		this.textRenderer = new TextRenderer();
		const textTexture = this.textRenderer.createTextTexture(
			title,
			description
		);

		// Set text texture in the material
		if (this.material.uniforms.tText) {
			// Dispose previous texture if it exists to prevent memory leaks
			const oldTexture = this.material.uniforms.tText.value;
			if (oldTexture && oldTexture instanceof THREE.Texture) {
				oldTexture.dispose();
			}
		}

		this.material.uniforms.tText = { value: textTexture };

		// Load the image if provided
		if (image) {
			const loader = new THREE.TextureLoader();
			loader.load(image, (texture) => {
				if (this.disposed) return; // Guard against async callbacks after disposal

				// Dispose previous texture if it exists
				if (
					this.material.uniforms.tDiffuse &&
					this.material.uniforms.tDiffuse.value
				) {
					const oldTexture = this.material.uniforms.tDiffuse.value;
					if (oldTexture instanceof THREE.Texture) {
						oldTexture.dispose();
					}
				}

				this.setupTexture(texture);
				this.startAnimation();
			});
		} else {
			this.startAnimation();
		}
	}

	private setupTexture(texture: THREE.Texture) {
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;

		this.material.uniforms.tDiffuse = { value: texture };
	}

	setupScene() {
		// Create new scene
		this.scene = new THREE.Scene();

		// Setup camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
		this.camera.position.z = 1;

		this.setupRenderer();
		this.setupMaterial();

		// Create plane geometry
		const geometry = new THREE.PlaneGeometry(2, 2);
		const plane = new THREE.Mesh(geometry, this.material);
		this.scene.add(plane);
	}

	private setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
			alpha: false,
			premultipliedAlpha: false,
			powerPreference: "high-performance", // Hint to use discrete GPU
		});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio to prevent performance issues
		this.renderer.setClearColor(0x000000, 1);

		// Append to DOM
		this.container.appendChild(this.renderer.domElement);
	}

	private setupMaterial() {
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				tDiffuse: { value: null },
				tText: { value: null },
				time: { value: 0.0 },
				sIntensity: { value: 0.7 },
				sCount: { value: 1200 },
				nIntensity: { value: 0.2 },
				vIntensity: { value: 0.4 },
				brightness: { value: 1.1 },
				scanSpeed: { value: 0.25 },
				scanWidth: { value: 0.03 },
				pixelShift: { value: 0.025 },
			},
			vertexShader,
			fragmentShader,
			transparent: false,
		});
	}

	startAnimation() {
		if (this.disposed) return;
		this.animate();
	}

	animate() {
		if (this.disposed) return;

		this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
		const time = performance.now() / 1000;
		this.material.uniforms.time.value = time;

		// Instead of trying to update the existing texture, create a new one
		if (this.textRenderer.shouldUpdateTextTexture()) {
			// Create a fresh texture with the updated canvas
			const newTexture = new THREE.CanvasTexture(
				this.textRenderer.getCanvas()
			);

			// Dispose the old texture properly
			const oldTexture = this.material.uniforms.tText.value;
			if (oldTexture && oldTexture instanceof THREE.Texture) {
				oldTexture.dispose();
			}

			// Set the new texture
			this.material.uniforms.tText.value = newTexture;
		}

		// Render the scene
		this.renderer.render(this.scene, this.camera);
	}

	setupResizeListener() {
		const debouncedUpdate = this.debounce(() => {
			this.updateSize();
		}, 100);

		if (typeof ResizeObserver !== "undefined") {
			const resizeObserver = new ResizeObserver(() => {
				debouncedUpdate();
			});
			resizeObserver.observe(this.container);
		} else {
			window.addEventListener("resize", () => {
				debouncedUpdate();
			});
		}
	}

	private debounce(func: Function, wait: number) {
		let timeout: number | null = null;
		return (...args: any[]) => {
			if (timeout !== null) {
				window.clearTimeout(timeout);
			}
			timeout = window.setTimeout(() => {
				func.apply(this, args);
				timeout = null;
			}, wait);
		};
	}

	updateSize() {
		if (this.disposed) return;

		this.width = Math.max(this.container.clientWidth, 1);
		this.height = Math.max(this.container.clientHeight, 1);
		this.renderer.setSize(this.width, this.height);
	}

	dispose() {
		this.disposed = true;

		// Cancel any pending animation frame
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		// Remove renderer from DOM
		if (this.renderer.domElement.parentNode) {
			this.renderer.domElement.parentNode.removeChild(
				this.renderer.domElement
			);
		}

		// Dispose textures
		if (
			this.material.uniforms.tDiffuse &&
			this.material.uniforms.tDiffuse.value
		) {
			const texture = this.material.uniforms.tDiffuse.value;
			if (texture instanceof THREE.Texture) {
				texture.dispose();
			}
		}

		if (
			this.material.uniforms.tText &&
			this.material.uniforms.tText.value
		) {
			const texture = this.material.uniforms.tText.value;
			if (texture instanceof THREE.Texture) {
				texture.dispose();
			}
		}

		// Dispose materials and geometry
		this.scene.traverse((object) => {
			if (object instanceof THREE.Mesh) {
				if (object.geometry) {
					object.geometry.dispose();
				}

				if (object.material) {
					if (Array.isArray(object.material)) {
						object.material.forEach((material) => {
							if (material.map) material.map.dispose();
							material.dispose();
						});
					} else {
						if (object.material.map) object.material.map.dispose();
						object.material.dispose();
					}
				}
			}
		});

		// Dispose renderer
		this.renderer.dispose();

		// Clear references
		this.scene = new THREE.Scene();
		this.textRenderer = new TextRenderer();
	}
}
