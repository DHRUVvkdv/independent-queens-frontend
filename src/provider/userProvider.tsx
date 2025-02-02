"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types/user";
import { user as dataUser } from "@/data/userPlaceholderData";
import { getUserByEmail, signIn } from "@/api/userApi";
import { updateUser } from "@/types/user";

interface UserContextType {
	user: User | null;
	setUser: any;
	update: (updatedFields: Partial<User>) => Promise<void>;
	// createUser: (newUser: User) => void;
	// signInUser: (email: string, password: string) => Promise<void>;
	// readUser: (email: string) => Promise<User | null>; // Now asynchronous
	// updateUser: (updatedFields: Partial<User>) => void;
	// deleteUser: () => void;

	// // Additional Functions
	addSkill: (skill: string) => void;
	removeSkill: (skill: string) => void;
	// hasSkill: (skill: string) => boolean;
	addInterest: (interest: string) => void;
	removeInterest: (interest: string) => void;
	// hasInterest: (interest: string) => boolean;
	// incrementCoins: (amount: number) => void;
	decrementCoins: (amount: number) => void;
	setProfileImage: (imagePath: string) => void;
	// updateBio: (bio: string) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const userEmail = getCookie("userEmail"); // Get the user's email from cookies
		if (userEmail) {
			getUserByEmail(userEmail)
				.then((fetchedUser) => setUser(fetchedUser))
				.catch((error) => console.error("Failed to restore user:", error));
		}
	}, []);

	const update = async (updatedFields: Partial<User>) => {
		if (!user) return;
		const updatedUser: User = await updateUser(user.email, updatedFields);
		setUser((prevUser) => ({ ...prevUser!, ...updatedUser }));
	};

	// // CRUD Methods
	// const createUser = (newUser: User) => setUser(newUser);
	// // Updated readUser function to fetch user from the server

	// const updateUser = (updatedFields: Partial<User>) =>
	// 	user && setUser({ ...user, ...updatedFields });

	// const deleteUser = () => setUser(null);

	// const signInUser = async (email: string, password: string) => {
	// 	try {
	// 		// Step 1: Sign in and get a token
	// 		const { token } = await signIn(email, password);

	// 		// Step 2: Optionally store the token (localStorage, cookies, etc.)
	// 		localStorage.setItem("authToken", token);

	// 		// Step 3: Fetch the user's profile using their email
	// 		const userProfile = await getUserByEmail(email);

	// 		// Step 4: Update the user state
	// 		setUser(userProfile);
	// 	} catch (error) {
	// 		console.error("Error signing in and fetching user:", error);
	// 		throw error;
	// 	}
	// };

	// const readUser = async (email: string): Promise<User | null> => {
	// 	try {
	// 		const user = await getUserByEmail(email);
	// 		setUser(user);
	// 		return user;
	// 	} catch (error) {
	// 		console.error("Error reading user:", error);
	// 		return null;
	// 	}
	// };

	// // Additional Utility Methods
	const addSkill = (skill: string) => {
		if (user && !user.skills.includes(skill)) {
			setUser({ ...user, skills: [...user.skills, skill] });
		}
	};

	const removeSkill = (skill: string) => {
		if (user) {
			setUser({ ...user, skills: user.skills.filter((s) => s !== skill) });
		}
	};

	// const hasSkill = (skill: string): boolean => !!user?.skills.includes(skill);

	const addInterest = (interest: string) => {
		if (user && !user.interests.includes(interest)) {
			setUser({ ...user, interests: [...user.interests, interest] });
		}
	};

	const removeInterest = (interest: string) => {
		if (user) {
			setUser({ ...user, interests: user.interests.filter((i) => i !== interest) });
		}
	};

	// const hasInterest = (interest: string): boolean => !!user?.interests.includes(interest);

	// const incrementCoins = (amount: number) => {
	// 	if (user) {
	// 		setUser({ ...user, totalCoins: user.totalCoins + amount });
	// 	}
	// };

	const decrementCoins = (amount: number) => {
		if (user && user.coins >= amount) {
			const resulting = user.coins - amount;
			setUser({ ...user, coins: resulting });
			updateUser(user?.email, { coins: resulting });
		}
	};

	const setProfileImage = (imagePath: string) => {
		if (user) {
			setUser({ ...user, profile_image_path: imagePath });
		}
	};

	// const updateBio = (bio: string) => {
	// 	if (user) {
	// 		setUser({ ...user, bio });
	// 	}
	// };

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				update,
				addSkill,
				removeSkill,
				addInterest,
				removeInterest,
				setProfileImage,
				decrementCoins,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook for using the UserContext
export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

function getCookie(name: string): string | null {
	const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
	return match ? decodeURIComponent(match[2]) : null;
}
