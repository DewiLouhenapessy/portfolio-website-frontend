"use-client";
import { LucideTriangle } from "lucide-react";

const ScrollToTop = () => {
	const scrollUp = () => window.scrollTo(0, 0);
	return (
		<button onClick={scrollUp}>
			<LucideTriangle />
		</button>
	);
};

export default ScrollToTop;
