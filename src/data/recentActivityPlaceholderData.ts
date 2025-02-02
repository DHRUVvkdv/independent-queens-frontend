// data/recentActivityData.ts
import { Activity } from "@/types/user";

export const recentActivities: Activity[] = [
	{
		id: 1,
		userId: 246534,
		type: "skill_added",
		description: "Added a new skill: React Development",
		timestamp: "2024-01-29T12:00:00Z",
	},
	{
		id: 2,
		userId: 246534,
		type: "coin_transaction",
		description: "Earned 500 coins for completing a tutoring session",
		timestamp: "2024-01-28T15:30:00Z",
		coinsEarnedOrSpent: 500,
	},
	{
		id: 3,
		userId: 246534,
		type: "profile_updated",
		description: "Updated profile bio",
		timestamp: "2024-01-25T09:45:00Z",
	},
];
