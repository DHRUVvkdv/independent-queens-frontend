"use client";
import React, { useEffect, useRef, useState } from "react";
import { SidebarNav } from "@/components/Sidebar";
import { softerWhiteHex } from "@/lib/Colors";
import ThreeScript from "@/components/ThreeScript";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [vantaEffect, setVantaEffect] = useState<any>(null);
	const vantaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Check if Vanta is loaded
		const initVanta = () => {
			if (!vantaEffect && vantaRef.current) {
				if (typeof window !== "undefined" && window.VANTA) {
					const effect = window.VANTA.BIRDS({
						el: vantaRef.current,
						mouseControls: false, // Turn off mouse controls for less distraction
						touchControls: false, // Turn off touch controls
						gyroControls: false,
						minHeight: 200.0,
						minWidth: 200.0,
						scale: 1.0,
						scaleMobile: 1.0,
						backgroundColor: softerWhiteHex, // Softer white background
						color1: 0xa78bfa, // Lighter violet for subtle contrast
						color2: 0xc084fc, // Softer purple for bird highlights
						birdSize: 5.8, // Smaller birds for subtle presence
						wingSpan: 16.0, // Reduced wing span to limit movement
						separation: 50.0, // Slightly higher separation to reduce clutter
						alignment: 50.0,
						cohesion: 60.0,
						quantity: 2.0, // Fewer birds for a minimal appearance
					});
					setVantaEffect(effect);
				}
			}
		};

		// Try to initialize immediately
		initVanta();

		// If not loaded yet, set up an interval to check
		const checkInterval = setInterval(() => {
			// @ts-ignore
			if (typeof window !== "undefined" && window.VANTA) {
				initVanta();
				clearInterval(checkInterval);
			}
		}, 100);

		// Cleanup
		return () => {
			if (vantaEffect) vantaEffect.destroy();
			clearInterval(checkInterval);
		};
	}, [vantaEffect]);

	return (
		<>
			<ThreeScript />
			<div ref={vantaRef} className="absolute inset-0 -z-10" />
			<SidebarNav />
			<div id="container" className="ml-16 min-h-screen">
				{children}
			</div>
		</>
	);
}
