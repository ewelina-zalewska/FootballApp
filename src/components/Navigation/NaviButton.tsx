import { ForwardedRef, forwardRef, MouseEventHandler } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	width: calc(100% / 4);
	background: ${(props) => props.theme.colors.btnRadialGradient};
	color: ${(props) => props.theme.colors.btntext};
	border: 1px solid ${(props) => props.theme.colors.bodyColors};
	border-radius: 2px;
	padding: 10px;
	letter-spacing: 2px;
	font-weight: bold;
	cursor: pointer;
`;

type NaviButtonProps = {
	btnLabel: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export const NaviButton = forwardRef(
	(
		{ btnLabel, onClick }: NaviButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		const label = btnLabel.toUpperCase();
		return (
			<StyledButton ref={ref} onClick={onClick}>
				{label}
			</StyledButton>
		);
	},
);
