import { FormEvent, useEffect, useState } from "react";
import { Game, GameDto, GameFormErrors } from "@/types";
import { useUpdateGameMutation } from "@/hooks/react-query/games/useUpdateGameMutation";
import { useForm } from "@/hooks/forms/useForm";
import { useSuccess } from "@/hooks/forms/useSuccess";
import { validateGame as VALIDATE_GAME } from "@/utils/validateGame";
import { GameFormFieldset } from "@/components/Forms/games/GameFormFieldset";

type EditGames = {
	game: Game;
};

export const EditGames = ({ game }: EditGames) => {
	const {
		mutate: EDIT_GAME,
		isPending,
		error,
	} = useUpdateGameMutation(game.id);
	const { success, setSuccess } = useSuccess();
	const [submitClicked, setSubmitClicked] = useState<boolean>(false);

	const [formState, setFormState, HANDLE_CHANGE] = useForm<GameDto>({
		date: game.date,
		title: game.title,
		location: game.location,
		duration: game.duration,
		teamId1: game.teamId1,
		numberOfGoals_team1: game.numberOfGoals_team1,
		teamId2: game.teamId2,
		numberOfGoals_team2: game.numberOfGoals_team2,
	});

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
			EDIT_GAME({
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
				date: formState.date,
				title: formState.title,
				location: formState.location,
				duration: formState.duration,
				teamId1: formState.teamId1,
				numberOfGoals_team1: formState.numberOfGoals_team1,
				teamId2: formState.teamId2,
				numberOfGoals_team2: formState.numberOfGoals_team2,
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
				fieldName="edit"
			/>
			{error && <p>{error.message}</p>}
		</>
	);
};
