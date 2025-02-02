export interface Item {
	id: number;
	imgPath: string;
	name: string;
	cost: number;
}

export interface PurchasedItem {
	itemId: number;
	ownerId: number;
}
