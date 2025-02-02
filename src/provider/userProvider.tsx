"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types/user";
import { getUserByEmail, signIn } from "@/api/userApi";
import { updateUser } from "@/types/user";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    update: (updatedFields: Partial<User>) => Promise<void>;
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
    addInterest: (interest: string) => void;
    removeInterest: (interest: string) => void;
    decrementCoins: (amount: number) => void;
    setProfileImage: (imagePath: string) => void;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userEmail = getCookie("userEmail");
        if (userEmail) {
            getUserByEmail(userEmail)
                .then((fetchedUser) => setUser(fetchedUser))
                .catch((error) => console.error("Failed to restore user:", error))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const update = async (updatedFields: Partial<User>) => {
        if (!user) return;
        try {
            const updatedUser: User = await updateUser(user.email, updatedFields);
            setUser((prevUser) => ({ ...prevUser!, ...updatedUser }));
        } catch (error) {
            console.error("Failed to update user:", error);
            throw error;
        }
    };

    const addSkill = async (skill: string) => {
        if (user && !user.skills.includes(skill)) {
            const updatedSkills = [...user.skills, skill];
            try {
                await update({ skills: updatedSkills });
            } catch (error) {
                console.error("Failed to add skill:", error);
            }
        }
    };

    const removeSkill = async (skill: string) => {
        if (user) {
            const updatedSkills = user.skills.filter((s) => s !== skill);
            try {
                await update({ skills: updatedSkills });
            } catch (error) {
                console.error("Failed to remove skill:", error);
            }
        }
    };

    const addInterest = async (interest: string) => {
        if (user && !user.interests.includes(interest)) {
            const updatedInterests = [...user.interests, interest];
            try {
                await update({ interests: updatedInterests });
            } catch (error) {
                console.error("Failed to add interest:", error);
            }
        }
    };

    const removeInterest = async (interest: string) => {
        if (user) {
            const updatedInterests = user.interests.filter((i) => i !== interest);
            try {
                await update({ interests: updatedInterests });
            } catch (error) {
                console.error("Failed to remove interest:", error);
            }
        }
    };

    const decrementCoins = async (amount: number) => {
        if (user && user.coins >= amount) {
            const newCoinAmount = user.coins - amount;
            try {
                await update({ coins: newCoinAmount });
            } catch (error) {
                console.error("Failed to decrement coins:", error);
            }
        }
    };

    const setProfileImage = async (imagePath: string) => {
        if (user) {
            try {
                await update({ profile_image_path: imagePath });
            } catch (error) {
                console.error("Failed to update profile image:", error);
            }
        }
    };

    // Loading state handler
    if (isLoading) {
        return null; // Or return a loading spinner component
    }

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
                isLoading,
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

// Error Boundary Component
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class UserProviderErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('UserProvider Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong with user authentication.</div>;
        }

        return this.props.children;
    }
}