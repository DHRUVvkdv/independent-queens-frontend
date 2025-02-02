import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function FeatureCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const features = [
        {
            title: "Smart Scheduling",
            details: "Our intelligent system syncs your calendar with your menstrual cycle to create optimized schedules for study, workouts, and self-care. Get personalized recommendations based on your cycle phase."
        },
        {
            title: "Emotional Well-being",
            details: "Transform your daily journaling into meaningful insights with our AI analysis. Track mood patterns and receive personalized wellness recommendations based on your emotional trends."
        },
        {
            title: "Community Support",
            details: "Join topic-specific circles for study groups, fitness, or mentorship. Attend virtual workshops and build meaningful connections in a safe, moderated environment."
        },
        {
            title: "Skill Exchange",
            details: "Share your expertise through tutoring, workout sessions, or career guidance to earn points. Use points to learn new skills from others or access premium features."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === features.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? features.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === features.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="mt-16 w-full overflow-hidden">
            <div className="max-w-3xl mx-auto relative px-14">
                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-[25%] md:top-[35%] -translate-y-1/2 z-10 p-3 bg-violet-100/80 hover:bg-violet-200/80 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-violet-600" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-[25%] md:top-[35%] -translate-y-1/2 z-10 p-3 bg-violet-100/80 hover:bg-violet-200/80 rounded-full transition-colors"
                >
                    <ChevronRight className="w-6 h-6 text-violet-600" />
                </button>

                {/* Feature Cards */}
                <div className="relative min-h-[200px] mb-2">  {/* Reduced min-height and added smaller margin-bottom */}
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`absolute w-full transition-all duration-500 ease-in-out ${index === currentIndex
                                    ? 'opacity-100 translate-x-0'
                                    : index < currentIndex
                                        ? 'opacity-0 -translate-x-full'
                                        : 'opacity-0 translate-x-full'
                                }`}
                        >
                            <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-8">
                                <h3 className="text-2xl font-semibold text-violet-600 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.details}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-violet-600 w-4' : 'bg-violet-300'
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeatureCarousel;