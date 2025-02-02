"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CyclePhaseTracker from "./CyclePhaseTracker"
import { useUser } from "@/provider/userProvider";
import { updateUser } from '@/types/user';

interface QuestionnaireData {
    age: string
    lastPeriodDate: Date | undefined
    periodDuration: string
    mood: string
}

const MenstrualQuestionnaire = () => {
    const { user } = useUser();
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState<QuestionnaireData>({
        age: "",
        lastPeriodDate: undefined,
        periodDuration: "",
        mood: "",
    })

    const handleInputChange = (field: keyof QuestionnaireData, value: string | Date | undefined) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const handleSubmit = async () => {
        if (!user?.email) return;

        try {
            const qaPairs = [
                {
                    question: "Do you feel confident about your knowledge about your menstrual health",
                    answer: formData.age
                },
                {
                    question: "When was the first day of your last period?",
                    answer: formData.lastPeriodDate ? format(formData.lastPeriodDate, 'yyyy-MM-dd') : ''
                },
                {
                    question: "How long does your period typically last?",
                    answer: formData.periodDuration
                },
                {
                    question: "How would you describe your mood recently?",
                    answer: formData.mood
                }
            ];

            await updateUser(user.email, { qa_pairs: qaPairs });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error appropriately
        }
    }

    const renderQuestion = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl text-gray-800">Do you feel confident about your knowledge about your menstrual health?</h2>
                        <div className="space-y-4">
                            {[
                                { value: "yes", label: "Yes" },
                                { value: "no", label: "No" },
                            ].map((option) => (
                                <label key={option.value} className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        value={option.value}
                                        checked={formData.age === option.value}
                                        onChange={(e) => handleInputChange("age", e.target.value)}
                                        className="w-4 h-4 text-purple-600 border-purple-300 focus:ring-purple-500"
                                    />
                                    <span className="text-lg text-gray-700">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl text-gray-800">When was the first day of your last period?</h2>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !formData.lastPeriodDate && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.lastPeriodDate ? format(formData.lastPeriodDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.lastPeriodDate}
                                    onSelect={(date) => handleInputChange("lastPeriodDate", date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl text-gray-800">How long does your period typically last?</h2>
                        <div className="space-y-4">
                            {[
                                { value: "3-5", label: "3-5 days" },
                                { value: "5-7", label: "5-7 days" },
                                { value: "7-10", label: "7-10 days" },
                                { value: "10+", label: "More than 10 days" },
                            ].map((option) => (
                                <label key={option.value} className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        value={option.value}
                                        checked={formData.periodDuration === option.value}
                                        onChange={(e) => handleInputChange("periodDuration", e.target.value)}
                                        className="w-4 h-4 text-purple-600 border-purple-300 focus:ring-purple-500"
                                    />
                                    <span className="text-lg text-gray-700">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-8">
                        <h2 className="text-2xl text-gray-800">How would you describe your mood recently?</h2>
                        <Select onValueChange={(value) => handleInputChange("mood", value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your mood" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low/Easily Irritable</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                                <SelectItem value="energized">Energized</SelectItem>
                                <SelectItem value="confident">Confident</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            {!isSubmitted ? (
                // Questionnaire View
                <>
                    <h2 className="text-xl font-semibold">
                        Cycle Phase Assessment
                    </h2>
                    <div className="w-full max-w-3xl p-8 rounded-3xl shadow-lg bg-card">
                        <div className="mb-12">
                            <div className="flex justify-between mb-4">
                                <span className="text-xl text-purple-600">Question {currentStep} of 4</span>
                                <span className="text-xl text-purple-600">{Math.round((currentStep / 4) * 100)}% Complete</span>
                            </div>
                            <div className="w-full bg-purple-100 rounded-full h-2">
                                <div
                                    className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                                    style={{ width: `${(currentStep / 4) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="mb-12">{renderQuestion()}</div>

                        <div className="flex justify-between">
                            <Button
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                variant="ghost"
                                className={`text-xl ${currentStep === 1 ? 'text-gray-300' : 'text-gray-400 hover:text-purple-600'}`}
                            >
                                ← Previous
                            </Button>
                            {currentStep === 4 ? (
                                <Button
                                    onClick={handleSubmit}
                                    className="text-xl bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                                >
                                    Submit
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    variant="ghost"
                                    className="text-xl text-purple-600 hover:text-purple-800"
                                >
                                    Next →
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                // Cycle Tracker View
                <CyclePhaseTracker email={user?.email} /> // Add email prop
            )}
        </div>
    )
}

export default MenstrualQuestionnaire
