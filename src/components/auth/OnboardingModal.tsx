import { skillCategories } from "@/data/skills";
import { Plus, Badge, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { getUserByEmail, signUp, UserSignUp } from "@/types/user";
import { useUser } from "@/provider/userProvider";
import { useRouter } from "next/navigation";

export default function OnboardingModal({ email, password }: { email: string; password: string }) {
	const { setUser } = useUser();
	const router = useRouter();
	const [step, setStep] = useState(0);

	const [onboardingData, setOnboardingData] = useState<UserSignUp>({
		email: email,
		password: password,
		first_name: "",
		last_name: "",
		age: 0,
		profession: "",
		skills: [],
		interests: [],
		university: "",
	});

	const [skillSearch, setSkillSearch] = useState("");

	const handleNext = () => {
		setStep((prev) => prev + 1);
	};

	const handlePrev = () => {
		setStep((prev) => (prev > 0 ? prev - 1 : 0));
	};

	const handleChange = (field: string, value: string | string[]) => {
		setOnboardingData({ ...onboardingData, [field]: value });
	};

	const handleAddSkill = (skill: string) => {
		if (!onboardingData.skills.includes(skill)) {
			setOnboardingData({ ...onboardingData, skills: [...onboardingData.skills, skill] });
		}
	};

	const handleRemoveSkill = (skill: string) => {
		setOnboardingData({
			...onboardingData,
			skills: onboardingData.skills.filter((s) => s !== skill),
		});
	};

	const filteredSkills = Object.values(skillCategories)
		.flat()
		.filter((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase()));

	const steps = [
		<div key="name-step" className="w-full">
			<h2 className="text-2xl font-semibold mb-4">What&lsquo;s your name?</h2>
			<Input
				placeholder="First name"
				value={onboardingData.first_name}
				onChange={(e) => handleChange("first_name", e.target.value)}
				className="mb-4"
			/>
			<Input
				placeholder="Last name"
				value={onboardingData.last_name}
				onChange={(e) => handleChange("last_name", e.target.value)}
			/>
		</div>,
		<div key="age-step">
			<h2 className="text-2xl font-semibold mb-4">How old are you?</h2>
			<Input
				type="number"
				placeholder="Enter your age"
				value={onboardingData.age}
				onChange={(e) => handleChange("age", e.target.value)}
			/>
		</div>,

		<div key="university-step">
			<h2 className="text-2xl font-semibold mb-4">What university do you attend?</h2>
			<Input
				placeholder="University name"
				value={onboardingData.university}
				onChange={(e) => handleChange("university", e.target.value)}
			/>
		</div>,
		<div key="profession-step">
			<h2 className="text-2xl font-semibold mb-4">What&lsquo;s your profession?</h2>
			<Input
				placeholder="Profession"
				value={onboardingData.profession}
				onChange={(e) => handleChange("profession", e.target.value)}
			/>
		</div>,
		<div key="interests-step">
			<h2 className="text-2xl font-semibold mb-4">What are your interests?</h2>
			<Input
				placeholder="Enter interests separated by commas"
				value={onboardingData.interests.join(", ")}
				onChange={(e) =>
					handleChange(
						"interests",
						e.target.value.split(",").map((interest) => interest.trim())
					)
				}
			/>
		</div>,
		<div key="skills-step">
			<h2 className="text-2xl font-semibold mb-4">Select your skills</h2>
			<Input
				placeholder="Search for skills"
				value={skillSearch}
				onChange={(e) => setSkillSearch(e.target.value)}
				className="mb-4"
			/>
			<div className="border rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
				{filteredSkills.map((skill) => (
					<div
						key={skill}
						className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
						onClick={() => handleAddSkill(skill)}
					>
						<span>{skill}</span>
						<Plus className="w-4 h-4" />
					</div>
				))}
			</div>
			<div className="flex flex-wrap gap-2 mt-4">
				{onboardingData.skills.map((skill) => (
					<Badge key={skill} variant="secondary" className="flex items-center gap-1 p-2">
						{skill}
						<Button
							variant="ghost"
							size="icon"
							className="h-4 w-4 p-0 hover:bg-transparent"
							onClick={() => handleRemoveSkill(skill)}
						>
							<X className="w-3 h-3" />
						</Button>
					</Badge>
				))}
			</div>
		</div>,
	];

	const handleSignUp = async () => {
		if (typeof onboardingData.age === "string") {
			setOnboardingData({ ...onboardingData, age: Number(onboardingData.age) });
		}

		console.log(onboardingData);
		const response = await signUp(onboardingData);
		if (response?.status !== 200) {
			console.error(response);
			return;
		}
		const newResponse = await getUserByEmail(email);
		console.log(newResponse);
		if (newResponse) {
			const email = newResponse.data.email;
			document.cookie = `userEmail=${email}; path=/;`;
			setUser(newResponse.data);
			router.push("/g/profile");
		}
	};

	return (
		<>
			{steps[step]}
			<div className="flex justify-between mt-5">
				{step > 0 && (
					<Button variant="outline" onClick={handlePrev}>
						Previous
					</Button>
				)}
				{step < steps.length - 1 ? (
					<Button onClick={handleNext}>Next</Button>
				) : (
					<Button onClick={handleSignUp}>Finish</Button>
				)}
			</div>
		</>
	);
}
