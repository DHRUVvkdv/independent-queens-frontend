"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarCheck, User, Store, RefreshCcw, Book, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const navItems = [
	{ icon: CalendarCheck, label: "Schedule", path: "/g/schedule" },
	{ icon: RefreshCcw, label: "Menstrual Cycle", path: "/g/menstrual" },
	{ icon: Book, label: "Journaling", path: "/g/journal" },
	{ icon: Search, label: "Explore", path: "/g/marketplace" },
	{ icon: Store, label: "Shop", path: "/g/shop" },
	{ icon: User, label: "Profile", path: "/g/profile" },
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavProps extends React.HTMLAttributes<HTMLElement> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SidebarNav({ className, ...props }: NavProps) {
	const router = useRouter();
	const [active, setActive] = React.useState("Home");

	// Navigate and update active state
	const handleNavigation = (label: string, path: string) => {
		setActive(label);
		router.push(path); // Navigate to the new path
	};

	return (
		<nav
			className={cn(
				"flex flex-col space-y-2 h-screen bg-background fixed left-0 top-0 bottom-0 w-16 py-4 border-r"
			)}
		>
			{navItems.map(({ icon: Icon, label, path }) => (
				<div key={label} className="relative group">
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"w-full h-16 rounded-none group-hover:bg-muted transition-colors",
							active === label && "bg-muted"
						)}
						onClick={() => handleNavigation(label, path)}
					>
						<Icon className="h-5 w-5" />
						<span className="sr-only">{label}</span>
					</Button>

					{/* Tooltip */}
					<div className="absolute z-[100] top-1/2-translate-y-1/2 ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
						{label}
					</div>
				</div>
			))}
		</nav>
	);
}
