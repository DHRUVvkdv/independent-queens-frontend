// components/profile/RecentActivity.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/types/user";
import { Badge } from "@/components/ui/badge";

interface RecentActivityProps {
	activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				{activities.length > 0 ? (
					<div className="space-y-4">
						{activities.map((activity) => (
							<div key={activity.id} className="flex items-start gap-2">
								<div className="min-w-[40%]">
									<Badge variant="secondary">{activity.type}</Badge>
								</div>

								<div>
									<p className="font-medium">{activity.description}</p>
									<p className="text-sm text-muted-foreground">
										{new Date(activity.timestamp).toLocaleString()}
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-muted-foreground">No recent activity available</p>
				)}
			</CardContent>
		</Card>
	);
}
