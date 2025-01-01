import { useRef, useState } from "react";
import { GameFormFieldsetProps, Team } from "@/types";
import { getDate } from "@/utils/getDate";
import { useFocus } from "@/hooks/forms/useFocus";
import { TheField } from "@/components/Shared/TheField";
import { TeamSelect } from "@/components/Shared/TeamSelect";
import { TheButton } from "@/components/Shared/TheButton";
import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";
import { StyledForm } from "@/assets/style/StyledForm";
import styled from "styled-components";

const StyledFieldset = styled.fieldset`
	padding: 15px;
	border: none;
`;

export const GameFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
	fieldName,
}: GameFormFieldsetProps) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const firstRef = useFocus<HTMLInputElement>();
	const formRef = useRef<HTMLFormElement>(null);

	const { data: teams, isLoading, error } = useGetTeamsQuery();
	const { now, yearBefore } = getDate();
	const {
		date,
		title,
		location,
		duration,
		teamId1,
		numberOfGoals_team1,
		teamId2,
		numberOfGoals_team2,
	} = formState;

	const [availableTeams, setAvailableTeams] = useState<Team[]>([]);

	const HANDLE_CLICK = async () => {
		setAvailableTeams(teams || []);
	};

	const SEND_FORM = () => formRef.current?.requestSubmit();

	const titleLabel =
		fieldName === "edit" ? "Change game title" : "Add game title";
	const dateLabel = fieldName === "edit" ? "Change game date" : "Add game date";
	const locationLabel =
		fieldName === "edit" ? "Change game location" : "Add game location";
	const durationLabel =
		fieldName === "edit" ? "Change game duration" : "Add game duration";
	const teamNameLabel =
		fieldName === "edit" ? "Change team name" : "Add team name";
	const goalsLabel =
		fieldName === "edit" ? "Change number of goals" : "Add number of goals";
	const btnLabel = fieldName === "edit" ? "CHANGE" : "ADD GAME";

	if (isLoading) return <p>Loading...</p>;
	return (
		<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
			<StyledForm>
				<legend>{btnLabel}</legend>
				{success && (
					<p>
						The game {fieldName === "edit" && "data"} has been{" "}
						{fieldName === "edit" ? "changed" : "added"}.
					</p>
				)}
				<TheField
					ref={firstRef}
					type="text"
					name="title"
					errors={errors.title}
					value={title}
					label={titleLabel}
					onChange={HANDLE_CHANGE}
				/>
				<TheField
					type="date"
					name="date"
					errors={errors.date}
					value={date}
					label={dateLabel}
					minDate={yearBefore}
					maxDate={now}
					onChange={HANDLE_CHANGE}
				/>
				<TheField
					type="text"
					name="location"
					errors={errors.location}
					value={location}
					label={locationLabel}
					onChange={HANDLE_CHANGE}
				/>
				<TheField
					type="number"
					name="duration"
					errors={errors.duration}
					value={duration}
					label={durationLabel}
					onChange={HANDLE_CHANGE}
				/>

				<StyledFieldset>
					<TeamSelect
						name="teamId1"
						errors={errors.teamId1}
						value={teamId1}
						legend={teamNameLabel}
						onChange={HANDLE_CHANGE}
						onClick={HANDLE_CLICK}
						data={availableTeams}
					/>
					<TheField
						type="number"
						name="numberOfGoals_team1"
						errors={errors.numberOfGoals_team1}
						value={numberOfGoals_team1}
						label={goalsLabel}
						onChange={HANDLE_CHANGE}
					/>
				</StyledFieldset>

				<StyledFieldset>
					<TeamSelect
						name="teamId2"
						errors={errors.teamId2}
						value={teamId2}
						legend={teamNameLabel}
						onChange={HANDLE_CHANGE}
						onClick={HANDLE_CLICK}
						data={availableTeams}
					/>
					<TheField
						type="number"
						name="numberOfGoals_team2"
						errors={errors.numberOfGoals_team2}
						value={numberOfGoals_team2}
						label={goalsLabel}
						onChange={HANDLE_CHANGE}
					/>
				</StyledFieldset>
				<TheButton
					type="submit"
					btnLabel={btnLabel}
					ref={buttonRef}
					onClick={SEND_FORM}
				/>
				{error && <p>{error.message}</p>}
			</StyledForm>
		</form>
	);
};
