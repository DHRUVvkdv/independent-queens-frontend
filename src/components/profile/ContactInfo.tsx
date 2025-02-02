// components/profile/ContactInfo.tsx
import { Mail, GraduationCap, Building2 } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";

interface ContactInfoProps {
	user: User;
}

export function ContactInfo({ user }: ContactInfoProps) {
	return (
		<div className="flex flex-col items-center mb-5">
			<div className="mb-2">
				<CardTitle>Contact Information</CardTitle>
			</div>
			<div className="space-y-4">
				<div className="grid gap-4">
					<div className="flex items-center justify-center gap-2">
						<Mail className="w-4 h-4 text-muted-foreground" />
						<span>{user.email}</span>
					</div>
					{/* <div className="flex items-center gap-2">
										<Phone className="w-4 h-4 text-muted-foreground" />
										<span>(629) 555-0123</span>
									</div> */}
					<Separator />
					<div className="flex space-x-4">
						<div className="flex items-center gap-2">
							<GraduationCap className="w-4 h-4 text-muted-foreground" />
							<span>{user.profession}</span>
						</div>
						<div className="flex items-center gap-2">
							<Building2 className="w-4 h-4 text-muted-foreground" />
							<span>{user.university}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
