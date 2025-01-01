import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			bodyColors: string;
			primary: string;
			secondary: string;
			btnRadialGradient: string;
			btntext: string;
			bulbColor: string;
			shadow: string;
			top1color: string;
			top2Color: string;
			top3Color: string;
			borderBottomColor: string;
			inputFocusBackground: string;
			inputFocusColor: string;
		};
	}
}
