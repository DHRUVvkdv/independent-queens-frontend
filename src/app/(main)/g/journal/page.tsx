"use client";

import { useEffect, useState } from "react";
import NotesList from "@/components/journal/notes-list";
import NoteEditor from "@/components/journal/note-editor";
import { fetchAllJournalNotes } from "@/types/journal";
import { useUser } from "@/provider/userProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Journal() {
	const { user } = useUser();
	const [notes, setNotes] = useState([]);

	const fetchAllNotes = async () => {
		if (user) {
			const response = await fetchAllJournalNotes("dhruv@example.com");
			if (response?.data) {
				setNotes(response.data);
			}
		}
	};

	useEffect(() => {
		fetchAllNotes();
	}, [user, notes]);

	if (!user) return null;

	return (
		<div className="container p-6 bg-purpleShade min-h-screen">
			<div className="flex">
				<div className="w-[40%] bg-purpleShade">
					<NotesList notes={notes} setNotes={setNotes} />
				</div>
				<div className="flex-1">
					<NoteEditor notes={notes} setNotes={setNotes} />
				</div>
			</div>
		</div>
	);
}
