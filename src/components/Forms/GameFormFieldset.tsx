import { GameFormFieldsetProps } from "@/types";
import { Field } from "@/components/Shared/Field";
import { Select } from "@/components/Shared/Select";
import { getDate } from "@/utils/getDate()";

export const GameFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
	winner,
}: GameFormFieldsetProps) => {
	const selectLabels = ["team1", "team2", "team3"];
	const { now } = getDate();
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

	return (
		<form onSubmit={HANDLE_SUBMIT}>
			<Field
				type="date"
				name="date"
				errors={errors.date}
				value={date}
				label="Add game date"
				minDate={now}
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="text"
				name="title"
				errors={errors.title}
				value={title}
				label="Add game title"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="text"
				name="location"
				errors={errors.location}
				value={location}
				label="Add game location"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="number"
				name="duration"
				errors={errors.duration}
				value={duration}
				label="Add game duration"
				onChange={HANDLE_CHANGE}
			/>

			<fieldset>
				<Select
					name="team1"
					errors={errors.team1}
					value={team1}
					labels={selectLabels}
					legend="For"
					onChange={HANDLE_CHANGE}
				/>
				<Field
					type="number"
					name="numberOfGoals_team1"
					errors={errors.numberOfGoals_team1}
					value={numberOfGoals_team1}
					label="number of goals"
					onChange={HANDLE_CHANGE}
				/>
			</fieldset>

			<fieldset>
				<Select
					name="team2"
					errors={errors.team2}
					value={team2}
					labels={selectLabels}
					legend="For"
					onChange={HANDLE_CHANGE}
				/>
				<Field
					type="number"
					name="numberOfGoals_team2"
					errors={errors.numberOfGoals_team2}
					value={numberOfGoals_team2}
					label="number of goals"
					onChange={HANDLE_CHANGE}
				/>
			</fieldset>
			<div>
				<p>Winner:{winner}</p>
			</div>
			<button type="submit">Add</button>
			{success && <p>The game has been added.</p>}
		</form>
	);
};
