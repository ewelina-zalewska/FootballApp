import { useMemo, useRef } from "react";
import { useGetGamesQuery } from "@/hooks/react-query/games/useGetGamesQuery";
import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";
import styled from "styled-components";

const StyledBox = styled.div`
	& > h2 {
		text-align: center;
	}
	@media (min-width: 768px) {
		width: calc(100% / 3);
	}
`;

const StyledList = styled.ul`
	list-style: none;
	padding: 10px;
	text-align: center;
	& > li {
		padding: 10px;
	}
	& > li:nth-child(1) {
		color: ${(props) => props.theme.colors.top1color};
	}
	& > li:nth-child(2) {
		color: ${(props) => props.theme.colors.top2Color};
	}
	& > li:nth-child(3) {
		color: ${(props) => props.theme.colors.top3Color};
	}
`;

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
		<StyledBox>
			<h2>Top teams</h2>
			<StyledList>
				{findTopTeams.map((team) => (
					<li key={team.teamId}>
						{team.teamName} scored {team.numberOfGoals}{" "}
						{team.numberOfGoals === 1 ? "goal" : "goals"}
					</li>
				))}
			</StyledList>
		</StyledBox>
	);
};
