import apiClient from "@/config/axiosConfig";
import { UserProfile } from "@/types/_sampleFile";
import { User } from "@/types/user";

const userEndpoint = "/api/v1/users";

//  sample method
export async function getUserProfile(userId: string): Promise<UserProfile> {
	try {
		const response = await apiClient.get<UserProfile>(userEndpoint + userId);
		return response.data;
	} catch (error) {
		console.error("Error fetching user profile:", error);
		throw error;
	}
}
// creates a user
export async function createUser(userData: User): Promise<User> {
	try {
		const response = await apiClient.post<User>(userEndpoint, userData, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

export async function getUserByEmail(email: string): Promise<User> {
	try {
		const response = await apiClient.get<User>(`${userEndpoint}/${email}`, {
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching user by email:", error);
		throw error;
	}
}

// Sign-in function
export async function signIn(email: string, password: string): Promise<{ token: string }> {
	try {
		const response = await apiClient.post<{ token: string }>("/api/v1/auth/signin", {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error signing in:", error);
		throw error;
	}
}
