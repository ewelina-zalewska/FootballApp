﻿import { useTeamsDeleteMutation } from "@/hooks/react-query/teams/useTeamsDeleteMutation";
import { Game, Team } from "@/types";
import { useGetPlayersQuery } from "@/hooks/react-query/players/useGetPlayersQuery";
import { useUpdateMultiplePlayersTeamMutation } from "@/hooks/react-query/teams/useUpdateMultiplePlayersTeamMutation";

type DeleteTeamConfirmationProps = {
	onCancel: () => void;
	team: Team;
};

const validateTeam = (teamId: string, games: Game[]): boolean => {
	const teamInGames = games.some(
		(game) => game.team1 === teamId || game.team2 === teamId,
	);

	return teamInGames;
};

export const DeleteTeamConfirmation = ({
	team,
	onCancel,
}: DeleteTeamConfirmationProps) => {
	const { mutate: DELETE_TEAM, isPending } = useTeamsDeleteMutation();
	const { mutate: EDIT_TEAM_MEMBER } = useUpdateMultiplePlayersTeamMutation();
	const { data: players } = useGetPlayersQuery();

	const consentToDeletion = validateTeam(team.id, [
		{
			id: "a6c7",
			date: "2024-12-04",
			title: "bbbbb",
			location: "bbb",
			duration: 90,
			team1: "test1",
			numberOfGoals_team1: 0,
			team2: "test2",
			numberOfGoals_team2: 0,
		},
	]);
	const teamPlayers = players?.filter((player) => player.teamId === team.id);

	const HANDLE_DELETE = () => {
		if (consentToDeletion) return;
		DELETE_TEAM(team.id);

		if (teamPlayers) {
			const playerIds = teamPlayers.map((player) => player.id);
			if (playerIds.length > 0) {
				EDIT_TEAM_MEMBER({
					playerIds,
					team: "",
					teamId: "",
				});
			}
		}
	};
	if (isPending) return <p>Loading...</p>;
	return (
		<div>
			{consentToDeletion ? (
				<p>
					If a team has participated in the competition, it cannot be removed.
				</p>
			) : (
				<p>
					Do you really want to delete team <strong>{team.name}</strong>?
				</p>
			)}
			<button onClick={HANDLE_DELETE}>Delete</button>
			<button onClick={onCancel}>Cancel</button>
		</div>
	);
};
