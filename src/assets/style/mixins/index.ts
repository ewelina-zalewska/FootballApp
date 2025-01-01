import { css } from "styled-components";

export const transparent = css<{ color: string }>`
	&:hover {
		background: ${(props) => props.color};
	}
`;
