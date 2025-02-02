"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PhaseInfo {
  title: string
  dateRange: string
}

interface DayInfo {
  day: number
  phase: "follicular" | "ovulation" | "luteal"
  info: PhaseInfo
}

const CYCLE_DATA: DayInfo[] = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  phase: i < 14 ? "follicular" : i < 17 ? "ovulation" : "luteal",
  info: {
    title: i < 14 ? "Follicular" : i < 17 ? "Ovulation" : "Luteal",
    dateRange: "1/7/1970 to 1/11/1970",
  },
}))

export default function CyclePhaseTracker() {
  const [selectedDay, setSelectedDay] = useState<number>(2)

  const getCirclePosition = (index: number, total = 28, radius = 200) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2
    return {
      left: `${radius * Math.cos(angle) + radius}px`,
      top: `${radius * Math.sin(angle) + radius}px`,
    }
  }

  const getCircleColor = (day: number, isSelected: boolean) => {
    if (isSelected) return "bg-black text-white"
    if (day >= 15 && day <= 17) return "bg-purple-800 text-white"
    if (day >= 18 || day <= 10) return "bg-purple-300 text-white"
    return "bg-purple-200 text-white"
  }

  const selectedDayInfo = CYCLE_DATA[selectedDay - 1]

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Left side - Cycle Wheel */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          {/* Center Text Container */}
          <div className="text-center z-10">
            <h2 className="text-2xl font-serif text-purple-900">{selectedDayInfo.info.title}</h2>
            <p className="text-sm text-purple-600 mt-2">{selectedDayInfo.info.dateRange}</p>
            <p className="text-4xl font-serif text-purple-900 mt-4">Day {selectedDay}</p>
          </div>
          
          {/* Day Buttons */}
          {CYCLE_DATA.map((day, index) => (
            <Button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`absolute w-10 h-10 rounded-full transition-all ${getCircleColor(
                day.day,
                day.day === selectedDay,
              )}`}
              style={getCirclePosition(index)}
              variant="ghost"
            >
              {day.day}
            </Button>
          ))}
        </div>
      </div>

      {/* Right side - Information Cards */}
      <div className="w-1/2 py-8 pr-4 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Diet Card */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Diet</h3>
            <div className="space-y-3">
              <p>Increase iron-rich foods (leafy greens, lean meats)</p>
              <p>Stay hydrated with 8-10 glasses of water daily</p>
              <p>Complex carbohydrates for sustained energy</p>
              <p>Anti-inflammatory foods like berries and nuts</p>
              <p>Protein-rich foods to support hormone production</p>
              <p>Magnesium-rich foods for cramp relief</p>
            </div>
          </Card>

          {/* Exercise Card */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Exercise</h3>
            <div className="space-y-3">
              <p>Light cardio (30 minutes of walking or swimming)</p>
              <p>Gentle yoga focusing on restorative poses</p>
              <p>Walking or light jogging (20-30 minutes)</p>
              <p>Stretching exercises for flexibility</p>
              <p>Low-impact strength training if comfortable</p>
              <p>Deep breathing exercises for stress relief</p>
            </div>
          </Card>
        </div>

        {/* Symptoms Card */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Symptoms</h3>
          <div className="space-y-3">
            <p>Fatigue and changes in energy levels</p>
            <p>Mild to moderate cramps in lower abdomen</p>
            <p>Mood changes and emotional sensitivity</p>
            <p>Possible headaches or joint pain</p>
            <p>Changes in appetite and cravings</p>
            <p>Sleep pattern changes</p>
          </div>
        </Card>
      </div>
    </div>
  )
}