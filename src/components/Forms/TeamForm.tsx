import { FormEvent, useEffect, useState } from "react";
import { TeamFormValue, TeamFormErrors } from "@/types";
import { TeamFormFieldset } from "@/components/Forms/TeamFormFieldset";
import { useForm } from "@/hooks/forms/useForm";
import { validateTeam as VALIDATE_TEAM } from "@/utils/validateTeam";

export const TeamForm = () => {
	const [formState, HANDLE_CHANGE] = useForm<TeamFormValue>({
		name: "",
		yearOfFoundation: "",
		location: "",
	});

	const [submitClicked, setSubmitClicked] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [errors, setErrors] = useState<TeamFormErrors>({
		name: [],
		yearOfFoundation: [],
		location: [],
	});

	useEffect(() => {
		if (submitClicked) {
			const { newErrors } = VALIDATE_TEAM(formState);
			setErrors(newErrors);
		}
	}, [formState, submitClicked]);

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		const { newErrors, isSuccess } = VALIDATE_TEAM(formState);
		setErrors(newErrors);
		setSuccess(isSuccess);

		if (!success) {
			setSubmitClicked(true);
		} else {
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};

	return (
		<div>
			<TeamFormFieldset
				HANDLE_CHANGE={HANDLE_CHANGE}
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				errors={errors}
				success={success}
				formState={formState}
			/>
		</div>
	);
};
