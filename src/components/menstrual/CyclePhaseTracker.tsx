import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addDays, format } from 'date-fns';
import { getUserPhase, getUserRecommendations } from '@/api/menstrualApi';
import { Loader2 } from "lucide-react";

interface CyclePhaseTrackerProps {
  email: string;
  startDate?: Date;
}

interface RecommendationsData {
  affirmation: string;
  diet_recommendations: string[];
  exercise_recommendations: string[];
  generated_at: string;
  phase: string;
  symptoms_to_watch: string[];
}

const PHASE_COLORS = {
  menstruation: "bg-red-400",
  follicular: "bg-purple-300",
  ovulation: "bg-purple-600",
  luteal: "bg-purple-400"
};

const CyclePhaseTracker: React.FC<CyclePhaseTrackerProps> = ({ 
  email, 
  startDate = new Date() 
}) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [currentPhase, setCurrentPhase] = useState('menstruation');
  const [recommendations, setRecommendations] = useState<RecommendationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recommendationsData = await getUserRecommendations(email);
        setRecommendations(recommendationsData);
        setCurrentPhase(recommendationsData.phase);
      } catch (err) {
        setError('Failed to load your cycle data. Please try again later.');
        console.error('Error fetching cycle data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const getPhaseForDay = (day: number) => {
    if (day <= 5) return 'menstruation';
    if (day <= 14) return 'follicular';
    if (day <= 17) return 'ovulation';
    return 'luteal';
  };

  const getDateForDay = (day: number) => {
    return addDays(startDate, day - 1);
  };

  const getCirclePosition = (day: number, totalDays = 28) => {
    const angle = ((day - 1) * 2 * Math.PI) / totalDays - Math.PI / 2;
    const radius = 230;
    return {
      left: `${radius * Math.cos(angle) + radius}px`,
      top: `${radius * Math.sin(angle) + radius}px`,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto" />
          <p className="mt-2 text-purple-900">Loading your cycle data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif text-purple-900 mb-4 text-center">
          Your Menstrual Cycle Tracker
        </h1>
        
        {recommendations?.affirmation && (
          <p className="text-xl text-purple-600 text-center mb-8 italic">
            "{recommendations.affirmation}"
          </p>
        )}
        
        <div className="grid grid-cols-1 gap-8">
          {/* Left Column - Cycle Visualization */}
          <div className="flex flex-col items-center w-full">
            <div className="relative w-[500px] h-[500px]">
              {/* Center Content */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                <h2 className="text-2xl font-serif text-purple-900">
                  {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase
                </h2>
                <p className="text-sm text-purple-600 mt-2">
                  {format(getDateForDay(selectedDay), 'MMM dd, yyyy')}
                </p>
                <p className="text-4xl font-serif text-purple-900 mt-2">
                  Day {selectedDay}
                </p>
              </div>

              {/* Day Circles */}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                const phase = getPhaseForDay(day);
                return (
                  <Button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`absolute w-8 h-8 rounded-full transition-all 
                      ${PHASE_COLORS[phase]}
                      ${selectedDay === day ? 'ring-4 ring-purple-200' : ''}
                      hover:scale-110`}
                    style={getCirclePosition(day)}
                  >
                    {day}
                  </Button>
                );
              })}
            </div>

            {/* Information Cards Below Cycle */}
            <div className="w-full space-y-6 mt-8 px-8">
              {/* Diet Recommendations */}
              <Card className="p-6 w-full">
                <h3 className="text-xl font-semibold mb-4 text-purple-900">
                  Recommended Diet
                </h3>
                <ul className="space-y-2">
                  {recommendations?.diet_recommendations.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${PHASE_COLORS[currentPhase]}`} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Exercise Recommendations */}
              <Card className="p-6 w-full">
                <h3 className="text-xl font-semibold mb-4 text-purple-900">
                  Exercise Suggestions
                </h3>
                <ul className="space-y-2">
                  {recommendations?.exercise_recommendations.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${PHASE_COLORS[currentPhase]}`} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Symptoms */}
              <Card className="p-6 w-full">
                <h3 className="text-xl font-semibold mb-4 text-purple-900">
                  Common Symptoms
                </h3>
                <ul className="space-y-2">
                  {recommendations?.symptoms_to_watch.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${PHASE_COLORS[currentPhase]}`} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Right Column - Reserved for future content */}
          <div className="flex flex-col space-y-6">
            {/* This space is reserved for future content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyclePhaseTracker;
