"use client";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/userProvider";
import type { Item } from "@/types/shop";

interface ItemModalProps {
	item: Item;
	onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
	const { user, decrementCoins } = useUser();
	const [redeeming, setRedeeming] = useState(false);

	const canAfford = user ? user.coins >= item.cost : false;

	const handleRedeem = async () => {
		if (!canAfford) return;

		setRedeeming(true);
		try {
			// Deduct points from user's balance
			await decrementCoins(item.cost);

			// Give feedback (e.g., toast notification)
			alert(`You successfully redeemed ${item.name}!`);
			onClose();
		} catch (error) {
			console.error("Redemption failed:", error);
			alert("Failed to redeem the item. Please try again.");
		} finally {
			setRedeeming(false);
		}
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="max-w-xl p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-gray-800">
						{item.name}
					</DialogTitle>
				</DialogHeader>
				<div className="mt-4 flex flex-col items-center">
					<img
						src={item.imgPath || "/placeholder.svg"}
						alt={item.name}
						className="w-full h-64 object-cover rounded-lg shadow-md"
					/>
					<p className="mt-6 text-xl font-extrabold text-gray-900">{item.cost} points</p>
					<p className="mt-2 text-sm text-gray-600 text-center">
						Redeem your points to claim this reward.
					</p>
				</div>
				<DialogFooter className="mt-6 flex justify-between gap-4">
					<Button onClick={onClose} variant="outline" className="w-full py-2">
						Cancel
					</Button>
					<Button
						onClick={handleRedeem}
						disabled={!canAfford || redeeming}
						className={`w-full py-2 ${
							canAfford
								? "bg-green-600 hover:bg-green-700"
								: "bg-gray-300 cursor-not-allowed"
						}`}
					>
						{redeeming ? "Processing..." : canAfford ? "Redeem" : "Not enough points"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
