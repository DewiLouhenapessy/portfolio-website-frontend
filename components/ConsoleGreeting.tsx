"use client";
import { useEffect } from "react";

export default function ConsoleGreeting() {
	useEffect(() => {
		console.log(
			"%cHey hallo! 👋",
			"color: #6366f1; font-size: 20px; font-weight: bold;",
		);

		console.log(
			"%cWat leuk dat je nieuwsgierig bent naar mijn website!",
			"color: #a1a1aa; font-size: 14px;",
		);

		console.log(
			"%cAls je meer wilt weten over de code die ik schrijf, neem dan een kijkje op %cgithub.com/jouw-gebruikersnaam",
			"color: #a1a1aa; font-size: 13px;",
			"color: #22c55e; font-size: 13px; font-weight: bold; text-decoration: underline;",
		);
	}, []);

	return null;
}
