import apiClient from "@/config/axiosConfig";

const baseEndpoint = "/api/v1/menstrual-health";

export async function getUserPhase(email: string) {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await apiClient.get(`${baseEndpoint}/${encodedEmail}/phase`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user phase:", error);
    throw error;
  }
}

export async function getUserRecommendations(email: string) {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await apiClient.get(`${baseEndpoint}/${encodedEmail}/recommendations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
}