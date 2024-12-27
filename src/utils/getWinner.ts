import { GameFormValue } from "@/types";

export const getWinner = ({
	teamId1,
	numberOfGoals_team1,
	teamId2,
	numberOfGoals_team2,
}: GameFormValue) => {
	let winner: string | null = null;
	if (numberOfGoals_team1 === numberOfGoals_team2) winner = "Remis";
	else winner = numberOfGoals_team1 > numberOfGoals_team2 ? teamId1 : teamId2;
	return winner;
};
