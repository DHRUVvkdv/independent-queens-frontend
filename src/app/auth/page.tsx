"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import ThreeScript from "@/components/ThreeScript";

export default function AuthPage() {
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
						wingSpan: 50.0,
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
		<div className="min-h-screen w-full">
			<div className="grid lg:grid-cols-2 h-full min-h-screen">
				{/* Left Column - Sign In Form */}
				<div className="p-8">
					<div className="flex items-center gap-2 mb-12">
						<Image
							src="/vercel.svg"
							alt="UntitledUI Logo"
							width={32}
							height={32}
							className="rounded"
						/>
						<span className="font-semibold">IndependentQueens</span>
					</div>

					<div className="flex  justify-center items-center h-[80%]">
						<AuthModal />
					</div>
				</div>

				{/* Right Column - Feature Showcase */}
				<div className="relative hidden lg:block bg-gradient-to-br">
					<ThreeScript />
					<div ref={vantaRef} className="absolute inset-0 -z-10" />
				</div>
			</div>
		</div>
	);
}
