import { forwardRef, ForwardedRef } from "react";
import { SelectProps } from "@/types";

import { FieldErrors } from "@/components/Shared/FieldErrors";

export const TeamSelect = forwardRef(
	(
		{ name, errors, value, legend, onChange, onClick, data }: SelectProps,
		ref: ForwardedRef<HTMLSelectElement>,
	) => {
		return (
			<>
				<legend>{legend}</legend>
				<select
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
				</select>
				{/* <input name={name} value={value} readOnly /> */}
				<FieldErrors errors={errors} />
			</>
		);
	},
);
