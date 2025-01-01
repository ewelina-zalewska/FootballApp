import { forwardRef, ForwardedRef } from "react";
import { SelectProps } from "@/types";

import { FieldErrors } from "@/components/Shared/FieldErrors";
import styled from "styled-components";

const StyledSelect = styled.select`
	padding: 5px;
	border: none;
	background-color: ${(props) => props.theme.colors.inputFocusBackground};
	color: ${(props) => props.theme.colors.inputFocusColor};
`;

export const TeamSelect = forwardRef(
	(
		{ name, errors, value, legend, onChange, onClick, data }: SelectProps,
		ref: ForwardedRef<HTMLSelectElement>,
	) => {
		return (
			<>
				<legend>{legend}</legend>
				<StyledSelect
					ref={ref}
					name={name}
					value={value}
					onChange={onChange}
					onClick={onClick}
				>
					{!value && <option value="">Select an option</option>}
					{data.map((label, i) => (
						<option key={i} value={label.id}>
							{label.name}
						</option>
					))}
				</StyledSelect>
				{/* <input name={name} value={value} readOnly /> */}
				<FieldErrors errors={errors} />
			</>
		);
	},
);
