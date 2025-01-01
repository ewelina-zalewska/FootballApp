import { FieldErrorsProps } from "@/types";
import styled from "styled-components";

const StyledList = styled.ul`
	color: #f0532a;
	list-style: none;
	max-width: 200px;
`;

export const FieldErrors = ({ errors }: FieldErrorsProps) => {
	if (!errors.length) return null;
	return (
		<StyledList>
			{errors.map((error, index) => (
				<li key={index}>{error}</li>
			))}
		</StyledList>
	);
};
