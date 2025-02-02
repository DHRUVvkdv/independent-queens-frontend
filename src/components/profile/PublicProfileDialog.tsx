import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PublicProfile from "@/components/profile/PublicProfile";
import { User } from "@/types/user";

interface PublicProfileDialogProps {
	user: User;
}

export function PublicProfileDialog({ user }: PublicProfileDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">View Public Profile</Button>
			</DialogTrigger>
			<DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Public Profile Preview</DialogTitle>
					<DialogDescription>
						This is how your profile will appear to others.
					</DialogDescription>
				</DialogHeader>

				<div className="py-4">
					<PublicProfile user={user} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
