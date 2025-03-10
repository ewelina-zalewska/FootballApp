﻿import { FormEvent, useEffect, useState } from "react";
import { GameFormErrors, GameDto } from "@/types";
import { useForm } from "@/hooks/forms/useForm";
import { GameFormFieldset } from "@/components/Forms/games/GameFormFieldset";
import { validateGame as VALIDATE_GAME } from "@/utils/validateGame";
import { useSuccess } from "@/hooks/forms/useSuccess";
import { useGamesCreateMutation } from "@/hooks/react-query/games/useGamesCreateMutation";

export const GameForm = () => {
	const { mutate: CREATE_GAME, isPending, error } = useGamesCreateMutation();
	const { success, setSuccess } = useSuccess();
	const [formState, setFormState, HANDLE_CHANGE] = useForm<GameDto>({
		date: "",
		title: "",
		location: "",
		duration: 90,
		teamId1: "",
		numberOfGoals_team1: 0,
		teamId2: "",
		numberOfGoals_team2: 0,
	});

	const [submitClicked, setSubmitClicked] = useState<boolean>(false);
	const [errors, setErrors] = useState<GameFormErrors>({
		date: [],
		title: [],
		location: [],
		duration: [],
		teamId1: [],
		numberOfGoals_team1: [],
		teamId2: [],
		numberOfGoals_team2: [],
	});

	useEffect(() => {
		if (submitClicked) {
			const { newErrors } = VALIDATE_GAME(formState);
			setErrors(newErrors);
		}
	}, [formState, submitClicked]);

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		const { newErrors, isSuccess } = VALIDATE_GAME(formState);
		setErrors(newErrors);
		setSuccess(isSuccess);

		if (!success) {
			setSubmitClicked(true);
		} else {
			CREATE_GAME({
				date: formState.date,
				title: formState.title,
				location: formState.location,
				duration: formState.duration,
				teamId1: formState.teamId1,
				numberOfGoals_team1: formState.numberOfGoals_team1,
				teamId2: formState.teamId2,
				numberOfGoals_team2: formState.numberOfGoals_team2,
			});
			setFormState({
				date: "",
				title: "",
				location: "",
				duration: 90,
				teamId1: "",
				numberOfGoals_team1: 0,
				teamId2: "",
				numberOfGoals_team2: 0,
			});
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};

	if (isPending) return <p>Loading...</p>;

	return (
		<>
			<GameFormFieldset
				HANDLE_CHANGE={HANDLE_CHANGE}
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				errors={errors}
				success={success}
				formState={formState}
				fieldName="name"
			/>
			{error && <p> {error.message}</p>}
		</>
	);
};
