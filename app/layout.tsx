import type { Metadata } from "next";
import { headers } from "next/headers";
import {
	Geist,
	Geist_Mono,
	Nunito,
	Silkscreen,
	Fira_Code,
	Raleway,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-sans" });

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersList = await headers();
	const host = headersList.get("host") ?? "";
	const htmlLang = host.endsWith(".com") ? "en" : "nl";

	return (
		<html
			lang={htmlLang}
			className={cn(
				"h-full",
				"antialiased",
				geistSans.variable,
				geistMono.variable,
				silkscreen.variable,
				firaCode.variable,
				raleway.variable,
				"font-sans",
				nunito.variable,
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
