import type { Item } from "@/types/shop";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/userProvider";

interface ItemCardProps {
	item: Item;
	onSelect: () => void;
}

export default function ItemCard({ item, onSelect }: ItemCardProps) {
	const { user } = useUser();
	const canAfford = user ? user.coins >= item.cost : false;

	return (
		<Card
			className={`overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full ${
				!canAfford ? "opacity-60 pointer-events-none" : ""
			}`}
		>
			{/* Image with consistent height */}
			<div>
				<img
					src={item.imgPath || "/placeholder.svg"}
					alt={item.name}
					className="w-full h-56 object-cover"
				/>
			</div>

			{/* Flex content to keep consistent spacing */}
			<CardContent className="p-5 flex-1 flex flex-col justify-between">
				<div className="mb-3">
					{/* Title with min-height for consistency */}
					<h2 className="text-xl font-bold text-gray-800 min-h-[48px] leading-tight">
						{item.name}
					</h2>
				</div>
				{/* Larger, bold points display */}
				<p className="text-gray-800 text-lg font-extrabold">{item.cost} points</p>
			</CardContent>

			{/* Footer */}
			<CardFooter className="p-5 pt-0">
				<Button
					onClick={onSelect}
					className="w-full py-2 rounded-lg font-semibold transition-colors duration-200 text-white"
				>
					View Details
				</Button>
			</CardFooter>
		</Card>
	);
}
