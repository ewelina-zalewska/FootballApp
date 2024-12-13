import { FieldErrors } from "@/components/Shared/FieldErrors";
import { FieldProps } from "@/types";

export const Field = ({
	type,
	name,
	errors,
	value,
	label,
	onChange,
}: FieldProps) => {
	return (
		<div>
			<label htmlFor={name}>{label}:</label>
			<input type={type} name={name} value={value} onChange={onChange} />
			<FieldErrors errors={errors} />
		</div>
	);
};
