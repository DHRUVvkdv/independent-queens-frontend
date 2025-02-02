import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { User } from "@/types/user";

interface BioProps {
	activeUser: User;
}

export function Bio({ activeUser }: BioProps) {
	return (
		<div className="mb-5">
			<div className="flex flex-row items-center justify-center">
				<h1>Bio</h1>
			</div>
			<div className="flex justify-center items-center">
				<p className="text-muted-foreground text-center">{activeUser.bio}</p>
			</div>
		</div>
	);
}
