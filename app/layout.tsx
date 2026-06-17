import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	Inter,
	Silkscreen,
	Fira_Code,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
				inter.variable,
			)}
		>
			<body className="min-h-full flex flex-col justify-between">
				<ThemeProvider>
					<NavBar />
					<div className="p-4">{children}</div>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
