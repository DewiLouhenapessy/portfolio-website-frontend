import type { Metadata } from "next";
import { Silkscreen, Fira_Code, Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const raleway = Raleway({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-raleway",
});

const silkscreen = Silkscreen({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-silkscreen",
});

const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-fira-code",
});

export const metadata: Metadata = {
	title: "Dewi Louhenapessy",
	description: "Portfolio website of Dewi Louhenapessy",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={cn(
				"h-full",
				"antialiased",
				"font-corbel",
				silkscreen.variable,
				firaCode.variable,
				raleway.variable,
			)}
		>
			<body className="min-h-screen flex flex-col">
				<LanguageProvider>
					<ThemeProvider>
						<NavBar />
						<main className="flex-1 px-8 py-4">
							<div className="px-4">{children}</div>
						</main>
						<Footer />
					</ThemeProvider>
				</LanguageProvider>
			</body>
		</html>
	);
}
