import apiClient from "@/config/axiosConfig";

// Health check function
export async function checkHealthStatus(): Promise<any> {
	try {
		const response = await apiClient.get("/api/v1/health");
		console.log("Health check response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error during health check:", error);
		throw error;
	}
}
