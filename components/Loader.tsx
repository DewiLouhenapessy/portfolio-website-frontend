import React from "react";

/**
 * Loader component met meerdere visuele varianten.
 *
 * Props:
 * - variant: "spinner" | "dots" | "ring" | "pixelSpinner" | "gradientSpinner"  (default: "spinner")
 * - size:    "sm" | "md" | "lg"                              (default: "md")
 * - color:   Tailwind text-kleur class, bv. "text-blue-500"  (default: "text-blue-500")
 * - label:   optioneel tekstje onder de loader
 * - fullScreen: boolean, toont de loader als overlay over het hele scherm
 */

type Size = "sm" | "md" | "lg" | "xl";
type LoaderVariant = "spinner" | "dots" | "ring" | "gradientSpinner";

interface SizeMapEntry {
	box: string;
	dot: string;
	text: string;
}

const sizeMap: Record<Size, SizeMapEntry> = {
	sm: { box: "w-4 h-4", dot: "w-1.5 h-1.5", text: "text-xs" },
	md: { box: "w-8 h-8", dot: "w-2.5 h-2.5", text: "text-sm" },
	lg: {
		box: "w-12 h-12",
		dot: "w-3.5 h-3.5",
		text: "text-base",
	},
	xl: {
		box: "w-16 h-16",
		dot: "w-4 h-4",
		text: "text-lg",
	},
};

interface VariantProps {
	size?: Size;
	color?: string;
}

function Spinner({ size = "md", color = "text-blue-500" }: VariantProps) {
	return (
		<div
			className={`${sizeMap[size].box} rounded-full border-2 border-current border-t-transparent animate-spin ${color}`}
		/>
	);
}

function Dots({ size = "md", color = "text-blue-500" }: VariantProps) {
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

function Ring({ size = "md", color = "text-blue-500" }: VariantProps) {
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

function GradientSpinner({ size = "md" }: VariantProps) {
	return <div className={` ${sizeMap[size].box} loader`} />;
}

const variants: Record<LoaderVariant, React.ComponentType<VariantProps>> = {
	spinner: Spinner,
	dots: Dots,
	ring: Ring,
	gradientSpinner: GradientSpinner,
};

interface LoaderProps {
	variant: LoaderVariant;
	size?: Size;
	color?: string;
	label?: React.ReactNode;
	fullScreen?: boolean;
}

export default function Loader({
	variant = "spinner",
	size = "md",
	color = "text-blue-500",
	label,
	fullScreen = false,
}: LoaderProps) {
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
