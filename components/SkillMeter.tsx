"use client";

import { useEffect, useMemo, useState } from "react";
import { Group } from "@visx/group";
import { AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useTheme } from "@/components/ThemeProvider";
import type { Skill } from "@/lib/skills";
import Loader from "./Loader";

type SkillGraphType = "vertical" | "radar" | "radial-bar";

interface SkillMeterProps {
	skills: Skill[];
	skillCategory: Skill["category"];
	graphType?: SkillGraphType;
	sortType?: "original" | "alphabetical";
	categoryColor: string;
	width?: number;
	height?: number;
	langLevelLabel?: string;
	onReady?: () => void;
}

function polarToCartesian(angle: number, radius: number) {
	return {
		x: Math.sin(angle) * radius,
		y: -Math.cos(angle) * radius,
	};
}

export function SkillMeter({
	skills,
	skillCategory,
	categoryColor,
	graphType = "vertical",
	sortType = "original",
	width = 800,
	height = 400,
	onReady,
}: SkillMeterProps) {
	const { theme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);
	const [hasSignaledReady, setHasSignaledReady] = useState(false);
	const margin = { top: 30, right: 30, bottom: 30, left: 60 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xMax = innerWidth;
	const yMax = innerHeight;
	const fillOpacity = theme === "dark" ? 0.6 : 1;

	// Scales
	const xScale = useMemo(
		() =>
			scaleBand<string>({
				domain: skills.map((s) => s.name),
				range: [0, xMax],
				round: true,
				padding: 0.2,
			}),
		[skills, xMax],
	);

	const yScale = useMemo(
		() =>
			scaleLinear<number>({
				domain: [0, 100],
				range: [0, yMax],
				round: true,
			}),
		[yMax],
	);

	const langScale = useMemo(
		() =>
			scaleBand<string>({
				domain: ["Fluent", "Good", "Sufficient", "Basic"],
				range: [0, yMax],
				round: true,
				padding: 0.2,
			}),
		[["Fluent", "Good", "Sufficient", "Basic"], yMax],
	);

	// delay rendering of chart to show off loader
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setIsMounted(true);
		}, 600);

		return () => window.clearTimeout(timeout);
	}, []);

	// sequential loading
	useEffect(() => {
		if (!isMounted || hasSignaledReady) return;

		const raf = window.requestAnimationFrame(() => {
			onReady?.();
			setHasSignaledReady(true);
		});

		return () => window.cancelAnimationFrame(raf);
	}, [hasSignaledReady, isMounted, onReady]);

	const radius = Math.min(xMax, yMax) / 2;
	const radiusScale = useMemo(
		() =>
			scaleLinear<number>({
				domain: [0, 100],
				range: [0, radius],
			}),
		[radius],
	);

	const radarPoints = useMemo(
		() =>
			skills.map((skill, index) => {
				const angle = (2 * Math.PI * index) / skills.length;
				return polarToCartesian(angle, radiusScale(skill.level));
			}),
		[skills, radiusScale],
	);

	// Sort skills based on sortType and graphType
	const sortedSkills = useMemo(() => {
		const shouldSort =
			graphType === "radial-bar" && sortType === "alphabetical";
		if (shouldSort) {
			return [...skills].sort((a, b) => a.name.localeCompare(b.name));
		}
		return skills;
	}, [skills, graphType, sortType]);

	if (!isMounted) {
		return (
			<div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 text-sm text-muted-foreground">
				<div className="flex ">
					<Loader variant="gradientSpinner" size="xl" />
					<div className="flex items-end">
						<h2 className="text-2xl p-4 pr-2">Loading chart</h2>
						<Loader variant="dots" size="sm" color={categoryColor} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full overflow-x-auto rounded-lg border border-border bg-card p-4">
			<svg
				width={width} // kijken of ik de linker marge kleiner kan maken in schermen kleiner dan md
				height={height}
				className="mx-auto overflow-visible scale-80 md:scale-100"
			>
				{graphType === "vertical" ? (
					<Group left={margin.left} top={margin.top}>
						{/* Grid lines */}
						{[0, 25, 50, 75, 100].map((value) => (
							<line
								key={`grid-${value}`}
								x1={0}
								x2={xMax}
								y1={yScale(value)}
								y2={yScale(value)}
								stroke="currentColor"
								strokeOpacity={0.1}
								strokeDasharray="4"
							/>
						))}

						{/* Bars */}
						{skills.map((skill) => {
							const barHeight = yScale(skill.level);
							const barX = xScale(skill.name);
							const barWidth = xScale.bandwidth();

							if (barX === undefined) return null;

							return (
								<g key={`skill-${skill.name}`}>
									{/* Bar background */}
									<rect
										x={barX}
										y={yMax - barHeight}
										width={barWidth * 0.8}
										height={barHeight}
										fill="currentColor"
										fillOpacity={0.05}
										rx={4}
									/>
									{/* Bar fill */}
									<rect
										x={barX}
										y={yMax - barHeight}
										width={barWidth * 0.8}
										height={barHeight}
										rx={4}
										className="transition-all duration-300 hover:opacity-80"
										style={{ fill: categoryColor, fillOpacity }}
									/>
								</g>
							);
						})}

						{/* Y-axis labels */}
						{skills.map((skill) => {
							const barX = xScale(skill.name);
							if (barX === undefined) return null;

							return (
								<text
									key={`label-${skill.name}`}
									x={barX + xScale.bandwidth() * 0.25}
									y={yMax + 25}
									dx="0.5em"
									textAnchor="start"
									fontSize={13}
									fill="currentColor"
									className="font-medium"
								>
									{skill.name}
								</text>
							);
						})}

						{/* X-axis */}
						{skillCategory === "language" ? (
							<AxisLeft
								top={0}
								scale={langScale}
								hideAxisLine={true}
								hideTicks={true}
								tickLabelProps={() => ({
									fontSize: 12,
									textAnchor: "end",
									fill: "currentColor",
									dy: "-3em",
									dx: "1.5em",
								})}
							/>
						) : (
							<AxisLeft
								top={0}
								scale={yScale}
								stroke="currentColor"
								tickStroke="currentColor"
								tickLabelProps={() => ({
									fontSize: 12,
									textAnchor: "middle",
									fill: "currentColor",
								})}
							/>
						)}
					</Group>
				) : (
					<Group left={margin.left + xMax / 2} top={margin.top + yMax / 2}>
						{[25, 50, 75, 100].map((level) => (
							<circle
								key={`radar-grid-${level}`}
								r={radiusScale(level)}
								fill="none"
								stroke="currentColor"
								strokeOpacity={0.1}
							/>
						))}
						{(graphType === "radial-bar" ? sortedSkills : skills).map(
							(skill, index) => {
								const totalSkills =
									graphType === "radial-bar"
										? sortedSkills.length
										: skills.length;
								const angle = (2 * Math.PI * index) / totalSkills;
								const end = polarToCartesian(angle, radius);
								const labelPoint = polarToCartesian(angle, radius + 18);
								// const [sortType, setSortType()] = useState<
								// 	"original" | "alphabetical"
								// >("original");

								return (
									<g key={`axis-${skill.name}`}>
										<line
											x1={0}
											y1={0}
											x2={end.x}
											y2={end.y}
											stroke="currentColor"
											strokeOpacity={0.15}
											strokeWidth={1}
											strokeDasharray="3"
										/>
										<text
											x={labelPoint.x}
											y={labelPoint.y}
											fontSize={12}
											fill="currentColor"
											textAnchor={
												Math.abs(labelPoint.x) < 5
													? "middle"
													: labelPoint.x > 0
														? "start"
														: "end"
											}
											alignmentBaseline="middle"
										>
											{skill.name}
										</text>
										{/* <button
											onClick={() =>
												setSortType(
													sortType === "original" ? "alphabetical" : "original",
												)
											}
											className="mt-4 px-4 py-2 rounded-md border border-border bg-card hover:bg-muted transition-colors"
										>
											{sortType === "original"
												? "Sorteren: Origineel"
												: "Sorteren: Alfabetisch"}
										</button> */}
									</g>
								);
							},
						)}
						{graphType === "radar" ? (
							<path
								d={`M ${radarPoints.map((point, index) => `${index === 0 ? "" : "L"} ${point.x} ${point.y}`).join(" ")} Z`}
								fill={categoryColor}
								fillOpacity={fillOpacity * 0.45}
								stroke={categoryColor}
								strokeWidth={2}
							/>
						) : (
							<>
								{sortedSkills.map((skill, index) => {
									const angle = (2 * Math.PI * index) / sortedSkills.length;
									const startAngle =
										angle + (Math.PI / sortedSkills.length) * 0.1;
									const endAngle =
										(2 * Math.PI * (index + 1)) / sortedSkills.length -
										(Math.PI / sortedSkills.length) * 0.1;
									const outerRadius = radiusScale(skill.level);
									const start = polarToCartesian(startAngle, outerRadius);
									const end = polarToCartesian(endAngle, outerRadius);
									const midAngle = (startAngle + endAngle) / 2;
									const labelRadius = radius * 0.6;
									const labelPoint = polarToCartesian(midAngle, labelRadius);

									return (
										<g key={`radial-bar-${skill.name}`}>
											<path
												d={`M 0 0 L ${start.x} ${start.y} A ${outerRadius} ${outerRadius} 0 0 1 ${end.x} ${end.y} Z`}
												fill={categoryColor}
												fillOpacity={fillOpacity}
											/>
											<text
												x={labelPoint.x}
												y={labelPoint.y}
												fontSize={11}
												fill="currentColor"
												fontWeight="bold"
												textAnchor="middle"
												alignmentBaseline="middle"
											>
												{index + 1}
											</text>
										</g>
									);
								})}
							</>
						)}
					</Group>
				)}
			</svg>
		</div>
	);
}
