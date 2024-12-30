import { useState } from "react";

export const useDarkMode = () => {
	const [dark, setDark] = useState<boolean>(false);

	const lightTheme = {
		colors: {
			primary: "#d1ccc3",
			secondary: "#04040e",
			btnRadialGradient: "radial-gradient(circle at 50% 50%, #d1ccc3, #f0532a)",
			btntext: "#1d1d26",
		},
	};
	const darkTheme = {
		colors: {
			primary: "#04040e",
			secondary: "#d1ccc3",
			btnRadialGradient: "radial-gradient(circle at 50% 30%, #04040e, #1d1d26)",
			btntext: "#d1ccc3",
		},
	};

	const TOGGLE_DARK_MODE = () => setDark((prevDark) => !prevDark);

	return { dark, lightTheme, darkTheme, TOGGLE_DARK_MODE };
};
