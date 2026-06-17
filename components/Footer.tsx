import Link from "next/link";

const Footer = () => {
	interface FooterItemProps {
		text: string;
		href: string;
		onClick?: () => void;
	}

	const FooterItem = ({ text, href, onClick }: FooterItemProps) => {
		return (
			<Link
				className="text-l text-foreground transition hover:-translate-x-0.5"
				href={href}
				onClick={onClick}
			>
				{text}
			</Link>
		);
	};

	const footerItems = [
		{
			href: "https://www.linkedin.com/in/dewi-louhenapessy-8b0894146/",
			text: "LinkedIn",
		},
		{ href: "https://github.com/DewiLouhenapessy", text: "Github" },
		{ href: "mailto:dewilouhenapessy@gmail.com", text: "Email" },
	];

	return (
		<footer className="bg-gradient-theme rounded-t-xl dark:rounded-t-xs text-justify flex flex-col items-center justify-around gap-3 px-4 py-3 bottom-0 mt-8 md:flex-row">
			{footerItems.map((item) => (
				<FooterItem key={item.href} href={item.href} text={item.text} />
			))}
		</footer>
	);
};

export default Footer;
