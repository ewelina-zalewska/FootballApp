import { FormEvent, useState } from "react";
import { PlayerFormValue } from "@/types";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Shared/Field";
import { Select } from "@/components/Shared/Select";

type FormErrors = {
	[key in keyof PlayerFormValue]: string[];
};
export const PlayerForm = () => {
	const selectLabels = ["team1", "team2", "team3"];

	const [formState, HANDLE_CHANGE] = useForm<PlayerFormValue>({
		name: "",
		lastName: "",
		belongToTeam: "",
		team: "",
	});
	const [success, setSuccess] = useState<boolean>(false);
	const [errors, setErrors] = useState<FormErrors>({
		name: [],
		lastName: [],
		belongToTeam: [],
		team: [],
	});

	const { name, lastName, team } = formState;

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();

		let isSuccess = true;

		const newErrors: FormErrors = {
			name: [],
			lastName: [],
			belongToTeam: [],
			team: [],
		};
		if (!name) {
			newErrors.name.push("To pole jest wymagane");
			isSuccess = false;
		}
		setErrors(newErrors);
		setSuccess(isSuccess);
	};

	return (
		<form onSubmit={HANDLE_SUBMIT}>
			{success && <p>Gracz został dodany</p>}
			<Field
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label="Add name"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="text"
				name="lastName"
				errors={errors.lastName}
				value={lastName}
				label="Add lastName"
				onChange={HANDLE_CHANGE}
			/>
			<fieldset>
				<legend>Are you on the team?</legend>
				<Field
					type="radio"
					name="belongToTeam"
					errors={errors.belongToTeam}
					value="yes"
					label="yes"
					onChange={HANDLE_CHANGE}
				/>

				<Field
					type="radio"
					name="belongToTeam"
					errors={errors.belongToTeam}
					value="no"
					label="no"
					onChange={HANDLE_CHANGE}
				/>
			</fieldset>

			{formState.belongToTeam === "yes" && (
				<fieldset>
					<Select
						name="team"
						errors={errors.team}
						value={team}
						labels={selectLabels}
						legend="What team?"
						onChange={HANDLE_CHANGE}
					/>
				</fieldset>
			)}
			<button type="submit">Add</button>
		</form>
	);
};
