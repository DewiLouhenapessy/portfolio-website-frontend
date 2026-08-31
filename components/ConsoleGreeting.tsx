"use client";
import { useCallback, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { consoleGreeting } from "@/lib/i18n";

export default function ConsoleGreeting() {
	const { locale } = useLanguage();

	const showGreeting = useCallback(() => {
		console.log(
			`\n\n%c${consoleGreeting.title[locale]}\n\n%c${consoleGreeting.message[locale]}\n\n${consoleGreeting.callToAction[locale]}\n\nhttps://github.com/DewiLouhenapessy\n\n`,
			"color: #0e7490; font-family: 'Courier New', Courier, 'Lucida Console', Monaco, monospace; font-size: 20px;",
			"color: #71717a; font-family: 'Courier New', Courier, 'Lucida Console', Monaco, monospace; font-size: 14px;",
		);
	}, [locale]);

	useEffect(() => {
		const DURATION_MS = 6000; // hoelang de regenanimatie draait

		const COLS = 60;
		const ROWS = 25;
		const CHARS = " .:-=+*#%@";

		type Ripple = { x: number; y: number; radius: number };
		let ripples: Ripple[] = [];
		let frame = 0;

		const spawnDrop = () => {
			ripples.push({
				x: Math.floor(Math.random() * COLS),
				y: Math.floor(Math.random() * ROWS),
				radius: 0,
			});
		};

		const render = () => {
			const grid: number[][] = Array.from({ length: ROWS }, () =>
				new Array(COLS).fill(0),
			);

			for (const r of ripples) {
				for (let y = 0; y < ROWS; y++) {
					for (let x = 0; x < COLS; x++) {
						const dx = x - r.x;
						const dy = (y - r.y) * 2;
						const dist = Math.sqrt(dx * dx + dy * dy);
						const ringDist = Math.abs(dist - r.radius);
						if (ringDist < 1.2) {
							const strength = 1 - ringDist / 1.2;
							grid[y][x] = Math.max(grid[y][x], strength * (1 - r.radius / 15));
						}
					}
				}
			}

			let output = "";
			for (let y = 0; y < ROWS; y++) {
				let row = "";
				for (let x = 0; x < COLS; x++) {
					const v = Math.max(0, Math.min(1, grid[y][x]));
					const idx = Math.floor(v * (CHARS.length - 1));
					row += CHARS[idx];
				}
				output += row + "\n";
			}

			console.clear();
			console.log(
				`%c${output}`,
				"font-family: 'Courier New', Courier, 'Lucida Console', Monaco, monospace; white-space: pre; color: #0e7490; line-height: 1.1;",
			);
		};

		const tick = () => {
			frame++;
			if (frame % 20 === 0) spawnDrop();

			ripples.forEach((r) => (r.radius += 0.4));
			ripples = ripples.filter((r) => r.radius < 15);

			render();
		};

		spawnDrop();
		const intervalId = setInterval(tick, 80);

		const timeoutId = setTimeout(() => {
			clearInterval(intervalId);
			console.clear();
			showGreeting();
		}, DURATION_MS);

		return () => {
			clearInterval(intervalId);
			clearTimeout(timeoutId);
		};
	}, [locale, showGreeting]);

	return null;
}
