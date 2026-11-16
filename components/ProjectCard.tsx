import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";

interface ProjectCardData {
	name: string;
	subtitle: string;
	status?: string;
	description: string;
	highlights: string[];
	technologies: string[];
	links: { label: string; url: string }[];
}

interface ProjectCardProps {
	project: ProjectCardData;
	locale: Locale;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
	return (
		<article>
			<Accordion>
				<AccordionItem
					id={project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
				>
					<Card className="gap-0 overflow-hidden py-0">
						<AccordionTrigger
							headingLevel={3}
							className="px-6 py-5 hover:bg-muted/30"
						>
							<CardHeader className="flex-1 gap-1 p-0">
								<CardTitle className="text-xl">{project.name}</CardTitle>
								<CardDescription>{project.subtitle}</CardDescription>
							</CardHeader>
							{project.status && (
								<span className="mt-1 shrink-0 text-sm font-medium text-muted-foreground">
									{project.status}
								</span>
							)}
						</AccordionTrigger>
						<AccordionContent>
							<CardContent className="flex flex-col gap-4 border-t border-border/70 pb-6 pt-4">
								<p className="leading-relaxed">{project.description}</p>
								<ul className="list-disc space-y-2 pl-5">
									{project.highlights.map((highlight) => (
										<li key={highlight}>{highlight}</li>
									))}
								</ul>
								<ul
									aria-label={
										locale === "nl"
											? "Gebruikte technologieën"
											: "Technologies"
									}
									className="flex flex-wrap gap-2"
								>
									{project.technologies.map((technology) => (
										<li
											key={technology}
											className="rounded-full border border-border/70 px-3 py-1 text-sm text-muted-foreground"
										>
											{technology}
										</li>
									))}
								</ul>
								<div className="flex flex-wrap gap-x-5 gap-y-2">
									{project.links.map((link) => (
										<a
											key={link.label}
											href={link.url}
											target="_blank"
											rel="noreferrer"
											className="inline-flex w-fit font-medium underline underline-offset-4 hover:text-primary"
										>
											{link.label} <span aria-hidden="true">→</span>
										</a>
									))}
								</div>
							</CardContent>
						</AccordionContent>
					</Card>
				</AccordionItem>
			</Accordion>
		</article>
	);
}
