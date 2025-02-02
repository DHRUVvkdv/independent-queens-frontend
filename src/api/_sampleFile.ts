import apiClient from "@/config/axiosConfig";

/**
 * ****************************************
 * ****************************************
 * ****************************************
 * ****************************************
 *
 * FOLLOW FORMAT IN THIS FILE FOR ALL FILES IN API FOLDER
 *
 * ****************************************
 * ****************************************
 * ****************************************
 * ****************************************
 */

const userEndpoint = "/user/";

// Sample method using apiClient
export async function fetchUserData(userId: string) {
	try {
		const response = await apiClient.get(userEndpoint + userId);
		return response.data;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
}
