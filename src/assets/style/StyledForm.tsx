import { ReactNode } from "react";
import styled from "styled-components";

type StyledSectionProps = {
	children: ReactNode;
};

const StyledBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	width: 400px;
	height: auto;
	padding: 30px;
	& > legend {
		padding: 30px;
		font-size: 22px;
	}
	& > p {
		font-size: 20px;
		font-weight: bold;
	}
`;

export const StyledForm = ({ children }: StyledSectionProps) => {
	return <StyledBox>{children}</StyledBox>;
};
