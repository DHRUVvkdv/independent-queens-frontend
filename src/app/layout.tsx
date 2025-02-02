import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/provider/userProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "HerSpace - Empowering Women Through Technology",
	description: "A platform for women to manage time, track health, and connect with community",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
