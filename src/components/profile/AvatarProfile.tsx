// components/profile/AvatarProfile.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";
import { User } from "@/types/user";

interface AvatarProfileProps {
	user: User;
}

export function AvatarProfile({ user }: AvatarProfileProps) {
	return (
		<div className="mb-5">
			<div className="pt-6">
				<div className="flex flex-col items-center space-y-4">
					<Avatar className="w-24 h-24">
						<AvatarImage src={user.profile_image_path} />
						<AvatarFallback>{user.first_name.substring(0, 2)}</AvatarFallback>
					</Avatar>
					<div className="text-center space-y-2">
						<h2 className="text-2xl font-bold">
							{user.first_name + " " + user.last_name}
						</h2>
						<p className="text-muted-foreground">#{user.age}</p>
						<div className="flex items-center justify-center gap-2">
							<MapPin className="w-4 h-4" />
							<span className="text-sm">{user.location}</span>
						</div>
					</div>
					{/* <div className="flex items-center gap-2">
						<Badge variant="secondary">{user.totalCoins} coins</Badge>
					</div> */}
				</div>
			</div>
		</div>
	);
}
