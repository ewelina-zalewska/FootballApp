import { FormEvent, useEffect, useState } from "react";
import { Team, TeamFormValue, TeamFormErrors } from "@/types";
import { useUpdateTeamsMutation } from "@/hooks/react-query/teams/useUpdateTeamsMutation";
import { useForm } from "@/hooks/forms/useForm";
import { useSuccess } from "@/hooks/forms/useSuccess";
import { validateTeam as VALIDATE_TEAM } from "@/utils/validateTeam";
import { TeamFormFieldset } from "@/components/Forms/teams/TeamFormFieldset";

type EditTeam = {
	team: Team;
};

export const EditTeams = ({ team }: EditTeam) => {
	const {
		mutate: EDIT_TEAM,
		isPending,
		error,
	} = useUpdateTeamsMutation(team.id);
	const { success, setSuccess } = useSuccess();
	const [submitClicked, setSubmitClicked] = useState<boolean>(false);

	const [formState, setFormState, HANDLE_CHANGE] = useForm<TeamFormValue>({
		name: team.name,
		yearOfFoundation: team.yearOfFoundation,
		location: team.location,
	});

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
			EDIT_TEAM({
				name: formState.name,
				yearOfFoundation: formState.yearOfFoundation,
				location: formState.location,
			});

			setFormState({
				name: formState.name,
				yearOfFoundation: formState.yearOfFoundation,
				location: formState.location,
			});
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};
	if (isPending) return <p>Loading...</p>;
	return (
		<>
			<div>
				<TeamFormFieldset
					HANDLE_CHANGE={HANDLE_CHANGE}
					HANDLE_SUBMIT={HANDLE_SUBMIT}
					errors={errors}
					success={success}
					formState={formState}
					fieldName="edit"
				/>
				{error && <p> {error.message}</p>}
			</div>
		</>
	);
};
