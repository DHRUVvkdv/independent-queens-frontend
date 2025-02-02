"use client";

import { type FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Clock, Coins, GraduationCap, MapPin } from "lucide-react";
import type { Offer } from "@/types/marketplace";
import PublicProfile from "@/components/profile/PublicProfile";
import { useUser } from "@/provider/userProvider";
import apiClient from "@/config/axiosConfig";
import { Code, Palette, Briefcase, Microscope, Music } from "lucide-react";

interface UserOfferProps {
	offer: Offer;
	showOwner?: boolean; // If true, display user info
}

export const UserOffer: FC<UserOfferProps> = ({ offer, showOwner = true }) => {
	const [offerUser, setOfferUser] = useState<any | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
	const { user: currentUser, decrementCoins } = useUser();

	const canAfford = currentUser ? currentUser.coins >= offer.pointCost : false;

	useEffect(() => {
		// Fetch the user associated with the offer based on email
		const fetchUser = async () => {
			try {
				const response = await apiClient.get(`/api/v1/users/${offer.email}`);
				if (response.status === 200) {
					setOfferUser(response.data);
				}
			} catch (error) {
				console.log("Failed to fetch offer user:", error);
			}
		};

		fetchUser();
	}, [offer.email]);

	const handleRedeem = () => {
		if (!canAfford) return;

		decrementCoins(offer.pointCost);
		setIsDialogOpen(true);
	};

	if (!offerUser) return null; // Don't render if the user data is not available

	return (
		<>
			{/* Card Section */}
			<Card className="w-full max-w-2xl">
				<CardHeader className="flex flex-row items-center gap-4">
					{showOwner && (
						<button
							onClick={() => setIsProfileDialogOpen(true)}
							className="focus:outline-none"
						>
							<Avatar className="h-16 w-16">
								<AvatarImage
									src={offerUser.profile_image_path}
									alt={offerUser.first_name + " " + offerUser.last_name}
								/>
								<AvatarFallback>{offerUser.first_name.charAt(0)}</AvatarFallback>
							</Avatar>
						</button>
					)}
					<div className="flex flex-col">
						{showOwner && (
							<>
								<button
									onClick={() => setIsProfileDialogOpen(true)}
									className="text-left focus:outline-none"
								>
									<CardTitle className="hover:underline">
										{offerUser.first_name + " " + offerUser.last_name}
									</CardTitle>
								</button>
								<CardDescription>{offerUser.email}</CardDescription>
							</>
						)}
						<div className="flex items-center gap-2 mt-1">
							<GraduationCap className="h-4 w-4" />
							<span className="text-sm text-muted-foreground">
								{offerUser.profession} at {offerUser.university}
							</span>
						</div>
						{offerUser.location && (
							<div className="flex items-center gap-2 mt-1">
								<MapPin className="h-4 w-4" />
								<span className="text-sm text-muted-foreground">
									{offerUser.location}
								</span>
							</div>
						)}
					</div>
				</CardHeader>
				<CardContent>
					<Separator className="my-4" />
					<div className="space-y-4">
						<div>
							<h3 className="text-lg font-semibold">{offer.title}</h3>
							<p className="text-sm text-muted-foreground mt-1">{offer.detail}</p>
						</div>
						<div className="flex items-center gap-4">
							<Badge variant="secondary" className="flex items-center gap-1">
								<Clock className="h-4 w-4" />
								{offer.duration} minutes
							</Badge>
							<Badge variant="secondary" className="flex items-center gap-1">
								<Coins className="h-4 w-4" />
								{offer.pointCost} points
							</Badge>
						</div>
						<div>
							<h4 className="font-semibold mb-2">Skill Offered:</h4>
							<Badge>{offer.skill}</Badge>
						</div>
						<Button onClick={handleRedeem} className="w-full" disabled={!canAfford}>
							{canAfford ? "Redeem" : "Not enough points"}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Redeem Confirmation Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Lesson Redeemed!</DialogTitle>
						<p>
							You have successfully purchased the lesson {offer.title} from{" "}
							{offerUser.first_name}. You will receive a confirmation email shortly
							with further details.
						</p>
					</DialogHeader>
					<Button onClick={() => setIsDialogOpen(false)}>Close</Button>
				</DialogContent>
			</Dialog>

			{/* Public Profile Dialog */}
			<Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
				<DialogContent className="max-w-4xl">
					<DialogHeader>
						<DialogTitle>Profile of {offerUser.first_name}</DialogTitle>
					</DialogHeader>
					<PublicProfile user={offerUser} />
				</DialogContent>
			</Dialog>
		</>
	);
};
