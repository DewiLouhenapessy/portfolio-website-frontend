"use client";

import { motion } from "framer-motion";
import React, { forwardRef, useEffect, useState } from "react";

interface AnimatedTextProps {
	text: string;
	as?: keyof React.JSX.IntrinsicElements;
	className?: string;
	delay?: number;
	duration?: number;
}

export const AnimatedText = forwardRef<HTMLElement, AnimatedTextProps>(
	function AnimatedTextInner(
		{
			text,
			as: Component = "p",
			className = "",
			delay = 0,
			duration = 0.05,
		}: AnimatedTextProps,
		ref,
	) {
		const [isDark, setIsDark] = useState(false);

		useEffect(() => {
			// Check initial dark mode state
			const isDarkMode = document.documentElement.classList.contains("dark");
			setIsDark(isDarkMode);

			// Listen for changes
			const observer = new MutationObserver(() => {
				setIsDark(document.documentElement.classList.contains("dark"));
			});

			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});

			return () => observer.disconnect();
		}, []);

		const letters = Array.from(text);

		const containerVariants = {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: duration,
					delayChildren: delay,
				},
			},
		};

		const letterVariants = {
			hidden: {
				opacity: 0,
				x: -20,
			},
			visible: {
				opacity: 1,
				x: 0,
				transition: {
					duration: 0.5,
					ease: "easeIn",
				},
			},
		};

		const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(Component);
		const finalClassName =
			isHeading && isDark ? `font-silkscreen ${className}` : className;

		const MotionComponent = motion[Component as keyof typeof motion] as any;

		return (
			<MotionComponent
				ref={ref}
				className={finalClassName}
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{letters.map((letter, index) => (
					<motion.span
						key={`${index}-${letter}`}
						variants={letterVariants}
						style={{ display: "inline-block" }}
					>
						{letter === " " ? "\u00A0" : letter}
					</motion.span>
				))}
			</MotionComponent>
		);
	},
);
