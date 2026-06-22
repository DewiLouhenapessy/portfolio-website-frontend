"use client";

import { useMemo } from "react";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import type { Skill } from "@/lib/skills";

interface SkillMeterProps {
	skills: Skill[];
	categoryColor: string;
	width?: number;
	height?: number;
}

export function SkillMeter({
	skills,
	categoryColor,
	width = 800,
	height = 400,
}: SkillMeterProps) {
	const margin = { top: 20, right: 30, bottom: 30, left: 150 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xMax = innerWidth;
	const yMax = innerHeight;

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

	return (
		<div className="w-full overflow-x-auto rounded-lg border border-border bg-card p-4">
			<svg width={width} height={height} className="mx-auto">
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
									fill={categoryColor}
									rx={4}
									className="transition-all duration-300 hover:opacity-80"
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
			</svg>
		</div>
	);
}
