export interface KanbanCard {
	id: number;
	column_id: number;
	title: string;
	description: string | null;
	position: number;
}

export interface KanbanColumn {
	id: number;
	name: string;
	position: number;
	cards: KanbanCard[];
}

export interface KanbanBoard {
	id: number;
	name: string;
	columns: KanbanColumn[];
}
