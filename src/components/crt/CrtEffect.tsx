import { useEffect, useRef } from "react";
import { displayParams } from "../../stores/globalStore";
import { useStore } from "@nanostores/react";
import { CRTEffectClass } from "./CrtEffectEngine";

const CrtEffect = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const $displayParams = useStore(displayParams);

	useEffect(() => {
		if (!containerRef.current) return;
		const effectInstance = new CRTEffectClass(
			containerRef.current,
			$displayParams
		);

		return () => {
			// Cleanup
			if (
				containerRef.current &&
				containerRef.current.contains(
					effectInstance.renderer.domElement
				)
			) {
				containerRef.current.removeChild(
					effectInstance.renderer.domElement
				);
			}
			effectInstance.renderer.dispose();
		};
	}, [$displayParams]);

	return <div ref={containerRef} className="absolute z-5 inset-0" />;
};

export default CrtEffect;
