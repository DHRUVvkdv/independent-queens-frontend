/* eslint-disable @typescript-eslint/no-unused-vars */
// File Name: types/sampleTypes.ts
// Description: This file contains sample TypeScript types and interfaces with explanations on when to use each.

// Interface for user profile data
export interface UserProfile {
	userId: string;
	name: string;
	skills: string[];
	points: number;
}

// Type alias for a union type representing user roles
export type UserRole = "admin" | "member" | "guest";

// Explanation:
// 1. **Interfaces:**
//    - Use interfaces when defining the structure of objects, especially when you expect the object to have multiple properties.
//    - Interfaces can be extended, meaning you can create new interfaces based on existing ones.
//    - Example: `UserProfile` defines a reusable structure for user data that functions can expect as input or output.
//
// 2. **Type Aliases:**
//    - Use type aliases for simpler or more flexible data structures, such as unions, tuples, or custom types.
//    - Types are often used when you need to combine multiple types or create shorthand for complex type definitions.
//    - Example: `UserRole` is a union type that restricts a variable to one of three possible values ('admin', 'member', or 'guest').

// Example usage of both:
const exampleUser: UserProfile = {
	userId: "abc123",
	name: "Jane Doe",
	skills: ["Programming", "Design"],
	points: 100,
};

const exampleRole: UserRole = "admin";
