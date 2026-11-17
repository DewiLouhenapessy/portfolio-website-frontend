// kanban types

export type Priority = "low" | "medium" | "high";

export interface Task {
	id: number;
	column_id: number;
	title: string;
	description: string | null;
	priority: Priority;
	position?: number;
}

export interface Column {
	id: number;
	name: string;
	color: string;
	position: number;
	tasks: Task[];
}

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
