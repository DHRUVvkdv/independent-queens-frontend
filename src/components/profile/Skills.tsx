// components/profile/Skills.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";

interface SkillsProps {
	activeUser: User;
}

export function Skills({ activeUser }: SkillsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Skills & Expertise</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{activeUser.skills.map((skill, index) => (
						<div
							key={`${skill}-${index}`}
							className="flex items-center justify-between"
						>
							<div className="space-y-1">
								<p className="font-medium">{skill}</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
