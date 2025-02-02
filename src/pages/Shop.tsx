"use client";
import { useState } from "react";
import type { Item } from "@/types/shop";
import { items } from "@/data/redeemStorePlaceholderData";
import ItemCard from "@/components/shop/ItemCard";
import ItemModal from "@/components/shop/ItemModal";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/provider/userProvider";

export default function Shop() {
	const { user } = useUser();
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);

	const filteredAndSortedItems = items
		.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			if (sortBy === "name") return a.name.localeCompare(b.name);
			if (sortBy === "cost") return b.cost - a.cost;
			return 0;
		});

	if (!user) {
		return null; // Don't render if user is not loaded
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8 flex justify-between items-center">
				<h1 className="text-3xl font-bold">Redeem Your Points!</h1>
				<div className="text-xl">
					Your Points: <span className="font-bold text-yellow-500">{user.coins}</span>
				</div>
			</div>

			<div className="mb-6 flex gap-4">
				<Input
					type="text"
					placeholder="Search items..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-grow"
				/>
				<Select value={sortBy} onValueChange={setSortBy}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Sort by Name</SelectItem>
						<SelectItem value="cost">Sort by Cost</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
				{filteredAndSortedItems.map((item) => (
					<ItemCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
				))}
			</div>

			{selectedItem && (
				<ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
			)}
		</div>
	);
}
