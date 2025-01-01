import { forwardRef, ForwardedRef } from "react";
import styled from "styled-components";
import { FieldErrors } from "@/components/Shared/FieldErrors";
import { FieldProps } from "@/types";

const StyledBox = styled.div`
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 20px;
`;

const StyledInput = styled.input`
	outline: none !important;
	border-radius: 5px;
	padding: 5px;
	background-color: ${(props) => props.theme.colors.primary};
	border: none;
	border-bottom: 2px solid #04040e;
	color: ${(props) => props.theme.colors.secondary};
	font-size: 20px;
	width: 250px;
	height: 25px;

	&:focus {
		background-color: ${(props) => props.theme.colors.inputFocusBackground};
		color: ${(props) => props.theme.colors.inputFocusColor};
		border: none;
	}
`;

const StyledLabel = styled.label`
	text-transform: Uppercase;
	letter-spacing: 1px;
`;
export const TheField = forwardRef(
	(
		{
			type,
			name,
			errors,
			value,
			label,
			onChange,
			minDate,
			maxDate,
		}: FieldProps,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		return (
			<>
				<StyledBox>
					<StyledLabel htmlFor={name}>{label}:</StyledLabel>
					{type !== "date" && (
						<StyledInput
							type={type}
							name={name}
							value={value}
							onChange={onChange}
							ref={ref}
						/>
					)}
					{type === "date" && (
						<StyledInput
							type={type}
							name={name}
							value={value}
							onChange={onChange}
							min={minDate}
							max={maxDate}
							required
						/>
					)}
					{type !== "radio" && <FieldErrors errors={errors} />}
				</StyledBox>
			</>
		);
	},
);
