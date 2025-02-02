"use client"

import { FileText, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NoteModal from "@/components/journal/NoteModal";
import { useState } from "react";
import { Menu, MenuTrigger, MenuContent, MenuItem } from "@/components/journal/menu";  // Ensure proper components are imported

interface Note {
    id: number;
    title: string;
    description: string;
    duration: number;
    date: string;
    imageUrl: string;
    bgColor: string;
}

interface NotesListProps {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const generateNotes = () => {
    const baseNotes = [
        {
            id: 1,
            title: "Morning Reflection",
            description: "Today started with a sense of purpose and clarity...",
            duration: 4,
            date: "01-02-2024",
            bgColor: "bg-purple-100",
            imageUrl: "",
        },
        {
            id: 2,
            title: "Afternoon Thoughts",
            description: "Making progress on the project, feeling optimistic...",
            duration: 8,
            date: "01-02-2024",
            bgColor: "bg-amber-100",
            imageUrl: "",
        },
    ];

    const extraNotes = Array.from({ length: 8 }, (_, i) => ({
        id: i + 3,
        title: `Journal Entry ${i + 1}`,
        description: "Reflecting on today's experiences and learning moments...",
        duration: 120,
        date: "01-02-2024",
        bgColor: i % 2 === 0 ? "bg-purple-100" : "bg-amber-100",
        imageUrl: "",
    }));

    return [...baseNotes, ...extraNotes];
};

export default function NotesList({ notes, setNotes }: NotesListProps) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteDescription, setNewNoteDescription] = useState("");


    const handleEditNote = (noteId: number, newData: Partial<Note>) => {
        setNotes(notes.map(note => note.id === noteId ? { ...note, ...newData } : note));
    };

    const handleDeleteNote = (noteId: number) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const handleSaveNewNote = () => {
        if (!newNoteTitle.trim() || !newNoteDescription.trim()) return; // Avoid adding empty notes
    
        const newNote: Note = {
            id: notes.length + 1,  // Generate a new ID (you can improve this)
            title: newNoteTitle,
            description: newNoteDescription,
            duration: 0,
            date: new Date().toISOString().split("T")[0], // Current date
            imageUrl: "",
            bgColor: notes.length % 2 === 0 ? "bg-purple-100" : "bg-amber-100",
        };
    
        setNotes([...notes, newNote]); // Append the new note to the list
        setNewNoteTitle("");           // Clear inputs after saving
        setNewNoteDescription("");
    };
    

    return (
        <div className="w-full bg-white rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    <h1 className="text-xl font-semibold">All Notes</h1>
                </div>
            </div>

            <div className="text-purple-400 mb-6">124 Notes</div>

            <div className="space-y-4">
                {notes.map((note) => (
                    <Card
                        key={note.id}
                        className="p-4 hover:shadow-lg transition-shadow duration-200 rounded-2xl bg-white cursor-pointer"
                        //onClick={() => handleNoteClick(note)}
                    >
                        <div className="flex gap-4">
                            <div className={`w-20 h-20 rounded-2xl ${note.bgColor} flex items-center justify-center flex-shrink-0`}>
                                <img src={"/journalicon.jpeg" || "/placeholder.svg"} alt="" className="w-12 h-12 object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-base mb-1 truncate">
                                            {note.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                            {note.description}
                                        </p>
                                    </div>
                                    <Menu>
                                        <MenuTrigger>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="mt-1 ml-2"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </MenuTrigger>
                                        <MenuContent>
                                            <MenuItem onClick={() => handleNoteClick(note)}>Edit</MenuItem>
                                            <MenuItem onClick={() => handleDeleteNote(note.id)}>Delete</MenuItem>
                                        </MenuContent>
                                    </Menu>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span>{note.date}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
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