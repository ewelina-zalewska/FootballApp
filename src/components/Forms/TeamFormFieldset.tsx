import { TeamFormFieldsetProps } from "@/types";
import { Field } from "@/components/Shared/Field";
import { getDate } from "@/utils/getDate()";

export const TeamFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
}: TeamFormFieldsetProps) => {
	const { name, yearOfFoundation, location } = formState;
	const { now, year1900 } = getDate();
	return (
		<form onSubmit={HANDLE_SUBMIT}>
			<Field
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label="Add team name"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="date"
				name="yearOfFoundation"
				errors={errors.yearOfFoundation}
				value={yearOfFoundation}
				label="Add founding date"
				onChange={HANDLE_CHANGE}
				minDate={year1900}
				maxDate={now}
			/>
			<Field
				type="text"
				name="location"
				errors={errors.location}
				value={location}
				label="Add team location"
				onChange={HANDLE_CHANGE}
			/>
			<button type="submit">Add</button>
			{success && <p>The team has been added.</p>}
		</form>
	);
};
