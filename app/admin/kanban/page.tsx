"use client";

import { useEffect, useState, type DragEvent, type FormEvent } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { kanbanApi } from "@/lib/kanban-api";
import { pageContent } from "@/lib/i18n";
import type { KanbanBoard, KanbanColumn } from "@/lib/types";

interface CardDraft {
	title: string;
	description: string;
}

export default function KanbanPage() {
	const { locale } = useLanguage();
	const content = pageContent.admin.kanban;
	const [board, setBoard] = useState<KanbanBoard | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loadAttempt, setLoadAttempt] = useState(0);
	const [newColumnName, setNewColumnName] = useState("");
	const [cardDrafts, setCardDrafts] = useState<Record<number, CardDraft>>({});
	const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
	const [draggedOverColumnId, setDraggedOverColumnId] = useState<number | null>(
		null,
	);

	useEffect(() => {
		const controller = new AbortController();

		kanbanApi
			.getBoard(controller.signal)
			.then(({ board: loadedBoard }) => setBoard(loadedBoard))
			.catch((error: unknown) => {
				if (!controller.signal.aborted) {
					console.error("Failed to load the kanban board", error);
					setErrorMessage(
						error instanceof Error
							? error.message
							: content.loadingError[locale],
					);
				}
			})
			.finally(() => {
				if (!controller.signal.aborted) setIsLoading(false);
			});

		return () => controller.abort();
	}, [content.loadingError, locale, loadAttempt]);

	const saveChange = async (change: () => Promise<unknown>): Promise<boolean> => {
		setIsSaving(true);
		setErrorMessage(null);

		let changeSaved = false;
		try {
			await change();
			changeSaved = true;
			const { board: updatedBoard } = await kanbanApi.getBoard();
			setBoard(updatedBoard);
			return true;
		} catch (error) {
			console.error(
				changeSaved
					? "Kanban changes were saved, but the board could not be refreshed"
					: "Failed to update the kanban board",
				error,
			);
			setErrorMessage(
				changeSaved
					? content.refreshFailed[locale]
					: error instanceof Error
						? error.message
						: content.changesFailed[locale],
			);
			return changeSaved;
		} finally {
			setIsSaving(false);
		}
	};

	const handleCreateColumn = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const name = newColumnName.trim();
		if (
			isSaving ||
			!name ||
			!(await saveChange(() => kanbanApi.createColumn(name)))
		) {
			return;
		}

		setNewColumnName("");
	};

	const handleCreateCard = async (
		event: FormEvent<HTMLFormElement>,
		column: KanbanColumn,
	) => {
		event.preventDefault();
		const draft = cardDrafts[column.id] ?? { title: "", description: "" };
		const title = draft.title.trim();
		if (
			isSaving ||
			!title ||
			!(await saveChange(() =>
				kanbanApi.createCard(column.id, title, draft.description.trim()),
			))
		) {
			return;
		}

		setCardDrafts((drafts) => ({
			...drafts,
			[column.id]: { title: "", description: "" },
		}));
	};

	const handleDeleteColumn = async (column: KanbanColumn) => {
		const message = content.confirmDeleteColumn[locale].replace(
			"{column}",
			column.name,
		);
		if (!window.confirm(message)) return;

		await saveChange(() => kanbanApi.deleteColumn(column.id));
	};

	const handleDeleteCard = async (cardId: number, title: string) => {
		const message = content.confirmDeleteCard[locale].replace("{card}", title);
		if (!window.confirm(message)) return;

		await saveChange(() => kanbanApi.deleteCard(cardId));
	};

	const handleMoveCard = async (cardId: number, columnId: number) => {
		if (!board) return;

		const currentColumn = board.columns.find((column) =>
			column.cards.some((card) => card.id === cardId),
		);
		if (!currentColumn || currentColumn.id === columnId) return;

		await saveChange(() => kanbanApi.moveCard(cardId, columnId));
		setDraggedCardId(null);
		setDraggedOverColumnId(null);
	};

	const handleDragStart = (
		event: DragEvent<HTMLElement>,
		cardId: number,
	) => {
		event.dataTransfer.setData("text/plain", String(cardId));
		event.dataTransfer.effectAllowed = "move";
		setDraggedCardId(cardId);
	};

	const handleDrop = (
		event: DragEvent<HTMLElement>,
		columnId: number,
	) => {
		event.preventDefault();
		const cardId = Number(event.dataTransfer.getData("text/plain"));
		if (!Number.isSafeInteger(cardId) || cardId <= 0) return;

		setDraggedOverColumnId(null);
		void handleMoveCard(cardId, columnId);
	};

	if (isLoading) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<p role="status">{content.loading[locale]}</p>
			</div>
		);
	}

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-6">
			<header className="space-y-2">
				<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
					{content.heading[locale]}
				</p>
				<h1 className="text-3xl font-semibold sm:text-4xl">{content.title[locale]}</h1>
				<p className="max-w-2xl text-base leading-7 text-muted-foreground">
					{content.description[locale]}
				</p>
			</header>

			{errorMessage ? (
				<div
					className="flex flex-col gap-3 rounded-xl border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
					role="alert"
				>
					<span>{errorMessage}</span>
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							setErrorMessage(null);
							setIsLoading(true);
							setLoadAttempt((attempt) => attempt + 1);
						}}
					>
						{content.retry[locale]}
					</Button>
				</div>
			) : null}

			{board ? (
				<>
					<form
						onSubmit={handleCreateColumn}
						className="flex flex-col gap-3 sm:flex-row sm:items-end"
					>
						<div className="flex-1 space-y-2">
							<label
								htmlFor="new-column-name"
								className="text-sm font-medium"
							>
								{content.columnFormLabel[locale]}
							</label>
							<input
								id="new-column-name"
								value={newColumnName}
								onChange={(event) => setNewColumnName(event.target.value)}
								maxLength={255}
								required
								placeholder={content.columnPlaceholder[locale]}
								className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:border-ring"
							/>
						</div>
						<Button type="submit" disabled={isSaving || !newColumnName.trim()}>
							<Plus aria-hidden="true" />
							{content.addColumn[locale]}
						</Button>
					</form>

					{board.columns.length === 0 ? (
						<p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
							{content.emptyBoard[locale]}
						</p>
					) : (
						<div className="flex items-start gap-4 overflow-x-auto pb-3">
							{board.columns.map((column) => {
								const draft = cardDrafts[column.id] ?? {
									title: "",
									description: "",
								};
								const isDropTarget = draggedOverColumnId === column.id;

								return (
									<section
										key={column.id}
										aria-label={column.name}
										onDragOver={(event) => {
											event.preventDefault();
											event.dataTransfer.dropEffect = "move";
											setDraggedOverColumnId(column.id);
										}}
										onDragLeave={(event) => {
											if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
												setDraggedOverColumnId(null);
											}
										}}
										onDrop={(event) => handleDrop(event, column.id)}
										className={`w-80 shrink-0 rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm transition-colors ${
											isDropTarget ? "border-primary bg-primary/5" : ""
										}`}
									>
										<div className="flex items-start justify-between gap-3">
											<div className="flex min-w-0 items-center gap-2">
												<h2 className="break-words text-lg font-semibold">
													{column.name}
												</h2>
												<span className="rounded-full border border-border/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
													{column.cards.length}
												</span>
											</div>
											<button
												type="button"
												disabled={isSaving}
												onClick={() => void handleDeleteColumn(column)}
												aria-label={`${content.deleteColumn[locale]}: ${column.name}`}
												title={content.deleteColumn[locale]}
												className="shrink-0 rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
											>
												<Trash2 aria-hidden="true" className="size-4" />
											</button>
										</div>

										<div
											className="mt-4 min-h-20 space-y-3"
											aria-label={column.name}
										>
											{column.cards.map((card) => (
												<article
													key={card.id}
													draggable={!isSaving}
													onDragStart={(event) =>
														handleDragStart(event, card.id)
													}
													onDragEnd={() => {
														setDraggedCardId(null);
														setDraggedOverColumnId(null);
													}}
													className={`rounded-xl border border-border/70 bg-background/90 p-3 shadow-sm ${
														draggedCardId === card.id
															? "opacity-50"
															: "cursor-grab active:cursor-grabbing"
													}`}
												>
													<div className="flex items-start justify-between gap-2">
														<div className="flex min-w-0 items-start gap-2">
															<GripVertical
																aria-hidden="true"
																className="mt-1 size-4 shrink-0 text-muted-foreground"
															/>
															<h3 className="break-words font-medium">
																{card.title}
															</h3>
														</div>
														<button
															type="button"
															disabled={isSaving}
															onClick={() =>
																void handleDeleteCard(card.id, card.title)
															}
															aria-label={`${content.deleteCard[locale]}: ${card.title}`}
															title={content.deleteCard[locale]}
															className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
														>
															<Trash2
																aria-hidden="true"
																className="size-4"
															/>
														</button>
													</div>
													{card.description ? (
														<p className="mt-2 text-sm leading-6 text-muted-foreground">
															{card.description}
														</p>
													) : null}
													<label
														htmlFor={`move-card-${card.id}`}
														className="sr-only"
													>
														{content.moveCard[locale]}
													</label>
													<select
														id={`move-card-${card.id}`}
														defaultValue=""
														disabled={
															isSaving || board.columns.length < 2
														}
														onChange={(event) => {
															const nextColumnId = Number(
																event.currentTarget.value,
															);
															event.currentTarget.value = "";
															void handleMoveCard(card.id, nextColumnId);
														}}
														className="mt-3 w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-muted-foreground outline-none focus:border-ring disabled:opacity-50"
													>
														<option value="" disabled>
															{content.moveCard[locale]}
														</option>
														{board.columns
															.filter(
																(target) => target.id !== column.id,
															)
															.map((target) => (
																<option
																	key={target.id}
																	value={target.id}
																>
																	{content.moveCard[locale]}:{" "}
																	{target.name}
																</option>
															))}
													</select>
												</article>
											))}
											{column.cards.length === 0 ? (
												<p className="rounded-lg border border-dashed border-border/70 p-3 text-center text-sm text-muted-foreground">
													{content.emptyColumn[locale]}
												</p>
											) : null}
										</div>

										<form
											onSubmit={(event) =>
												void handleCreateCard(event, column)
											}
											className="mt-4 flex flex-col gap-2 border-t border-border/60 pt-4"
										>
											<label
												htmlFor={`new-card-title-${column.id}`}
												className="sr-only"
											>
												{content.cardTitleLabel[locale]}
											</label>
											<input
												id={`new-card-title-${column.id}`}
												value={draft.title}
												onChange={(event) =>
													setCardDrafts((drafts) => ({
														...drafts,
														[column.id]: {
															...draft,
															title: event.target.value,
														},
													}))
												}
												maxLength={255}
												required
												disabled={isSaving}
												placeholder={content.cardTitlePlaceholder[locale]}
												className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
											/>
											<label
												htmlFor={`new-card-description-${column.id}`}
												className="sr-only"
											>
												{content.cardDescriptionLabel[locale]}
											</label>
											<textarea
												id={`new-card-description-${column.id}`}
												value={draft.description}
												onChange={(event) =>
													setCardDrafts((drafts) => ({
														...drafts,
														[column.id]: {
															...draft,
															description: event.target.value,
														},
													}))
												}
												maxLength={10000}
												disabled={isSaving}
												rows={2}
												placeholder={
													content.cardDescriptionPlaceholder[locale]
												}
												className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
											/>
											<Button
												type="submit"
												variant="outline"
												disabled={isSaving || !draft.title.trim()}
												className="w-full"
											>
												<Plus aria-hidden="true" />
												{content.addCard[locale]}
											</Button>
										</form>
									</section>
								);
							})}
						</div>
					)}
				</>
			) : null}
		</div>
	);
}
