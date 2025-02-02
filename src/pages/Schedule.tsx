// File Name: Schedule.tsx
// Feature: Personalized Scheduler
// Description:
// This component is part of a larger feature designed to optimize users' academic, fitness, and personal schedules.
// It integrates various data sources such as Canvas assignments, .ICS class calendars, and menstrual cycle tracking.
// The feature aims to provide tailored exercise and dietary recommendations based on menstrual phases.
//
// Key functionalities include:
// - Requesting Canvas authentication tokens to access assignment due dates and class schedules.
// - Retrieving schedule data through .ICS calendar integration.
// - Syncing the user's menstrual cycle data with the schedule, including visual representation in both the schedule and a menstrual cycle page.
// - Recognizing the four menstrual phases (Menstrual, Follicular, Ovulation, and Luteal) to offer personalized exercise and diet recommendations.
// - Displaying a personalized schedule that balances study time, exercise, and other priorities.
"use client";

import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
	createCalendar,
	createViewDay,
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { v4 as uuidv4 } from "uuid";
import { Clock, Plus, LightbulbIcon, ArrowUp } from "lucide-react"; import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/schedule/todo-list";
import { ics as dataICS } from "@/data/schedulePlaceholderData";
import EventModal from "@/components/schedule/EventModal";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import UploadModal from "@/components/schedule/UploadModal";
import { getUserData } from '@/api/scheduleApi';
import { updateUser } from '@/types/user';
import { useUser } from "@/provider/userProvider";

// Custom styles for the calendar wrapper
const calendarStyles = `
.sx-react-calendar-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
}
`;

function parseRRule(rruleString: any, startDate: any, endDate: any) {
	const untilMatch = rruleString.match(/UNTIL=(\d{8})T(\d{6})/);
	const bydayMatch = rruleString.match(/BYDAY=([^;]+)/);

	if (!untilMatch || !bydayMatch) return null;

	const until = new Date(
		untilMatch[1].slice(0, 4) +
		"-" +
		untilMatch[1].slice(4, 6) +
		"-" +
		untilMatch[1].slice(6, 8)
	);

	const daysMap = {
		MO: 1,
		TU: 2,
		WE: 3,
		TH: 4,
		FR: 5,
		SA: 6,
		SU: 0,
	};

	const days = bydayMatch[1].split(",").map((day) => daysMap[day]);
	return { until, days };
}

function getColorForCourse(title: string) {
	// Store the colors map outside or as a constant
	const courseColors = {
		CS: "#9C27B0", // Purple
		MATH: "#2196F3", // Blue
		PHYS: "#FF9800", // Orange
		CHEM: "#4CAF50", // Green
		BIO: "#8BC34A", // Light Green
		ENGL: "#F44336", // Red
		HIST: "#795548", // Brown
		PSYC: "#E91E63", // Pink
		ECON: "#FFC107", // Amber
		POLI: "#607D8B", // Blue Grey
		PHIL: "#673AB7", // Deep Purple
		ARTS: "#FF5722", // Deep Orange
		LANG: "#009688", // Teal
		ENGR: "#3F51B5", // Indigo
		COMM: "#CDDC39", // Lime
		BUS: "#00BCD4", // Cyan
	};

	// First word before space is usually department name
	const department = title.split(" ")[0];

	// For cases like "Computer Systems CS 3214"
	if (title.includes(" CS ")) {
		return courseColors["CS"];
	}

	// For cases like "Cryptography MATH 4175"
	if (title.includes(" MATH ")) {
		return courseColors["MATH"];
	}

	// Check if the department directly matches
	if (courseColors[department]) {
		return courseColors[department];
	}

	// Default color if no match found
	return "#4CAF50";
}

