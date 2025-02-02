"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Note } from "@/types/journal";

interface NoteModalProps {
	note: Note | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedNote: Note) => void;
}

export default function NoteModal({ note, isOpen, onClose, onSave }: NoteModalProps) {
	// Synchronize the form fields with the note prop
	const [title, setTitle] = useState(note?.title || "");
	const [description, setDescription] = useState(note?.description || "");

	// When a new note is selected, update the state fields
	useEffect(() => {
		if (note) {
			setTitle(note.title);
			setDescription(note.description);
		}
	}, [note]);

	// Function to handle saving
	const handleSave = () => {
		if (note) {
			onSave({ ...note, title, description });
			onClose();
		}
	};

	if (!note) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTitle>...</DialogTitle>
			<DialogContent className="max-w-3xl p-0 rounded-3xl">
				<div className="p-8">
					{/* Header */}
					<DialogHeader className="mb-6">
						<div className="flex items-center gap-4">
							<div
								className={`w-14 h-14 ${note.bgColor} rounded-2xl flex items-center justify-center`}
							>
								<img
									src={note.imageUrl || "/journalicon.jpeg"}
									alt="Note Icon"
									className="w-8 h-8"
								/>
							</div>
							<h2 className="text-3xl font-semibold">{note.title}</h2>
						</div>
					</DialogHeader>

					<Separator className="mb-6" />

					{/* Title input */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full p-2 border rounded"
						/>
					</div>

					{/* Description input */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full p-2 border rounded"
							rows={4}
						/>
					</div>

					{/* Action buttons */}
					<div className="flex justify-end gap-4">
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={handleSave}>Save</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
