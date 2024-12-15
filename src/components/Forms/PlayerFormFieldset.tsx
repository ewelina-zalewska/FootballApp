import { PlayerFormFieldsetProps } from "@/types";
import { Field } from "@/components/Shared/Field";
import { Select } from "@/components/Shared/Select";
import { FieldErrors } from "@/components/Shared/FieldErrors";

export const PlayerFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
}: PlayerFormFieldsetProps) => {
	const selectLabels = ["team1", "team2", "team3"];
	const { name, lastName, belongToTeam, team } = formState;
	return (
		<form onSubmit={HANDLE_SUBMIT}>
			<Field
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label="Add first name"
				onChange={HANDLE_CHANGE}
			/>
			<Field
				type="text"
				name="lastName"
				errors={errors.lastName}
				value={lastName}
				label="Add last name"
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
				<FieldErrors errors={errors.belongToTeam} />
			</fieldset>

			{belongToTeam === "yes" && (
				<fieldset>
					<Select
						name="team"
						errors={errors.team}
						value={team}
						labels={selectLabels}
						legend="what's the name of this team?"
						onChange={HANDLE_CHANGE}
					/>
				</fieldset>
			)}
			<button type="submit">Add</button>
			<div>{success && <p>The player has been added.</p>}</div>
		</form>
	);
};
