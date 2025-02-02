import type { GroupedTodos } from "@/types/todo";

export const sampleTodos: GroupedTodos[] = [
	{
		date: "12/28/2024",
		items: [
			{
				id: "1",
				title: "User Journey Mapping Session",
				time: "10:00 AM",
				accentColor: "bg-rose-500",
			},
			{
				id: "2",
				title: "Usability Testing Debrief",
				time: "04:00 PM",
				accentColor: "bg-rose-500",
			},
		],
	},
	{
		date: "12/30/2024",
		items: [
			{
				id: "3",
				title: "Design Sprint Workshop",
				time: "11:00 AM",
				accentColor: "bg-cyan-500",
			},
		],
	},
	{
		date: "01/02/2025",
		items: [
			{
				id: "4",
				title: "Accessibility Review",
				time: "09:00 AM",
				accentColor: "bg-indigo-500",
			},
			{
				id: "5",
				title: "Cross-Functional Collaboration",
				time: "12:00 PM",
				accentColor: "bg-amber-500",
			},
			{
				id: "6",
				title: "Kickoff: X Project",
				time: "06:00 PM",
				accentColor: "bg-rose-500",
			},
		],
	},
	{
		date: "01/03/2025",
		items: [
			{
				id: "7",
				title: "Final Design Review",
				time: "09:00 AM",
				accentColor: "bg-indigo-500",
			},
		],
	},
];
