import { ReactNode } from "react";
import styled from "styled-components";

const StyledBox = styled.header`
	display: flex;
	top: 0;
	left: 0;
	height: 100px;
	width: 100%;
	& > p {
		flex-grow: 1;
		margin-left: 30px;
		font-size: 30px;
		letter-spacing: 2px;
	}
	& > div {
		cursor: pointer;
		width: 80px;
		height: 85px;
		font-size: 40px;
		background-image: ${(props) => props.theme.colors.bulbColor};
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		margin-right: 30px;
	}
`;

type StyledHeaderProps = {
	children: ReactNode;
};

export const StyledHeader = ({ children }: StyledHeaderProps) => {
	return <StyledBox>{children}</StyledBox>;
};
