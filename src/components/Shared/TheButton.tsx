import { forwardRef, ForwardedRef, MouseEventHandler } from "react";
import styled from "styled-components";
import { transparent } from "@/assets/style/mixins/index";

type buttonProps = {
	type?: "submit" | "reset" | "button";
	disabled?: boolean;
	btnLabel: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

const Styledbutton = styled.button<{ color: string }>`
	margin: 1px;
	background: ${(props) => props.theme.colors.btnRadialGradient};
	color: ${(props) => props.theme.colors.btntext};
	border: none;
	border-radius: 2px;
	padding: 10px;
	letter-spacing: 1px;
	cursor: pointer;
	align-self: end;

	${transparent}
`;

export const TheButton = forwardRef(
	(
		{ type, disabled, btnLabel, onClick }: buttonProps,
		ref?: ForwardedRef<HTMLButtonElement>,
	) => {
		return (
			<Styledbutton
				color="transparent"
				ref={ref}
				type={type}
				disabled={disabled}
				onClick={onClick}
			>
				{btnLabel}
			</Styledbutton>
		);
	},
);
