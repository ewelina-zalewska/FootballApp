import { GameFormValue } from "@/types";

export const getWinner = ({
	team1,
	numberOfGoals_team1,
	team2,
	numberOfGoals_team2,
}: GameFormValue) => {
	let winner: string | null = null;
	if (numberOfGoals_team1 === numberOfGoals_team2) winner = "Remis";
	else winner = numberOfGoals_team1 > numberOfGoals_team2 ? team1 : team2;
	return winner;
};
