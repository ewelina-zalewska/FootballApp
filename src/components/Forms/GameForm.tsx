import { FormEvent, useEffect, useState } from "react";
import { GameFormValue, GameFormProps, GameFormErrors } from "@/types";
import { useForm } from "@/hooks/forms/useForm";
import { GameFormFieldset } from "@/components/Forms/GameFormFieldset";
import { validateGame as VALIDATE_GAME } from "@/utils/validateGame";
import { getWinner as GET_WINNER } from "@/utils/getWinner";
import { useGamesListCreate } from "@/hooks/games/useGamesListCreate";

export const GameForm = ({ onNewGame }: GameFormProps) => {
	const { CREATE_GAME, error, loading, data } = useGamesListCreate();
	const [winner, setWinner] = useState<string>("");
	const [formState, setFormState, HANDLE_CHANGE] = useForm<GameFormValue>({
		date: "",
		title: "",
		location: "",
		duration: 90,
		team1: "",
		numberOfGoals_team1: 0,
		team2: "",
		numberOfGoals_team2: 0,
	});

	const [submitClicked, setSubmitClicked] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [errors, setErrors] = useState<GameFormErrors>({
		date: [],
		title: [],
		location: [],
		duration: [],
		team1: [],
		numberOfGoals_team1: [],
		team2: [],
		numberOfGoals_team2: [],
	});

	useEffect(() => {
		if (submitClicked) {
			const { newErrors } = VALIDATE_GAME(formState);
			setErrors(newErrors);
		}
		setWinner(GET_WINNER(formState));
	}, [formState, submitClicked]);

	useEffect(() => {
		if (!data) return;
		onNewGame(data);
	}, [data]);

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		const { newErrors, isSuccess } = VALIDATE_GAME(formState);
		setErrors(newErrors);
		setSuccess(isSuccess);

		if (!success) {
			setSubmitClicked(true);
		} else {
			CREATE_GAME(
				formState.date,
				formState.title,
				formState.location,
				formState.duration,
				formState.team1,
				formState.numberOfGoals_team1,
				formState.team2,
				formState.numberOfGoals_team2,
			);
			setFormState({
				date: "",
				title: "",
				location: "",
				duration: 90,
				team1: "",
				numberOfGoals_team1: 0,
				team2: "",
				numberOfGoals_team2: 0,
			});
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<GameFormFieldset
				HANDLE_CHANGE={HANDLE_CHANGE}
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				errors={errors}
				success={success}
				formState={formState}
				winner={winner}
			/>
			{error && <p> {error}</p>}
		</>
	);
};
