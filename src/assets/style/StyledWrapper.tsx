import { ReactNode } from "react";
import styled from "styled-components";

type StyledWrapperProps = {
	children: ReactNode;
};

const StyledBox = styled.div`
	font-family: "Spectral SC", sans-serif;
	width: 100%;
	height: auto;
	overflow: hidden;
`;

export const StyledWrapper = ({ children }: StyledWrapperProps) => {
	return <StyledBox>{children}</StyledBox>;
};
