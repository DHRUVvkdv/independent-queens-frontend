"use client"

import { Bold, Italic, Type, MoveVertical, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface NoteEditorProps {
    onSave?: () => void
}

export default function NoteEditor({ onSave }: NoteEditorProps) {
    // Add state for title and content
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showInsights, setShowInsights] = useState(false);
    const emotionData = [
        { emotion: "joy", value: 70 },
        { emotion: "fear", value: 10 },
        { emotion: "sadness", value: 5 },
        { emotion: "anger", value: 15 }
    ];
    return (
        <div className="space-y-6">
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
                                    <ToggleGroupItem value="font" aria-label="Toggle font" className="data-[state=on]:bg-white rounded-lg">
                                        <span className="font-mono">T</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="italic" aria-label="Toggle italic" className="data-[state=on]:bg-white rounded-lg">
                                        <span className="italic">I</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="bold" aria-label="Toggle bold" className="data-[state=on]:bg-white rounded-lg">
                                        <span className="font-bold">B</span>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="spacing" aria-label="Toggle spacing" className="data-[state=on]:bg-white rounded-lg">
                                        <MoveVertical className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                            <Button
                                className="bg-purple-200 hover:bg-purple-300 text-black rounded-2xl px-8"
                                onClick={() => {
                                    if (!title.trim() || !content.trim()) return;
                                    onSave({
                                        id: Date.now(), // Simple way to generate unique id
                                        title: title,
                                        description: content,
                                        date: new Date().toISOString().split("T")[0],
                                        bgColor: "bg-purple-100",
                                        imageUrl: "",
                                        duration: 0
                                    });
                                    setTitle("");
                                    setContent("");
                                }}
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
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={emotionData}
                                    dataKey="value"
                                    nameKey="emotion"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {emotionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(270, ${60 + index * 10}%, ${50 + index * 5}%)`} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            className="bg-purple-200 hover:bg-purple-300 text-black rounded-2xl px-8"
                            onClick={() => setShowInsights(false)}
                        >
                            Back to Editor
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}