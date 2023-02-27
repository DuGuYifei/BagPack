import { HistoryItemInterface } from "./HistoryItem";

export interface OrderInterface {
	id: string;
	user: string;
	bag: string;
	buy_price: number;
	sell_price: number;
	send_price: number;
	sender: string;
	history: Array<HistoryItemInterface>;
}
