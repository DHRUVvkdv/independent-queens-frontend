"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OnboardingModal from "./OnboardingModal";
import { getUserByEmail, signIn } from "@/types/user";
import { useUser } from "@/provider/userProvider";
import { useRouter } from "next/navigation";

export default function SignInModal() {
	const router = useRouter();
	const { setUser } = useUser();
	const [selectedSignIn, setSelectedSignIn] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onToggle = () => {
		setSelectedSignIn(!selectedSignIn);
	};

	const handleSignIn = async () => {
		const response = await signIn(email, password);
		if (response?.status !== 200) {
			setError("Invalid Sign In Information");
			return;
		}
		const newResponse = await getUserByEmail(email);
		console.log(newResponse)
		if (newResponse) {
			const email = newResponse.data.email;
			document.cookie = `userEmail=${email}; path=/;`;
			setUser(newResponse.data);
			router.push("/g/profile");
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto px-4">
			{!showOnboarding ? (
				<>
					<h1 className="text-4xl font-semibold mb-3">
						{selectedSignIn ? "Sign in " : "Sign Up"}
					</h1>
					<p className="text-muted-foreground mb-8">
						{selectedSignIn
							? "Enter your password to access your account."
							: "Please fill in the required information down below Queen!"}
					</p>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<div className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="email" className="block font-medium">
								Email
							</label>
							<Input
								type="email"
								id="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password" className="block font-medium">
								Password
							</label>
							<Input
								type="password"
								id="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button
							className="w-full"
							onClick={() => {
								// SIGN UP
								if (!selectedSignIn) {
									// Check if email and password fields are filled
									if (email.trim() && password.trim()) {
										setShowOnboarding(true);
									} else {
										setError("Please fill in all fields.");
									}
								}
								// SIGN IN
								else {
									handleSignIn();
								}
							}}
						>
							{selectedSignIn ? "Sign in" : "Sign Up"}
						</Button>
					</div>

					<div className="mt-8 text-sm text-center text-muted-foreground">
						<div className="mb-5">
							{selectedSignIn ? "Need an account?" : "Have an account?"}{" "}
						</div>
						<div onClick={onToggle} className="cursor-pointer">
							{selectedSignIn ? "Sign up here" : "Sign in here"}
						</div>
					</div>
				</>
			) : (
				<OnboardingModal email={email} password={password} />
			)}
		</div>
	);
}
