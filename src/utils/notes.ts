// utils/notes.ts
export interface Note {
    id: number;
    title: string;
    description: string;
    duration: number;
    date: string;
    imageUrl: string;
    bgColor: string;
}

export const generateNotes = () => {
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