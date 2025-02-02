"use client";

import { Bold, Italic, MoveVertical, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import { createJournal } from "@/types/journal";
import { fetchJournalInsights } from "@/types/journal"; // Import the insights function
import Link from "next/link";

interface NoteEditorProps {
	notes: any;
	setNotes: any;
}

export default function NoteEditor({ notes, setNotes }: NoteEditorProps) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [showInsights, setShowInsights] = useState(false);
	const [emotionData, setEmotionData] = useState<any[]>([]);
	const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

	const loadInsights = async () => {
		const insights = await fetchJournalInsights("dhruv@example.com");

		if (insights) {
			// Process and set data for charts
			const chartData = insights.sorted_emotions.all_emotions.map((emotion: any) => ({
				emotion: emotion.emotion,
				score: emotion.average_score,
				count: emotion.count,
			}));
			setEmotionData(chartData);
		}
	};

	useEffect(() => {
		if (showInsights) {
			loadInsights();
		}
	}, [showInsights]);

	const onSaveNewNote = async () => {
		const date = new Date();
		const formattedDate = date.toLocaleDateString("en-GB").split("/").join("-");
		const journalNote = {
			email: "dhruv@example.com",
			title: title,
			description: content,
			date: formattedDate,
			bgColor: "bg-amber-100",
		};
		await createJournal(journalNote);
		setNotes([...notes, journalNote]);
		setTitle("");
		setContent("");
	};

	return (
		<div className="space-y-6 w-full p-5">
			{!showInsights ? (
				<>
					<Card className="w-full max-w-3xl mx-auto p-8 space-y-6 rounded-3xl">
						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
									<img src="/journalicon.jpeg" alt="" className="w-8 h-8" />
								</div>

								<input
									type="text"
									placeholder="Title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full text-gray-500 bg-transparent border-none outline-none focus:ring-0 text-2xl placeholder:text-2xl placeholder-gray-500 focus:text-black"
								/>
							</div>
						</div>

						{/* Main textarea */}
						<textarea
							placeholder="Write your thoughts..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full h-[400px] text-gray-400 bg-transparent border-none outline-none focus:ring-0 resize-none mt-4 placeholder:text-l placeholder-gray-400 focus:text-black overflow-y-auto"
						/>

						{/* Bottom toolbar */}
						<div className="flex items-center justify-between pt-4">
							<div className="bg-gray-50 rounded-2xl p-2">
								<ToggleGroup type="multiple" className="flex gap-3">
									<ToggleGroupItem
										value="font"
										aria-label="Toggle font"
										className="data-[state=on]:bg-white rounded-lg"
									>
										<span className="font-mono">T</span>
									</ToggleGroupItem>
									<ToggleGroupItem
										value="italic"
										aria-label="Toggle italic"
										className="data-[state=on]:bg-white rounded-lg"
									>
										<span className="italic">I</span>
									</ToggleGroupItem>
									<ToggleGroupItem
										value="bold"
										aria-label="Toggle bold"
										className="data-[state=on]:bg-white rounded-lg"
									>
										<span className="font-bold">B</span>
									</ToggleGroupItem>
									<ToggleGroupItem
										value="spacing"
										aria-label="Toggle spacing"
										className="data-[state=on]:bg-white rounded-lg"
									>
										<MoveVertical className="h-4 w-4" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
							<Button
								className="bg-purple-200 hover:bg-purple-300 text-black rounded-2xl px-8"
								onClick={onSaveNewNote}
							>
								Save
							</Button>
						</div>
					</Card>

					<div className="flex justify-center">
						<Button
							className="bg-purple-200 hover:bg-purple-300 text-black rounded-2xl px-8 py-6 flex items-center gap-2"
							onClick={() => setShowInsights(true)}
						>
							<Sparkles className="h-5 w-4" />
							Generate Insights
						</Button>
					</div>
				</>
			) : (
				<Card className="w-full max-w-3xl mx-auto p-8 space-y-6 rounded-3xl">
					<h2 className="text-2xl font-semibold text-center">Emotional Insights</h2>

					{/* Radar Chart */}
					<div className="h-[400px]">
						<ResponsiveContainer width="100%" height="100%">
							<RadarChart data={emotionData}>
								<PolarGrid />
								<PolarAngleAxis dataKey="emotion" />
								<Tooltip />
								<Radar
									name="Emotion Score"
									dataKey="score"
									stroke="#8884d8"
									fill="#8884d8"
									fillOpacity={0.6}
								/>
							</RadarChart>
						</ResponsiveContainer>
					</div>

					{/* Pie Chart */}
					{/* <div className="h-[400px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={emotionData}
									dataKey="count"
									nameKey="emotion"
									cx="50%"
									cy="50%"
									outerRadius={120}
									fill="#8884d8"
								>
									{emotionData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div> */}

					<div className="flex justify-center flex-col space-y-5">
						<Button
							className="bg-purple-200 hover:bg-purple-300 text-black rounded-2xl px-8 block"
							onClick={() => setShowInsights(false)}
						>
							Back to Editor
						</Button>
						<div>
						<Link href="https://www.womenscenter.vt.edu/Resources.html" target="_blank" rel="noopener noreferrer"
							className="bg-purple-200 hover:bg-purple-300 text-black text-md py-2  rounded-2xl px-8 flex justify-center items-center gap-2"
				
						>
							Wellbeing Resources
						</Link>
						</div>
						
					</div>
				</Card>
			)}
		</div>
	);
}
