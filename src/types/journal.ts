import apiClient from "@/config/axiosConfig";

export interface Note {
	id: string;
	title: string;
	description: string;
	duration: number;
	date: string;
	bgColor: string;
	imageUrl: string;
}

export async function fetchAllJournalNotes(email: string) {
	try {
		const response = await apiClient.get(`/api/v1/journals/user/${email}`);
		return response;
	} catch (err) {
		console.error(err);
	}
}

export async function fetchJournalById(journalId: string) {
	try {
		const response = await apiClient.get(`/api/v1/journals/${journalId}`);
		return response;
	} catch (err) {
		console.error(err);
	}
}

export async function updateJournal(journalId: string, updatedData: object) {
	try {
		const response = await apiClient.patch(`/api/v1/journals/${journalId}`, updatedData);
		return response;
	} catch (err) {
		console.error(err);
	}
}

export async function deleteJournal(journalId: string) {
	try {
		const response = await apiClient.delete(`/api/v1/journals/${journalId}`);
		return response;
	} catch (err) {
		console.error(err);
	}
}

export async function createJournal(newJournalData: object) {
	try {
		const response = await apiClient.post(`/api/v1/journals`, newJournalData);
		return response;
	} catch (err) {
		console.error(err);
	}
}

export async function updateEmotionAnalysis(journalId: string, analysisData: object) {
	try {
		const response = await apiClient.patch(
			`/api/v1/journals/${journalId}/emotion-analysis`,
			analysisData
		);
		return response;
	} catch (err) {
		console.error(err);
	}
}

export interface EmotionData {
	emotions: {
		all_emotions: Record<string, { average_score: number; count: number }>;
		dominant_emotions: Record<string, number>;
	};
	metadata: {
		date_range: {
			start: string;
			end: string;
		};
		total_entries: number;
	};
	sorted_emotions: {
		all_emotions: { average_score: number; count: number; emotion: string }[];
		dominant_emotions: { count: number; emotion: string }[];
	};
}

/**
 * Fetches 30-day journal insights for a user by email.
 * @param email The email address of the user.
 * @returns A promise resolving to journal insights data.
 */
export async function fetchJournalInsights(email: string): Promise<EmotionData | undefined> {
	try {
		const response = await apiClient.get(`/api/v1/journals/insights/30-day-window/${email}`);
		return response.data;
	} catch (err) {
		console.error("Error fetching journal insights:", err);
	}
}
