"use client";

import { useEffect, useState } from "react";

export default function ThreeScript() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			const loadScripts = async () => {
				// Load Three.js first
				const threeScript = document.createElement("script");
				threeScript.src =
					"https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
				await new Promise((resolve) => {
					threeScript.onload = resolve;
					document.head.appendChild(threeScript);
				});

				// Then load Vanta
				const vantaScript = document.createElement("script");
				vantaScript.src =
					"https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js";
				await new Promise((resolve) => {
					vantaScript.onload = resolve;
					document.head.appendChild(vantaScript);
				});

				setLoaded(true);
			};

			loadScripts();
		}

		return () => {
			// Cleanup if needed
			const scripts = document.querySelectorAll("script");
			scripts.forEach((script) => {
				if (
					script.src.includes("three.min.js") ||
					script.src.includes("vanta.birds.min.js")
				) {
					script.remove();
				}
			});
		};
	}, [loaded]);

	return null;
}
