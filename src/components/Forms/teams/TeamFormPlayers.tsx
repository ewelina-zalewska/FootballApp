import { FormEvent, useEffect, useState } from "react";
import { PlayerFormValue, PlayerFormErrors } from "@/types";
import { useForm } from "@/hooks/forms/useForm";
import { useSuccess } from "@/hooks/forms/useSuccess";
import { useTeamMemberCreateMutation } from "@/hooks/react-query/teams/useTeamMemberCreateMutation";
import { validatePlayer as VALIDATE_PLAYER } from "@/utils/validatePlayer";
import { PlayerFormFieldset } from "@/components/Forms/players/PlayerFormFieldset";

type TeamFormPlayersProps = {
	teamId: string;
};

export const TeamFormPlayers = ({ teamId }: TeamFormPlayersProps) => {
	const { success, setSuccess } = useSuccess();
	const {
		mutate: CREATE_TEAM_LIST_PLAYER,
		error,
		isPending,
	} = useTeamMemberCreateMutation();
	const [submitClicked, setSubmitClicked] = useState<boolean>(false);
	const [formState, setFormState, HANDLE_CHANGE] = useForm<PlayerFormValue>({
		name: "",
		lastname: "",
	});

	const [errors, setErrors] = useState<PlayerFormErrors>({
		name: [],
		lastname: [],
	});

	useEffect(() => {
		if (submitClicked) {
			const { newErrors } = VALIDATE_PLAYER(formState);
			setErrors(newErrors);
		}
	}, [formState, submitClicked]);

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		const { newErrors, isSuccess } = VALIDATE_PLAYER(formState);
		setErrors(newErrors);
		setSuccess(isSuccess);

		if (!success) {
			setSubmitClicked(true);
		} else {
			CREATE_TEAM_LIST_PLAYER({
				name: formState.name,
				lastname: formState.lastname,
				teamId,
			});
			setFormState({
				name: "",
				lastname: "",
			});
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};
	if (isPending) return <p>Loading...</p>;
	return (
		<>
			<PlayerFormFieldset
				HANDLE_CHANGE={HANDLE_CHANGE}
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				errors={errors}
				success={success}
				formState={formState}
			/>
			{error && <p>{error.message}</p>}
		</>
	);
};
