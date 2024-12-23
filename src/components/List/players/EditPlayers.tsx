import { FormEvent, useEffect, useState } from "react";
import { PlayerFormValue, PlayerFormErrors, TeamMember } from "@/types";
import { useUpdatePlayerMutation } from "@/hooks/react-query/players/useUpdatePlayerMutation";
import { useForm } from "@/hooks/forms/useForm";
import { useSuccess } from "@/hooks/forms/useSuccess";
import { validatePlayer as VALIDATE_PLAYER } from "@/utils/validatePlayer";
import { PlayerFormFieldset } from "@/components/Forms/players/PlayerFormFieldset";

type EditPlayers = {
	player: TeamMember;
};

export const EditPlayers = ({ player }: EditPlayers) => {
	const {
		mutate: EDIT_PLAYER,
		isPending,
		error,
	} = useUpdatePlayerMutation(player.id);
	const { success, setSuccess } = useSuccess();
	const [submitClicked, setSubmitClicked] = useState<boolean>(false);

	const [formState, setFormState, HANDLE_CHANGE] = useForm<PlayerFormValue>({
		name: player.name,
		lastname: player.lastname,
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
			EDIT_PLAYER({
				name: formState.name,
				lastname: formState.lastname,
				team: player.team,
				teamId: player.teamId,
			});

			setFormState({
				name: formState.name,
				lastname: formState.lastname,
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
				fieldName="edit"
			/>
			{error && <p>{error.message}</p>}
		</>
	);
};
