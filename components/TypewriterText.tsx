"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
	text: string;
	className?: string;
	delay?: number;
	speed?: number;
}

export function TypewriterText({
	text,
	className = "",
	delay = 0,
	speed = 0.05,
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
		return <p className={className}>{text}</p>;
	}

	return (
		<motion.div initial="hidden" animate="visible" variants={containerVariants}>
			<p className={className}>
				{letters.map((letter, index) => (
					<motion.span
						key={`${letter}-${index}`}
						variants={letterVariants}
						style={{ display: "inline-block" }}
					>
						{letter === " " ? "\u00A0" : letter}
					</motion.span>
				))}
			</p>
		</motion.div>
	);
}
