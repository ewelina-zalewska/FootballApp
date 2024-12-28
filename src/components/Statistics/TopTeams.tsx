import { useMemo, useRef } from "react";
import { useGetGamesQuery } from "@/hooks/react-query/games/useGetGamesQuery";
import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";

export const TopTeams = () => {
	const { data: games } = useGetGamesQuery();
	const { data: teams } = useGetTeamsQuery();
	const teamsNumber = useRef<number>(3);

	const findTopTeams = useMemo(() => {
		const goals: Record<string, number> = {};

		games?.map((game) => {
			if (game.teamId1) {
				goals[game.teamId1] =
					(goals[game.teamId1] || 0) + game.numberOfGoals_team1;
			}

			if (game.teamId2) {
				goals[game.teamId2] =
					(goals[game.teamId2] || 0) + game.numberOfGoals_team2;
			}
		});

		const teamsAndGoals = Object.entries(goals)
			.map(([teamId, numberOfGoals]) => ({
				teamId,
				numberOfGoals,
				teamName:
					(teams || []).find((team) => team.id === teamId)?.name || "No team",
			}))
			.sort((a, b) => b.numberOfGoals - a.numberOfGoals)
			.slice(0, teamsNumber.current);

		return teamsAndGoals;
	}, [games, teams]);

	return (
		<ul>
			{findTopTeams.map((team) => (
				<li key={team.teamId}>
					{team.teamName} : {team.numberOfGoals}
				</li>
			))}
		</ul>
	);
};
