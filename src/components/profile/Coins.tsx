import { User } from "@/types/user";
import { Badge } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

// Utility function to format numbers into readable strings
function formatNumber(value: number): string {
	if (value >= 1_000_000) {
		return (value / 1_000_000).toFixed(1) + "M";
	} else if (value >= 1_000) {
		return (value / 1_000).toFixed(1) + "K";
	}
	return value.toString();
}

interface CoinProps {
	user: User;
}

export default function Coins({ user }: CoinProps) {
	return (
		<Card className="p-6 shadow-lg border rounded-xl">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">Coins</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center items-center gap-2 text-6xl font-extrabold text-yellow-500">
					{formatNumber(user.coins)}
					<div className="relative group">
						<Badge className="w-8 h-8 cursor-pointer" />
						<div className="absolute bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-900 text-white text-sm rounded-lg px-2 py-1 shadow-lg whitespace-nowrap">
							{user.coins.toLocaleString()} coins
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
