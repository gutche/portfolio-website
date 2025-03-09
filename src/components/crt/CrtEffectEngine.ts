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

	constructor(container: HTMLElement, displayParams: DisplayParams) {
		this.container = container;
		this.width = Math.max(container.clientWidth, 1);
		this.height = Math.max(container.clientHeight, 1);

		this.setupScene();
		this.loadImage(displayParams);
		this.setupResizeListener();
	}

	private loadImage(displayParams: DisplayParams) {
		const { image, title, description } = displayParams;

		if (image) {
			const loader = new THREE.TextureLoader();
			loader.load(image, (texture) => {
				this.setupTexture(texture);

				const textTexture = this.textRenderer.createTextTexture(
					title,
					description
				);
				this.material.uniforms.tText = {
					value: textTexture,
				};

				this.animate();
			});
		} else {
			this.animate();
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
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
		this.camera.position.z = 1;

		this.setupRenderer();
		this.setupMaterial();

		const geometry = new THREE.PlaneGeometry(2, 2);
		const plane = new THREE.Mesh(geometry, this.material);
		this.scene.add(plane);
		this.container.classList.add("loaded");
	}

	private setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
			alpha: false,
			premultipliedAlpha: false,
		});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setClearColor(0x000000, 1);
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

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		const time = performance.now() / 1000;
		this.material.uniforms.time.value = time;

		// Update text animation
		this.textRenderer.updateTextTexture();

		if (this.material.uniforms.tText && this.textRenderer.textCanvas) {
			this.material.uniforms.tText.value.needsUpdate = true;
		}

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
		this.width = Math.max(this.container.clientWidth, 1);
		this.height = Math.max(this.container.clientHeight, 1);
		this.renderer.setSize(this.width, this.height);
	}
}
