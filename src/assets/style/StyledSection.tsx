import { ReactNode } from "react";
import styled from "styled-components";

type StyledSectionProps = {
	children: ReactNode;
};

const StyledBox = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 16px;
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.secondary};
	box-shadow: ${(props) => props.theme.colors.shadow};

	@media (min-width: 768px) {
		padding-top: 50px;
		flex-direction: row;
		align-items: start;
	}
`;

export const StyledSection = ({ children }: StyledSectionProps) => {
	return <StyledBox>{children}</StyledBox>;
};
