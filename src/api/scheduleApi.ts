import apiClient from "@/config/axiosConfig";

const userEndpoint = "/api/v1/users/";

interface ScheduleUpdateData {
  events?: Array<{
    id: string;
    title: string;
    start: string;
    end: string;
    color: string;
  }>;
  canvas_token?: string;
}

export async function updateUserSchedule(email: string, updateData: ScheduleUpdateData) {
  try {
    //console.log("URL = ", apiClient.patch(userEndpoint + email, updateData));
    const response = await apiClient.patch(userEndpoint + email, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating user schedule:", error);
    throw error;
  }
}

export async function getUserData(email: string) {
  try {
    const response = await apiClient.get(userEndpoint + email);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}