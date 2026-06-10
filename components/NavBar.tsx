import Link from "next/link";

interface NavItemProps {
	text: string;
	href: string;
}

const NavItem = ({ text, href }: NavItemProps) => {
	return (
		<Link className="text-2xl" href={href}>
			{text}
		</Link>
	);
};

const NavBar = () => {
	return (
		<nav className="bg-gradient-to-br from-custom-blue to-custom-pink rounded-2xl text-justify mb-1 flex justify-around flex-wrap items-center">
			<NavItem href="/" text="Home" />
			<NavItem href="/about" text="About Me" />
			<NavItem href="/projects" text="Projects" />
			<NavItem href="/skills" text="Skills" />
			<NavItem href="/quiz" text="Quiz" />
			<NavItem href="/contact" text="Contact" />
		</nav>
	);
};

export default NavBar;
