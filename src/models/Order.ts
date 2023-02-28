import { HistoryItemInterface } from "./HistoryItem";

export interface OrderInterface {
	id: string;
	user: string;
	bag: string;
	buyPrice: number;
	sellPrice: number;
	sendPrice: number;
	sender: string;
	history: Array<HistoryItemInterface>;
}