function parseICSFile(icsString: string) {
	const events = [];
	const eventBlocks = icsString.split("BEGIN:VEVENT");

	for (let i = 1; i < eventBlocks.length; i++) {
		const block = eventBlocks[i];

		const summary = block.match(/SUMMARY:(.+?)(?:\r?\n)/)?.[1];
		const start = block.match(
			/DTSTART;TZID=America\/New_York:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/
		);
		const end = block.match(
			/DTEND;TZID=America\/New_York:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/
		);

		if (summary && start && end) {
			const rrule = block.match(/RRULE:(.+?)(?:\r?\n)/)?.[1];

			// Create date strings with explicit timezone
			const startStr = `${start[1]}-${start[2]}-${start[3]}T${start[4]}:${start[5]}:00-05:00`;
			const endStr = `${end[1]}-${end[2]}-${end[3]}T${end[4]}:${end[5]}:00-05:00`;

			const startDateTime = new Date(startStr);
			const endDateTime = new Date(endStr);
			const duration = endDateTime.getTime() - startDateTime.getTime();

			if (rrule) {
				const ruleInfo = parseRRule(rrule, startDateTime, endDateTime);
				if (ruleInfo) {
					const { until, days } = ruleInfo;
					let currentDate = new Date(startDateTime);

					while (currentDate <= until) {
						if (days.includes(currentDate.getDay())) {
							const eventStart = new Date(currentDate);
							const eventEnd = new Date(currentDate.getTime() + duration);
							const colorForCourse = getColorForCourse(summary);
							console.log("colorForCourse = ", colorForCourse);

							// Inside the if (rrule) block, modify the events.push part:
							events.push({
								id: crypto.randomUUID(),
								title: summary,
								start: `${eventStart.getFullYear()}-${String(
									eventStart.getMonth() + 1
								).padStart(2, "0")}-${String(eventStart.getDate()).padStart(
									2,
									"0"
								)} ${String(eventStart.getHours()).padStart(2, "0")}:${String(
									eventStart.getMinutes()
								).padStart(2, "0")}`,
								end: `${eventEnd.getFullYear()}-${String(
									eventEnd.getMonth() + 1
								).padStart(2, "0")}-${String(eventEnd.getDate()).padStart(
									2,
									"0"
								)} ${String(eventEnd.getHours()).padStart(2, "0")}:${String(
									eventEnd.getMinutes()
								).padStart(2, "0")}`,
								color: colorForCourse,
							});
						}
						currentDate.setDate(currentDate.getDate() + 1);
					}
				}
			} else {
				const colorForCourse = getColorForCourse(summary);
				events.push({
					id: crypto.randomUUID(),
					title: summary,
					start: `${start[1]}-${start[2]}-${start[3]} ${start[4]}:${start[5]}`,
					end: `${end[1]}-${end[2]}-${end[3]} ${end[4]}:${end[5]}`,
					color: colorForCourse,
				});
			}
		}
	}

	return events;
}

