import { FormEvent, useEffect, useState } from "react";
import { TeamFormValue, TeamFormErrors, TeamFormProps } from "@/types";
import { TeamFormFieldset } from "@/components/Forms/teams/TeamFormFieldset";
import { useForm } from "@/hooks/forms/useForm";
import { validateTeam as VALIDATE_TEAM } from "@/utils/validateTeam";
import { useTeamsListCreate } from "@/hooks/teams/useTeamsListCreate";
import { useSuccess } from "@/hooks/forms/useSuccess";

export const TeamForm = ({ onNewTeam }: TeamFormProps) => {
	const { success, setSuccess } = useSuccess();
	const { CREATE_TEAM, error, loading, data } = useTeamsListCreate();
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

	useEffect(() => {
		if (!data) return;
		onNewTeam(data);
	}, [data]);

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		const { newErrors, isSuccess } = VALIDATE_TEAM(formState);
		setErrors(newErrors);
		setSuccess(isSuccess);

		if (!success) {
			setSubmitClicked(true);
		} else {
			CREATE_TEAM(
				formState.name,
				formState.yearOfFoundation,
				formState.location,
			);
			setFormState({
				name: "",
				yearOfFoundation: "",
				location: "",
			});
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};
	if (loading) return <p>Loading...</p>;
	return (
		<div>
			<TeamFormFieldset
				HANDLE_CHANGE={HANDLE_CHANGE}
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				errors={errors}
				success={success}
				formState={formState}
			/>
			{error && <p> {error}</p>}
		</div>
	);
};
