import { FieldErrors } from "@/components/Shared/FieldErrors";
import { FieldProps } from "@/types";

export const Field = ({
	type,
	name,
	errors,
	value,
	label,
	onChange,
	minDate,
	maxDate,
}: FieldProps) => {
	return (
		<>
			<div>
				<label htmlFor={name}>{label}:</label>
				{type !== "date" && (
					<input type={type} name={name} value={value} onChange={onChange} />
				)}
				{type === "date" && (
					<input
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
			</div>
		</>
	);
};
