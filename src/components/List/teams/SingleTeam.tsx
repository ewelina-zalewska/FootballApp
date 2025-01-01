import { useEffect, useState } from "react";
import { Team } from "@/types";
import { useTeamsDeleteMutation } from "@/hooks/react-query/teams/useTeamsDeleteMutation";
import { EditTeams } from "./EditTeams";
import { DeleteTeamConfirmation } from "@/components/List/teams/DeleteTeamConfirmation";
import { TeamListTeamMembers } from "./TeamListTeamMembers";
import { TheButton } from "@/components/Shared/TheButton";
import styled from "styled-components";

const StyledItem = styled.li`
	display: flex;
	justify-content: space-between;
	width: inherit;
	border: 2px solid #04040e;
	border-bottom: none;
	margin-bottom: 25px;
	& > p {
		padding: 20px;
		max-width: 70%;
	}
	& > div {
		width: 100px;
		flex-wrap: nowrap;
	}
`;

type SingleTeamProps = {
	element: Team;
};

export const SingleTeam = ({ element }: SingleTeamProps) => {
	const [mode, setMode] = useState<"edit" | "delete" | "showPlayers" | "none">(
		"none",
	);
	const { isPending, error } = useTeamsDeleteMutation();

	const toggleEditMode = () =>
		setMode((prevMode) => (prevMode === "edit" ? "none" : "edit"));

	const toggleDeleteMode = () =>
		setMode((prevMode) => (prevMode === "delete" ? "none" : "delete"));

	const toggleShowPlayersMode = () =>
		setMode((prevMode) =>
			prevMode === "showPlayers" ? "none" : "showPlayers",
		);

	useEffect(() => {
		setMode("none");
	}, [element]);

	return (
		<>
			<StyledItem>
				<p>
					{element.name}, {element.location} – {element.yearOfFoundation}
				</p>
				<div>
					<TheButton
						btnLabel={mode === "edit" ? "CANCEL" : "EDIT"}
						disabled={isPending}
						onClick={toggleEditMode}
					/>

					<TheButton
						btnLabel={mode === "delete" ? "CANCEL" : "DELETE"}
						disabled={isPending}
						onClick={toggleDeleteMode}
					/>
					<TheButton
						btnLabel={mode === "showPlayers" ? "HIDE PLAYERS" : "SHOW PLAYERS"}
						disabled={isPending}
						onClick={toggleShowPlayersMode}
					/>
				</div>
			</StyledItem>
			{mode === "edit" && <EditTeams team={element} />}
			{mode === "delete" && (
				<DeleteTeamConfirmation onCancel={toggleDeleteMode} team={element} />
			)}
			{mode === "showPlayers" && (
				<TeamListTeamMembers teamId={element.id} teamName={element.name} />
			)}
			{error && <p>{error.message}</p>}
		</>
	);
};
