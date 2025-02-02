"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import { Card } from "@/components/ui/card";
import Coins from "@/components/profile/Coins";
import { AvatarProfile } from "@/components/profile/AvatarProfile";
import { ContactInfo } from "@/components/profile/ContactInfo";
import { Bio } from "@/components/profile/Bio";
import { Skills } from "@/components/profile/Skills";
import { Interests } from "@/components/profile/Interests";
import { useEffect, useState } from "react";
import { checkHealthStatus } from "@/api/checkHealthStatus";
import { user as dataUser } from "@/data/userPlaceholderData";
import { EditProfileDialog } from "@/components/profile/EditProfile";
import { PublicProfileDialog } from "@/components/profile/PublicProfileDialog";
import { User } from "@/types/user";
import { useUser } from "@/provider/userProvider";

export default function Profile() {
	const { user } = useUser();
	const [loading, setLoading] = useState<boolean>(false);

	if (loading) {
		// Render skeleton loader while fetching data
		return <ProfileSkeleton />;
	}

	if (!user) {
		return <div>No user data available.</div>;
	}

	return (
		<div className="container mx-auto py-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Profile</h1>
				<EditProfileDialog />

				<PublicProfileDialog user={user} />
			</div>

			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
				</TabsList>

				<TabsContent value="overview">
					<div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0 justify-center lg:items-top p-6">
						<Card className="flex flex-col space-y-4 w-full lg:w-2/3 max-w-md p-5">
							<AvatarProfile user={user} />
							<ContactInfo user={user} />
							<Bio activeUser={user} />
						</Card>

						<div className="flex flex-col space-y-4 w-full lg:w-1/3">
							<Coins user={user} />
							<Skills activeUser={user} />
							<Interests activeUser={user} />
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
