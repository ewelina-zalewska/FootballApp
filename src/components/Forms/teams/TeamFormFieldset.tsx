import { useRef } from "react";
import { TeamFormFieldsetProps } from "@/types";
import { useFocus } from "@/hooks/forms/useFocus";
import { TheField } from "@/components/Shared/TheField";
import { getDate } from "@/utils/getDate";
import { TheButton } from "@/components/Shared/TheButton";

export const TeamFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
	fieldName,
}: TeamFormFieldsetProps) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const firstRef = useFocus<HTMLInputElement>();
	const formRef = useRef<HTMLFormElement>(null);

	const { name, yearOfFoundation, location } = formState;
	const { now, year1900 } = getDate();

	const SEND_FORM = () => formRef.current?.requestSubmit();

	const nameLabel = fieldName === "edit" ? "Change team name" : "Add team name";

	const foundingDateLabel =
		fieldName === "edit" ? "Change founding date" : "Add founding date";

	const locationLabel =
		fieldName === "edit" ? "Change team location" : "Add team location";

	const btnLabel = fieldName === "edit" ? "CHANGE" : "ADD TEAM";
	return (
		<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
			<TheField
				ref={firstRef}
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label={nameLabel}
				onChange={HANDLE_CHANGE}
			/>
			<TheField
				type="date"
				name="yearOfFoundation"
				errors={errors.yearOfFoundation}
				value={yearOfFoundation}
				label={foundingDateLabel}
				onChange={HANDLE_CHANGE}
				minDate={year1900}
				maxDate={now}
			/>
			<TheField
				type="text"
				name="location"
				errors={errors.location}
				value={location}
				label={locationLabel}
				onChange={HANDLE_CHANGE}
			/>
			<TheButton
				type="submit"
				btnLabel={btnLabel}
				ref={buttonRef}
				onClick={SEND_FORM}
			/>
			{success && <p>The team has been added.</p>}
		</form>
	);
};
