import { FormEvent, useEffect, useState } from "react";
import { TeamFormValue, TeamFormErrors } from "@/types";
import { TeamFormFieldset } from "@/components/Forms/teams/TeamFormFieldset";
import { useForm } from "@/hooks/forms/useForm";

import { useTeamsCreateMutation } from "@/hooks/react-query/teams/useTeamsCreateMutation";
import { useSuccess } from "@/hooks/forms/useSuccess";
import { validateTeam as VALIDATE_TEAM } from "@/utils/validateTeam";

export const TeamForm = () => {
	const { success, setSuccess } = useSuccess();
	const { mutate: CREATE_TEAM, isPending, error } = useTeamsCreateMutation();
	const [formState, setFormState, HANDLE_CHANGE] = useForm<TeamFormValue>({
		name: "",
		yearOfFoundation: "",
		location: "",
	});

	const [submitClicked, setSubmitClicked] = useState<boolean>(false);
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
			CREATE_TEAM(formState);
			setFormState({
				name: "",
				yearOfFoundation: "",
				location: "",
			});
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};
	if (isPending) return <p>Loading...</p>;
	return (
		<div>
			<TeamFormFieldset
				HANDLE_CHANGE={HANDLE_CHANGE}
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				errors={errors}
				success={success}
				formState={formState}
				fieldName="name"
			/>
			{error && <p> {error.message}</p>}
		</div>
	);
};
