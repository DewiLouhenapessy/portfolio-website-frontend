"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ElementType } from "react";

interface TypewriterTextProps {
	text: string;
	className?: string;
	delay?: number;
	speed?: number;
	as?: ElementType;
}

export function TypewriterText({
	text,
	className = "",
	delay = 0,
	speed = 0.05,
	as: Component = "p",
}: TypewriterTextProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const letters = Array.from(text);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: speed,
				delayChildren: delay,
			},
		},
	};

	const letterVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0,
			},
		},
	};

	if (!mounted) {
		return <Component className={className}>{text}</Component>;
	}

	return (
		<motion.div initial="hidden" animate="visible" variants={containerVariants}>
			<Component className={className}>
				{letters.map((letter, index) => (
					<motion.span
						key={`${letter}-${index}`}
						variants={letterVariants}
						style={{ display: "inline-block" }}
					>
						{letter === " " ? "\u00A0" : letter}
					</motion.span>
				))}
			</Component>
		</motion.div>
	);
}
