import { FormEvent, useState } from "react";
import { TeamFormValue } from "@/types";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Shared/Field";

type FormErrors = {
	[key in keyof TeamFormValue]: string[];
};

export const TeamForm = () => {
	const [formState, HANDLE_CHANGE] = useForm<TeamFormValue>({
		name: "",
		yearOfFoundation: "",
		location: "",
	});

	const [errors, setErrors] = useState<FormErrors>({
		name: [],
		yearOfFoundation: [],
		location: [],
	});

	const [success, setSuccess] = useState<boolean>(false);

	const { name, yearOfFoundation, location } = formState;

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();

		let isSuccess = true;

		const newErrors: FormErrors = {
			name: [],
			yearOfFoundation: [],
			location: [],
		};
		if (!name) {
			newErrors.name.push("To pole jest wymagane");
			isSuccess = false;
		}
		setErrors(newErrors);
		setSuccess(isSuccess);
	};
	return (
		<form onSubmit={HANDLE_SUBMIT}>
			{success && <p>Drużyna została dodana</p>}
			<Field
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label="Add name"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="number"
				name="yearOfFoundation"
				errors={errors.yearOfFoundation}
				value={yearOfFoundation}
				label="Add yearOfFoundation"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="text"
				name="location"
				errors={errors.location}
				value={location}
				label="Add location"
				onChange={HANDLE_CHANGE}
			/>
			<button type="submit">Add</button>
		</form>
	);
};
