import { useState } from "react";
import bulb_on from "@/assets/images/lightMode_bulb.png";
import bulb_off from "@/assets/images/darkMode_bulb.png";

export const useDarkMode = () => {
	const [dark, setDark] = useState<boolean>(false);

	const lightTheme = {
		colors: {
			bodyColors: "#001b4a",
			redColor: "red",
			primary: "#d1ccc3",
			secondary: "#04040e",
			btnRadialGradient: "radial-gradient(circle at 50% 50%, #d1ccc3, #f0532a)",
			btntext: "#1d1d26",
			bulbColor: `url(${bulb_on})`,
			shadow: "0px 0px 1.5px 1.5px rgba(209, 204, 195, 0.5)",
			top1color: " #f0532a",
			top2Color: "a5a9b4",
			top3Color: "#5C4033",
			borderBottomColor: "#0a0a22",
			inputFocusBackground: "#0a0a22",
			inputFocusColor: "#d1ccc3",
		},
	};
	const darkTheme = {
		colors: {
			bodyColors: "#04040e",
			primary: "#0a0a22",
			secondary: "#d1ccc3",
			btnRadialGradient: "radial-gradient(circle at 50% 30%, #04040e, #0a0a22)",
			btntext: "#d1ccc3",
			bulbColor: `url(${bulb_off})`,
			shadow: "0px 0px 1.5px 1.5px rgba(10, 10, 34, 0.5)",
			top1color: "gold",
			top2Color: "silver",
			top3Color: "brown",
			borderBottomColor: " #f0532a",
			inputFocusBackground: "#04040e",
			inputFocusColor: "#d1ccc3",
		},
	};

	const TOGGLE_DARK_MODE = () => setDark((prevDark) => !prevDark);

	return { dark, lightTheme, darkTheme, TOGGLE_DARK_MODE };
};
