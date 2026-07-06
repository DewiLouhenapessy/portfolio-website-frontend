import React from "react";

/**
 * Loader component met meerdere visuele varianten.
 *
 * Props:
 * - variant: "spinner" | "dots" | "bars" | "ring" | "pulse"  (default: "spinner")
 * - size:    "sm" | "md" | "lg"                              (default: "md")
 * - color:   Tailwind text-kleur class, bv. "text-blue-500"  (default: "text-blue-500")
 * - label:   optioneel tekstje onder de loader
 * - fullScreen: boolean, toont de loader als overlay over het hele scherm
 */

const sizeMap = {
	sm: { box: "w-4 h-4", bar: "w-1 h-3", dot: "w-1.5 h-1.5", text: "text-xs" },
	md: { box: "w-8 h-8", bar: "w-1.5 h-6", dot: "w-2.5 h-2.5", text: "text-sm" },
	lg: {
		box: "w-12 h-12",
		bar: "w-2 h-8",
		dot: "w-3.5 h-3.5",
		text: "text-base",
	},
};

function Spinner({ size, color }) {
	return (
		<div
			className={`${sizeMap[size].box} rounded-full border-2 border-current border-t-transparent animate-spin ${color}`}
		/>
	);
}

function Dots({ size, color }) {
	return (
		<div className="flex items-center gap-1.5">
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className={`${sizeMap[size].dot} rounded-full bg-current ${color} animate-bounce`}
					style={{ animationDelay: `${i * 0.15}s` }}
				/>
			))}
		</div>
	);
}

function Bars({ size, color }) {
	return (
		<div className="flex items-end gap-1">
			{[0, 1, 2, 3].map((i) => (
				<div
					key={i}
					className={`${sizeMap[size].bar} rounded-sm bg-current ${color} animate-pulse`}
					style={{ animationDelay: `${i * 0.12}s` }}
				/>
			))}
		</div>
	);
}

function Ring({ size, color }) {
	return (
		<div className={`relative ${sizeMap[size].box}`}>
			<div
				className={`absolute inset-0 rounded-full border-2 border-current opacity-20 ${color}`}
			/>
			<div
				className={`absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin ${color}`}
			/>
		</div>
	);
}

function Pulse({ size, color }) {
	return (
		<div className="relative flex items-center justify-center">
			<div
				className={`absolute ${sizeMap[size].box} rounded-full bg-current opacity-30 animate-ping ${color}`}
			/>
			<div
				className={`${sizeMap[size].box} rounded-full bg-current ${color}`}
			/>
		</div>
	);
}

const variants = {
	spinner: Spinner,
	dots: Dots,
	bars: Bars,
	ring: Ring,
	pulse: Pulse,
};

export default function Loader({
	variant = "spinner",
	size = "md",
	color = "text-blue-500",
	label,
	fullScreen = false,
}) {
	const VariantComponent = variants[variant] || Spinner;

	const content = (
		<div className="flex flex-col items-center justify-center gap-3">
			<VariantComponent size={size} color={color} />
			{label && (
				<p className={`${sizeMap[size].text} text-gray-500`}>{label}</p>
			)}
		</div>
	);

	if (fullScreen) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
				{content}
			</div>
		);
	}

	return content;
}

/* --- Voorbeeldgebruik ---

import Loader from "./Loader";

<Loader variant="spinner" />
<Loader variant="dots" size="lg" color="text-emerald-500" label="Laden..." />
<Loader variant="bars" color="text-purple-500" />
<Loader variant="ring" size="sm" />
<Loader variant="pulse" fullScreen label="Bezig met opslaan..." />

*/
