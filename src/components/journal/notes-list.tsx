"use client";

import { useState } from "react";
import { FileText, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NoteModal from "@/components/journal/NoteModal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteJournal, updateJournal, type Note } from "@/types/journal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface NotesListProps {
	notes: Note[];
	setNotes: any;
}

export default function NotesList({ notes, setNotes }: NotesListProps) {
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditNote = async (noteId: string, newData: Partial<Note>) => {
		try {
			await updateJournal(noteId.toString(), newData);
			setNotes(notes.map((note) => (note.id === noteId ? { ...note, ...newData } : note)));
		} catch (error) {
			console.log("Error updating note:", error);
		}
	};

	const handleDeleteNote = async (noteId: string) => {
		try {
			await deleteJournal(noteId.toString());
			setNotes(notes.filter((note) => note.id !== noteId));
		} catch (error) {
			console.log("Error deleting note:", error);
		}
	};

	const handleNoteClick = (note: Note) => {
		setSelectedNote(note);
		setIsModalOpen(true);
	};

	if (!notes.length) return <p className="text-muted-foreground">No notes available.</p>;

	return (
		<div className="w-full">
			<div className="flex flex-row items-center justify-between space-y-0 pb-2">
				<div className="text-2xl font-bold">
					<div className="w-6 h-6 inline-block mr-2" />
					All Notes
				</div>
				<Badge variant="secondary">{notes.length} Notes</Badge>
			</div>
			<div>
				<ScrollArea className="h-[calc(100vh-200px)]">
					<div className="space-y-4">
						{notes.map((note) => (
							<div
								key={note.id + "" + note.title}
								className="p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
								onClick={(e) => handleNoteClick(note)}
							>
								<div className="flex gap-4">
									<div
										className={`w-20 h-20 rounded-lg ${note.bgColor} flex items-center justify-center`}
									>
										<img
											src={note.imageUrl || "/journalicon.jpeg"}
											alt="Note icon"
											className="w-12 h-12 object-contain"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between">
											<div className="min-w-0">
												<h3 className="font-semibold text-base mb-1 truncate">
													{note.title}
												</h3>
												<p className="text-muted-foreground text-sm mb-2 line-clamp-2">
													{note.description}
												</p>
											</div>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="mt-1 ml-2"
														onClick={(e) => e.stopPropagation()}
													>
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuItem
														onClick={() => handleNoteClick(note)}
													>
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => handleDeleteNote(note.id)}
													>
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
										<div className="flex gap-4 text-sm text-muted-foreground">
											<span>{note.date}</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</div>

			<NoteModal
				note={selectedNote}
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedNote(null);
				}}
				onSave={(updatedNote) => handleEditNote(updatedNote.id, updatedNote)}
			/>
		</div>
	);
}
