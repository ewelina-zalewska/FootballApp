import { useRef } from "react";
import { GameFormFieldsetProps } from "@/types";
import { useFocus } from "@/hooks/forms/useFocus";
import { TheField } from "@/components/Shared/TheField";
import { TheSelect } from "@/components/Shared/TheSelect";
import { TheButton } from "@/components/Shared/TheButton";
import { getDate } from "@/utils/getDate";

export const GameFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
	winner,
}: GameFormFieldsetProps) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const firstRef = useFocus<HTMLInputElement>();
	const formRef = useRef<HTMLFormElement>(null);

	const selectLabels = ["team1", "team2", "team3"];
	const { now, yearBefore } = getDate();
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

	const SEND_FORM = () => formRef.current?.requestSubmit();
	return (
		<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
			<TheField
				ref={firstRef}
				type="text"
				name="title"
				errors={errors.title}
				value={title}
				label="Add game title"
				onChange={HANDLE_CHANGE}
			/>
			<TheField
				type="date"
				name="date"
				errors={errors.date}
				value={date}
				label="Add game date"
				minDate={yearBefore}
				maxDate={now}
				onChange={HANDLE_CHANGE}
			/>
			<TheField
				type="text"
				name="location"
				errors={errors.location}
				value={location}
				label="Add game location"
				onChange={HANDLE_CHANGE}
			/>
			<TheField
				type="number"
				name="duration"
				errors={errors.duration}
				value={duration}
				label="Add game duration"
				onChange={HANDLE_CHANGE}
			/>

			<fieldset>
				<TheSelect
					name="team1"
					errors={errors.team1}
					value={team1}
					labels={selectLabels}
					legend="For"
					onChange={HANDLE_CHANGE}
				/>
				<TheField
					type="number"
					name="numberOfGoals_team1"
					errors={errors.numberOfGoals_team1}
					value={numberOfGoals_team1}
					label="number of goals"
					onChange={HANDLE_CHANGE}
				/>
			</fieldset>

			<fieldset>
				<TheSelect
					name="team2"
					errors={errors.team2}
					value={team2}
					labels={selectLabels}
					legend="For"
					onChange={HANDLE_CHANGE}
				/>
				<TheField
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
			<TheButton
				type="submit"
				btnName="add game"
				ref={buttonRef}
				onClick={SEND_FORM}
			/>
			{success && <p>The game has been added.</p>}
		</form>
	);
};
