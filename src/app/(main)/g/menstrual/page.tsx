// File Name: Menstrual.tsx
// Feature: Menstrual Cycle Tracking and Recommendations
// Description:
// This component is part of the application's health tracking feature, focusing on menstrual cycle integration. It provides
// users with detailed visualizations of their cycle phases and personalized recommendations for exercise and diet based on
// their current phase. The menstrual cycle page aims to improve users' overall well-being by aligning fitness and nutritional
// needs with their biological cycle.
//
// Key functionalities include:
// - Displaying a visual representation of the user's menstrual cycle, including the current phase (Menstrual, Follicular, Ovulation, Luteal).
// - Providing tailored exercise recommendations based on energy levels associated with each phase.
// - Offering dietary suggestions that address phase-specific nutritional needs.
// - Syncing with the personalized scheduler to integrate fitness and diet plans into the user's daily routine.
// - Allowing users to view and manage their cycle information, such as cycle length, phase history, and projected phases.
// - Enhancing the user experience with an aesthetically appealing and easy-to-navigate interface.
"use client";

import React from "react";
import MenstrualQuestionnaire from "../../../../components/menstrual/MenstrualQuestionnaire";

export default function Menstrual() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4">
				<MenstrualQuestionnaire />
			</div>
		</div>
	);
}
