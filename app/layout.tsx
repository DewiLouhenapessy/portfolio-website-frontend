import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	Nunito,
	Silkscreen,
	Fira_Code,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-sans" });

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

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dewi Louhenapessy",
	description: "About Dewi Louhenapessy",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				"h-full",
				"antialiased",
				geistSans.variable,
				geistMono.variable,
				silkscreen.variable,
				firaCode.variable,
				"font-sans",
				nunito.variable,
			)}
		>
			<body className="min-h-screen flex flex-col">
				<ThemeProvider>
					<NavBar />
					<main className="flex-1 px-4 py-8">
						<div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/5">
							{children}
						</div>
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
