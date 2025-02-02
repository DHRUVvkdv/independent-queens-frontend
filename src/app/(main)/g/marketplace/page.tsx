"use client";

import { useEffect, useState } from "react";
import { UserOffer } from "@/components/marketplace/UserOffer";
import { useUser } from "@/provider/userProvider";
import { skillCategories } from "@/data/skills";
import { Button } from "@/components/ui/button";
import apiClient from "@/config/axiosConfig";
import { Offer } from "@/types/marketplace";
import {
	BookOpen,
	Code,
	UserCheck,
	DollarSign,
	PieChart,
	Brush,
	Layers,
	Globe,
	User,
	Briefcase,
	Microscope,
	Music,
	Palette,
} from "lucide-react";
import { off } from "process";

const categoryIcons: { [key: string]: any } = {
	"Tech & Programming": Code,
	"Design & Creativity": Palette,
	"Business & Entrepreneurship": Briefcase,
	"Science & Research": Microscope,
	"Music & Arts": Music,
};

export default function Marketplace() {
	const { user } = useUser();
	const [offers, setOffers] = useState<Offer[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSection, setSelectedSection] = useState<string>("All");

	useEffect(() => {
		const fetchOffers = async () => {
			try {
				const response = await apiClient.get("/api/v1/offers", {
					params: {
						limit: 40, // Set the upper limit to 20
						skip: 0, // Optional, start from the first record
					},
				});

				if (response.status === 200) {
					setOffers(response.data);
				}
			} catch (error) {
				console.log("Failed to fetch offers:", error);
			}
		};

		fetchOffers();
	}, []);

	if (!user || offers.length === 0) {
		return null; // Don't render if the user or offers are not available
	}

	// Filter offers based on the selected section and category
	const filteredOffers = offers.filter((offer) => {
		const isUserOffer = offer.email === user.email;
		const matchesSection = selectedSection === "All" ? !isUserOffer : isUserOffer;
		const matchesCategory =
			!selectedCategory ||
			(skillCategories[selectedCategory] &&
				skillCategories[selectedCategory].includes(offer.skill));
		return matchesSection && matchesCategory;
	});

	console.log(filteredOffers);

	return (
		<div className="flex min-h-screen flex-col p-8">
			{/* Header */}
			<div className="mb-8 flex justify-between items-center">
				<h1 className="text-3xl font-bold">Browse Lessons From Other Women!</h1>
				<div className="text-xl">
					Your Points: <span className="font-bold text-yellow-500">{user.coins}</span>
				</div>
			</div>

			{/* Section Tabs */}
			<div className="mb-4 flex gap-4">
				<Button
					variant={selectedSection === "All" ? "default" : "outline"}
					onClick={() => setSelectedSection("All")}
				>
					All Offers
				</Button>
				<Button
					variant={selectedSection === "Mine" ? "default" : "outline"}
					onClick={() => setSelectedSection("Mine")}
				>
					Mine
				</Button>
			</div>

			{/* Skill Category Filter */}
			<div className="mb-8 flex gap-4 overflow-x-auto">
				{Object.keys(skillCategories).map((category) => {
					const Icon = categoryIcons[category] || Code;

					return (
						<Button
							key={category}
							variant={selectedCategory === category ? "default" : "outline"}
							onClick={() =>
								setSelectedCategory(selectedCategory === category ? null : category)
							}
							className="flex items-center gap-2 px-4 py-2 whitespace-nowrap"
						>
							<Icon className="w-5 h-5" />
							<span>{category}</span>
						</Button>
					);
				})}
			</div>

			{/* Offer Listings */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				{filteredOffers.map((offer) => (
					<UserOffer key={offer.title + "" + offer.email} offer={offer} />
				))}
			</div>
		</div>
	);
}
