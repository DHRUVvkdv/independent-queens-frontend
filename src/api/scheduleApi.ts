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

export async function fetchCanvasAssignments(email: string) {
  try {
    const response = await fetch(
      `https://t76o3w4uot5gt3ebqio6u4b7jm0nvwfg.lambda-url.us-east-1.on.aws/api/v1/canvas/assignments?email=${email}`,
      {
        headers: {
          'X-API-Key': 'dvrocks',
          'accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Canvas assignments:", error);
    throw error;
  }
}
