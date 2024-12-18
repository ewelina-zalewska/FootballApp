﻿import { FormEvent, useEffect, useState } from "react";
import { PlayerFormValue, PlayerFormErrors, PlayerFormProps } from "@/types";
import { useForm } from "@/hooks/forms/useForm";
import { validatePlayer as VALIDATE_PLAYER } from "@/utils/validatePlayer";
import { PlayerFormFieldset } from "@/components/Forms/players/PlayerFormFieldset";
import { usePlayersListCreate } from "@/hooks/players/usePlayersListCreate";
import { useSuccess } from "@/hooks/forms/useSuccess";

export const PlayerForm = ({ onNewPlayer }: PlayerFormProps) => {
	const { success, setSuccess } = useSuccess();
	const { CREATE_PLAYER, error, loading, data } = usePlayersListCreate();
	const [submitClicked, setSubmitClicked] = useState<boolean>(false);
	const [formState, setFormState, HANDLE_CHANGE] = useForm<PlayerFormValue>({
		name: "",
		lastname: "",
		belongToTeam: "",
		team: "",
	});

	const [errors, setErrors] = useState<PlayerFormErrors>({
		name: [],
		lastname: [],
		belongToTeam: [],
		team: [],
	});

	useEffect(() => {
		if (submitClicked) {
			const { newErrors } = VALIDATE_PLAYER(formState);
			setErrors(newErrors);
		}
	}, [formState, submitClicked]);

	useEffect(() => {
		if (!data) return;
		onNewPlayer(data);
	}, [data]);

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		const { newErrors, isSuccess } = VALIDATE_PLAYER(formState);
		setErrors(newErrors);
		setSuccess(isSuccess);

		if (!success) {
			setSubmitClicked(true);
		} else {
			CREATE_PLAYER(
				formState.name,
				formState.lastname,
				formState.belongToTeam,
				formState.team,
			);
			setFormState({
				name: "",
				lastname: "",
				belongToTeam: "",
				team: "",
			});
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};
	if (loading) return <p>Loading...</p>;
	return (
		<>
			<PlayerFormFieldset
				HANDLE_CHANGE={HANDLE_CHANGE}
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				errors={errors}
				success={success}
				formState={formState}
			/>
			{error && <p>{error}</p>}
		</>
	);
};
