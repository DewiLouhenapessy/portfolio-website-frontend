"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { pageContent } from "@/lib/i18n";

export default function KanbanPage() {
	const { locale } = useLanguage();
	const content = pageContent.admin.kanban;

	const columns = [
		{
			id: "todo",
			title: content.columns.todo[locale],
			accent: "border-slate-300",
		},
		{
			id: "progress",
			title: content.columns.progress[locale],
			accent: "border-amber-300",
		},
		{
			id: "done",
			title: content.columns.done[locale],
			accent: "border-emerald-300",
		},
	] as const;

	const cards = content.cards[locale];
	return (
		<main className="min-h-screen bg-background px-6 py-8 text-foreground">
			<div className="mx-auto flex max-w-6xl flex-col gap-6">
				<div className="space-y-2">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
						{content.heading[locale]}
					</p>
					<h1 className="text-3xl font-semibold sm:text-4xl">
						{content.title[locale]}
					</h1>
					<p className="max-w-2xl text-base leading-7 text-muted-foreground">
						{content.description[locale]}
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					{columns.map((column) => (
						<section
							key={column.id}
							className={`rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm ${column.accent}`}
						>
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold">{column.title}</h2>
								<span className="rounded-full border border-border/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
									{cards.filter((card) => card.column === column.id).length}
								</span>
							</div>

							<div className="mt-4 space-y-3">
								{cards
									.filter((card) => card.column === column.id)
									.map((card) => (
										<article
											key={card.id}
											className="rounded-xl border border-border/70 bg-background/80 p-3"
										>
											<h3 className="font-medium">{card.title}</h3>
											<p className="mt-1 text-sm leading-6 text-muted-foreground">
												{card.description}
											</p>
										</article>
									))}
							</div>
						</section>
					))}
				</div>
			</div>
		</main>
	);
}
