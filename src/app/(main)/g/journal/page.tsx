"use client";

// File Name: Journal.tsx
// Feature: Journal & Sentiment Analysis
// Description:
// This component is part of the application's journaling feature, designed to encourage self-reflection and mental well-being.
// Users can write daily journal entries, and the system provides sentiment analysis to offer insights into their emotional
// trends over time. The journaling page serves as both a writing interface and a visualization of emotional data.
//
// Key functionalities include:
// - Providing a rich-text editor for users to create and manage journal entries.
// - Displaying sentiment analysis results, including insights on mood trends and emotional changes over time.
// - Offering summaries and visualizations (e.g., bar charts) that highlight key patterns from the past 30 days.
// - Allowing users to access and browse a history of their journal entries.
// - Including an "Add Journal" button for easy entry creation, ensuring a user-friendly experience.
// - Integrating insights from journaling with other features, such as personalized scheduling adjustments based on emotional well-being.

import React from "react";
import NotesList from "../../../../components/journal/notes-list";
import NoteEditor from "../../../../components/journal/note-editor";
import { Note, generateNotes } from "../../../../utils/notes";

export default function Journal() {
	// Add these at the top of the Journal component
	const [notes, setNotes] = React.useState(generateNotes());

	const handleSaveNote = (newNote: Note) => {
		setNotes([newNote, ...notes]); // This will add new notes to the beginning
	};
	return (
		<div className="flex h-screen bg-[#f8f7ff]">
			{" "}
			{/* Changed from bg-gray-100 */}
			{/* Left sidebar with purple background */}
			<div className="w-1/3 bg-white overflow-y-auto">
				{" "}
				{/* Changed from bg-[#f8f7ff] */}
				<div className="p-10">
					<NotesList notes={notes} setNotes={setNotes} />
				</div>
			</div>
			{/* Main content area */}
			<div className="w-2/3 bg-[#f8f7ff] p-10 overflow-y-auto">
				{" "}
				{/* Changed bg & increased padding */}
				<div className="max-w-3xl mx-auto">
					<NoteEditor onSave={handleSaveNote} />
				</div>
			</div>
		</div>
	);
}
