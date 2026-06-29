"use client";

import { useMemo } from "react";
import { Group } from "@visx/group";
import { AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useTheme } from "@/components/ThemeProvider";
import type { Skill } from "@/lib/skills";

type SkillGraphType = "horizontal" | "radar" | "radial-bar";

interface SkillMeterProps {
	skills: Skill[];
	graphType?: SkillGraphType;
	categoryColor: string;
	width?: number;
	height?: number;
}

function polarToCartesian(angle: number, radius: number) {
	return {
		x: Math.sin(angle) * radius,
		y: -Math.cos(angle) * radius,
	};
}

export function SkillMeter({
	skills,
	categoryColor,
	graphType = "horizontal",
	width = 800,
	height = 400,
}: SkillMeterProps) {
	const { theme } = useTheme();
	const margin = { top: 20, right: 30, bottom: 30, left: 150 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xMax = innerWidth;
	const yMax = innerHeight;
	const fillOpacity = theme === "dark" ? 0.6 : 1;

	// Scales
	const xScale = useMemo(
		() =>
			scaleLinear<number>({
				domain: [0, 100],
				range: [0, xMax],
				round: true,
			}),
		[xMax],
	);

	const yScale = useMemo(
		() =>
			scaleBand<string>({
				domain: skills.map((s) => s.name),
				range: [0, yMax],
				round: true,
				padding: 0.2,
			}),
		[skills, yMax],
	);

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

	return (
		<div className="w-full overflow-x-auto rounded-lg border border-border bg-card p-4">
			<svg width={width} height={height} className="mx-auto">
				{graphType === "horizontal" ? (
					<Group left={margin.left} top={margin.top}>
						{/* Grid lines */}
						{[0, 25, 50, 75, 100].map((value) => (
							<line
								key={`grid-${value}`}
								x1={xScale(value)}
								x2={xScale(value)}
								y1={0}
								y2={yMax}
								stroke="currentColor"
								strokeOpacity={0.1}
								strokeDasharray="4"
							/>
						))}

						{/* Bars */}
						{skills.map((skill) => {
							const barHeight = yScale.bandwidth();
							const barY = yScale(skill.name);
							const barWidth = xScale(skill.level);

							if (barY === undefined) return null;

							return (
								<g key={`skill-${skill.name}`}>
									{/* Bar background */}
									<rect
										x={0}
										y={barY}
										width={xMax}
										height={barHeight}
										fill="currentColor"
										fillOpacity={0.05}
										rx={4}
									/>
									{/* Bar fill */}
									<rect
										x={0}
										y={barY}
										width={barWidth}
										height={barHeight}
										rx={4}
										className="transition-all duration-300 hover:opacity-80"
										style={{ fill: categoryColor, fillOpacity }}
									/>
									{/* Level text */}
									<text
										x={barWidth + 8}
										y={barY + barHeight / 2}
										dy="0.25em"
										fontSize={12}
										fill="currentColor"
										className="font-semibold"
									>
										{skill.level}%
									</text>
								</g>
							);
						})}

						{/* Y-axis labels */}
						{skills.map((skill) => {
							const barY = yScale(skill.name);
							if (barY === undefined) return null;

							return (
								<text
									key={`label-${skill.name}`}
									x={-10}
									y={barY + yScale.bandwidth() / 2}
									dy="0.25em"
									textAnchor="end"
									fontSize={13}
									fill="currentColor"
									className="font-medium"
								>
									{skill.name}
								</text>
							);
						})}

						{/* X-axis */}
						<AxisBottom
							top={yMax}
							scale={xScale}
							stroke="currentColor"
							tickStroke="currentColor"
							tickLabelProps={() => ({
								fontSize: 12,
								textAnchor: "middle",
							})}
						/>
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
						{skills.map((skill, index) => {
							const angle = (2 * Math.PI * index) / skills.length;
							const end = polarToCartesian(angle, radius);
							const labelPoint = polarToCartesian(angle, radius + 18);

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
								</g>
							);
						})}
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
								{skills.map((skill, index) => {
									const angle = (2 * Math.PI * index) / skills.length;
									const startAngle = angle + (Math.PI / skills.length) * 0.1;
									const endAngle =
										(2 * Math.PI * (index + 1)) / skills.length -
										(Math.PI / skills.length) * 0.1;
									const outerRadius = radiusScale(skill.level);
									const start = polarToCartesian(startAngle, outerRadius);
									const end = polarToCartesian(endAngle, outerRadius);
									return (
										<path
											key={`radial-bar-${skill.name}`}
											d={`M 0 0 L ${start.x} ${start.y} A ${outerRadius} ${outerRadius} 0 0 1 ${end.x} ${end.y} Z`}
											fill={categoryColor}
											fillOpacity={fillOpacity}
										/>
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