export default function Schedule() {

	const { user } = useUser()

	const [showUploadModal, setShowUploadModal] = useState(false);
	const [showEventModal, setShowEventModal] = useState(false);
	const eventsServicePlugin = createEventsServicePlugin();

	// Add this state to track events
	const [events, setEvents] = useState([]);
	// Initialize calendar with events state instead of directly using icsEvents
	const currentTimePlugin = useState(() =>
		createCurrentTimePlugin({
			fullWeekWidth: true, // Shows the indicator across the full width of the week view
			timeZoneOffset: -300, // EST timezone offset (-5 hours * 60 minutes)
		})
	)[0];


	// Initialize calendar with events
	const calendar = createCalendar({
		views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
		events: events,
		selectedDate: "2025-02-01",
		plugins: [eventsServicePlugin, currentTimePlugin],
	});

	// Modified handleAddEvent function with proper event service call and debugging
	const handleAddEvent = (eventData: any) => {
		const newEvent = {
			id: crypto.randomUUID(),
			title: eventData.title,
			start: `${eventData.date} ${eventData.startTime}`,
			end: `${eventData.date} ${eventData.endTime}`,
			color: getColorForCourse(eventData.title),
		};

		try {
			// Add to calendar service
			calendar.eventsService.add(newEvent);

			// Update events state with the new event
			setEvents((prevEvents) => [...prevEvents, newEvent]);
			console.log("events = ", events);

			// Use set method to refresh all events
			calendar.eventsService.set([...events, newEvent]);

			setShowEventModal(false);
		} catch (error) {
			console.error("Error adding event:", error);
		}
	};

	// Fetch events when component mounts
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				if (user?.email) {
					const userData = await getUserData(user.email);
					if (userData.events && userData.events.length > 0) {
						calendar.eventsService.set(userData.events);
						setEvents(userData.events);
					}
				}
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};

		fetchEvents();
	}, [user?.email]);

	// Update calendar when events change
	useEffect(() => {
		if (events && events.length > 0) {
			calendar.eventsService.set(events);
		}
	}, [events, calendar.eventsService]);

	const handleUpload = async (data: any) => {
		const { calendarFile, canvasToken } = data;

		try {
			let parsedEvents: any = [];
			if (calendarFile) {
				const icsString = await calendarFile.text();
				parsedEvents = parseICSFile(icsString);
			}

			const updateData: any = {};
			if (parsedEvents.length > 0) {
				updateData.events = parsedEvents;
			}
			if (canvasToken) {
				updateData.canvas_token = canvasToken;
			}

			await updateUser(user?.email, updateData);
			const userData = await getUserData(user?.email);

			if (userData.events && userData.events.length > 0) {
				setEvents(userData.events);  // This will trigger the useEffect above
			}

			setShowUploadModal(false);
		} catch (error) {
			console.error("Error processing upload:", error);
		}
	};

	useEffect(() => {
		const styleSheet = document.createElement("style");
		styleSheet.textContent = calendarStyles;
		document.head.appendChild(styleSheet);

		return () => {
			document.head.removeChild(styleSheet);
		};
	}, []);

	return (
		<div className="flex h-screen bg-gray-50 p-6">
			{/* Left Sidebar */}
			<div className="w-80 h-full flex flex-col px-4 py-2 space-y-4 bg-[#f8f7ff] border-r rounded-lg">
				{/* Buttons container */}
				<div className="flex space-x-4">
					<Button
						className="flex-1 bg-white hover:bg-gray-50 text-black shadow-lg rounded-xl flex items-center justify-between px-4 py-6"
						onClick={() => setShowEventModal(true)}
					>
						<div className="flex items-center">
							<Plus className="w-5 h-5 mr-2" />
							<span className="text-lg">Create</span>
						</div>
					</Button>

					<Button
						className="flex-1 bg-white hover:bg-gray-50 text-black shadow-lg rounded-xl flex items-center justify-between px-4 py-6"
						onClick={() => setShowUploadModal(true)}
					>
						<div className="flex items-center">
							<ArrowUp className="w-5 h-5 mr-2" />
							<span className="text-lg">Upload</span>
						</div>
					</Button>
				</div>
				<div className="border-b border-gray-200" /> {/* Add this line */}
				{/* Today's Tip */}
				<Card className="w-full shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center gap-2 mb-2">
							<LightbulbIcon className="w-5 h-5 text-yellow-500" />
							<h3 className="font-semibold">Today's Tip</h3>
						</div>
						<p className="text-gray-600">
							Schedule your high-intensity workouts during your follicular phase for
							optimal performance.
						</p>
					</CardContent>
				</Card>
				<div className="border-b border-gray-200" /> {/* Add this line */}
				{/* Todo List */}
				<div className="flex-1 min-h-0 overflow-hidden pt-2 flex flex-col">
					{/* <h2 className="text-lg font-semibold mb-4">TODO LIST</h2> */}
					<div className="overflow-y-auto flex-1 pr-2 -mr-2">
						<TodoList />
					</div>
				</div>
			</div>

			{/* Main Calendar Area */}
			<div className="flex-1 flex flex-col h-full">
				<div className="flex-1 overflow-hidden">
					<ScheduleXCalendar calendarApp={calendar} />
				</div>
			</div>

			<EventModal
				isOpen={showEventModal}
				onClose={() => setShowEventModal(false)}
				onSubmit={handleAddEvent}
			/>
			<UploadModal
				isOpen={showUploadModal}
				onClose={() => setShowUploadModal(false)}
				onSubmit={handleUpload}
			/>
		</div>
	);
}
