import { forwardRef, ForwardedRef } from "react";
import { FieldErrors } from "@/components/Shared/FieldErrors";
import { SelectProps } from "@/types";

export const TheSelect = forwardRef(
	(
		{ name, errors, value, labels, legend, onChange }: SelectProps,
		ref: ForwardedRef<HTMLSelectElement>,
	) => {
		return (
			<>
				<legend>{legend}</legend>
				<select ref={ref} name={name} value={value} onChange={onChange}>
					{!value && <option value="">Select an option</option>}
					{labels.map((label, i) => (
						<option key={i} value={label}>
							{label}
						</option>
					))}
				</select>
				{name === "team" && <input name="team" value={value} readOnly />}
				<FieldErrors errors={errors} />
			</>
		);
	},
);
