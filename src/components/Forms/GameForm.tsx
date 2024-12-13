import { FormEvent, useEffect, useState } from "react";
import { GameFormValue } from "@/types";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Shared/Field";
import { Select } from "@/components/Shared/Select";

type FormErrors = {
	[key in keyof GameFormValue]: string[];
};

export const GameForm = () => {
	const selectLabels: string[] = ["team1", "team2", "team3"];
	const [winner, setWinner] = useState<string>("");
	const [formState, HANDLE_CHANGE] = useForm<GameFormValue>({
		date: "",
		title: "",
		location: "",
		duration: 0,
		team1: "",
		numberOfGoals_team1: 0,
		team2: "",
		numberOfGoals_team2: 0,
	});
	const [errors, setErrors] = useState<FormErrors>({
		date: [],
		title: [],
		location: [],
		duration: [],
		team1: [],
		numberOfGoals_team1: [],
		team2: [],
		numberOfGoals_team2: [],
	});

	const [success, setSuccess] = useState<boolean>(false);
	const {
		date,
		title,
		location,
		duration,
		team1,
		numberOfGoals_team1,
		team2,
		numberOfGoals_team2,
	} = formState;

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();

		let isSuccess = true;

		const newErrors: FormErrors = {
			date: [],
			title: [],
			location: [],
			duration: [],
			team1: [],
			numberOfGoals_team1: [],
			team2: [],
			numberOfGoals_team2: [],
		};
		if (!date) {
			newErrors.date.push("To pole jest wymagane");
			isSuccess = false;
		}
		setErrors(newErrors);
		setSuccess(isSuccess);
	};

	const getWinner = ({
		team1,
		numberOfGoals_team1,
		team2,
		numberOfGoals_team2,
	}: GameFormValue) => {
		if (numberOfGoals_team1 === numberOfGoals_team2) return "Remis";
		return numberOfGoals_team1 > numberOfGoals_team2 ? team1 : team2;
	};

	useEffect(() => {
		setWinner(getWinner(formState));
	}, [formState]);

	return (
		<form onSubmit={HANDLE_SUBMIT}>
			{success && <p>Drużyna została dodana</p>}
			<Field
				type="text"
				name="date"
				errors={errors.date}
				value={date}
				label="Add date"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="text"
				name="title"
				errors={errors.title}
				value={title}
				label="Add title"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="text"
				name="location"
				errors={errors.location}
				value={location}
				label="Add location"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="number"
				name="duration"
				errors={errors.duration}
				value={duration}
				label="Add duration"
				onChange={HANDLE_CHANGE}
			/>

			<fieldset>
				<Select
					name="team1"
					errors={errors.team1}
					value={team1}
					labels={selectLabels}
					legend="Add numbers of goals for"
					onChange={HANDLE_CHANGE}
				/>
				<Field
					type="number"
					name="numberOfGoals_team1"
					errors={errors.numberOfGoals_team1}
					value={numberOfGoals_team1}
					label="="
					onChange={HANDLE_CHANGE}
				/>
			</fieldset>

			<fieldset>
				<Select
					name="team2"
					errors={errors.team2}
					value={team2}
					labels={selectLabels}
					legend="Add numbers of goals for"
					onChange={HANDLE_CHANGE}
				/>
				<Field
					type="number"
					name="numberOfGoals_team2"
					errors={errors.numberOfGoals_team2}
					value={numberOfGoals_team2}
					label="="
					onChange={HANDLE_CHANGE}
				/>
			</fieldset>
			<div>
				<p>Winner:{winner}</p>
			</div>

			<button type="submit">Add</button>
		</form>
	);
};
