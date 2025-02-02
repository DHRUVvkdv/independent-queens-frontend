// components/PhaseInfoDisplay.tsx
import { Card } from "@/components/ui/card"

interface PhaseInfoProps {
  phaseInfo: {
    title: string
    dateRange: string
    diet: string[]
    exercise: string[]
    symptoms: string[]
  }
}

export function PhaseInfoDisplay({ phaseInfo }: PhaseInfoProps) {
  return (
    <Card className="flex-1 p-8 bg-white">
      <h2 className="text-3xl font-serif mb-8">{phaseInfo.title} Phase</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Recommended Diet</h3>
          <ul className="list-disc pl-5 space-y-2">
            {phaseInfo.diet.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Exercise Recommendations</h3>
          <ul className="list-disc pl-5 space-y-2">
            {phaseInfo.exercise.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Common Symptoms</h3>
          <ul className="list-disc pl-5 space-y-2">
            {phaseInfo.symptoms.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}