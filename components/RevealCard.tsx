"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
	/** Fraction of the element that must be visible to count as "in view". */
	threshold?: number;
	/** Only trigger once, then keep the element visible. */
	triggerOnce?: boolean;
	/** Root element for the observer. Defaults to the browser viewport. */
	root?: Element | null;
}

/**
 * Tracks whether an element is currently intersecting its scroll container
 * (or the viewport, by default). Used to drive scroll-triggered reveal
 * animations without needing a heavier animation library.
 */
function useInView<T extends HTMLElement = HTMLDivElement>(
	options: UseInViewOptions = {},
) {
	const { threshold = 0.4, triggerOnce = false, root = null } = options;
	const ref = useRef<T | null>(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					if (triggerOnce) observer.disconnect();
				} else if (!triggerOnce) {
					setIsInView(false);
				}
			},
			{ threshold, root },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold, triggerOnce, root]);

	return { ref, isInView };
}

interface RevealCardProps {
	text: string;
	direction: "left" | "right";
}

export function RevealCard({ text, direction }: RevealCardProps) {
	const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });
	const isLeft = direction === "left";

	return (
		<div
			ref={ref}
			className={[
				"flex my-6 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0",
				isLeft ? "justify-start" : "justify-end",
				isInView
					? "opacity-100 translate-x-0"
					: isLeft
						? "opacity-0 -translate-x-8"
						: "opacity-0 translate-x-8",
			].join(" ")}
		>
			<div
				className={[
					"max-w-[85%] rounded-2xl px-6 py-5",
					isLeft
						? "bg-zinc-100 dark:bg-zinc-800"
						: "bg-indigo-50 dark:bg-indigo-950",
				].join(" ")}
			>
				<p className="m-0 leading-relaxed text-zinc-900 dark:text-zinc-100 text-justify hyphens-auto">
					{text}
				</p>
			</div>
		</div>
	);
}
