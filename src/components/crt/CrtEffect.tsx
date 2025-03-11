import { useEffect, useRef } from "react";
import { displayParams } from "../../stores/globalStore";
import { useStore } from "@nanostores/react";
import { CRTEffectClass } from "./CrtEffectEngine";

const CrtEffect = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const effectInstanceRef = useRef<CRTEffectClass | null>(null);
	const $displayParams = useStore(displayParams);

	useEffect(() => {
		if (!containerRef.current) return;

		// Create the effect instance if it doesn't exist
		if (!effectInstanceRef.current) {
			effectInstanceRef.current = new CRTEffectClass(
				containerRef.current,
				$displayParams
			);
		} else {
			// Instead of just updating the image, dispose and recreate
			// to prevent WebGL context leaks
			effectInstanceRef.current.dispose();
			effectInstanceRef.current = new CRTEffectClass(
				containerRef.current,
				$displayParams
			);
		}

		return () => {
			// Clean up on unmount
			if (effectInstanceRef.current) {
				effectInstanceRef.current.dispose();
				effectInstanceRef.current = null;
			}
		};
	}, [$displayParams]);

	return <div ref={containerRef} className="absolute z-5 inset-0" />;
};

export default CrtEffect;
