import { useEffect, useState } from "react";
import { Game } from "@/types";
import { EditGames } from "@/components/List/games/EditGames";
import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";
import { getWinner as GET_WINNER } from "@/utils/getWinner";

type SingleGameProps = {
	element: Game;
};

export const SingleGame = ({ element }: SingleGameProps) => {
	const { data: teams } = useGetTeamsQuery();
	const [mode, setMode] = useState<"edit" | "none">("none");

	const [winner, setWinner] = useState<string>("");

	const toggleEditMode = () =>
		setMode((prevMode) => (prevMode === "edit" ? "none" : "edit"));

	useEffect(() => {
		setMode("none");
		setWinner(GET_WINNER(element));
	}, [element]);

	const team1Name = teams?.find((team) => team.id === element.teamId1);
	const team2Name = teams?.find((team) => team.id === element.teamId2);
	return (
		<>
			<li>
				<p>{element.date}</p>
				<p>{element.title}</p>
				<p>{element.duration}</p>
				<p>{element.location}</p>
				<p>{team1Name?.name}</p>
				<p>{element.numberOfGoals_team1}</p>
				<p>{team2Name?.name}</p>
				<p>{element.numberOfGoals_team2}</p>
				{winner === "Remis" ? (
					<p> REMIS</p>
				) : (
					<p>
						{teams
							?.filter((team) => team.id === winner)
							.map((team) => team.name)}
					</p>
				)}
				<button onClick={toggleEditMode}>
					{mode === "edit" ? "CANCEL" : "EDIT"}
				</button>
			</li>
			{mode === "edit" && <EditGames game={element} />}
		</>
	);
};
