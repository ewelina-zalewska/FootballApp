import { useRef } from "react";
import { PlayerFormFieldsetProps } from "@/types";
import { useFocus } from "@/hooks/useFocus";
import { TheField } from "@/components/Shared/TheField";
import { TheSelect } from "@/components/Shared/TheSelect";
import { FieldErrors } from "@/components/Shared/FieldErrors";
import { TheButton } from "@/components/Shared/TheButton";

export const PlayerFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
}: PlayerFormFieldsetProps) => {
	const firstRef = useFocus<HTMLInputElement>();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const selectLabels = ["team1", "team2", "team3"];
	const { name, lastName, belongToTeam, team } = formState;

	const SEND_FORM = () => formRef.current?.requestSubmit();

	return (
		<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
			<TheField
				ref={firstRef}
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label="Add first name"
				onChange={HANDLE_CHANGE}
			/>
			<TheField
				type="text"
				name="lastName"
				errors={errors.lastName}
				value={lastName}
				label="Add last name"
				onChange={HANDLE_CHANGE}
			/>
			<fieldset>
				<legend>Are you on the team?</legend>
				<TheField
					type="radio"
					name="belongToTeam"
					errors={errors.belongToTeam}
					value="yes"
					label="yes"
					onChange={HANDLE_CHANGE}
				/>

				<TheField
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
					<TheSelect
						name="team"
						errors={errors.team}
						value={team}
						labels={selectLabels}
						legend="what's the name of this team?"
						onChange={HANDLE_CHANGE}
					/>
				</fieldset>
			)}
			<TheButton
				type="submit"
				btnName="add player"
				ref={buttonRef}
				onClick={SEND_FORM}
			/>
			<div>{success && <p>The player has been added.</p>}</div>
		</form>
	);
};
