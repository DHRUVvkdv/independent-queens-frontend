// components/profile/Skills.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";

interface InterestProps {
	activeUser: User;
}

export function Interests({ activeUser }: InterestProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Interests</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-2">
					{activeUser.interests?.map((interest) => (
						<Badge key={interest} variant="outline">
							{interest}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
