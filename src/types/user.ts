/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/config/axiosConfig";

// *******************************************
// *******************************************
// **********	     interfaces		**********
// *******************************************
// *******************************************

export interface User {
	first_name: string;
	last_name: string;
	email: string;
	age: number;
	phone_number: string;
	profession: string;
	bio?: string;
	canvas_token: string;
	coins: number;
	profile_image_path: string;
	university: string;
	skills: string[];
	interests?: string[];
	location?: string;
	events: Event[];
	qa_pairs: any;
}

export interface Event {
	id: any;
	title: string;
	start: string;
	end: string;
	color: string;
}

export interface UserSignUp {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	age: number;
	profession: string;
	skills: string[];
	interests: string[];
	university: string;
}

// *******************************************
// *******************************************
// **********	     server			**********
// *******************************************
// *******************************************

export async function signIn(email: string, password: string) {
	try {
		const response = await apiClient.post("/api/v1/auth/signin", { email, password });
		return response;
	} catch (error) {
		console.error(error);
	}
}

export async function signUp(userSignUp: UserSignUp) {
	try {
		const response = await apiClient.post(`/api/v1/auth/signup`, userSignUp);
		return response;
	} catch (error) {
		console.error(error);
	}
}

export async function getUserByEmail(email: string) {
	try {
		const response = await apiClient.get(`/api/v1/users/${email}`);
		return response;
	} catch (error) {
		console.error(error);
	}
}

// Function to update user fields
export async function updateUser(email: string, updatedFields: Partial<User>) {
	try {
		const response = await apiClient.patch(`/api/v1/users/${email}`, updatedFields);
		return response.data;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}
