import { useRef } from "react";
import { TeamFormFieldsetProps } from "@/types";
import { useFocus } from "@/hooks/forms/useFocus";
import { TheField } from "@/components/Shared/TheField";
import { getDate } from "@/utils/getDate()";
import { TheButton } from "@/components/Shared/TheButton";

export const TeamFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
}: TeamFormFieldsetProps) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const firstRef = useFocus<HTMLInputElement>();
	const formRef = useRef<HTMLFormElement>(null);

	const { name, yearOfFoundation, location } = formState;
	const { now, year1900 } = getDate();

	const SEND_FORM = () => formRef.current?.requestSubmit();
	return (
		<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
			<TheField
				ref={firstRef}
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label="Add team name"
				onChange={HANDLE_CHANGE}
			/>
			<TheField
				type="date"
				name="yearOfFoundation"
				errors={errors.yearOfFoundation}
				value={yearOfFoundation}
				label="Add founding date"
				onChange={HANDLE_CHANGE}
				minDate={year1900}
				maxDate={now}
			/>
			<TheField
				type="text"
				name="location"
				errors={errors.location}
				value={location}
				label="Add team location"
				onChange={HANDLE_CHANGE}
			/>
			<TheButton
				type="submit"
				btnName="add team"
				ref={buttonRef}
				onClick={SEND_FORM}
			/>
			{success && <p>The team has been added.</p>}
		</form>
	);
};
