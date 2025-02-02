"use client";

import { useEffect, useRef, useState } from "react";
import ThreeScript from "@/components/ThreeScript";
import FeatureCarousel from "@/components/FeatureCarousel";
import Link from "next/link";

export default function Home() {
	const [vantaEffect, setVantaEffect] = useState<any>(null);
	const vantaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Check if Vanta is loaded
		const initVanta = () => {
			if (!vantaEffect && vantaRef.current) {
				if (typeof window !== "undefined" && window.VANTA) {
					const effect = window.VANTA.BIRDS({
						el: vantaRef.current,
						mouseControls: true,
						touchControls: true,
						gyroControls: false,
						minHeight: 200.0,
						minWidth: 200.0,
						scale: 1.0,
						scaleMobile: 1.0,
						backgroundColor: 0xf8f7ff, // Keep the same light background
						color1: 0x6d28d9, // Darker violet (violet-700)
						color2: 0x7e22ce, // Purple-700 for darker birds
						birdSize: 1.5,
						wingSpan: 20.0,
						separation: 40.0,
						alignment: 40.0,
						cohesion: 40.0,
						quantity: 4.0,
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
		<div className="relative min-h-screen">
			<ThreeScript />
			<div ref={vantaRef} className="absolute inset-0 -z-10" />

			{/* Navigation */}
			<nav className="absolute top-0 w-full p-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500">
					HerSpace
				</h1>
				<Link
					className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors font-medium"
					href={"/auth"}
				>
					Sign In
				</Link>
			</nav>

			{/* Hero Section */}
			<main className="relative pt-32 pb-16 px-8 max-w-7xl mx-auto overflow-hidden">
				<div className="text-center space-y-6">
					{" "}
					{/* Changed from space-y-8 to space-y-6 */}
					<div className="mx-auto max-w-5xl px-4">
						<h2 className="text-4xl md:text-[42px] font-bold text-gray-800 leading-tight tracking-normal">
							Empowering Women Through
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500 py-1">
								Technology & Community
							</span>
						</h2>
					</div>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Join our platform designed to help you manage time, track health, maintain
						emotional well-being, and connect with an amazing community.
					</p>
					<div className="flex justify-center mb-2">
						{" "}
						{/* Changed from mb-4 to mb-2 */}
						<button className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-lg font-medium">
							Join the Community
						</button>
					</div>
				</div>

				{/* Feature Highlights */}
				<FeatureCarousel />
			</main>
		</div>
	);
}
