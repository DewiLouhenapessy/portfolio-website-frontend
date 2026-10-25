(function () {
	try {
		var stored = localStorage.getItem("theme");
		var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		var theme =
			stored === "light" || stored === "dark"
				? stored
				: prefersDark
					? "dark"
					: "light";

		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		}
	} catch (error) {}
})();
