// PublicProfile.tsx
"use client";

import { AvatarProfile } from "@/components/profile/AvatarProfile";
import { ContactInfo } from "@/components/profile/ContactInfo";
import { Bio } from "@/components/profile/Bio";
import { Skills } from "@/components/profile/Skills";
import { Interests } from "@/components/profile/Interests";
import { User } from "@/types/user";
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface PublicProfileProps {
	user: User;
}

export default function PublicProfile({ user }: PublicProfileProps) {
	// Default state is passed in via props
	const [activeUser] = useState<User>(user);

	return (
		<div className="container mx-auto py-3">
			{/* <div className="flex justify-center items-center mb-6">
				<h1 className="text-3xl font-bold">Her Profile</h1>
			</div> */}

			<div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0 justify-center lg:items-top p-6">
				<Card className="flex flex-col space-y-4 w-full ">
					<AvatarProfile user={activeUser} />
					<ContactInfo user={activeUser} />
					<Bio activeUser={activeUser} />
					<Skills activeUser={activeUser} />
					<Interests activeUser={activeUser} />
				</Card>
			</div>
		</div>
	);
}
